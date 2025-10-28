import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface BeforeAfterProject {
  id: number;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

// Before/After projects with Minnesota-focused SEO
const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: 1,
    title: "Bathroom Remodel Minneapolis",
    category: "Bathroom Renovation",
    beforeImage: "/gallery/Bathroom remodel/3.webp",
    afterImage: "/gallery/Bathroom remodel/1.webp",
    description: "Complete bathroom transformation in Minneapolis - from outdated fixtures to modern minimalist design with new vanity, tile work, and lighting."
  },
  {
    id: 2,
    title: "Engineered Laminate Flooring Twin Cities",
    category: "Flooring Installation",
    beforeImage: "/gallery/Engeneering laminate/2.webp",
    afterImage: "/gallery/Engeneering laminate/1.webp",
    description: "Professional installation of high-quality engineered laminate flooring for Twin Cities home - durable, beautiful, and long-lasting."
  },
  {
    id: 3,
    title: "Custom Wall Construction St. Paul",
    category: "Home Improvement",
    beforeImage: "/gallery/Wall build/5.webp",
    afterImage: "/gallery/Wall build/1.webp",
    description: "Expert wall construction services in St. Paul to modify and enhance interior spaces - quality craftsmanship and attention to detail."
  }
];

// Компонент слайдера для сравнения "до" и "после"
const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);
  const afterImageRef = useRef<HTMLImageElement>(null);
  const sliderHandleRef = useRef<HTMLDivElement>(null);

  // Функция для отслеживания загрузки изображений
  useEffect(() => {
    setImagesLoaded(false);
    
    const beforeImg = new Image();
    const afterImg = new Image();
    
    let beforeLoaded = false;
    let afterLoaded = false;
    
    beforeImg.onload = () => {
      beforeLoaded = true;
      if (afterLoaded) setImagesLoaded(true);
    };
    
    afterImg.onload = () => {
      afterLoaded = true;
      if (beforeLoaded) setImagesLoaded(true);
    };
    
    beforeImg.src = beforeImage;
    afterImg.src = afterImage;
    
    // Фолбэк на случай, если изображения не загрузятся
    const timeout = setTimeout(() => {
      if (!imagesLoaded) setImagesLoaded(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [beforeImage, afterImage]);

  const handleMouseDown = () => {
    if (!sliderContainerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sliderContainerRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      
      if (percent < 0) setSliderPosition(0);
      else if (percent > 100) setSliderPosition(100);
      else setSliderPosition(percent);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = () => {
    if (!sliderContainerRef.current) return;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = sliderContainerRef.current!.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const percent = (x / rect.width) * 100;

      if (percent < 0) setSliderPosition(0);
      else if (percent > 100) setSliderPosition(100);
      else setSliderPosition(percent);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Keyboard navigation support for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5; // Larger steps with Shift key

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - step));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + step));
        break;
      case 'Home':
        e.preventDefault();
        setSliderPosition(0);
        break;
      case 'End':
        e.preventDefault();
        setSliderPosition(100);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-md">
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse text-center">
            <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-gray-300"></div>
            <p className="text-sm text-gray-400">Loading comparison...</p>
          </div>
        </div>
      )}
      
      <div
        ref={sliderContainerRef}
        className="relative h-96 md:h-[32rem] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center"
        style={{ cursor: 'ew-resize', opacity: imagesLoaded ? 1 : 0.3 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% after image visible`}
      >
        {/* Изображение "до" (видно полностью) */}
        <div className="absolute inset-0 border border-gray-200 flex items-center justify-center bg-white">
          <img
            ref={beforeImageRef}
            src={beforeImage}
            alt={`Before ${activeProject.title} - Minneapolis home renovation`}
            className="w-full h-full object-contain max-h-full max-w-full p-2"
            loading="lazy"
            onLoad={() => console.log('Before image loaded')}
          />
        </div>
        
        {/* Изображение "после" (показывается частично) */}
        <div 
          className="absolute inset-0 overflow-hidden border border-gray-200 bg-white flex items-center justify-center" 
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            ref={afterImageRef}
            src={afterImage}
            alt={`After ${activeProject.title} - completed renovation by Omnia Construction Minnesota`}
            className="w-full h-full object-contain max-h-full max-w-full p-2"
            loading="lazy"
            style={{
              width: `${100 / (sliderPosition / 100)}%`,
              minWidth: '100%',
              maxWidth: '500%'
            }}
            onLoad={() => console.log('After image loaded')}
          />
        </div>
        
        {/* Вертикальный ползунок */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Круглая ручка ползунка */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-indigo-500 flex items-center justify-center">
            <div className="flex items-center justify-center">
              <ChevronRight className="h-4 w-4 text-indigo-600" />
              <ChevronRight className="h-4 w-4 text-indigo-600 -ml-3 transform -scale-x-100" />
            </div>
          </div>
        </div>
        
        {/* Метки "Before" и "After" */}
        <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">Before</div>
        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">After</div>
      </div>
      
      {/* Инструкции для пользователя */}
      <div className="text-center text-gray-600 text-xs mt-2">
        <span className="sr-only">Use arrow keys, or drag the slider to compare before and after images. Press Home for before, End for after.</span>
        <span aria-hidden="true">Drag the slider or use arrow keys to compare before and after</span>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const [activeProject, setActiveProject] = useState<BeforeAfterProject>(beforeAfterProjects[0]);
  const [projects] = useState<BeforeAfterProject[]>(beforeAfterProjects);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
            Before & After
          </span>
          <h2 className="mb-6">Showcasing Our Finest Work</h2>
          <p className="text-gray-600 text-lg">
            See the dramatic transformations with our before and after gallery. Slide the divider to 
            explore the difference our expert craftsmanship makes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto reveal">
          {/* Слайдер сравнения "до" и "после" */}
          <div className="lg:col-span-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <BeforeAfterSlider 
              beforeImage={activeProject.beforeImage} 
              afterImage={activeProject.afterImage} 
            />
          </div>
          
          {/* Информация о проекте и миниатюры */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <span className="text-sm text-indigo-600 font-medium">{activeProject.category}</span>
              <h3 className="text-xl font-semibold mb-3">{activeProject.title}</h3>
              <p className="text-gray-600">{activeProject.description}</p>
        </div>

            <h4 className="text-sm font-medium text-gray-700 mb-3">More Projects:</h4>
            
            {/* Миниатюры других проектов используют все проекты без фильтрации */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
              className={cn(
                    "relative rounded-lg overflow-hidden h-24 transition-all duration-200",
                    activeProject.id === project.id 
                      ? "ring-2 ring-indigo-500 transform scale-105" 
                      : "ring-1 ring-gray-200 hover:ring-indigo-300"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <img
                    src={project.afterImage}
                    alt={`${project.title} - Omnia Construction Minneapolis remodeling project`}
                    loading="lazy"
                    className="w-full h-full object-contain bg-white"
                  />
                  {activeProject.id === project.id && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16 reveal">
          <Button asChild variant="outline" className="rounded-full px-8 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
            <Link to="/portfolio" className="inline-flex items-center">
              View All Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
