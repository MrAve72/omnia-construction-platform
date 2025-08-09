import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  // Handle animations on scroll
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.reveal');
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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <ContactForm />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 reveal">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common questions about our services, process, and policies.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid gap-6 reveal">
              {[
                {
                  question: "Do you provide free estimates?",
                  answer: "Yes, we provide free estimates for all projects. After an initial consultation, we'll assess your needs and provide a detailed quote that outlines all costs involved in your renovation or handyman service."
                },
                {
                  question: "Are you licensed and insured?",
                  answer: "Yes, we are fully licensed and insured. Our team of professionals holds all necessary certifications, and we maintain comprehensive insurance coverage to protect your property during the renovation process."
                },
                {
                  question: "What types of payment do you accept?",
                  answer: "We accept various payment methods including credit cards, checks, and electronic transfers. For larger projects, we typically structure payments in installments tied to project milestones."
                },
                {
                  question: "Do you offer warranties on your work?",
                  answer: "Yes, we stand behind our craftsmanship with a warranty on all work performed. Additionally, manufacturer warranties apply to products and materials installed during your renovation."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
