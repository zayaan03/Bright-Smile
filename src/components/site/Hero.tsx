import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/heroimg.png";
import patientImg from "@/assets/hero-smile.jpg";
import whiteningImg from "@/assets/svc-whitening.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32 bg-gradient-soft"
    >
      {/* Floating blobs */}
      <span className="blob h-[420px] w-[420px] -top-24 -left-24" style={{ background: "rgba(109,91,255,0.35)" }} />
      <span className="blob h-[360px] w-[360px] top-1/3 -right-20" style={{ background: "rgba(198,255,0,0.25)" }} />
      <span className="blob h-[260px] w-[260px] bottom-0 left-1/3" style={{ background: "rgba(67,56,255,0.18)" }} />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-primary mb-6 shadow-soft">
              <ShieldCheck className="h-4 w-4" />
              Charlotte's Most Trusted Cosmetic Studio
            </div>

            <h1 className="text-[42px] leading-[1.05] md:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink">
              Transform Your Smile.
              <br />
              <span className="text-gradient">Transform Your</span> Confidence.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Charlotte's most trusted cosmetic dental studio. From veneers to full smile makeovers — we craft smiles that change lives.
              <span className="block mt-2 font-medium text-foreground/80">Book your appointment today.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#book" className="btn-primary group">
                Schedule Your Visit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#services" className="btn-secondary">View Services</a>
            </div>

            {/* Trust metrics */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex -space-x-3">
                {[patientImg, heroImg, whiteningImg].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-soft"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-accent-foreground">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#FFC107" }} />
                  ))}
                  <span className="ml-2 font-bold text-sm">4.9/5</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Trusted by 500+ happy patients</p>
              </div>
            </div>
          </div>

          {/* Right — image collage */}
          <div className="relative h-[520px] md:h-[620px] animate-fade-up [animation-delay:200ms]">
            {/* Neon brushstroke */}
            <span
              className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[460px] rounded-[40%] rotate-12"
              style={{ background: "radial-gradient(circle, rgba(198,255,0,0.45), transparent 65%)", filter: "blur(40px)" }}
            />

            {/* Main image */}
            <div className="absolute top-0 right-0 w-[68%] h-[78%] rounded-[40px] overflow-hidden shadow-card animate-float-slow">
              <img src={heroImg} alt="Radiant patient smile" className="w-full h-full object-cover" />
            </div>

            {/* Secondary image */}
            <div className="absolute bottom-0 left-0 w-[52%] h-[44%] rounded-[32px] overflow-hidden shadow-card animate-float-fast border-4 border-white">
              <img src={patientImg} alt="Happy cosmetic dentistry patient" className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Rating floating badge */}
            <div className="absolute top-6 left-2 md:left-0 glass rounded-2xl px-4 py-3 shadow-card flex items-center gap-3 animate-float-fast">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-cta">
                <Star className="h-5 w-5 text-white fill-white" />
              </div>
              <div>
                <div className="text-sm font-extrabold leading-none">4.9 ★</div>
                <div className="text-[11px] text-muted-foreground mt-1">Trusted by 500+ Patients</div>
              </div>
            </div>

            {/* Sparkle badge */}
            <div className="absolute bottom-8 right-2 glass rounded-2xl px-4 py-3 shadow-card flex items-center gap-3 animate-float-slow">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "var(--lime)" }}>
                <Sparkles className="h-5 w-5 text-ink" />
              </div>
              <div>
                <div className="text-sm font-extrabold leading-none">15+ yrs</div>
                <div className="text-[11px] text-muted-foreground mt-1">Specialized expertise</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved divider */}
      <svg className="absolute -bottom-1 left-0 right-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path fill="white" d="M0,64 C240,128 480,128 720,80 C960,32 1200,32 1440,80 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}