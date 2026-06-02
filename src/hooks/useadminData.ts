
// ------------------------------------------------------------
// Centralised data hook for the /admin dashboard.
// Pulls everything from the Supabase `user_data` table and
// exposes ready-to-render values that match the existing UI.
//
// Expected columns on `user_data`:
//   - name             text
//   - email            text
//   - phone            text
//   - service          text
//   - appointment_date date  (YYYY-MM-DD)
//   - time             text  (e.g. "9:30 AM")  [optional]
//   - status           text  ("Pending" | "Checked In" | "No Show")
// ============================================================
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export type PatientStatus = "Pending" | "Checked In" | "No Show";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;       // pretty date for the table, e.g. "May 20, 2026"
  isoDate: string;    // YYYY-MM-DD — used for filtering
  service: string;
  status: PatientStatus;
  initials: string;
  time: string;
}

export interface UpcomingDay {
  iso: string;
  weekday: string;
  day: number;
  monthLabel: string;
}

// ---- helpers ----
// FIX: format a Date as YYYY-MM-DD using LOCAL time (not UTC).
// Previously we used `toISOString().slice(0,10)`, which converts to UTC and
// shifts the date by one day in any timezone east of UTC. That made the
// weekday chips in "Upcoming Appointments" carry the wrong iso date, so a
// May 30 booking appeared under the May 31 chip. The patients table was
// unaffected because it formats `isoDate` with `toLocaleDateString`.
const toLocalISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const todayISO = () => toLocalISO(new Date());

const toInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

const prettyDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// Map a raw row from `user_data` into our Patient shape.
const rowToPatient = (row: any, index: number): Patient => {
  const iso = String(row.appointment_date ?? "").slice(0, 10);
  const rawStatus = String(row.status ?? "").toLowerCase();
  const status: PatientStatus =
    rawStatus === "checked in"
      ? "Checked In"
      : rawStatus === "no show"
      ? "No Show"
      : "Pending";
  return {
    id: String(row.id ?? `${row.email ?? "row"}-${index}`),
    name: row.name ?? "Unknown",
    phone: row.phone ?? "",
    email: row.email ?? "",
    service: row.service ?? "—",
    isoDate: iso,
    date: iso ? prettyDate(iso) : "—",
    time: row.appointment_time ?? "",
    status,
    initials: toInitials(row.name ?? "?"),
  };
};

// Build a 7-day window starting at `startISO`.
const buildWeek = (startISO: string): UpcomingDay[] => {
  const start = new Date(startISO + "T00:00:00");
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      // FIX: use local-time formatter so the chip's iso matches the
      // appointment_date stored in the DB (YYYY-MM-DD, no timezone).
      iso: toLocalISO(d),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      monthLabel: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
  });
};

export function useAdminData() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Anchor for the upcoming-appointments week strip. Starts at "today"
  // and shifts in 7-day increments via nextWeek() / prevWeek().
  const [weekStart, setWeekStart] = useState<string>(todayISO());

  // ---- fetch all rows once ----
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("user_data")
      .select("*")
      .order("appointment_date", { ascending: true });

    if (error) {
      setError(error.message);
      setPatients([]);
    } else {
      setPatients((data ?? []).map(rowToPatient));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ============================================================
  // METRICS
  // ============================================================
  const today = todayISO();

  // Total Patients = unique emails across the table
  const totalPatients = useMemo(() => {
    const set = new Set(patients.map((p) => p.email.toLowerCase()).filter(Boolean));
    return set.size;
  }, [patients]);

  // Appointments Today = rows where appointment_date == today
  const appointmentsToday = useMemo(
    () => patients.filter((p) => p.isoDate === today).length,
    [patients, today]
  );

  // Checked In Today = rows where appointment_date == today AND status == "Checked In"
  const checkedInToday = useMemo(
    () =>
      patients.filter((p) => p.isoDate === today && p.status === "Checked In").length,
    [patients, today]
  );

  // ============================================================
  // SERVICES — count each service, convert to % of total rows
  // ============================================================
  const services = useMemo(() => {
    const total = patients.length;
    if (total === 0) return [] as { name: string; pct: number }[];
    const counts = new Map<string, number>();
    patients.forEach((p) => {
      if (!p.service) return;
      counts.set(p.service, (counts.get(p.service) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.pct - a.pct);
  }, [patients]);

  // ============================================================
  // UPCOMING WEEK — 7-day strip + pagination
  // ============================================================
  const upcomingDays = useMemo(() => buildWeek(weekStart), [weekStart]);

  // Right arrow should only enable if there are appointments
  // beyond the last day of the currently displayed week.
  const lastDayOfWeek = upcomingDays[upcomingDays.length - 1].iso;
  const hasNextWeek = useMemo(
    () => patients.some((p) => p.isoDate > lastDayOfWeek),
    [patients, lastDayOfWeek]
  );
  // Left arrow disables when we're already at "today".
  const hasPrevWeek = weekStart > today;

  const nextWeek = () => {
    if (!hasNextWeek) return;
    const d = new Date(weekStart + "T00:00:00");
    d.setDate(d.getDate() + 7);
    setWeekStart(toLocalISO(d)); // FIX: local-time formatting (see above)
  };
  const prevWeek = () => {
    if (!hasPrevWeek) return;
    const d = new Date(weekStart + "T00:00:00");
    d.setDate(d.getDate() - 7);
    const next = toLocalISO(d); // FIX: local-time formatting (see above)
    setWeekStart(next < today ? today : next);
  };

  // ============================================================
  // UPDATE STATUS — optimistic local update + persist to Supabase
  // ============================================================
  const updateStatus = useCallback(
    async (id: string, status: PatientStatus) => {
      // 1. Update the UI immediately
      setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
      // 2. Persist to the database
      const { error } = await supabase
        .from("user_data")
        .update({ status })
        .eq("id", id);
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to update status:", error.message);
        // Roll back by re-fetching the source of truth
        fetchAll();
      }
    },
    [fetchAll]
  );

  return {
    loading,
    error,
    patients,
    // metrics
    totalPatients,
    appointmentsToday,
    checkedInToday,
    // services breakdown
    services,
    // upcoming-week strip
    upcomingDays,
    hasNextWeek,
    hasPrevWeek,
    nextWeek,
    prevWeek,
    // mutations + refresh
    updateStatus,
    refresh: fetchAll,
  };
}