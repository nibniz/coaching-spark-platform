import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'skill' | 'mentor' | 'category';
  count?: number;
}

interface SearchBarProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  popularSearches?: string[];
  onSearch?: (query: string) => void;
  className?: string;
  showSuggestions?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "What do you want to learn?",
  suggestions = [],
  popularSearches = [],
  onSearch,
  className = "",
  showSuggestions = true
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [query, suggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsFocused(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsFocused(false);
    setSelectedIndex(-1);
    onSearch?.(suggestion.text);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  const handlePopularSearchClick = (search: string) => {
    setQuery(search);
    onSearch?.(search);
  };

  const clearQuery = () => {
    setQuery('');
    setFilteredSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Delay to allow clicking on suggestions
              setTimeout(() => setIsFocused(false), 200);
            }}
            onKeyDown={handleKeyDown}
            className="pl-12 pr-12 h-14 text-lg border-2 focus:border-primary transition-colors"
          />
          {query && (
            <button
              onClick={clearQuery}
              className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <Button
          onClick={handleSearch}
          className="absolute right-2 top-2 h-10 px-6 font-semibold"
          disabled={!query.trim()}
        >
          Search
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {/* Search Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="p-4 border-b">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-between ${
                    index === selectedIndex ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Search className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">{suggestion.text}</span>
                  </div>
                  {suggestion.count && (
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {popularSearches.length > 0 && (
            <div className="p-4">
              <div className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-gray-600" />
                Popular searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(search)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors font-medium"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && filteredSuggestions.length === 0 && (
            <div className="p-4 text-center text-gray-600">
              <div className="text-sm">No suggestions found for "{query}"</div>
              <div className="text-xs mt-1">Try searching for something else</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 