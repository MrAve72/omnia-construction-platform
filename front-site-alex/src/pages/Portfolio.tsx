import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  challenge: string;
  solution: string;
  result: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Bathroom Remodel",
    category: "Home Improvement",
    description: "A complete transformation of an outdated bathroom into a sleek, modern space with clean lines and a minimalist aesthetic.",
    images: [
      "/portfolio/Bathroom remodel/1.jpg",
      "/portfolio/Bathroom remodel/2.jpg",
      "/portfolio/Bathroom remodel/3.jpg",
    ],
    challenge: "The children's bathroom was original to the house when the owners purchased it. They wanted to update it to create a more visually comfortable space with improved lighting.",
    solution: "We completely renovated the bathroom, replacing all fixtures and finishes with modern alternatives. The new design includes improved lighting solutions to brighten the space and create a welcoming atmosphere.",
    result: "The transformed bathroom now features a clean, bright design with contemporary fixtures and optimized lighting. The space is now visually appealing and functional for the family's needs."
  },
  {
    id: 2,
    title: "Tile Installation",
    category: "Home Improvement",
    description: "Professional tile installation with attention to detail and precision craftsmanship.",
    images: [
      "/portfolio/Tile Installation/1.mp4",
    ],
    challenge: "The homeowner wanted a bright, minimalist guest bathroom with durable, high-quality tile on both the floor and walls. Unfortunately, we didn't capture before footage, but the results speak for themselves.",
    solution: "We carefully selected premium tile materials and implemented professional installation techniques to create the clean, minimalist aesthetic the client desired for their guest bathroom.",
    result: "The finished guest bathroom features beautiful, durable tile surfaces on both the floors and walls, creating a bright, minimalist space that perfectly meets the client's vision."
  },
  {
    id: 3,
    title: "Vinyl Laminate Flooring",
    category: "Flooring",
    description: "Installation of premium vinyl laminate flooring that combines durability with aesthetic appeal.",
    images: [
      "/portfolio/Vinyl Laminate/1.jpg",
      "/portfolio/Vinyl Laminate/2.jpg",
    ],
    challenge: "The clients wanted an affordable, water-resistant flooring solution that would mimic the look of hardwood while offering better durability and easier maintenance.",
    solution: "We installed high-quality vinyl laminate flooring with a realistic wood grain appearance, ensuring precise installation for a seamless, professional finish.",
    result: "The new vinyl laminate flooring transformed the space with the warm, natural appearance of hardwood while providing superior resistance to moisture, scratches, and daily wear."
  },
  {
    id: 4,
    title: "Mud Room with Custom Bench",
    category: "Custom Work",
    description: "Creation of a functional mud room with custom bench and furniture for organized storage and seating.",
    images: [
      "/portfolio/Mud Room with custom bench and furniture/1.jpg",
    ],
    challenge: "The homeowners needed a practical entry space to manage outdoor gear, shoes, and everyday items in an organized and aesthetically pleasing way.",
    solution: "We designed and built a custom mud room solution featuring a bench with built-in storage, hooks for hanging items, and specialized compartments for shoes and accessories.",
    result: "The custom mud room provides efficient organization while adding attractive, functional space to the home. The bench offers convenient seating for removing shoes, and the entire system keeps everyday items neatly contained."
  },
  {
    id: 5,
    title: "Shelving Installation",
    category: "Custom Work",
    description: "Custom designed and installed shelving solutions that maximize storage and enhance room aesthetics.",
    images: [
      "/portfolio/Shelving/1.jpg",
      "/portfolio/Shelving/2.jpg",
    ],
    challenge: "A massage salon wanted to add display shelving to their space for product merchandising, essentially creating a retail showcase area for their bottled products.",
    solution: "We designed and created a unique tree-inspired shelving unit that grows organically from the floor, providing beautiful display space for the salon's retail products.",
    result: "The custom shelving installation serves as both a functional retail display and an artistic design element, enhancing the salon's space while effectively showcasing their products for sale."
  },
  {
    id: 6,
    title: "3D Effect Brick Wall",
    category: "Custom Work",
    description: "Creation of a unique 3D effect wall combining clean surfaces with exposed brick for a photography studio.",
    images: [
      "/portfolio/Custom wall/1.jpg",
      "/portfolio/Custom wall/2.jpg",
    ],
    challenge: "This photography studio wall originally had square moldings that needed to be removed. As a photographer, the client wanted a unique backdrop within their studio that would provide a distinctive setting for photoshoots.",
    solution: "After removing the square moldings and repairing the wall surface, we created a 3D effect feature wall that gives the impression of exposed brick emerging from beneath a clean white wall surface.",
    result: "The completed wall creates a dramatic visual effect where a standard white wall appears to reveal an underlying brick surface, providing the photographer with a unique, textured backdrop for their studio work."
  },
  {
    id: 7,
    title: "Wall Construction",
    category: "Home Improvement",
    description: "Professional wall building services to modify and enhance interior spaces.",
    images: [
      "/portfolio/Wall build/1.jpg",
      "/portfolio/Wall build/2.jpg",
      "/portfolio/Wall build/3.jpg",
      "/portfolio/Wall build/4.jpg",
      "/portfolio/Wall build/5.jpg",
    ],
    challenge: "A massage salon wanted to maximize their available space by adding more treatment rooms for client sessions, requiring additional interior walls to create separate spaces.",
    solution: "We designed and constructed a new interior wall system that effectively divided the existing space, creating additional treatment rooms while maintaining proper access and flow throughout the salon.",
    result: "The salon now has more treatment rooms available for client services, significantly increasing their capacity and potential revenue while making efficient use of their existing square footage."
  },
  {
    id: 8,
    title: "Engineering Laminate Flooring",
    category: "Flooring",
    description: "Installation of high-quality engineered laminate flooring for durability and beautiful aesthetics.",
    images: [
      "/portfolio/Engeneering laminate/1.jpg",
      "/portfolio/Engeneering laminate/2.jpg",
    ],
    challenge: "The clients desired the look of hardwood floors with improved durability, stability, and resistance to moisture and temperature changes.",
    solution: "We installed premium engineered laminate flooring, carefully preparing the subfloor and ensuring precise installation to prevent gaps, buckling, or other issues.",
    result: "The engineered laminate flooring provides the warm, natural appearance of hardwood with superior performance characteristics. The installation transformed the space with a beautiful, long-lasting floor that will maintain its appearance for years to come."
  },
  {
    id: 9,
    title: "Garage Improvement",
    category: "Home Improvement",
    description: "Comprehensive garage enhancement with practical upgrades and improved functionality.",
    images: [
      "/portfolio/Garage improvement/1.jpg",
      "/portfolio/Garage improvement/2.jpg",
      "/portfolio/Garage improvement/3.jpg",
      "/portfolio/Garage improvement/4.jpg",
    ],
    challenge: "A family with Tesla electric vehicles wanted to insulate their garage to reduce the impact of cold winter temperatures on their cars' batteries, while also creating a more finished, comfortable space.",
    solution: "We installed comprehensive insulation throughout the garage, then covered the walls with drywall to create a finished interior space that would better maintain temperature and add comfort to the environment.",
    result: "The renovated garage now provides better temperature regulation to protect the electric vehicles' batteries during cold Minnesota winters, while the finished walls create a more welcoming, comfortable space that extends the home's livable area."
  },
  {
    id: 10,
    title: "Rental Property Flooring Renovation",
    category: "Flooring",
    description: "Complete flooring replacement with subfloor repair for a rental property, creating a durable, low-maintenance solution.",
    images: [
      "/portfolio/Gluedown Laminate/1.jpg",
      "/portfolio/Gluedown Laminate/2.jpg",
      "/portfolio/Gluedown Laminate/3.jpg",
      "/portfolio/Gluedown Laminate/4.jpg",
      "/portfolio/Gluedown Laminate/5.jpg",
      "/portfolio/Gluedown Laminate/6.jpg",
    ],
    challenge: "The rental property owner wanted to replace the existing vinyl laminate flooring with a more durable option that would be easier to repair if damaged by tenants. Upon removing the old flooring, we discovered significant subfloor damage that needed addressing.",
    solution: "We repaired the damaged subfloor sections quickly and effectively, then installed high-quality glue-down laminate flooring, which offers superior durability and allows for sectional repairs if needed in the future.",
    result: "The rental property now features a beautiful, extremely durable floor with the added benefit of easy spot repairs if damaged, saving the owner potential future costs. The subfloor issues were completely resolved, providing a stable foundation for the new flooring system."
  },
  {
    id: 11,
    title: "Cabin Painting and Subfloor Repair",
    category: "Home Improvement",
    description: "Complete interior painting and subfloor repair services for a cabin renovation.",
    images: [
      "/portfolio/Cabin Painting and subfloor repair/1.jpg",
      "/portfolio/Cabin Painting and subfloor repair/2.jpg",
      "/portfolio/Cabin Painting and subfloor repair/3.jpg",
      "/portfolio/Cabin Painting and subfloor repair/4.jpg",
      "/portfolio/Cabin Painting and subfloor repair/5.jpg",
      "/portfolio/Cabin Painting and subfloor repair/6.jpg",
      "/portfolio/Cabin Painting and subfloor repair/7.jpg",
      "/portfolio/Cabin Painting and subfloor repair/8.jpg",
      "/portfolio/Cabin Painting and subfloor repair/9.jpg",
      "/portfolio/Cabin Painting and subfloor repair/10.jpg",
    ],
    challenge: "One of our regular clients has a lovely cabin located about 100 miles from Minneapolis. Over time, the subfloor had rotted due to the cabin's location, and the paint had become damaged and faded throughout the interior.",
    solution: "We traveled to the remote cabin and completed a comprehensive restoration in just one day, replacing damaged subfloor sections and applying fresh paint throughout the interior spaces.",
    result: "The cabin has been beautifully restored to its former charm, with solid, safe flooring and fresh paint that brightens and protects the interior surfaces, all completed efficiently in a single day's work."
  }
];

