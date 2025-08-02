import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  searchMentors, 
  searchPrograms, 
  searchEvents, 
  getCategoryBySlug,
  getPopularSkills,
  categories,
  type Mentor,
  type Program,
  type Event,
  type Category
} from '@/shared/data/mockData';

interface SearchFilters {
  query: string;
  category?: string;
  role?: string;
  level?: string;
  type?: string;
  priceRange?: [number, number];
  rating?: number;
  isOnline?: boolean;
  isCertified?: boolean;
}

interface SearchResults {
  mentors: Mentor[];
  programs: Program[];
  events: Event[];
  totalResults: number;
  category?: Category;
  popularSkills: string[];
}

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('search') || '',
    category: searchParams.get('category') || undefined,
    role: searchParams.get('role') || undefined,
    level: searchParams.get('level') || undefined,
    type: searchParams.get('type') || undefined,
    priceRange: undefined,
    rating: undefined,
    isOnline: undefined,
    isCertified: undefined
  });

  // Get category from URL params
  const categorySlug = searchParams.get('category');
  const category = useMemo(() => 
    categorySlug ? getCategoryBySlug(categorySlug) : undefined, 
    [categorySlug]
  );

  // Search results
  const results = useMemo((): SearchResults => {
    const mentors = searchMentors(filters.query, filters.category, filters.role);
    const programs = searchPrograms(filters.query, filters.category, filters.level);
    const events = searchEvents(filters.query, filters.category, filters.type);

    // Apply additional filters
    let filteredMentors = mentors;
    let filteredPrograms = programs;
    let filteredEvents = events;

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredMentors = filteredMentors.filter(mentor => 
        mentor.price >= min && mentor.price <= max
      );
      filteredPrograms = filteredPrograms.filter(program => 
        program.price >= min && program.price <= max
      );
      filteredEvents = filteredEvents.filter(event => 
        event.price >= min && event.price <= max
      );
    }

    // Rating filter
    if (filters.rating) {
      filteredMentors = filteredMentors.filter(mentor => 
        mentor.rating >= filters.rating!
      );
      filteredPrograms = filteredPrograms.filter(program => 
        program.rating >= filters.rating!
      );
    }

    // Online filter
    if (filters.isOnline !== undefined) {
      filteredMentors = filteredMentors.filter(mentor => 
        mentor.isOnline === filters.isOnline
      );
      filteredEvents = filteredEvents.filter(event => 
        event.isOnline === filters.isOnline
      );
    }

    // Certified filter
    if (filters.isCertified !== undefined) {
      filteredMentors = filteredMentors.filter(mentor => 
        mentor.isCertified === filters.isCertified
      );
    }

    return {
      mentors: filteredMentors,
      programs: filteredPrograms,
      events: filteredEvents,
      totalResults: filteredMentors.length + filteredPrograms.length + filteredEvents.length,
      category,
      popularSkills: getPopularSkills(filters.category)
    };
  }, [filters, category]);

  // Update URL params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (filters.query) newParams.set('search', filters.query);
    if (filters.category) newParams.set('category', filters.category);
    if (filters.role) newParams.set('role', filters.role);
    if (filters.level) newParams.set('level', filters.level);
    if (filters.type) newParams.set('type', filters.type);
    
    setSearchParams(newParams, { replace: true });
  }, [filters, setSearchParams]);

  // Update filters from URL params
  useEffect(() => {
    setFilters({
      query: searchParams.get('search') || '',
      category: searchParams.get('category') || undefined,
      role: searchParams.get('role') || undefined,
      level: searchParams.get('level') || undefined,
      type: searchParams.get('type') || undefined,
      priceRange: undefined,
      rating: undefined,
      isOnline: undefined,
      isCertified: undefined
    });
  }, [searchParams]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: undefined,
      role: undefined,
      level: undefined,
      type: undefined,
      priceRange: undefined,
      rating: undefined,
      isOnline: undefined,
      isCertified: undefined
    });
  };

  const getFilterOptions = () => {
    const roles = Array.from(new Set(mentors.map(m => m.role)));
    const levels = Array.from(new Set(programs.map(p => p.level)));
    const types = Array.from(new Set(events.map(e => e.type)));
    const subcategories = category?.subcategories || [];

    return {
      roles,
      levels,
      types,
      subcategories,
      categories
    };
  };

  return {
    filters,
    results,
    updateFilters,
    clearFilters,
    getFilterOptions,
    category
  };
}; 