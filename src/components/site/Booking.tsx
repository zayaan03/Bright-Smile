import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Calendar, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/lib/supabase'

// ============================================================
// Booking Form — Validation Schema
// ============================================================
// We use Zod to enforce client-side validation rules so the form
// cannot be submitted with bad data. Every field below has a
// clear error message that matches the site's premium design.
// ============================================================

const services = [
  "Porcelain Veneers", "Dental Implants", "Invisalign",
  "Teeth Whitening", "Smile Makeover", "Dental Crowns", "Not Sure (help me decide)"
];
declare global {
  interface Window {
    Cal: any;
  }
}

/**
 * Phone helper: ensures the value always starts with +1 and contains
 * only digits after the prefix. Returns a formatted string.
 */
function normalizePhone(raw: string): string {
  // Strip everything except digits
  const digits = raw.replace(/\D/g, "");
  // Ensure it starts with 1 (US country code)
  const withCountry = digits.startsWith("1") ? digits : `1${digits}`;
  // Limit to 11 digits total (1 + 10)
  const trimmed = withCountry.slice(0, 11);
  return `+${trimmed}`;
}

/**
 * Zod schema for the booking form.
 */
const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+1\d{10}$/.test(normalizePhone(val)), {
      message: "Enter a valid US phone number (10 digits after +1)",
    }),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

/** TypeScript type inferred from the Zod schema */
type BookingFormData = z.infer<typeof bookingSchema>;

