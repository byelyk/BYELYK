'use client';

import { useState, useMemo, useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FilterBar } from '@/components/FilterBar';
import { ItemCard } from '@/components/ItemCard';
import { Leaderboard } from '@/components/Leaderboard';
import { ApplyCTA } from '@/components/ApplyCTA';
import { getFits, STYLE_TAG_OPTIONS } from '@/lib/data';
import { Fit } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function FitChecksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyleTags, setSelectedStyleTags] = useState<string[]>([]);
  const [fits, setFits] = useState<Fit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFits = async () => {
      try {
        const allFits = await getFits();
        setFits(allFits);
      } catch (error) {
        console.error('Error fetching fits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFits();
  }, []);

  const filteredFits = useMemo(() => {
    return fits.filter(fit => {
      const matchesSearch = !searchQuery || 
        fit.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fit.styleTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStyleTags = selectedStyleTags.length === 0 || 
        selectedStyleTags.some(tag => fit.styleTags.includes(tag));

      return matchesSearch && matchesStyleTags;
    });
  }, [fits, searchQuery, selectedStyleTags]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading fits...</span>
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
          <h1 className="text-4xl font-bold mb-4">Fit Checks</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcase your style and rate campus fashion. Get inspired by 
            fellow students&apos; outfits and share your own looks.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters and Leaderboard */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold">Filter by Style</h3>
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilters={selectedStyleTags}
                onFilterChange={setSelectedStyleTags}
                filterOptions={STYLE_TAG_OPTIONS}
                filterLabel="Style Tags"
                placeholder="Search fits..."
              />
            </div>

            {/* Leaderboard */}
            <Leaderboard items={fits} type="fit" />
          </div>

          {/* Fits Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredFits.length} Fit{filteredFits.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredFits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No fits found matching your criteria.
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStyleTags([]);
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFits.map((fit) => (
                  <ItemCard key={fit.id} item={fit} type="fit" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Apply CTA */}
        <div className="mt-16">
          <ApplyCTA section="fit-checks" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
