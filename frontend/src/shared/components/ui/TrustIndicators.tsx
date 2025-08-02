import React from 'react';
import { Shield, Clock, Star, Users, CheckCircle, Award } from 'lucide-react';

interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface TrustIndicatorsProps {
  indicators?: TrustIndicator[];
  className?: string;
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({
  indicators = defaultTrustIndicators,
  className = ""
}) => {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-8 ${className}`}>
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 text-sm"
        >
          <div 
            className="p-2 rounded-full"
            style={{ backgroundColor: `${indicator.color}20` }}
          >
            <indicator.icon 
              className="w-5 h-5" 
              style={{ color: indicator.color }}
            />
          </div>
          <div>
            <div className="font-medium text-foreground">
              {indicator.title}
            </div>
            <div className="text-muted-foreground text-xs">
              {indicator.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Default trust indicators
export const defaultTrustIndicators: TrustIndicator[] = [
  {
    icon: Shield,
    title: "Verified Mentors",
    description: "All mentors are verified",
    color: "#10B981"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always here to help",
    color: "#3B82F6"
  },
  {
    icon: Star,
    title: "4.9★ Average Rating",
    description: "From 50k+ sessions",
    color: "#F59E0B"
  },
  {
    icon: Users,
    title: "1000+ Expert Mentors",
    description: "Across all industries",
    color: "#8B5CF6"
  },
  {
    icon: CheckCircle,
    title: "Money Back Guarantee",
    description: "100% satisfaction",
    color: "#EF4444"
  },
  {
    icon: Award,
    title: "Top Rated Platform",
    description: "Trusted by thousands",
    color: "#06B6D4"
  }
];

// Compact version for smaller spaces
export const CompactTrustIndicators: React.FC<TrustIndicatorsProps> = ({
  indicators = defaultTrustIndicators.slice(0, 3),
  className = ""
}) => {
  return (
    <div className={`flex justify-center items-center gap-6 ${className}`}>
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 text-xs"
        >
          <indicator.icon 
            className="w-4 h-4" 
            style={{ color: indicator.color }}
          />
          <span className="font-medium text-foreground">
            {indicator.title}
          </span>
        </div>
      ))}
    </div>
  );
}; 