import { Wrench, Clock, Check, User, PaintBucket, Settings, Hammer, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, className, delay }: ServiceCardProps) => (
  <div 
    className={cn(
      "bg-white rounded-2xl p-8 shadow-subtle card-hover reveal",
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="rounded-full bg-gray-50 w-12 h-12 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h2 className="mb-6">Transformative Services for Your Home</h2>
          <p className="text-gray-600 text-lg">
            We offer comprehensive solutions for home repairs, improvements, and maintenance, 
            executed with precision and care for exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Wrench className="h-6 w-6 text-gray-700" />}
            title="Handyman Services"
            description="Professional solutions for repairs, installations, and maintenance tasks throughout your home."
            delay={100}
          />
          
          <ServiceCard
            icon={<Home className="h-6 w-6 text-gray-700" />}
            title="Home Improvements"
            description="Quality upgrades and renovations that enhance your living space and increase property value."
            delay={200}
          />
          
          <ServiceCard
            icon={<PaintBucket className="h-6 w-6 text-gray-700" />}
            title="Custom Finishes"
            description="Premium painting and finishing touches that elevate your space with attention to detail."
            delay={300}
          />
          
          <ServiceCard
            icon={<User className="h-6 w-6 text-gray-700" />}
            title="Personalized Service"
            description="Collaborative approach that reflects your vision and lifestyle needs for every project we undertake."
            delay={400}
          />
          
          <ServiceCard
            icon={<Clock className="h-6 w-6 text-gray-700" />}
            title="Timely Completion"
            description="Efficient project management ensuring your improvements are completed on schedule."
            delay={500}
          />
          
          <ServiceCard
            icon={<Check className="h-6 w-6 text-gray-700" />}
            title="Quality Guarantee"
            description="Craftsmanship backed by our satisfaction guarantee and premium materials."
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
