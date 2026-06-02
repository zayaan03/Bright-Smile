import { Smile, Award, Clock, Wallet, Heart, ShieldCheck } from "lucide-react";
import patientImg from "@/assets/whyus.jpg";

const usps = [
  { icon: Smile, stat: "500+", title: "Smile Transformations", desc: "We've helped hundreds of Charlotte patients go from hiding their smile to showing it off every day." },
  { icon: Award, stat: "15+", title: "Years of Expertise", desc: "Our lead cosmetic dentist has over 15 years of specialized experience in aesthetic and restorative dentistry." },
  // { icon: Clock, stat: "Same-Day", title: "Emergency Care", desc: "Dental emergencies don't wait. Neither do we. Call us and we'll get you seen the same day — guaranteed." },
  // { icon: Wallet, stat: "0%", title: "Financing Available", desc: "Your dream smile shouldn't be held back by budget. Flexible 0% financing plans that work for you." },
  { icon: Heart, stat: "Painless", title: "Anxiety-Free Care", desc: "Latest techniques and sedation options to make every visit as comfortable and stress-free as possible." },
  { icon: ShieldCheck, stat: "100%", title: "Guaranteed Satisfaction", desc: "We stand behind every smile we create. If you're not completely satisfied, we'll make it right." },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <span className="blob h-[400px] w-[400px] -top-20 right-0" style={{ background: "rgba(109,91,255,0.12)" }} />
      <span className="blob h-[300px] w-[300px] bottom-0 -left-10" style={{ background: "rgba(198,255,0,0.18)" }} />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[36px] overflow-hidden shadow-card animate-float-slow">
              <img src={patientImg} alt="Radiant patient" className="w-full h-[460px] md:h-[560px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-cta">
                    <Heart className="h-5 w-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Personalized Care</div>
                    <div className="text-xs text-muted-foreground">Honest advice, real results</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative dot */}
            <span className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-accent shadow-glow animate-shimmer hidden md:block" />
          </div>

          {/* Right text + cards */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-primary">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              Why Patients Choose <span className="text-gradient">BrightSmile</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We don't just fix teeth — we transform how you feel about yourself. Every patient who walks through our doors gets personalized care, honest advice, and results that speak for themselves.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {usps.map(({ icon: Icon, stat, title, desc }) => (
                <div
                  key={title}
                  className="group relative rounded-3xl glass p-5 shadow-soft hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-cta shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">{stat}</div>
                      <div className="font-extrabold text-[17px] mt-0.5">{title}</div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}