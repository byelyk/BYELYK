'use client';

import { useState, useMemo } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FilterBar } from '@/components/FilterBar';
import { ItemCard } from '@/components/ItemCard';
import { Leaderboard } from '@/components/Leaderboard';
import { ApplyCTA } from '@/components/ApplyCTA';
import { getDorms, HALL_OPTIONS, TYPE_OPTIONS, TAG_OPTIONS } from '@/lib/data';

export default function DormWarsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHalls, setSelectedHalls] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredDorms = useMemo(() => {
    return getDorms({
      q: searchQuery,
      hall: selectedHalls.length > 0 ? selectedHalls : undefined,
      type: selectedTypes.length > 0 ? selectedTypes : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    });
  }, [searchQuery, selectedHalls, selectedTypes, selectedTags]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Dorm Wars</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rate and review University of Houston residence halls. Find your perfect dorm 
            and help others make the best housing choice.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters and Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold">Filter by Hall</h3>
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilters={selectedHalls}
                onFilterChange={setSelectedHalls}
                filterOptions={HALL_OPTIONS}
                filterLabel="Halls"
                placeholder="Search dorms..."
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Filter by Type</h3>
              <FilterBar
                searchQuery=""
                onSearchChange={() => {}}
                selectedFilters={selectedTypes}
                onFilterChange={setSelectedTypes}
                filterOptions={TYPE_OPTIONS}
                filterLabel="Types"
                placeholder=""
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Filter by Tags</h3>
              <FilterBar
                searchQuery=""
                onSearchChange={() => {}}
                selectedFilters={selectedTags}
                onFilterChange={setSelectedTags}
                filterOptions={TAG_OPTIONS}
                filterLabel="Tags"
                placeholder=""
              />
            </div>

            {/* Leaderboard */}
            <Leaderboard items={getDorms()} type="dorm" />
          </div>

          {/* Dorms Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredDorms.length} Dorm{filteredDorms.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredDorms.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No dorms found matching your criteria.
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedHalls([]);
                    setSelectedTypes([]);
                    setSelectedTags([]);
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDorms.map((dorm) => (
                  <ItemCard key={dorm.id} item={dorm} type="dorm" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Apply CTA */}
        <div className="mt-16">
          <ApplyCTA section="dorm-wars" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
