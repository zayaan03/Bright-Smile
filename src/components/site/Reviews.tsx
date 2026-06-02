import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Sarah T.", treatment: "Porcelain Veneers", text: "I spent years hiding my smile in photos. After getting veneers at BrightSmile, I genuinely cannot stop smiling. Dr. Mitchell was patient, honest, and the results exceeded everything I imagined. Best decision I've ever made.", initials: "ST" },
  { name: "Marcus D.", treatment: "Dental Implants", text: "I was terrified of the dentist for years. The team at BrightSmile completely changed that for me. They explained every single step, never rushed me, and my implants look absolutely natural. I wish I had done this sooner.", initials: "MD" },
  { name: "Jessica L.", treatment: "Invisalign", text: "From the moment I walked in, I felt like a priority. Emily at the front desk made everything so easy, and Dr. Carter's Invisalign results are incredible. My teeth are straighter than they've ever been and nobody even knew I was wearing aligners.", initials: "JL" },
  { name: "Amanda R.", treatment: "Full Smile Makeover", text: "I came in for a smile makeover before my wedding and BrightSmile delivered beyond my expectations. Everyone at the reception was asking about my smile. Dr. Mitchell is truly an artist. Worth every penny.", initials: "AR" },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-20 md:py-32 overflow-hidden bg-gradient-soft">
      <span className="blob h-[460px] w-[460px] -top-20 left-0" style={{ background: "rgba(109,91,255,0.20)" }} />
      <span className="blob h-[360px] w-[360px] bottom-0 right-0" style={{ background: "rgba(198,255,0,0.18)" }} />

      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
            Patient Reviews
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Real Patients. Real Smiles. <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Don't take our word for it. Here's what our patients say about their experience at BrightSmile.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <article key={r.name} className="relative rounded-[30px] glass shadow-card p-7 md:p-8 hover-lift">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/15" />
              <div className="flex items-center gap-1 text-[#FFC107]">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-5 text-[15.5px] md:text-base leading-relaxed text-foreground/90">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-extrabold shadow-cta">
                  {r.initials}
                </div>
                <div>
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Verified Patient · {r.treatment}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-12 rounded-[28px] bg-gradient-dark p-6 md:p-8 shadow-card relative overflow-hidden">
          <span className="blob h-[200px] w-[200px] -top-10 -right-10" style={{ background: "rgba(198,255,0,0.30)" }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center gap-1 text-[#FFC107]">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <span className="text-2xl md:text-3xl font-extrabold">4.9 Stars</span>
            </div>
            <p className="text-white/85 text-sm md:text-base">
              Across 200+ Google Reviews · Rated <span className="font-bold text-accent">#1 Cosmetic Dentist</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
