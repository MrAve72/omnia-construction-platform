import { Link } from "react-router-dom";
import { Building2, Award, MapPin, Clock, Shield, Phone } from "lucide-react";

/**
 * Minnesota-focused SEO content section for homepage
 * 1000+ words optimized for Minneapolis/St. Paul keywords
 * Target keywords: kitchen remodeling Minneapolis, bathroom remodeling Minneapolis, Twin Cities contractor
 */
const MinnesotaContentSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main heading with primary keyword */}
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Licensed Kitchen & Bathroom Remodeling in Minneapolis, Minnesota
            </h2>
            <p className="text-xl text-gray-600">
              Transform your home with expert craftsmanship from Omnia Construction LLC
            </p>
          </div>

          {/* Introduction paragraph */}
          <div className="prose prose-lg max-w-none mb-12 reveal">
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to Omnia Construction LLC, your trusted partner for professional home remodeling services in Minneapolis, St. Paul, and throughout the Twin Cities metropolitan area. With over 13 years of experience and 279 completed projects spanning more than 60,000 square feet, we've earned our reputation as one of Minnesota's most reliable residential remodeling contractors. As a fully licensed Minnesota contractor (License CR807108) and Better Business Bureau accredited company, we bring quality craftsmanship and exceptional customer service to every project.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold">Licensed & Insured</h3>
              </div>
              <p className="text-gray-600 text-sm">
                MN License CR807108, BBB Accredited, $2M liability insurance for your peace of mind
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <Building2 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold">279 Projects</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Over 60,000 sq ft of completed work across Minneapolis and St. Paul metro
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold">5-Star Reviews</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Verified Thumbtack reviews with perfect 5.0 rating from satisfied customers
              </p>
            </div>
          </div>

          {/* Kitchen Remodeling section */}
          <div className="mb-12 reveal">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Kitchen Remodeling Services in Minneapolis & St. Paul
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your kitchen is the heart of your home, and our Minneapolis kitchen remodeling services are designed to transform it into a space that perfectly balances beauty and functionality. Whether you're looking for a complete kitchen renovation with layout changes or a focused update of cabinets and countertops, our experienced team handles every aspect of your kitchen remodel with precision and care.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our comprehensive kitchen remodeling services for Twin Cities homeowners include custom cabinet installation in styles ranging from traditional to modern farmhouse, professional countertop fabrication and installation using granite, quartz, and marble, beautiful backsplash tile work, hardwood and engineered flooring installation, and modern lighting design. We also handle all necessary electrical and plumbing updates to meet current Minnesota building codes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Kitchen Remodeling Pricing in Minneapolis:</strong> We believe in transparent pricing. Minor kitchen updates including cabinet refacing and countertop replacement typically start from $900. Mid-range kitchen renovations with new cabinets, countertops, and appliances generally range from $4,700 to $35,000. Full kitchen remodels with layout changes, custom cabinetry, and premium materials start from $35,000. <strong>Every project is unique</strong> - that's why we provide a free, detailed personalized estimate with no hidden costs or obligations.
            </p>
          </div>

          {/* Bathroom Remodeling section */}
          <div className="mb-12 reveal">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Bathroom Remodeling Excellence in the Twin Cities
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Transform your outdated bathroom into a modern retreat with our professional bathroom remodeling services. Serving Minneapolis, St. Paul, Bloomington, Edina, Plymouth, Minnetonka, and Eden Prairie, we specialize in creating beautiful, functional bathrooms that add value to your home while meeting your family's needs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our bathroom renovation expertise includes walk-in shower installations with frameless glass enclosures, tub-to-shower conversions for improved accessibility, custom vanity installation with modern fixtures, professional tile work for floors, walls, and shower surrounds, and accessibility modifications for aging-in-place. We handle everything from powder room updates to complete master bathroom transformations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Bathroom Remodeling Costs in St. Paul & Minneapolis:</strong> Basic bathroom updates including new fixtures and paint typically start from $3,900. Standard bathroom renovations with new tub/shower, vanity, and tile work generally range from $12,000 to $25,000. Luxury bathroom remodels with premium materials and custom features start from $25,000. <strong>Your exact cost depends on your specific needs and material choices</strong> - contact us for a free, detailed estimate that includes materials, labor, permits, and cleanup with no obligation.
            </p>
          </div>

          {/* Service areas section */}
          <div className="mb-12 reveal">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Serving the Entire Minneapolis-St. Paul Metro Area
            </h3>
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-6">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    30-Mile Service Radius from Minneapolis
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Based in Minneapolis at 1155 Ford Rd, we proudly serve homeowners throughout the Twin Cities metropolitan area. Our service area includes Minneapolis, St. Paul, Bloomington, Edina, Plymouth, Minnetonka, Eden Prairie, Burnsville, Apple Valley, Maple Grove, Brooklyn Park, Woodbury, Lakeville, Blaine, and surrounding communities within 30 miles of downtown Minneapolis.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Whether you're in the heart of Minneapolis, the historic neighborhoods of St. Paul, or the growing suburbs of the Twin Cities, Omnia Construction brings the same level of quality craftsmanship and professional service to every project. We understand Minnesota homes and the unique challenges of remodeling in our climate, from proper insulation and moisture control to working efficiently during our cold winters.
            </p>
          </div>

          {/* Why Choose Us section */}
          <div className="mb-12 reveal">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Why Minneapolis Homeowners Choose Omnia Construction
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h4 className="font-semibold mb-3 text-gray-900">Licensed & Fully Insured</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  As a licensed Minnesota contractor (CR807108), we maintain all required permits and carry $2 million in liability insurance. We're also BBB Accredited with an A+ rating, giving you confidence in our professionalism and commitment to quality.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h4 className="font-semibold mb-3 text-gray-900">Free Detailed Estimates</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No surprise costs or hidden fees. We provide free, detailed written estimates that break down materials, labor, and all project costs. Our competitive pricing reflects quality craftsmanship while respecting your budget - with no obligation to proceed.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h4 className="font-semibold mb-3 text-gray-900">Year-Round Availability</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Unlike some contractors who slow down in winter, we work year-round. Interior remodeling projects like kitchens and bathrooms can proceed efficiently even during Minnesota's coldest months, allowing you to enjoy your new space sooner.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h4 className="font-semibold mb-3 text-gray-900">Local Expertise</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With 13 years serving the Twin Cities, we understand local building codes, permit requirements, and the architectural styles common in Minneapolis and St. Paul neighborhoods. We're not a national franchise—we're your local remodeling experts.
                </p>
              </div>
            </div>
          </div>

          {/* Minnesota-specific considerations */}
          <div className="mb-12 reveal">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Minnesota Remodeling: What You Need to Know
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-semibold mb-3 text-gray-900 flex items-center">
                <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                Permits & Timeline
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most kitchen and bathroom remodeling projects in Minneapolis require permits from the city. We handle all permit applications and inspections, ensuring your project meets Minnesota building codes. Typical permit processing takes 2-3 weeks. Once permits are approved, most kitchen remodels take 6-12 weeks, while bathroom renovations typically require 4-8 weeks, depending on project scope.
              </p>

              <h4 className="font-semibold mb-3 text-gray-900 mt-6">
                Winter Remodeling in Minnesota
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Interior remodeling projects proceed smoothly year-round in Minnesota. We take extra precautions during winter months to maintain comfortable working temperatures, protect your home from drafts, and ensure materials are stored properly. Many homeowners prefer winter remodeling as contractors' schedules are often more flexible, and you can enjoy your new kitchen or bathroom for spring and summer entertaining.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl reveal">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Minneapolis Home?
            </h3>
            <p className="text-lg mb-6 text-indigo-50">
              Get your FREE, detailed personalized estimate - no obligation, no pressure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+16128499633"
                className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (612) 849-9633
              </a>
              <Link
                to="/booking"
                className="inline-flex items-center px-8 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-800 transition-colors"
              >
                Schedule Online Consultation
              </Link>
            </div>
            <p className="text-sm text-indigo-100 mt-4">
              Licensed Contractor • MN CR807108 • Serving Minneapolis, St. Paul & Twin Cities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinnesotaContentSection;
