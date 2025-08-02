import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { SearchBar } from '@/shared/components/ui/SearchBar';
import { Header } from '@/shared/components/layout/Header';
import { useSearch } from '@/shared/hooks/useSearch';
import { 
  Filter, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Heart,
  Activity,
  Leaf,
  X,
  CheckCircle,
  DollarSign,
  Globe,
  Award
} from 'lucide-react';
import { 
  WellnessInstructors, 
  YogaPrograms, 
  WellnessEvents
} from '@/shared/components/ui/WellnessFeatures';

const SearchPage = () => {
  const { filters, results, updateFilters, clearFilters, getFilterOptions, category } = useSearch();
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const { roles, levels, types, subcategories, categories } = getFilterOptions();

  const handleSearch = (query: string) => {
    updateFilters({ query });
  };

  const handleCategoryClick = (categorySlug: string) => {
    updateFilters({ category: categorySlug });
  };

  const handleRoleFilter = (role: string) => {
    updateFilters({ role: filters.role === role ? undefined : role });
  };

  const handleLevelFilter = (level: string) => {
    updateFilters({ level: filters.level === level ? undefined : level });
  };

  const handleTypeFilter = (type: string) => {
    updateFilters({ type: filters.type === type ? undefined : type });
  };

  const searchSuggestions = results.popularSkills.map((skill, index) => ({
    id: String(index + 1),
    text: skill,
    type: 'skill' as const,
    count: Math.floor(Math.random() * 100) + 50
  }));

  const popularSearches = results.popularSkills.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header showNavigation={true} />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-primary-glow/10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              {category && (
                <Badge variant="secondary" className="w-fit mx-auto">
                  {category.icon} {category.name}
                </Badge>
              )}
              <h1 className="text-3xl lg:text-5xl font-bold">
                {category ? `Find ${category.name} Experts` : 'Search for Mentors, Programs & Events'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {category ? category.description : 'Discover the perfect mentor, program, or event for your goals.'}
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              placeholder={category ? `Search ${category.name.toLowerCase()}...` : "Search for mentors, programs, or events..."}
              suggestions={searchSuggestions}
              popularSearches={popularSearches}
              onSearch={handleSearch}
              className="mb-8"
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{results.totalResults} results found</span>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                {(filters.category || filters.role || filters.level || filters.type) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      {showFilters && (
        <section className="py-6 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.category === cat.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <h3 className="font-semibold mb-3">Roles</h3>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleFilter(role)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.role === role
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <h3 className="font-semibold mb-3">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => handleLevelFilter(level)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.level === level
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-semibold mb-3">Event Type</h3>
                <div className="space-y-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeFilter(type)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filters.type === type
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({results.totalResults})</TabsTrigger>
              <TabsTrigger value="mentors">Mentors ({results.mentors.length})</TabsTrigger>
              <TabsTrigger value="programs">Programs ({results.programs.length})</TabsTrigger>
              <TabsTrigger value="events">Events ({results.events.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Mentors Section */}
              {results.mentors.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Mentors ({results.mentors.length})</h2>
                  <WellnessInstructors instructors={results.mentors} />
                </div>
              )}

              {/* Programs Section */}
              {results.programs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Programs ({results.programs.length})</h2>
                  <YogaPrograms programs={results.programs} />
                </div>
              )}

              {/* Events Section */}
              {results.events.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Events ({results.events.length})</h2>
                  <WellnessEvents events={results.events} />
                </div>
              )}

              {results.totalResults === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="mentors" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Mentors ({results.mentors.length})</h2>
                {results.mentors.length > 0 ? (
                  <WellnessInstructors instructors={results.mentors} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Programs ({results.programs.length})</h2>
                {results.programs.length > 0 ? (
                  <YogaPrograms programs={results.programs} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold mb-2">No programs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Events ({results.events.length})</h2>
                {results.events.length > 0 ? (
                  <WellnessEvents events={results.events} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎪</div>
                    <h3 className="text-xl font-semibold mb-2">No events found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default SearchPage; 