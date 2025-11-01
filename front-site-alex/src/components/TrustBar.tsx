import { Shield, Star, FileCheck, Award, Briefcase } from "lucide-react";

const TrustBar = () => {
  const trustItems = [
    {
      icon: FileCheck,
      label: "MN License",
      value: "CR807108",
      href: "https://secure.dli.mn.gov/lookup/blisopenlicensedetail/0000030207070108"
    },
    {
      icon: Star,
      label: "Thumbtack",
      value: "5.0 Rating"
    },
    {
      icon: Shield,
      label: "Insured",
      value: "$2M Coverage"
    },
    {
      icon: Award,
      label: "BBB Rated",
      value: "A+ Rating"
    },
    {
      icon: Briefcase,
      label: "Projects",
      value: "279 Completed"
    }
  ];

  return (
    <section className="py-6 bg-white border-b border-gray-100 shadow-sm reveal">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 md:gap-8 lg:gap-12 px-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <div className="flex flex-col items-center min-w-[120px] md:min-w-[140px] group">
                  <div className="bg-purple-50 p-2.5 rounded-full mb-2 transition-all group-hover:bg-purple-100 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {item.label}
                  </span>
                  <span className="text-base md:text-lg font-bold text-gray-900">
                    {item.value}
                  </span>
                </div>
              );

              return item.href ? (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  {content}
                </a>
              ) : (
                <div key={index}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hide scrollbar on mobile but keep functionality */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TrustBar;
