import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book Appointment", href: "#book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 md:pt-5">
      <div className="container-x">
        <nav
          className={`flex items-center justify-between gap-4 rounded-full transition-all duration-500 ${
            scrolled
              ? "glass shadow-soft px-4 md:px-6 py-3"
              : "bg-white/40 backdrop-blur-md px-4 md:px-6 py-3 border border-white/40"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-cta">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent shadow-glow animate-shimmer" />
            </span>
            <span className="font-extrabold text-[17px] tracking-tight">
              Bright<span className="text-gradient">Smile</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {links.slice(0, 4).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#book" className="hidden sm:inline-flex btn-primary !h-11 !px-5 text-sm">
              Schedule Your Visit
            </a>
            <button
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-3xl p-4 shadow-soft animate-fade-up">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-secondary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}