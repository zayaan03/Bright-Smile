import { Phone, Mail, MapPin, Sparkles, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ background: "linear-gradient(180deg, #0B0A1F 0%, #14123A 100%)" }}>
      <span className="blob h-[460px] w-[460px] -top-32 -left-20" style={{ background: "rgba(67,56,255,0.45)" }} />
      <span className="blob h-[300px] w-[300px] bottom-0 right-0" style={{ background: "rgba(198,255,0,0.18)" }} />

      {/* Faded brand typography */}
      <div className="absolute -bottom-10 left-0 right-0 text-center pointer-events-none select-none">
        <div className="text-[110px] md:text-[200px] font-extrabold tracking-tighter text-white/[0.04] leading-none">
          BrightSmile
        </div>
      </div>

      <div className="container-x relative pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#home" className="flex items-center gap-2">
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary shadow-cta">
                <Sparkles className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent shadow-glow" />
              </span>
              <span className="font-extrabold text-lg">BrightSmile</span>
            </a>
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-sm">
              BrightSmile Cosmetic Dental — Crafting Charlotte's Most Confident Smiles Since 2009.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="h-10 w-10 rounded-full glass-dark flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <div className="text-sm font-bold uppercase tracking-wider text-white/90">Quick Links</div>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {[
                { label: "Services", href: "#services" },
                { label: "Our Team", href: "#team" },
                { label: "Patient Reviews", href: "#reviews" },
                { label: "Book Appointment", href: "#book" },
                { label: "Privacy Policy", href: "#" },
              ].map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-accent transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="text-sm font-bold uppercase tracking-wider text-white/90">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" /> (704) 555-0192</li>
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" /> hello@brightsmile.com</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" /> 1250 Ballantyne Commons Pkwy,<br />Charlotte NC 28277</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <div className="text-sm font-bold uppercase tracking-wider text-white/90">Hours</div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>Mon–Fri: 8am – 6pm</li>
              <li>Saturday: 9am – 3pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 text-center text-xs text-white/55">
          © 2025 BrightSmile Cosmetic Dental. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
