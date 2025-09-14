'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { RatingControl } from '@/components/RatingControl';
import { ApplyCTA } from '@/components/ApplyCTA';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, MapPin, Star, Shirt } from 'lucide-react';
import { getFitById, getFits, rateFit } from '@/lib/data';
import { Fit } from '@/lib/types';
import { track, ANALYTICS_EVENTS } from '@/lib/analytics';

interface FitDetailPageProps {
  params: {
    id: string;
  };
}

export default function FitDetailPage({ params }: FitDetailPageProps) {
  const [fit, setFit] = useState<Fit | undefined>(getFitById(params.id));
  const [userRating, setUserRating] = useState<number>(0);
  const [isRating, setIsRating] = useState(false);

  if (!fit) {
    notFound();
  }

  const handleRate = async (rating: number) => {
    setIsRating(true);
    try {
      const newRating = rateFit(fit.id, rating);
      setFit({ ...fit, rating: newRating });
      setUserRating(rating);
      track(ANALYTICS_EVENTS.RATE_FIT, { fitId: fit.id, rating });
    } catch (error) {
      console.error('Failed to rate fit:', error);
    } finally {
      setIsRating(false);
    }
  };

  const relatedFits = getFits()
    .filter(f => f.id !== fit.id && f.styleTags.some(tag => fit.styleTags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/fit-checks">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Fit Checks
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Fit Check</Badge>
                {fit.dorm && (
                  <Badge variant="outline">{fit.dorm}</Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold">@{fit.creator}</h1>
              <div className="flex items-center text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                {fit.creator}
                {fit.dorm && (
                  <>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    {fit.dorm}
                  </>
                )}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image
                  src={fit.photos[0]?.url || '/placeholder.jpg'}
                  alt={fit.photos[0]?.alt || `@${fit.creator} fit`}
                  fill
                  className="object-cover"
                />
              </div>
              {fit.photos.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {fit.photos.slice(1).map((photo, index) => (
                    <div key={index} className="aspect-[4/5] relative rounded-lg overflow-hidden">
                      <Image
                        src={photo.url}
                        alt={photo.alt || `@${fit.creator} fit photo ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About this fit</h2>
              <p className="text-muted-foreground leading-relaxed">{fit.description}</p>
            </div>

            {/* Style Tags */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shirt className="h-5 w-5" />
                  Style Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fit.styleTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {fit.rating.average.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(fit.rating.average / 2) 
                              ? 'fill-primary text-primary' 
                              : 'text-muted-foreground/30'
                          }`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {fit.rating.count} vote{fit.rating.count !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Rate this fit</h4>
                    <RatingControl
                      currentRating={userRating}
                      onRate={handleRate}
                      disabled={isRating}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply CTA */}
            <ApplyCTA section="fit-checks" />

            {/* Related Fits */}
            {relatedFits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Similar Fits</h3>
                  <div className="space-y-3">
                    {relatedFits.map((relatedFit) => (
                      <Link
                        key={relatedFit.id}
                        href={`/fit-checks/${relatedFit.id}`}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">@{relatedFit.creator}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {relatedFit.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs font-medium">
                              {relatedFit.rating.average.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
