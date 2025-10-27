import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRequired = formData.phone.trim().length === 0;
  const phoneRequired = formData.email.trim().length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usPhoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    if (!trimmedData.email && !trimmedData.phone) {
      toast({
        title: "Contact method required",
        description: "Please provide either an email or a phone number so we can reach you.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedData.email && !emailRegex.test(trimmedData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address (e.g., name@example.com).",
        variant: "destructive",
      });
      return;
    }

    if (trimmedData.phone && !usPhoneRegex.test(trimmedData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid US phone number (e.g., 123-456-7890)",
        variant: "destructive",
      });
      return;
    }

    if (trimmedData.message.length > 5000) {
      toast({
        title: "Message too long",
        description: "Please limit your message to 5000 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error ?? "Failed to send message. Please try again.");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send message right now.";
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };





  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal">
              <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
                Get in Touch
              </span>
              <h2 className="mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services or ready to start your next project?
                Reach out to us for a consultation or to discuss your renovation needs.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">612-849-9633</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">kolbasin.oleksandr@omniaconstructionmn.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Location</h3>
                    <p className="text-gray-600">
                      1155 Ford Rd<br />
                      Minneapolis, MN, 55426
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-base font-semibold mb-3">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Sunday</span>
                    <span className="font-medium">8:00 AM - 8:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: "100ms" }}>
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-subtle">
                <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-xs text-gray-400">(optional if phone provided)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={emailRequired}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-xs text-gray-400">(optional if email provided)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required={phoneRequired}
                      pattern="^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
                      title="Enter a valid US phone number (e.g., 123-456-7890)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                      placeholder="123-456-7890"
                    />
                    <p className="mt-2 text-xs text-gray-500">Provide at least one way for us to contact you.</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <span className={`text-xs ${formData.message.length > 5000 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                        {formData.message.length}/5000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={5000}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 rounded-lg flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
