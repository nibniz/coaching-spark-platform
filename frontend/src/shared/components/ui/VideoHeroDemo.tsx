import React from 'react';
import { VideoHero } from './VideoHero';
import { SearchBar } from './SearchBar';
import { Button } from './button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoHeroDemoProps {
  searchSuggestions: any[];
  popularSearches: string[];
  onSearch: (query: string) => void;
}

export const VideoHeroDemo: React.FC<VideoHeroDemoProps> = ({
  searchSuggestions,
  popularSearches,
  onSearch
}) => {
  // You can replace this with your actual video URL
  const videoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
  
  // Fallback image if video doesn't load
  const fallbackImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  return (
    <VideoHero
      videoSrc={videoUrl}
      fallbackImage={fallbackImage}
      title="Find Your Perfect Mentor"
      subtitle="Connect with verified experts who can accelerate your growth"
    >
      {/* Search Bar Overlay */}
      <div className="mt-8">
        <SearchBar
          placeholder="What do you want to learn?"
          suggestions={searchSuggestions}
          popularSearches={popularSearches}
          onSearch={onSearch}
          className="mb-6"
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/mentors">
            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100">
              Browse All Mentors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/signup/mentor">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
              <Play className="mr-2 h-4 w-4" />
              Become a Mentor
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-8 pt-6 justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">1000+</div>
            <div className="text-sm text-white/80">Expert Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50k+</div>
            <div className="text-sm text-white/80">Sessions Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.9★</div>
            <div className="text-sm text-white/80">Average Rating</div>
          </div>
        </div>
      </div>
    </VideoHero>
  );
}; 