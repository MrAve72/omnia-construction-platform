import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Расширенный список реальных отзывов клиентов с Thumbtack
const realReviews = [
  {
    name: "Karen R.",
    date: "2025-04-15",
    comment: "Alex and Serhii were amazing. Very professional, attentive to detail and very friendly. I had a wall and doorway removed to open up my main floor. It looks beautiful. I will definitely be hiring them again for other projects.",
    rating: 5
  },
  {
    name: "Claire O.",
    date: "2025-03-20",
    comment: "Alex and Serhii did an excellent job with our flooring project. They were on time, kept us informed, did quality work, cleaned up thoroughly—and were friendly throughout. Would definitely hire again.",
    rating: 5
  },
  {
    name: "Monica L.",
    date: "2025-02-12",
    comment: "Alex and Serhii were great to work with. I had a list of small tasks to get done (wall repair, shelving installation, and other small tasks) and the work was done with care and attention to detail. I will definitely hire them again!",
    rating: 5
  },
  {
    name: "David M.",
    date: "2025-01-08",
    comment: "Extremely pleased with the bathroom remodel. Serhii has amazing attention to detail and the final result far exceeded our expectations. His pricing was very fair and he completed the work on schedule.",
    rating: 5
  },
  {
    name: "Jessica T.",
    date: "2024-12-17",
    comment: "We had Serhii install new laminate flooring throughout our home. The quality of work is exceptional and he was very respectful of our home throughout the process. Highly recommend!",
    rating: 5
  },
  {
    name: "Robert K.",
    date: "2024-11-23",
    comment: "Serhii did a complete renovation of our kitchen. He was punctual, professional, and did outstanding work. We were especially impressed with his problem-solving skills when unexpected issues arose.",
    rating: 5
  },
  {
    name: "Sarah P.",
    date: "2024-10-05",
    comment: "I hired Omnia Construction for several small projects around my home. Serhii was very thorough and his work is of high quality. He's now my go-to handyman for any future projects.",
    rating: 5
  },
  {
    name: "Michael J.",
    date: "2024-09-14",
    comment: "Great experience working with Alex and Serhii. They built a custom storage solution for our garage and the results were perfect. Clean work, reasonable pricing, and excellent communication.",
    rating: 5
  },
  {
    name: "Allison W.",
    date: "2024-08-28",
    comment: "Omnia Construction installed our custom shelving and did minor wall repairs. The work was completed exactly as promised, and the finished product looks fantastic. Very pleased!",
    rating: 5
  },
  {
    name: "Thomas G.",
    date: "2024-07-19",
    comment: "Alex and Serhii installed new doors throughout our home. Their craftsmanship is outstanding and they paid close attention to every detail. The doors look and function perfectly.",
    rating: 5
  },
  {
    name: "Emily S.",
    date: "2024-06-22",
    comment: "We hired Omnia Construction for tile installation in our bathroom. Alex and Serhii were professional, meticulous, and the results were beautiful. We've already recommended them to friends.",
    rating: 5
  },
  {
    name: "Jennifer B.",
    date: "2024-05-11",
    comment: "Fantastic work on our basement finishing project. Serhii provided excellent suggestions throughout the process and the quality of his work is top-notch.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(realReviews.length / reviewsPerPage);
  
  // Получаем отзывы для текущей страницы
  const currentReviews = realReviews.slice(
    currentPage * reviewsPerPage, 
    (currentPage + 1) * reviewsPerPage
  );

  // Функция для форматирования даты в соответствии с локалью пользователя
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Определяем, русский ли язык у пользователя
      const isRussian = navigator.language.startsWith('ru');
      
      // Форматируем дату в соответствии с локалью
      if (isRussian) {
        return date.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    } catch (e) {
      // В случае ошибки возвращаем исходную строку
      return dateString;
    }
  };

  // Переход к следующей странице
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  // Переход к предыдущей странице
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Эффект для инициализации скрипта Thumbtack после монтирования компонента
  useEffect(() => {
    // Создаем и добавляем скрипт Thumbtack
    const script = document.createElement('script');
    script.src = "https://www.thumbtack.com/profile/widgets/scripts/?service_pk=512268969764429832&widget_id=review&type=star";
    script.async = true;
    
    // Добавляем скрипт только если его еще нет
    if (!document.querySelector('script[src*="thumbtack.com/profile/widgets/scripts"]')) {
      document.body.appendChild(script);
    }
    
    // Удаляем скрипт при размонтировании компонента
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
            Client Testimonials
          </span>
          <h2 className="mb-6">What Our Clients Say</h2>
          <p className="text-gray-600 text-lg">
            We take pride in our work and the satisfaction of our clients. See our 5-star rating from 32 verified reviews on Thumbtack.
          </p>
        </div>

        <div className="max-w-4xl mx-auto reveal">
          {/* Thumbtack Rating Card */}
          <div className="bg-white rounded-2xl p-8 shadow-subtle mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-0">
              <div className="flex flex-col items-start mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <img 
                    src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg" 
                    alt="Thumbtack" 
                    className="h-8 mr-3"
                  />
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <img 
                          key={index}
                          src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
                          alt="Star"
                          className="w-5 h-5"
                        />
                      ))}
                    </div>
                   <span className="text-gray-700 font-medium">15 reviews</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 ml-1">Alex Omnia Construction LLC</h3>
              </div>
              
              <a 
                href="https://www.thumbtack.com/mn/minneapolis/general-contractors/alex-omnia-construction-llc/service/512268969764429832" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full transition-colors"
              >
                View All Reviews
              </a>
            </div>
          </div>
          
          {/* Индикаторы страниц */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === index ? "bg-indigo-600 w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Отзывы с кнопками навигации */}
          <div className="relative">
            {/* Кнопка "Назад" */}
            <button 
              onClick={prevPage}
              className="absolute -left-4 md:-left-10 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Отзывы */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {currentReviews.map((review, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-subtle border border-gray-100 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-gray-500 text-xs">{formatDate(review.date)}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <img 
                          key={i}
                          src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg"
                          alt="Star"
                          className="w-4 h-4"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
            
            {/* Кнопка "Вперед" */}
            <button 
              onClick={nextPage}
              className="absolute -right-4 md:-right-10 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          
          {/* Информация о текущей странице */}
          <div className="text-center text-gray-500 text-sm mb-8">
            {navigator.language.startsWith('ru') ? `Страница ${currentPage + 1} из ${totalPages}` : `Page ${currentPage + 1} of ${totalPages}`}
          </div>
          
          {/* Скрытый виджет Thumbtack (для загрузки скрипта) */}
          <div className="hidden">
            <div className="widget" id="tt-review-widget-star">
              <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg" alt="Thumbtack" className="tt-logo" />
              <a target="_blank" href="https://www.thumbtack.com/mn/minneapolis/general-contractors/alex-omnia-construction-llc/service/512268969764429832">
                <div>Alex Omnia Construction LLC</div>
              </a>
              <div id="tt-dynamic">
                <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" alt="Star" />
                <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" alt="Star" />
                <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" alt="Star" />
                <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" alt="Star" />
                <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" alt="Star" />
                <span>15 reviews</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="https://www.thumbtack.com/mn/minneapolis/general-contractors/alex-omnia-construction-llc/service/512268969764429832" 
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-full transition-colors"
            >
              Read All Reviews on Thumbtack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
