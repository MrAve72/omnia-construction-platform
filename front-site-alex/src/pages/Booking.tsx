import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_BOOKING_URL = "https://calendly.com/d/csnk-yhg-vxv";

const Booking = () => {
  // Set SEO meta tags for booking page
  useSEO();

  useEffect(() => {
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );
    let appended = false;

    if (!script) {
      script = document.createElement("script");
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
      appended = true;
    }

    return () => {
      if (appended && script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wider uppercase">
              Book A Consultation
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              Schedule With Our Team
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Pick a time that works for you. Once booked, you&apos;ll automatically receive confirmation details by email.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/40 border border-gray-100 p-4 md:p-8">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_BOOKING_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
