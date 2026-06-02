import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import WhyUs from "@/components/site/WhyUs";
import Services from "@/components/site/Services";
import Team from "@/components/site/Team";
import Reviews from "@/components/site/Reviews";
import Booking from "@/components/site/Booking";
import Footer from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrightSmile Cosmetic Dental — Charlotte's Premier Smile Studio" },
      { name: "description", content: "Veneers, implants, Invisalign, whitening and full smile makeovers in Charlotte. 500+ smile transformations. Book your free consultation today." },
      { property: "og:title", content: "BrightSmile Cosmetic Dental — Transform Your Smile" },
      { property: "og:description", content: "Charlotte's most trusted cosmetic dental studio. 4.9★ across 200+ Google Reviews." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "BrightSmile Cosmetic Dental",
          image: "https://brightsmile.com/og.jpg",
          telephone: "+1-704-555-0192",
          email: "hello@brightsmile.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1250 Ballantyne Commons Pkwy",
            addressLocality: "Charlotte",
            addressRegion: "NC",
            postalCode: "28277",
            addressCountry: "US",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200" },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Team />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
