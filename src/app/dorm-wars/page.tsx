'use client';

import { useState, useMemo, useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FilterBar } from '@/components/FilterBar';
import { ItemCard } from '@/components/ItemCard';
import { Leaderboard } from '@/components/Leaderboard';
import { ApplyCTA } from '@/components/ApplyCTA';
import { getDorms, BUILDING_OPTIONS, TYPE_OPTIONS, TAG_OPTIONS } from '@/lib/data';
import { Dorm } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function DormWarsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHalls, setSelectedHalls] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dorms, setDorms] = useState<Dorm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const allDorms = await getDorms();
        setDorms(allDorms);
      } catch (error) {
        console.error('Error fetching dorms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDorms();
  }, []);

  const filteredDorms = useMemo(() => {
    return dorms.filter(dorm => {
      const matchesSearch = !searchQuery || 
        dorm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dorm.description && dorm.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dorm.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesHalls = selectedHalls.length === 0 || selectedHalls.includes(dorm.name);
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(dorm.type);
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => dorm.tags.includes(tag));

      return matchesSearch && matchesHalls && matchesTypes && matchesTags;
    });
  }, [dorms, searchQuery, selectedHalls, selectedTypes, selectedTags]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dorms...</span>
        </div>
      </div>
    );
  }

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
                filterOptions={BUILDING_OPTIONS}
                filterLabel="Buildings"
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
            <Leaderboard items={dorms} type="dorm" />
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
