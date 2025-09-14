'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  filterOptions: string[];
  filterLabel: string;
  placeholder?: string;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedFilters,
  onFilterChange,
  filterOptions,
  filterLabel,
  placeholder = "Search..."
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {selectedFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedFilters.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{filterLabel}</h3>
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option}
                variant={selectedFilters.includes(option) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(option)}
                className="text-sm"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => toggleFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
