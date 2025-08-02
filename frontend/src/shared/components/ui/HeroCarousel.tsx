import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Button } from './button';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  overlayColor?: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showIndicators = true,
  children,
  className = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className={`relative h-screen overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentSlideData.image})`,
          transform: isTransitioning ? 'scale(1.05)' : 'scale(1)'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 transition-colors duration-500"
        style={{ 
          backgroundColor: currentSlideData.overlayColor || 'rgba(0, 0, 0, 0.4)' 
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-500">
            {currentSlideData.title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 transition-all duration-500">
            {currentSlideData.subtitle}
          </p>
          {currentSlideData.description && (
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto transition-all duration-500">
              {currentSlideData.description}
            </p>
          )}
          {children}
          {currentSlideData.ctaText && currentSlideData.ctaLink && (
            <Button size="lg" className="mt-6">
              {currentSlideData.ctaText}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 transition-all duration-300"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 transition-all duration-300"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white text-black'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
              disabled={isTransitioning}
            >
              <Circle className="h-3 w-3" fill={index === currentSlide ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  );
};

// Default slides for coaching platform
export const defaultCarouselSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Find Your Perfect Mentor',
    subtitle: 'Connect with verified experts who can accelerate your growth',
    description: 'Join thousands of professionals who have transformed their careers with personalized mentoring.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'Start Your Journey',
    ctaLink: '/mentors',
    overlayColor: 'rgba(59, 130, 246, 0.3)'
  },
  {
    id: '2',
    title: 'Transform Your Wellness',
    subtitle: 'Expert health instructors, yoga programs, and wellness events',
    description: 'From yoga and mindfulness to nutrition and fitness, find the perfect wellness guidance for your journey.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'Explore Wellness',
    ctaLink: '/mentors?category=health-wellness',
    overlayColor: 'rgba(16, 185, 129, 0.3)'
  },
  {
    id: '3',
    title: 'Flexible & Convenient',
    subtitle: 'Schedule sessions that fit your busy lifestyle',
    description: 'Book sessions anytime, anywhere. Our platform works around your schedule, not the other way around.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'Book a Session',
    ctaLink: '/mentors',
    overlayColor: 'rgba(139, 92, 246, 0.3)'
  }
]; 