import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const About = () => {
  // Set SEO meta tags for about page
  useSEO();

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".reveal");
    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/30 overflow-hidden reveal">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 h-3" />
            <div className="p-8 md:p-12">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wider uppercase">
                About Us
              </span>
              <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Family-Owned Remodeling Crafted for Twin Cities Homes
              </h1>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Omnia Construction is a licensed, family-owned remodeling company founded by a Ukrainian family and serving the Twin Cities. We deliver a premium remodeling standard with clear budgets, reliable timelines, meticulous jobsite care, and proactive communication from first estimate to final walk-through.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
                  <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                    Licensed & Transparent
                  </h2>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Every project is managed with clear budgets and dependable timelines, supported by meticulous jobsite standards that protect your home throughout the remodeling process.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
                  <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                    Multilingual Team
                  </h2>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Ukrainian, Russian and English-speaking professionals ensure each client receives responsive, proactive communication from the first conversation through the final walk-through.
                  </p>
                </div>
              </div>
              <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
                    License & Credentials
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    MN Residential Remodeler License: <span className="font-semibold text-gray-900">CR807108</span>
                  </p>
                </div>
                <Button asChild size="lg" className="self-start md:self-auto rounded-full px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white">
                  <Link to="/booking">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 reveal">
          <div className="container mx-auto px-6">
            <div className="rounded-3xl bg-white border border-gray-100 p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Premium Craftsmanship",
                    description:
                      "From kitchen transformations to whole-home renovations, we approach every detail with precision and pride in workmanship.",
                  },
                  {
                    title: "Homeowner Peace of Mind",
                    description:
                      "Clear milestones, tidy jobsites, and proactive updates at every step keep your project on track and stress-free.",
                  },
                  {
                    title: "Community Rooted",
                    description:
                      "We are deeply invested in serving Twin Cities families - building trust, earning referrals, and creating lasting relationships.",
                  },
                ].map((item, index) => (
                  <div key={index} className="rounded-2xl bg-gray-50/70 border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
