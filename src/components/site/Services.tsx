import { ArrowUpRight } from "lucide-react";
import veneers from "@/assets/svc-veneers.jpg";
import implants from "@/assets/svc-implants.jpg";
import invisalign from "@/assets/svc-invisalign.jpg";
import whitening from "@/assets/svc-whitening.jpg";
import makeover from "@/assets/svc-makeover.jpg";
import crowns from "@/assets/svc-crowns.jpg";

const services = [
  { img: veneers, title: "Porcelain Veneers", desc: "Hide chips, cracks, stains, and gaps with ultra-thin custom veneers. The fastest way to a flawless smile — results in just 2 visits." },
  { img: implants, title: "Dental Implants", desc: "Missing teeth? Our permanent implant solutions look, feel, and function exactly like natural teeth. Built to last a lifetime." },
  { img: invisalign, title: "Invisalign Clear Aligners", desc: "Straighten your teeth without anyone knowing. Custom clear aligners that fit your life — no wires, no brackets, no embarrassment." },
  { img: whitening, title: "Teeth Whitening", desc: "Get up to 8 shades whiter in a single in-office session. Professional-grade whitening that over-the-counter products simply can't match." },
  { img: makeover, title: "Full Smile Makeover", desc: "Combine veneers, whitening, contouring, and more into one comprehensive treatment plan. Walk in with doubts. Walk out with your dream smile." },
  { img: crowns, title: "Dental Crowns & Bonding", desc: "Restore cracked, worn, or damaged teeth with natural-looking crowns and bonding. Strength and aesthetics — perfectly balanced." },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden bg-gradient-soft">
      <span className="blob h-[460px] w-[460px] top-10 -right-32" style={{ background: "rgba(109,91,255,0.22)" }} />
      <span className="blob h-[320px] w-[320px] bottom-10 -left-20" style={{ background: "rgba(198,255,0,0.20)" }} />

      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
            Our Services
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Everything You Need for Your <span className="text-gradient">Perfect Smile</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            From a single tooth to a complete smile makeover — we offer the full range of cosmetic and restorative dental treatments under one roof. No referrals. No runaround. Just results.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-[28px] overflow-hidden bg-white shadow-card hover-lift border border-white"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[22px] font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <a href="#book" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group/link">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
              {/* Glow border on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-0 ring-primary/40 group-hover:ring-2 transition-all" style={{ boxShadow: "0 0 0 transparent" }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
