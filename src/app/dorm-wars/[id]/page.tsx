'use client';

import { useState, useEffect } from 'react';
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
import { ArrowLeft, MapPin, Home, Star, CheckCircle, Loader2 } from 'lucide-react';
import { getDormById, getDorms, rateDorm } from '@/lib/data';
import { Dorm } from '@/lib/types';
import { track, ANALYTICS_EVENTS } from '@/lib/analytics';

interface DormDetailPageProps {
  params: {
    id: string;
  };
}

export default function DormDetailPage({ params }: DormDetailPageProps) {
  const [dorm, setDorm] = useState<Dorm | undefined>(undefined);
  const [userRating, setUserRating] = useState<number>(0);
  const [isRating, setIsRating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDorm = async () => {
      try {
        const dormData = await getDormById(params.id);
        if (!dormData) {
          notFound();
        }
        setDorm(dormData);
      } catch (error) {
        console.error('Error fetching dorm:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchDorm();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dorm details...</span>
        </div>
      </div>
    );
  }

  if (!dorm) {
    notFound();
  }

  const handleRate = async (rating: number) => {
    setIsRating(true);
    try {
      const newRating = rateDorm(dorm.id, rating);
      setDorm({ ...dorm, rating: newRating });
      setUserRating(rating);
      track(ANALYTICS_EVENTS.RATE_DORM, { dormId: dorm.id, rating });
    } catch (error) {
      console.error('Failed to rate dorm:', error);
    } finally {
      setIsRating(false);
    }
  };

  const [relatedDorms, setRelatedDorms] = useState<Dorm[]>([]);

  useEffect(() => {
    const fetchRelatedDorms = async () => {
      try {
        const allDorms = await getDorms();
        const related = allDorms
          .filter(d => d.id !== dorm.id && d.type === dorm.type)
          .slice(0, 3);
        setRelatedDorms(related);
      } catch (error) {
        console.error('Error fetching related dorms:', error);
      }
    };

    if (dorm) {
      fetchRelatedDorms();
    }
  }, [dorm]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dorm-wars">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dorm Wars
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{dorm.type.replace('-', ' ')}</Badge>
                <Badge variant="outline">{dorm.classEligibility.replace('-', ' ')}</Badge>
              </div>
              <h1 className="text-4xl font-bold">{dorm.name}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {dorm.addressOrArea}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-4">
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <Image
                  src={dorm.photos[0]?.url || '/placeholder.jpg'}
                  alt={dorm.photos[0]?.alt || dorm.name}
                  fill
                  className="object-cover"
                />
              </div>
              {dorm.photos.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dorm.photos.slice(1).map((photo, index) => (
                    <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src={photo.url}
                        alt={photo.alt || `${dorm.name} photo ${index + 2}`}
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
              <h2 className="text-2xl font-semibold">About {dorm.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{dorm.description}</p>
            </div>

            {/* Room Types */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Room Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dorm.roomTypes.map((roomType) => (
                    <Badge key={roomType} variant="outline">
                      {roomType}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {dorm.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {dorm.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {dorm.rating.average.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(dorm.rating.average / 2) 
                              ? 'fill-primary text-primary' 
                              : 'text-muted-foreground/30'
                          }`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {dorm.rating.count} review{dorm.rating.count !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Rate this dorm</h4>
                    <RatingControl
                      itemId={dorm.id}
                      itemType="DORM"
                      currentRating={userRating}
                      onRate={handleRate}
                      disabled={isRating}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply CTA */}
            <ApplyCTA section="dorm-wars" />

            {/* Related Dorms */}
            {relatedDorms.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Similar Dorms</h3>
                  <div className="space-y-3">
                    {relatedDorms.map((relatedDorm) => (
                      <Link
                        key={relatedDorm.id}
                        href={`/dorm-wars/${relatedDorm.id}`}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{relatedDorm.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {relatedDorm.addressOrArea}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs font-medium">
                              {relatedDorm.rating.average.toFixed(1)}
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
