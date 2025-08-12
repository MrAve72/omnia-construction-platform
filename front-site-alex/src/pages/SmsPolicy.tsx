import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SmsPolicy = () => {
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto reveal">
             <h1 className="text-2xl md:text-3xl font-bold mb-6">Omnia Construction LLC – SMS Consent Policy</h1>
              <p className="text-gray-600 mb-8">
               At Omnia Construction LLC, we value clear and respectful communication. By submitting your phone number through our website or during service inquiries, you agree to receive SMS messages in accordance with this policy.
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Purpose of SMS Communications</h2>
                  <p className="text-gray-600 mb-2">We may use SMS messaging to provide:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>
                      <strong>Appointment Reminders</strong> – Confirmations, rescheduling, and cancellations of service appointments.
                    </li>
                    <li>
                      <strong>Service Notifications</strong> – Updates on service status, estimated arrival times, or unexpected delays.
                    </li>
                    <li>
                      <strong>Promotional Messages</strong> – Occasional offers, seasonal promotions, new service announcements, or satisfaction surveys.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Message Frequency</h2>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Appointment and service notifications are sent as necessary to ensure timely updates.</li>
                    <li>Promotional content will not exceed 30 messages per month.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Consent to Receive Messages</h2>
                  <p className="text-gray-600">
                    By providing your phone number, you expressly consent to receive the above SMS communications. Consent is not a condition for purchasing any services from Omnia Construction LLC.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Opt-Out Instructions</h2>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>You may opt out of receiving text messages at any time by replying "STOP SMS" to any SMS from us.</li>
                    <li>After opting out, you will no longer receive any SMS from Omnia Construction LLC unless you opt in again.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Message & Data Rates</h2>
                  <p className="text-gray-600">
                    Standard message and data rates may apply based on your mobile plan. Please consult your mobile service provider for details.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Data Privacy and Protection</h2>
                  <p className="text-gray-600 mb-2">
                    We use your phone number solely for the purposes outlined in this policy.
                    We do not sell or share your personal data with third parties except:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>When required by law</li>
                    <li>When working with third-party messaging platforms under strict data confidentiality agreements</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Disclaimer of Liability</h2>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>
                      While we strive to ensure prompt message delivery, we cannot guarantee receipt of SMS messages due to factors outside our control (e.g., network issues or carrier disruptions).
                    </li>
                    <li>
                      We are not liable for damages or losses caused by delayed or undelivered messages.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Policy Updates</h2>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>This policy may be updated from time to time to reflect legal, operational, or service-related changes.</li>
                    <li>We encourage you to review it periodically on our website.</li>
                  </ul>
                </div>

                <p className="text-gray-600 font-medium">
                  By continuing to share your phone number and receive SMS, you confirm that you've read and understood this policy.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-8">
                  <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                  <address className="not-italic text-gray-600">
                    <p className="font-semibold">Omnia Construction LLC</p>
                    <p>1155 Ford Rd</p>
                    <p>Minneapolis, MN, 55426</p>
                    <p>Phone: (612) 849-9633</p>
                    <p>Email: kolbasin.oleksandr@omniaconstructionmn.com</p>
                    <p>Website: www.omniaconstruction.com</p>
                  </address>
                  <p className="text-gray-500 mt-4 text-sm">Last updated: May 2, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SmsPolicy; 