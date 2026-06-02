import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAdminData, type PatientStatus } from "@/hooks/useadminData";
import {
  Users,  
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  Search,
  LogOut,
  Sparkles,
  Lock,
  User as UserIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — BrightSmile" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

// ---- Demo session-based auth (client-side, sessionStorage) ----
// Demo credentials: admin / brightsmile2025
const SESSION_KEY = "bs_admin_session";
const DEMO_USER = "admin";
const DEMO_PASS = "brightsmile2025";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;

  return authed ? (
    <Dashboard onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }} />
  ) : (
    <Login onSuccess={() => { sessionStorage.setItem(SESSION_KEY, "1"); setAuthed(true); }} />
  );
}

/* ============================================================
   LOGIN SCREEN
   ============================================================ */
function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (username.trim() === DEMO_USER && password === DEMO_PASS) {
        onSuccess();
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-soft">
      <div className="blob h-[420px] w-[420px] -top-32 -left-24" style={{ background: "rgba(67,56,255,0.35)" }} />
      <div className="blob h-[360px] w-[360px] bottom-[-120px] right-[-80px]" style={{ background: "rgba(198,255,0,0.28)" }} />
      <div className="blob h-[260px] w-[260px] top-1/3 right-1/4" style={{ background: "rgba(109,91,255,0.25)" }} />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between p-12 lg:flex">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary shadow-cta">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">BrightSmile</span>
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight">
              Welcome to your <span className="text-gradient">clinic command center</span>.
            </h1>
            <p className="max-w-md text-base text-muted-foreground">
              Securely manage appointments, patient pipeline and analytics — all in one luxurious place.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Encrypted session. Authorized personnel only.
            </div>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} BrightSmile Cosmetic Dental.</p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="glass w-full max-w-md rounded-[36px] p-10 shadow-card animate-fade-up">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-cta">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Admin Portal</h2>
              <p className="mt-1 text-sm text-muted-foreground">Secure access for BrightSmile staff</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">Username</label>
                <div className="relative">
                  <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    autoComplete="username"
                    className="h-14 w-full rounded-[18px] border border-transparent bg-secondary pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-14 w-full rounded-[18px] border border-transparent bg-secondary pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive animate-fade-up">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-70"
              >
                {loading ? "Signing in…" : "Sign In Securely"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Demo credentials: <span className="font-semibold">admin</span> / <span className="font-semibold">brightsmile2025</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD
   ============================================================ */
const PAGE_SIZE = 5;

function Dashboard({ onLogout }: { onLogout: () => void }) {
  // All real-time data is sourced from Supabase via useAdminData.
  const {
    patients,
    totalPatients,
    appointmentsToday,
    checkedInToday,
    services,
    upcomingDays,
    hasNextWeek,
    hasPrevWeek,
    nextWeek,
    prevWeek,
    updateStatus,
  } = useAdminData();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [metrics, setMetrics] = useState({ total: 0, today: 0, checked: 0 });
  // Selected day on the upcoming-week strip. Defaults to the first
  // day of whatever week is currently being viewed.
  const [selectedDay, setSelectedDay] = useState<string>(upcomingDays[0].iso);

  // Keep selectedDay valid when the week strip pages forward/back.
  useEffect(() => {
    if (!upcomingDays.some((d) => d.iso === selectedDay)) {
      setSelectedDay(upcomingDays[0].iso);
    }
  }, [upcomingDays, selectedDay]);

  // Count-up animation — targets are the live numbers from Supabase.
  useEffect(() => {
    const targets = { total: totalPatients, today: appointmentsToday, checked: checkedInToday };
    const duration = 900;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setMetrics({
        total: Math.round(targets.total * ease),
        today: Math.round(targets.today * ease),
        checked: Math.round(targets.checked * ease),
      });
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [totalPatients, appointmentsToday, checkedInToday]);

  const filtered = useMemo(
    () => patients.filter((p) =>
      [p.name, p.email, p.phone, p.service].some((f) => f.toLowerCase().includes(search.toLowerCase()))
    ),
    [patients, search]
  );

  // Reset to page 1 if filter/search changes shrink pages
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const upcomingFiltered = patients.filter((p) => p.isoDate === selectedDay);
  const monthLabel = upcomingDays.find((d) => d.iso === selectedDay)?.monthLabel ?? "";

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(135deg,#F6F3FF 0%,#EEE8FF 35%,#FFFFFF 100%)" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="blob h-[420px] w-[420px] -top-40 -right-40" style={{ background: "rgba(67,56,255,0.18)" }} />
        <div className="blob h-[360px] w-[360px] -bottom-40 -left-40" style={{ background: "rgba(198,255,0,0.18)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
        {/* Header */}
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">Welcome Back</h1>
            <p className="text-xs text-muted-foreground">Here are today's updates</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-cta">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-extrabold tracking-tight">BrightSmile</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 text-xs font-semibold backdrop-blur transition hover:bg-white hover:shadow-soft"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* MAIN COLUMN */}
          <div className="space-y-4 lg:col-span-2">
            {/* Metric cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Total Patients" value={metrics.total.toLocaleString()} delta="+12.4%" icon={<Users className="h-4 w-4 text-white" />} />
              <MetricCard label="Appointments Today" value={String(metrics.today)} delta="+3 today" icon={<CalendarCheck className="h-4 w-4 text-white" />} />
              <MetricCard label="Checked In Today" value={String(metrics.checked)} delta="61% rate" icon={<CheckCircle2 className="h-4 w-4 text-white" />} />
            </div>

            {/* Most requested services */}
            <div className="glass rounded-2xl p-4 shadow-card sm:p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-extrabold tracking-tight sm:text-base">Most Requested Services</h2>
                  <p className="text-[11px] text-muted-foreground">Based on total appointment requests</p>
                </div>
                <div className="hidden items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-primary sm:inline-flex">
                  <TrendingUp className="h-3 w-3" /> Last 30 days
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {services.map((s, i) => (
                  <ServiceBar key={s.name} name={s.name} pct={s.pct} delay={i * 70} />
                ))}
              </div>
            </div>

            {/* Patients table */}
            <div className="glass rounded-2xl p-4 shadow-card sm:p-5">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-sm font-extrabold tracking-tight sm:text-base">All Patients</h2>
                  <p className="text-[11px] text-muted-foreground">Manage appointments and statuses</p>
                </div>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search…"
                    className="h-8 w-48 rounded-full border border-border bg-white/70 pl-8 pr-3 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Light shade behind table so borders are visible */}
              <div className="rounded-xl border border-border/60 bg-gradient-to-b from-secondary/60 to-white/40 p-1.5">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-separate border-spacing-y-1 text-xs">
                    <thead>
                      <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="px-3 py-1.5 font-semibold">Name</th>
                        <th className="px-3 py-1.5 font-semibold">Phone</th>
                        <th className="px-3 py-1.5 font-semibold">Email</th>
                        <th className="px-3 py-1.5 font-semibold">Appointment</th>
                        <th className="px-3 py-1.5 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((p) => (
                        <tr key={p.id} className="bg-white/80 transition hover:bg-white hover:shadow-soft">
                          <td className="rounded-l-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-primary text-[10px] font-bold text-white">
                                {p.initials}
                              </div>
                              <div>
                                <div className="font-semibold leading-tight text-foreground">{p.name}</div>
                                <div className="text-[10px] text-muted-foreground">{p.service}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-muted-foreground">{p.phone}</td>
                          <td className="px-3 py-2 text-muted-foreground">{p.email}</td>
                          <td className="px-3 py-2">
                            <div className="font-medium leading-tight">{p.date}</div>
                            <div className="text-[10px] text-muted-foreground">{p.time}</div>
                          </td>
                          <td className="rounded-r-lg px-3 py-2">
                            <StatusDropdown value={p.status} onChange={(s) => updateStatus(p.id, s)} />
                          </td>
                        </tr>
                      ))}
                      {paginated.length === 0 && (
                        <tr><td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">No patients match your search.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Numeric pagination */}
              <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
            </div>
          </div>

          {/* SIDEBAR — Upcoming Appointments with day filter */}
          <aside className="glass h-fit rounded-2xl p-4 shadow-card sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold tracking-tight sm:text-base">Upcoming Appointments</h2>
                <p className="text-[11px] text-muted-foreground">{monthLabel}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevWeek}
                  disabled={!hasPrevWeek}
                  aria-label="Previous week"
                  className="grid h-6 w-6 place-items-center rounded-md bg-secondary text-muted-foreground transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={nextWeek}
                  disabled={!hasNextWeek}
                  aria-label="Next week"
                  className="grid h-6 w-6 place-items-center rounded-md bg-secondary text-muted-foreground transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Day strip filter */}
            <div className="mb-3 grid grid-cols-7 gap-1">
              {upcomingDays.map((d) => {
                const active = d.iso === selectedDay;
                return (
                  <button
                    key={d.iso}
                    onClick={() => setSelectedDay(d.iso)}
                    className={`flex flex-col items-center rounded-lg px-1 py-1.5 text-[10px] font-semibold transition ${
                      active
                        ? "bg-gradient-primary text-white shadow-cta"
                        : "bg-white/60 text-muted-foreground hover:bg-white"
                    }`}
                  >
                    <span className={active ? "opacity-90" : ""}>{d.weekday}</span>
                    <span className={`mt-0.5 text-sm font-extrabold ${active ? "text-white" : "text-foreground"}`}>{d.day}</span>
                  </button>
                );
              })}
            </div>

            <div className="max-h-[440px] space-y-2 overflow-y-auto pr-1">
              {upcomingFiltered.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-white/40 px-3 py-6 text-center text-[11px] text-muted-foreground">
                  No appointments for this day.
                </div>
              )}
              {upcomingFiltered.map((p) => (
                <div
                  key={p.id}
                  className="group flex items-center gap-2 rounded-xl border border-white/60 bg-gradient-to-br from-white/80 to-secondary/60 p-2.5 transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-[11px] font-bold text-white shadow-cta">
                    {p.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-xs font-semibold">{p.name}</div>
                      <SmallBadge status={p.status} />
                    </div>
                    <div className="truncate text-[10px] text-muted-foreground">{p.service}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{p.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PIECES
   ============================================================ */
function MetricCard({ label, value, delta, icon }: { label: string; value: string; delta: string; icon: React.ReactNode }) {
  return (
    <div className="group glass relative overflow-hidden rounded-2xl p-3.5 shadow-card transition hover:-translate-y-0.5 hover:shadow-cta">
      <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-primary opacity-10 blur-2xl transition group-hover:opacity-20" />
      <div className="flex items-start justify-between">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-cta">
          {icon}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold text-primary">
          <TrendingUp className="h-2.5 w-2.5" /> {delta}
        </span>
      </div>
      <div className="mt-2 text-[10px] font-medium text-muted-foreground">{label}</div>
      <div className="text-[22px] font-extrabold leading-tight tracking-tight">{value}</div>
    </div>
  );
}

function ServiceBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), delay + 80);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-semibold">{name}</span>
        <span className="font-bold text-primary tabular-nums">{w}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#ECEBFF" }}>
        <div
          className="h-full rounded-full transition-[width] duration-[1100ms] ease-out"
          style={{ width: `${w}%`, background: "linear-gradient(90deg,#4338FF,#6D5BFF)" }}
        />
      </div>
    </div>
  );
}

function StatusDropdown({ value, onChange }: { value: PatientStatus; onChange: (s: PatientStatus) => void }) {
  const pending = value === "Pending";
  const checkedIn = value === "Checked In";
  const noShow = value === "No Show";
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PatientStatus)}
        className={`appearance-none rounded-full border px-2.5 py-1 pr-6 text-[10px] font-bold outline-none transition cursor-pointer ${
          pending
            ? "border-orange-200 bg-orange-50 text-orange-700"
            : checkedIn
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        <option value="Pending">Pending</option>
        <option value="Checked In">Checked In</option>
        <option value="No Show">No Show</option>
      </select>
      <span className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[8px] ${
        pending ? "text-orange-700" : checkedIn ? "text-emerald-700" : "text-rose-700"
      }`}>▾</span>
    </div>
  );
}

function SmallBadge({ status }: { status: PatientStatus }) {
  const cls = status === "Pending"
    ? "border-orange-200 bg-orange-50 text-orange-700"
    : status === "Checked In"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${cls}`}>{status}</span>
  );
}

/* Numeric pagination — compact pill style */
function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-3 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="grid h-7 w-7 place-items-center rounded-full border border-border bg-white/70 text-muted-foreground transition hover:bg-white disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-7 min-w-7 rounded-full px-2 text-[11px] font-bold transition ${
            p === page
              ? "bg-gradient-primary text-white shadow-cta"
              : "border border-border bg-white/70 text-muted-foreground hover:bg-white"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="grid h-7 w-7 place-items-center rounded-full border border-border bg-white/70 text-muted-foreground transition hover:bg-white disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}