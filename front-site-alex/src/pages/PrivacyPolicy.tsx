import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const PrivacyPolicy = () => {
  // Set SEO meta tags for privacy policy page
  useSEO();

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
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-gray-600 mb-8">
               At Omnia Construction LLC, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website, OmniaConstruction.com, or use our services. By using our website and services, you agree to the terms outlined in this policy.
              </p>

              {/* Section 1: Information We Collect */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 ml-4 mb-4">
                  We may collect the following types of information from you:
                </p>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">a. Personal Information</h3>
                  <ul className="list-disc ml-6 text-gray-600 space-y-2">
                    <li>Contact details: Name, phone number, email address, and mailing address.</li>
                    <li>Payment information: Billing address and credit/debit card details (processed securely by third-party payment processors).</li>
                    <li>Project details: Information related to the services you request, such as address, type of work, and preferred dates.</li>
                  </ul>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">b. Non-Personal Information</h3>
                  <ul className="list-disc ml-6 text-gray-600 space-y-2">
                    <li>Device information: IP address, browser type, operating system, and device type.</li>
                    <li>Usage data: Pages visited, time spent on the website, and navigation patterns.</li>
                    <li>Cookies and similar technologies: Data collected through cookies to improve website functionality and user experience.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: How We Use Your Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 ml-4 mb-4">
                  We use the information we collect to:
                </p>
                
                <ul className="list-disc ml-8 text-gray-600 space-y-2">
                  <li>Provide and manage our construction and remodeling services.</li>
                  <li>Process and confirm bookings and payments.</li>
                  <li>Respond to inquiries and provide customer support.</li>
                  <li>Improve our website and customize user experiences.</li>
                  <li>Send promotional offers, updates, or service-related announcements (with your consent).</li>
                  <li>Comply with legal obligations or enforce our Terms of Service.</li>
                </ul>
              </div>

              {/* Section 3: Sharing Your Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Sharing Your Information</h2>
                <p className="text-gray-600 ml-4 mb-4">
                  We do not sell or rent your personal information. However, we may share your information with:
                </p>
                
                <ul className="list-disc ml-8 text-gray-600 space-y-2">
                  <li>Service providers: Third-party vendors who assist us with payment processing, email communications, website hosting, and analytics.</li>
                  <li>Legal authorities: When required to comply with applicable laws, regulations, or legal processes.</li>
                  <li>Business transfers: In case of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
                </ul>
              </div>

              {/* Section 4: Cookies and Tracking Technologies */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 ml-4 mb-4">
                 Omnia Construction LLC uses cookies and similar technologies to enhance your experience. These include:
                </p>
                
                <ul className="list-disc ml-8 text-gray-600 space-y-2">
                  <li>Essential cookies: Necessary for website functionality.</li>
                  <li>Performance cookies: To analyze website usage and improve functionality.</li>
                  <li>Advertising cookies: To deliver targeted advertisements based on your interests.</li>
                </ul>
                
                <p className="text-gray-600 ml-4 mt-4">
                  You can control cookie preferences through your browser settings. However, disabling cookies may limit certain functionalities of the website.
                </p>
              </div>

              {/* Section 5: Data Security */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-gray-600 ml-4">
                  We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 6: Your Privacy Rights */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Your Privacy Rights</h2>
                <p className="text-gray-600 ml-4 mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                
                <ul className="list-disc ml-8 text-gray-600 space-y-2">
                  <li>Access: Request a copy of your personal information.</li>
                  <li>Correction: Update or correct inaccuracies in your personal data.</li>
                  <li>Deletion: Request deletion of your personal information, subject to legal or contractual obligations.</li>
                  <li>Opt-out: Withdraw consent for receiving marketing communications.</li>
                </ul>
                
                <p className="text-gray-600 ml-4 mt-4">
                  To exercise these rights, please contact us via email at kolbasin.oleksandr@omniaconstructionmn.com.
                </p>
              </div>

              {/* Section 7: Third-Party Links */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Third-Party Links</h2>
                <p className="text-gray-600 ml-4">
                 Omnia Construction LLC may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. Please review their privacy policies before providing any personal information.
                </p>
              </div>

              {/* Section 8: Children's Privacy */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="text-gray-600 ml-4">
                  Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of such data, we will delete it promptly.
                </p>
              </div>

              {/* Section 9: Updates to Privacy Policy */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. Updates to This Privacy Policy</h2>
                <p className="text-gray-600 ml-4">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                </p>
              </div>

              {/* Section 10: Contact Us */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
                <p className="text-gray-600 ml-4 mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-4">
                  <address className="not-italic text-gray-600">
                   <p className="font-semibold">Omnia Construction LLC</p>
                    <p>1155 Ford Rd</p>
                    <p>Minneapolis, MN, 55426</p>
                    <p>Phone: 612-849-9633</p>
                    <p>Email: kolbasin.oleksandr@omniaconstructionmn.com</p>
                  </address>
                </div>
                
                <p className="text-gray-600 mt-6">
                 Your privacy is important to us. Thank you for trusting Omnia Construction LLC with your construction and remodeling service needs!
                </p>
                
                <p className="text-gray-500 mt-4 text-sm">
                  [Updated: May, 2025]
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;