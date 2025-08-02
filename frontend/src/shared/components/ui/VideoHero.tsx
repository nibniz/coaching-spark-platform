import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './button';

interface VideoHeroProps {
  videoSrc: string;
  fallbackImage?: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  className?: string;
}

export const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  fallbackImage,
  title,
  subtitle,
  children,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.loop = true;
      video.playbackRate = 0.75; // Slightly slower for better effect
    }
  }, [isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={handleVideoLoad}
        muted={isMuted}
        loop
        playsInline
        autoPlay
      >
        <source src={videoSrc} type="video/mp4" />
        {fallbackImage && (
          <img src={fallbackImage} alt="Hero background" className="w-full h-full object-cover" />
        )}
      </video>

      {/* Video Controls */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={togglePlay}
          className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleMute}
          className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delay">
            {subtitle}
          </p>
          {children}
        </div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

// CSS for animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  
  .animate-fade-in-delay {
    animation: fade-in 1s ease-out 0.3s both;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 