export default function Booking() {
  // ----------------------------------------------------------
  // React Hook Form setup with Zod resolver
  // ----------------------------------------------------------
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+1",
      service: "",
      message: "",
    },
  });

  // Local loading state for the simulated submission delay
  const [submitting, setSubmitting] = useState(false);

  // Watch phone so we can re-format it on every keystroke
  const phoneValue = watch("phone");

  /**
   * Phone onChange handler:
   * Keeps the +1 prefix intact and only allows digits after it.
   * If the user tries to delete +1 we automatically restore it.
   */
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const normalized = normalizePhone(raw);
    setValue("phone", normalized, { shouldValidate: true });
  }

  /**
   * Submit handler:
   * Only runs when Zod validation passes. We simulate a brief network
   * delay, then show a success toast and reset the form.
   */
  function onSubmit(data: BookingFormData) {
    // Extract form data as constants
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const service = data.service;
    const message = data.message
      // Save to Supabase
    const saveToSupabase = async () => {
      const { error } = await supabase
        .from('user_data')
        .insert([
          { name, phone, service,message, email}
        ])

      if (error) {
        console.error('Error saving lead:', error)
      } else {
        console.log('Lead saved successfully')
      }
    }

    saveToSupabase()

    setSubmitting(true);
    // Simulate async submission (replace with real API call)
    setTimeout(() => {
      setSubmitting(false);
      reset({
        name: "",
        email: "",
        phone: "+1",
        service: "",
        message: "",
      });
      toast.success("Request received! We'll reach out within the hour.", {
        description: "A care coordinator will confirm your preferred time shortly.",
      });
      console.log("Booking payload:", data);
    }, 700);
    window.Cal("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
      });
      window.Cal("modal", {
        calLink: "bright-smile/dental-appointment", // ← REPLACE THIS
        config: {
          name: name,
          email: email,
          attendeePhoneNumber: phone,
          service: service,
        },
      });
  }

  /**
   * Shared input base styles.
   * When a field has an error we switch the border to the site's
   * destructive (red) color and add a soft red ring on focus.
   */
  function inputClasses(fieldName: keyof BookingFormData) {
    const hasError = !!errors[fieldName];
    return [
      "w-full h-14 px-4 rounded-2xl bg-white/95 text-ink placeholder:text-muted-foreground",
      "focus:outline-none transition",
      hasError
        ? "border border-destructive focus:ring-4 focus:ring-destructive/15 focus:border-destructive"
        : "border border-transparent focus:ring-4 focus:ring-primary/15 focus:border-primary",
    ].join(" ");
  }

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    <section id="book" className="relative py-20 md:py-32 overflow-hidden bg-gradient-dark">
      {/* Background decorative blobs */}
      <span className="blob h-[480px] w-[480px] -top-32 -left-32" style={{ background: "rgba(109,91,255,0.55)" }} />
      <span className="blob h-[420px] w-[420px] bottom-0 right-0" style={{ background: "rgba(198,255,0,0.30)" }} />
      <span className="absolute top-1/4 right-1/3 h-3 w-3 rounded-full bg-accent shadow-glow animate-shimmer" />
      <span className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-white/70 animate-shimmer" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ------------------------------------------------------
              Left Column — Marketing copy & trust badges
          ------------------------------------------------------ */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold text-white">
              <Calendar className="h-3.5 w-3.5" />
              Book Appointment
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Ready for Your New Smile? <span className="text-accent">Let's Talk.</span>
            </h2>
            <p className="mt-5 text-lg text-white/85 leading-relaxed max-w-xl">
              Book your consultation today. No pressure, no hard sell — just an honest conversation about what's possible for your smile.
            </p>

            {/* Trust badges */}
            <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-lg">
              {[
                { icon: ShieldCheck, label: "Free Consultation" },
                { icon: Clock, label: "1-Hour Response" },
                { icon: Sparkles, label: "0% Financing" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl glass-dark p-4 text-center">
                  <Icon className="h-5 w-5 text-accent mx-auto" />
                  <div className="mt-2 text-xs font-semibold">{label}</div>
                </div>
              ))}
            </div>

            {/* Floating decorative shapes */}
            <div className="hidden lg:block mt-10 relative h-32">
              <div className="absolute left-0 top-0 h-24 w-24 rounded-3xl glass-dark flex items-center justify-center animate-float-slow">
                <Sparkles className="h-10 w-10 text-accent" />
              </div>
              <div className="absolute left-32 top-6 h-16 w-16 rounded-2xl bg-accent/90 flex items-center justify-center animate-float-fast shadow-glow">
                <span className="text-ink font-extrabold">★</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------
              Right Column — Booking form with validation
          ------------------------------------------------------ */}
          <div className="relative">
            <div className="rounded-[36px] glass shadow-card p-6 md:p-8" style={{ background: "rgba(255,255,255,0.95)" }}>
              <h3 className="text-2xl font-extrabold text-ink">Schedule Your Visit</h3>
              <p className="text-sm text-muted-foreground mt-1">Fill in your details — we'll confirm within 1 hour.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ----- Name ----- */}
                <div className="relative">
                  <input
                    {...register("name")}
                    placeholder="Full Name"
                    className={inputClasses("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-destructive animate-fade-up">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* ----- Phone ----- */}
                <div className="relative">
                  <input
                    {...register("phone")}
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    type="tel"
                    placeholder="Phone Number"
                    className={inputClasses("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-medium text-destructive animate-fade-up">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* ----- Email (full width) ----- */}
                <div className="relative sm:col-span-2">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className={inputClasses("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-destructive animate-fade-up">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* ----- Service ----- */}
                <div className="relative sm:col-span-2">
                  <select
                    {...register("service")}
                    defaultValue=""
                    className={inputClasses("service")}
                    aria-invalid={errors.service ? "true" : "false"}
                  >
                    <option value="" disabled>Service Interested In</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1.5 text-xs font-medium text-destructive animate-fade-up">
                      {errors.service.message}
                    </p>
                  )}
                </div>


                {/* ----- Message (optional, full width) ----- */}
                <div className="relative sm:col-span-2">
                  <textarea
                    {...register("message")}
                    placeholder="Message (optional)"
                    rows={3}
                    className="sm:col-span-2 w-full px-4 py-3 rounded-2xl bg-white/95 border border-transparent text-ink placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition resize-none"
                  />
                </div>

                {/* ----- Submit Button ----- */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitting}
                  id = "btn-submit"
                  className="sm:col-span-2 group w-full"
                >
                  {isSubmitting || submitting ? "Sending…" : "Pick Your Time"}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            {/* Floating accent decoration behind the card */}
            <span className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-accent shadow-glow animate-shimmer hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
