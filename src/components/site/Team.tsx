import { Linkedin, Instagram, Mail } from "lucide-react";
import sarah from "@/assets/team-sarah.jpg";
import james from "@/assets/team-james.jpg";
import emily from "@/assets/team-emily.jpg";
import anna from "@/assets/team-anna.jpg";

const team = [
  { img: sarah, name: "Dr. Sarah Mitchell", role: "Lead Cosmetic Dentist", bio: "15 years specializing in smile transformations. Trained at NYU College of Dentistry. 300+ full smile makeovers." },
  { img: james, name: "Dr. James Carter", role: "Implant & Restorative Specialist", bio: "Expert in full-mouth restoration and implant surgery. Certified Invisalign provider with 200+ successful cases." },
  { img: emily, name: "Emily Rodriguez", role: "Patient Care Coordinator", bio: "Your first point of contact and your advocate throughout treatment. Emily ensures every patient feels heard and cared for." },
  { img: anna, name: "Anna Bennett, RDH", role: "Lead Dental Hygienist", bio: "Certified hygienist with 10+ years of experience in preventive and aesthetic care. Known for her gentle, anxiety-easing touch." },
];

export default function Team() {
  return (
    <section id="team" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <span className="blob h-[360px] w-[360px] -top-10 left-1/3" style={{ background: "rgba(109,91,255,0.10)" }} />

      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-primary">
            Our Team
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Meet the Team Behind Your <span className="text-gradient">New Smile</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Our team combines decades of expertise with a genuine passion for helping patients feel confident. We're not just dentists — we're smile artists.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <article key={m.name} className="group relative rounded-[32px] overflow-hidden shadow-card hover-lift bg-white">
              <div className="relative h-[420px]">
                <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                {/* Social hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  {[Linkedin, Instagram, Mail].map((Icon, i) => (
                    <span key={i} className="h-9 w-9 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 shadow-soft">
                  <h3 className="font-extrabold text-[17px] tracking-tight leading-tight">{m.name}</h3>
                  <p className="text-xs font-semibold text-primary mt-1">{m.role}</p>
                  <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed line-clamp-3">{m.bio}</p>
                </div>
              </div>
              <span className="pointer-events-none absolute inset-0 rounded-[32px] ring-0 group-hover:ring-2 ring-primary/40 transition-all" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
