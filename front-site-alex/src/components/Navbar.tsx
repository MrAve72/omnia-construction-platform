import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bodyScroll, setBodyScroll] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  // Функция для прокрутки к указанному разделу
  const scrollToSection = (sectionId: string) => {
    // Закрываем мобильное меню, если оно открыто
    setIsMobileMenuOpen(false);
    
    // Если мы не на главной странице, сначала перейдем на нее
    if (location.pathname !== '/') {
      // Установить флаг в localStorage, чтобы знать, к какому разделу прокрутить после перехода на главную
      localStorage.setItem('scrollToSection', sectionId);
      // Переходим на главную страницу программным способом
      navigate('/');
      return;
    }
    
    // Если мы уже на главной странице, прокрутим к нужному разделу
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Эффект для прокрутки к разделу после перехода на главную страницу
  useEffect(() => {
    if (location.pathname === '/') {
      const sectionId = localStorage.getItem('scrollToSection');
      if (sectionId) {
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
          localStorage.removeItem('scrollToSection');
        }, 500); // Даем время для загрузки страницы
      }
    }
  }, [location.pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const bodyScrollToggle = () => {
    setBodyScroll((prev) => !prev)
  }


  useEffect(() => {
    const body = document.querySelector('body')
    if (bodyScroll) {
      body.classList.add('no-scrol')
    } else {
      body.classList.remove('no-scrol')
    }
  }, [bodyScroll])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ",
        // isScrolled
        "bg-white/80 py-2.5"
        //  "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="relative flex items-center"
        >
          <div className="text-xl font-semibold tracking-tight flex items-center gap-1">
            <span className="text-foreground">Daryna</span>
            <span className="text-foreground/80 font-normal">Construction</span>
          </div>
          <span className="text-xs text-foreground/60 ml-3 border-l border-gray-300 pl-3">Family Owned & Operated</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm transition-all duration-300 hover:text-foreground smooth-transition relative py-1",
                isActive(link.href)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground/30 rounded-full" />
              )}
            </Link>
          ))}
          
          {/* Отдельные кнопки для Portfolio и Pricing */}
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="text-sm transition-all duration-300 hover:text-foreground smooth-transition relative py-1 text-muted-foreground bg-transparent border-none cursor-pointer"
          >
            Portfolio
          </button>
          
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-sm transition-all duration-300 hover:text-foreground smooth-transition relative py-1 text-muted-foreground bg-transparent border-none cursor-pointer"
          >
            Pricing
          </button>
          
          <Button asChild size="sm" className="ml-4 rounded-full px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white">
            <Link to="/booking">Book Expert Help</Link>
          </Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" onClick={bodyScrollToggle} />
          ) : (
            <Menu className="h-6 w-6 text-foreground" onClick={bodyScrollToggle} />
          )}
        </button>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 animate-fade-in">
            <nav className="flex flex-col items-center justify-center h-full space-y-8 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-lg font-medium transition-all duration-300 hover:text-foreground",
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Отдельные кнопки для Portfolio и Pricing в мобильном меню */}
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-lg font-medium transition-all duration-300 hover:text-foreground text-muted-foreground bg-transparent border-none cursor-pointer w-full text-center"
              >
                Portfolio
              </button>
              
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-lg font-medium transition-all duration-300 hover:text-foreground text-muted-foreground bg-transparent border-none cursor-pointer w-full text-center"
              >
                Pricing
              </button>
              
              <Button asChild size="lg" className="w-full mt-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white">
                <Link to="/booking">Book Expert Help</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
