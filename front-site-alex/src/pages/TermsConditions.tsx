import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const TermsConditions = () => {
  // Set SEO meta tags for terms and conditions page
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
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Terms and Conditions</h1>
              <p className="text-gray-600 mb-8">
               Welcome to Omnia Construction LLC ("Company", "we", "our", "us"). These Terms and Conditions ("Terms") govern your use of our services ("Services"). By engaging our Services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree to these Terms, you must refrain from using our Services.
              </p>

              {/* Section 1: Services */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Services</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">1.1 Scope of Services</h3>
                  <p className="text-gray-600 mb-2">We offer a range of handyman and light remodeling services, including but not limited to:</p>
                  
                  <ul className="list-disc ml-6 text-gray-600 space-y-1">
                    <li>General repairs</li>
                    <li>Drywall repair and installation</li>
                    <li>Appliance installation (excluding gas connections)</li>
                    <li>Light fixture and ceiling fan installation/replacement</li>
                    <li>Door lock installation and repair</li>
                    <li>Interior and exterior door installation and repair</li>
                    <li>Faucet repair and replacement</li>
                    <li>Toilet installation and minor repairs</li>
                    <li>TV mounting</li>
                    <li>Network cable installation and troubleshooting</li>
                    <li>General maintenance and punch list completion</li>
                    <li>Closet system installation</li>
                    <li>Smart home device setup (e.g. thermostats, doorbells, cameras)</li>
                    <li>Vinyl plank and engineered hardwood flooring installation</li>
                    <li>Interior painting (walls, ceilings, trim, doors)</li>
                    <li>Tile installation for floors and walls</li>
                    <li>Bathroom finishing (excluding plumbing relocations)</li>
                    <li>Baseboard, casing, and trim installation</li>
                    <li>Minor electrical fixture replacements (switches, outlets, lights – no panel work)</li>
                    <li>Furniture and cabinet assembly</li>
                    <li>Caulking and sealing</li>
                    <li>Demolition and haul-away of non-structural elements</li>
                    <li>Minor plumbing repairs (replacing faucets, traps, shutoffs – no drain or supply line rerouting)</li>
                  </ul>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">1.2 Service Requests</h3>
                  <p className="text-gray-600">
                    Customers may request services via our website, phone, or email. All requests are subject to availability and approval. We reserve the right to decline service requests at our sole discretion.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">1.3 Service Area</h3>
                  <p className="text-gray-600">
                    We provide services within a 50-60 mile radius of St. Louis Park, MN. Requests outside this area may incur additional travel fees or be declined.
                  </p>
                </div>
              </div>

              {/* Section 2: Quotations and Estimates */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Quotations and Estimates</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">2.1 Quotations</h3>
                  <p className="text-gray-600">
                    We will provide a written quotation based on the details provided by the customer. Quotations remain valid for 30 days from the issue date.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">2.2 Estimates</h3>
                  <p className="text-gray-600">
                    Estimates are based on initial customer-provided information and are subject to change upon further inspection or unforeseen circumstances. Customers will be notified of significant changes, and approval will be required before proceeding.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">2.3 Acceptance of Quotation</h3>
                  <p className="text-gray-600">
                    Acceptance of a quotation must be provided in writing. By accepting a quotation, the customer agrees to these Terms.
                  </p>
                </div>
              </div>

              {/* Section 3: Pricing and Payment */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Pricing and Payment</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">3.1 Pricing</h3>
                  <p className="text-gray-600">
                    Prices are outlined in the provided quotation or estimate. Prices are subject to adjustment based on the final scope of work or any additional tasks requested by the customer.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">3.2 Payment Terms</h3>
                  <p className="text-gray-600">
                    Payment is due immediately upon completion of the services, unless otherwise agreed in writing. We accept payment via cash, credit card, and bank/electronic transfer.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">3.3 Deposits</h3>
                  <ul className="list-disc ml-6 text-gray-600 space-y-2">
                    <li>A $100 deposit is required for projects under $1,000.</li>
                    <li>For projects totaling $1,000 or more, a 25% deposit is required prior to the project's start.</li>
                  </ul>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">3.4 Late Payments</h3>
                  <p className="text-gray-600">
                    Late payments will incur interest at a rate of 5% per month or $50, whichever is greater. We reserve the right to suspend or terminate services for unpaid invoices. The customer is liable for all legal fees and collection costs incurred in recovering unpaid amounts.
                  </p>
                </div>
              </div>

              {/* Section 4: Customer Obligations */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Customer Obligations</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">4.1 Access to Premises</h3>
                  <p className="text-gray-600">
                    Customers must ensure access to the premises at the agreed-upon time. Delays or failure to provide access may result in additional charges.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">4.2 Accurate Information</h3>
                  <p className="text-gray-600">
                    Customers are responsible for providing accurate and complete information regarding the work required. Misrepresentation may lead to additional charges or cancellation.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">4.3 Preparation of Work Area</h3>
                  <p className="text-gray-600">
                    Customers must prepare the work area by moving furniture and obstacles, unless otherwise agreed. If additional preparation is required by our staff, additional fees will apply.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">4.4 Permits and Compliance</h3>
                  <p className="text-gray-600">
                    Customers are responsible for obtaining permits and ensuring compliance with local regulations, unless explicitly agreed otherwise in writing.
                  </p>
                </div>
              </div>

              {/* Section 5: Warranties and Guarantees */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Warranties and Guarantees</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">5.1 Workmanship Guarantee</h3>
                  <p className="text-gray-600">
                    We guarantee our workmanship for 5 days from the completion date. Customers must notify us of any concerns prior to final payment. We will rectify workmanship issues at no additional cost.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">5.2 Exclusions</h3>
                  <p className="text-gray-600 mb-2">Our guarantee does not cover:</p>
                  <ul className="list-disc ml-6 text-gray-600 space-y-2">
                    <li>Damage caused by misuse, neglect, or unauthorized alterations</li>
                    <li>Work performed by third parties</li>
                    <li>Natural wear and tear</li>
                    <li>Pre-existing conditions or materials supplied by the customer</li>
                    <li>Issues beyond our control</li>
                  </ul>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">5.3 Warranty Claims</h3>
                  <p className="text-gray-600">
                    Claims must be submitted in writing within the warranty period. We will assess and address claims promptly.
                  </p>
                </div>
              </div>

              {/* Section 6: Liability */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Liability</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">6.1 Limitation of Liability</h3>
                  <p className="text-gray-600">
                    To the fullest extent permitted by law, our total liability for any claims arising from the Services is limited to the amount paid by the customer for those Services.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">6.2 Indemnification</h3>
                  <p className="text-gray-600 mb-2">
                    The customer agrees to indemnify, defend, and hold Omnia Construction LLC harmless from all claims, damages, and expenses arising from:
                  </p>
                  <ul className="list-disc ml-6 text-gray-600 space-y-2">
                    <li>The customer's breach of these Terms</li>
                    <li>Misuse of our Services</li>
                    <li>Negligence or misconduct by the customer or any third party on the customer's premises</li>
                  </ul>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">6.3 No Liability for Indirect Damages</h3>
                  <p className="text-gray-600">
                    We are not liable for any indirect, incidental, special, or consequential damages, including loss of use, loss of profits, or business interruption.
                  </p>
                </div>
              </div>

              {/* Section 7: Cancellation and Rescheduling */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Cancellation and Rescheduling</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">7.1 Cancellation by Customer</h3>
                  <p className="text-gray-600">
                    Customers may cancel or reschedule with at least 24 hours' notice. Cancellations made with less than 24 hours' notice will forfeit the deposit.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">7.2 Cancellation by Company</h3>
                  <p className="text-gray-600">
                    We reserve the right to cancel or reschedule services due to unforeseen circumstances, safety concerns, or other factors beyond our control. In such cases, we will offer alternative scheduling or refund any pre-paid amounts.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">7.3 Termination of Services</h3>
                  <p className="text-gray-600">
                    We may terminate services immediately if the customer breaches these Terms or engages in abusive, unsafe, or inappropriate behavior. Any outstanding amounts remain due.
                  </p>
                </div>
              </div>

              {/* Section 8: Privacy */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Privacy</h2>
                <p className="text-gray-600 ml-4">
                  We value your privacy. Please refer to our Privacy Policy for information on how we collect, use, and protect your data. By using our Services, you consent to this processing and confirm the accuracy of all data provided.
                </p>
              </div>

              {/* Section 9: Dispute Resolution */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. Dispute Resolution</h2>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">9.1 Governing Law</h3>
                  <p className="text-gray-600">
                    These Terms are governed by the laws of the State of Minnesota.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">9.2 Arbitration</h3>
                  <p className="text-gray-600">
                    Disputes arising under these Terms will be resolved through binding arbitration under the rules of the American Arbitration Association (AAA) in Hennepin County, Minnesota.
                  </p>
                </div>
                
                <div className="ml-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">9.3 Legal Fees</h3>
                  <p className="text-gray-600">
                    The prevailing party in any arbitration or litigation will be entitled to recover reasonable legal fees and costs.
                  </p>
                </div>
              </div>

              {/* Sections 10-12 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 ml-4 mb-6">
                  We may update or modify these Terms at any time. Changes will take effect immediately upon posting to our website. Continued use of our Services constitutes acceptance of the updated Terms.
                </p>
                
                <h2 className="text-xl font-semibold mb-4">11. Severability</h2>
                <p className="text-gray-600 ml-4 mb-6">
                  If any provision of these Terms is deemed unenforceable, the remaining provisions will continue in full force and effect.
                </p>
                
                <h2 className="text-xl font-semibold mb-4">12. Entire Agreement</h2>
                <p className="text-gray-600 ml-4">
                  These Terms represent the entire agreement between Omnia Construction LLC and the customer, superseding all prior communications or agreements.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">13. Contact Information</h2>
                <p className="text-gray-600 ml-4 mb-4">
                  For questions or concerns about these Terms, please contact us:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-4">
                  <address className="not-italic text-gray-600">
                    <p className="font-semibold">Omnia Construction LLC</p>
                    <p>1155 Ford Rd</p>
                    <p>Minneapolis, MN, 55426</p>
                    <p>Phone: 612-849-9633</p>
                    <p>Email: kolbasin.oleksandr@omniaconstructionmn.com</p>
                  </address>
                  <p className="text-gray-500 mt-4 text-sm">Last updated: May, 2025</p>
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

export default TermsConditions; 