const Portfolio = () => {
  const [projectsList] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    // Handle animations on scroll
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
  }, [projectsList]);

  const openProjectDetails = (project: Project) => {
    const projectIndex = projectsList.findIndex(p => p.id === project.id);
    setSelectedProject(project);
    setCurrentProjectIndex(projectIndex);
    setCurrentImageIndex(0);
    handleImageLoadStart();
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageLoadStart = () => {
    setIsImageLoading(true);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
      handleImageLoadStart();
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
      handleImageLoadStart();
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen(!isFullScreen);
  };

  const nextProject = () => {
    if (currentProjectIndex !== null && currentProjectIndex < projectsList.length - 1) {
      const nextIndex = currentProjectIndex + 1;
      setSelectedProject(projectsList[nextIndex]);
      setCurrentProjectIndex(nextIndex);
      setCurrentImageIndex(0);
      handleImageLoadStart();
    }
  };

  const prevProject = () => {
    if (currentProjectIndex !== null && currentProjectIndex > 0) {
      const prevIndex = currentProjectIndex - 1;
      setSelectedProject(projectsList[prevIndex]);
      setCurrentProjectIndex(prevIndex);
      setCurrentImageIndex(0);
      handleImageLoadStart();
    }
  };

  // Добавим дополнительную логику для проверки, является ли текущий файл видео
  const isVideoFile = (path: string) => path.endsWith('.mp4');

  useEffect(() => {
    // Предзагружаем первые изображения проектов
    projectsList.forEach(project => {
      if (!isVideoFile(project.images[0])) {
        const img = new Image();
        img.src = project.images[0];
      }
    });
  }, [projectsList]);

  useEffect(() => {
    // Сбрасываем состояние загрузки при закрытии проекта
    if (!selectedProject) {
      setIsImageLoading(false);
    }
  }, [selectedProject]);

  // Автоматически сбрасываем состояние загрузки для видео после небольшой задержки
  useEffect(() => {
    if (selectedProject && isVideoFile(selectedProject.images[currentImageIndex])) {
      const timer = setTimeout(() => {
        setIsImageLoading(false);
      }, 1000); // Даем видео секунду на загрузку, если событие onLoadedData не сработает
      
      return () => clearTimeout(timer);
    }
  }, [selectedProject, currentImageIndex]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 reveal">
              <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
                Our Work
              </span>
              <h1 className="mb-6">Portfolio</h1>
              <p className="text-gray-600 text-lg">
                Explore our collection of completed projects that showcase our commitment to quality,
                craftsmanship, and attention to detail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsList.map((project, index) => (
                <div
                  key={project.id}
                  className="reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="group rounded-xl overflow-hidden shadow-subtle card-hover cursor-pointer"
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 flex items-center justify-center">
                      {isVideoFile(project.images[0]) ? (
                        <>
                          <video
                            src={project.images[0]}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 max-h-full max-w-full"
                            muted
                            loop
                            autoPlay
                            playsInline
                            onLoadedData={() => setIsImageLoading(false)}
                          ></video>
                          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Video
                          </div>
                        </>
                      ) : (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 max-h-full max-w-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 w-full p-6">
                          <span className="text-white/80 text-sm">{project.category}</span>
                          <h3 className="text-white text-xl font-medium mt-1">{project.title}</h3>
                        </div>
                      </div>
                      {project.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center z-10">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {project.images.length}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      <span className="text-sm font-medium text-gray-500">{project.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in" 
          onClick={closeProjectDetails}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-6 right-6 z-50 rounded-full bg-white/50 backdrop-blur-sm p-1 shadow-xl">
              <button
                onClick={closeProjectDetails}
                className="bg-white rounded-full p-3 shadow-lg text-gray-800 hover:text-red-600 hover:bg-gray-100 transition-colors border-2 border-gray-200 flex items-center justify-center"
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative h-[40vh] md:h-[50vh] bg-gray-100 flex items-center justify-center">
              {isVideoFile(selectedProject.images[currentImageIndex]) ? (
                <video 
                  src={selectedProject.images[currentImageIndex]} 
                  className="w-full h-full object-contain max-h-full max-w-full"
                  controls
                  autoPlay
                  loop
                  onLoadedData={handleImageLoad}
                  onLoadStart={handleImageLoadStart}
                ></video>
              ) : (
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.title}
                  className={`w-full h-full object-contain cursor-zoom-in max-h-full max-w-full ${isFullScreen ? 'fixed inset-0 z-[60] bg-black' : ''}`}
                  onClick={toggleFullScreen}
                  onLoad={handleImageLoad}
                />
              )}
              
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200/20 backdrop-blur-sm">
                  <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-subtle hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-subtle hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 items-center">
                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full mr-2">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </span>
                {selectedProject.images.length > 5 ? (
                  <>
                    {selectedProject.images.slice(
                      Math.max(0, currentImageIndex - 2),
                      Math.min(selectedProject.images.length, currentImageIndex + 3)
                    ).map((_, idx) => {
                      const imageIdx = Math.max(0, currentImageIndex - 2) + idx;
                      return (
                        <button
                          key={imageIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(imageIdx);
                          }}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            imageIdx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                          )}
                          aria-label={`Go to image ${imageIdx + 1}`}
                        />
                      );
                    })}
                    {currentImageIndex + 3 < selectedProject.images.length && (
                      <span className="text-white/80 text-xs">...</span>
                    )}
                  </>
                ) : (
                  selectedProject.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                      )}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))
                )}
              </div>
            </div>
            
            {/* Миниатюры изображений для быстрой навигации */}
            {selectedProject.images.length > 1 && (
              <div className="bg-gray-100 pt-3 pb-3 px-4 overflow-x-auto">
                <div className="flex space-x-2 min-w-max">
                  {selectedProject.images.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded border-2 overflow-hidden transition-all",
                        index === currentImageIndex 
                          ? "border-indigo-500 shadow-md" 
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      {image.endsWith('.mp4') ? (
                        <div className="relative h-full w-full bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      ) : (
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-8">
              <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-2">
                {selectedProject.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-600 mb-8">{selectedProject.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">The Challenge</h3>
                  <p className="text-gray-600">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Our Solution</h3>
                  <p className="text-gray-600">{selectedProject.solution}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">The Result</h3>
                  <p className="text-gray-600">{selectedProject.result}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <button 
                  onClick={prevProject}
                  disabled={currentProjectIndex === 0}
                  className={`flex items-center px-2 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
                    currentProjectIndex === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="hidden sm:inline">Previous Project</span>
                </button>
                
                <a href="/booking" className="bg-gray-900 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-colors text-sm md:text-base">
                  Book a Similar Project
                </a>
                
                <button 
                  onClick={nextProject}
                  disabled={currentProjectIndex === projectsList.length - 1}
                  className={`flex items-center px-2 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
                    currentProjectIndex === projectsList.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="hidden sm:inline">Next Project</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Overlay */}
      {selectedProject && isFullScreen && !selectedProject.images[currentImageIndex].endsWith('.mp4') && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={toggleFullScreen}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(false);
            }}
            className="absolute top-6 right-6 z-[70] bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            aria-label="Exit fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Название и категория проекта */}
          <div className="absolute top-6 left-6 z-[70] text-white">
            <h2 className="text-xl font-semibold">{selectedProject.title}</h2>
            <p className="text-white/70 text-sm">{selectedProject.category}</p>
          </div>
          
          {selectedProject.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/30 transition-colors"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/30 transition-colors"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 items-center">
            <span className="text-sm text-white bg-black/50 px-3 py-1 rounded-full mr-2">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </span>
            <div className="hidden md:flex space-x-2 items-center">
              {selectedProject.images.length > 5 ? (
                <>
                  {selectedProject.images.slice(
                    Math.max(0, currentImageIndex - 2),
                    Math.min(selectedProject.images.length, currentImageIndex + 3)
                  ).map((_, idx) => {
                    const imageIdx = Math.max(0, currentImageIndex - 2) + idx;
                    return (
                      <button
                        key={imageIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(imageIdx);
                        }}
                        className={cn(
                          "w-3 h-3 rounded-full transition-all",
                          imageIdx === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                        )}
                        aria-label={`Go to image ${imageIdx + 1}`}
                      />
                    );
                  })}
                  {currentImageIndex + 3 < selectedProject.images.length && (
                    <span className="text-white/80 text-xs">...</span>
                  )}
                </>
              ) : (
                selectedProject.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))
              )}
            </div>
          </div>
          
          <img 
            src={selectedProject.images[currentImageIndex]} 
            alt={selectedProject.title}
            className="max-w-[90%] max-h-[90vh] object-contain"
            onLoad={handleImageLoad}
          />
          
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="h-10 w-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}

      {/* Call-to-Action Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto reveal">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Inspired by our projects?</h2>
            <p className="text-indigo-600 font-medium mb-6">Click the button below</p>
            <p className="text-gray-600 text-lg mb-8">
              Your home deserves the same attention to detail and quality craftsmanship. 
              Let's transform your space into something beautiful and functional.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white">
              <Link to="/booking">
                I Want to Transform My Home Too
                {/* Другие варианты:
                  "I'd Love a Beautiful Project for My Home"
                  "My Home Deserves an Amazing Makeover"
                  "Let's Create a Beautiful Project for My Home"
                  "I Want to Beautify My Home Too"
                */}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;