import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './card';
import { Badge } from './badge';

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  mentorCount: number;
  color: string;
  slug: string;
}

interface ServiceCategoriesProps {
  categories: ServiceCategory[];
  onCategoryClick?: (category: ServiceCategory) => void;
  className?: string;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  categories,
  onCategoryClick,
  className = ""
}) => {
  const handleCategoryClick = (category: ServiceCategory) => {
    onCategoryClick?.(category);
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/search?category=${category.slug}`}
          onClick={() => handleCategoryClick(category)}
          className="group"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
            <CardContent className="p-6 text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {category.description}
              </p>
              <Badge variant="secondary" className="text-xs">
                {category.mentorCount.toLocaleString()} mentors
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

 