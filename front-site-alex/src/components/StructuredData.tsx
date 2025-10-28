import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type?: 'home' | 'portfolio' | 'contact' | 'booking' | 'about';
}

export const StructuredData = ({ type = 'home' }: StructuredDataProps) => {
  const location = useLocation();

  useEffect(() => {
    // LocalBusiness Schema for Omnia Construction (Minnesota)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "@id": "https://www.omniaconstructionmn.com/#organization",
      "name": "Omnia Construction LLC",
      "alternateName": "Omnia Construction",
      "description": "Licensed Minnesota contractor specializing in kitchen and bathroom remodeling in Minneapolis and St. Paul. 13 years experience, 279 completed projects.",
      "url": "https://www.omniaconstructionmn.com",
      "logo": "https://www.omniaconstructionmn.com/logo.jpg",
      "image": "https://www.omniaconstructionmn.com/logo.jpg",
      "telephone": "+1-612-849-9633",
      "email": "kolbasin.oleksandr@omniaconstructionmn.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1155 Ford Rd",
        "addressLocality": "Minneapolis",
        "addressRegion": "MN",
        "postalCode": "55426",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "44.9744207",
        "longitude": "-93.4084669"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Minneapolis",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        },
        {
          "@type": "City",
          "name": "St. Paul",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        },
        {
          "@type": "City",
          "name": "Bloomington",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        },
        {
          "@type": "City",
          "name": "Plymouth",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        },
        {
          "@type": "City",
          "name": "Minnetonka",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        },
        {
          "@type": "City",
          "name": "Edina",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        },
        {
          "@type": "City",
          "name": "Eden Prairie",
          "containedIn": {
            "@type": "State",
            "name": "Minnesota"
          }
        }
      ],
      "priceRange": "$$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "07:00",
          "closes": "19:00"
        }
      ],
      "paymentAccepted": "Cash, Credit Card, Check",
      "currenciesAccepted": "USD",
      "foundingDate": "2024",
      "slogan": "Transform Your Home with Expert Craftsmanship",
      "knowsAbout": [
        "Kitchen Remodeling",
        "Bathroom Remodeling",
        "Basement Finishing",
        "Home Additions",
        "General Contracting",
        "Cabinet Installation",
        "Countertop Installation",
        "Tile Work",
        "Flooring Installation",
        "Plumbing Fixtures"
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "44.9744207",
          "longitude": "-93.4084669"
        },
        "geoRadius": "48280"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "license",
          "recognizedBy": {
            "@type": "Organization",
            "name": "State of Minnesota"
          },
          "name": "Licensed Remodeler Contractor",
          "identifier": "CR807108"
        }
      ],
      "memberOf": [
        {
          "@type": "Organization",
          "name": "Better Business Bureau",
          "url": "https://www.bbb.org/us/mn/minneapolis/profile/residential-general-contractor/omnia-construction-llc-0704-1000076607"
        }
      ],
      "sameAs": [
        "https://www.thumbtack.com/mn/minneapolis/general-contractors/alex-remodeling-handyman/service/512268969764429832",
        "https://www.bbb.org/us/mn/minneapolis/profile/residential-general-contractor/omnia-construction-llc-0704-1000076607"
      ]
    };

    // Aggregate Rating from Thumbtack reviews
    const aggregateRatingSchema = {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Omnia Construction LLC"
      },
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "15",
      "reviewCount": "15"
    };

    // Service Schema for main services
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Home Remodeling",
      "provider": {
        "@type": "GeneralContractor",
        "name": "Omnia Construction LLC"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Remodeling Services",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Kitchen Remodeling",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Kitchen Remodeling",
                  "description": "Complete kitchen remodeling services including cabinet installation, countertops, backsplash, appliances, and flooring."
                },
                "priceRange": "$4,000 - $50,000"
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Bathroom Remodeling",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bathroom Remodeling",
                  "description": "Full bathroom remodeling including shower/tub replacement, vanity installation, tile work, and plumbing fixtures."
                },
                "priceRange": "$4,000 - $40,000"
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Basement Finishing",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Basement Finishing",
                  "description": "Professional basement finishing services to create additional living space in your home."
                },
                "priceRange": "$2,000 - $60,000"
              }
            ]
          }
        ]
      }
    };

    // Create script elements and inject into head
    const scripts = [
      { id: 'schema-local-business', data: localBusinessSchema },
      { id: 'schema-aggregate-rating', data: aggregateRatingSchema },
      { id: 'schema-services', data: servicesSchema }
    ];

    scripts.forEach(({ id, data }) => {
      // Remove existing script if present
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      scripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, [location.pathname, type]);

  // This component doesn't render anything visible
  return null;
};
