'use client';

import { useState, useEffect } from 'react';
// // import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Star, Heart, ThumbsUp, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';

interface RatingControlProps {
  itemId: string;
  itemType: 'DORM' | 'FIT';
  onRate?: (rating: number, aggregate?: { average: number; count: number }) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'stars' | 'hearts' | 'thumbs';
}

export function RatingControl({ 
  itemId,
  itemType,
  onRate, 
  disabled = false,
  size = 'md',
  showLabel = true,
  variant = 'stars'
}: RatingControlProps) {
  const session = null; // No authentication for now
  const status = 'unauthenticated';
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justRated, setJustRated] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Fetch user's current rating
  useEffect(() => {
    if ((session as any)?.user?.id) {
      fetch(`/api/votes?itemId=${itemId}&itemType=${itemType}`)
        .then(res => res.json())
        .then(data => {
          if (data.vote) {
            setUserRating(data.vote.score);
          }
        })
        .catch(console.error);
    }
  }, [itemId, itemType, (session as any)?.user?.id]);

  const handleRate = async (rating: number) => {
    if (disabled || isSubmitting || !(session as any)?.user?.id) return;
    
    setIsSubmitting(true);
    setJustRated(true);
    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          itemType,
          score: rating,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserRating(rating);
        onRate?.(rating, data?.rating);
        toast.success('Rating submitted!');
        // Show success feedback
        setTimeout(() => setJustRated(false), 1000);
      } else {
        toast.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Rating error:', error);
      toast.error('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || userRating;
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const getIcon = () => {
    switch (variant) {
      case 'hearts': return Heart;
      case 'thumbs': return ThumbsUp;
      default: return Star;
    }
  };

  const getRatingText = (rating: number) => {
    if (variant === 'hearts') {
      const texts = ['', 'Hate', 'Dislike', 'OK', 'Like', 'Love', 'Adore', 'Perfect', 'Amazing', 'Incredible', 'Perfect'];
      return texts[rating] || '';
    } else if (variant === 'thumbs') {
      return rating > 5 ? 'Like' : rating > 0 ? 'Dislike' : '';
    } else {
      const texts = ['', 'Terrible', 'Bad', 'Poor', 'OK', 'Good', 'Great', 'Excellent', 'Amazing', 'Outstanding', 'Perfect'];
      return texts[rating] || '';
    }
  };

  const Icon = getIcon();

  if (false) { // No loading state for now
    return (
      <div className="flex items-center justify-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <div
            key={rating}
            className={cn(
              "rounded animate-pulse bg-muted",
              sizeClasses[size]
            )}
          />
        ))}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1 opacity-50">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <div
              key={rating}
              className={cn(
                "rounded bg-muted",
                sizeClasses[size]
              )}
            />
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Sign in to rate this!
          </p>
          <Link href="/auth/signin">
            <Button size="sm" variant="outline">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <Button
            key={rating}
            variant="ghost"
            size="sm"
            className={cn(
              "p-1 h-auto hover:bg-transparent hover-scale",
              disabled && "opacity-50 cursor-not-allowed",
              justRated && rating === userRating && "animate-wiggle"
            )}
            onClick={() => handleRate(rating)}
            onMouseEnter={() => !disabled && setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={disabled || isSubmitting}
            aria-label={`Rate ${rating} out of 10`}
          >
            <Icon
              className={cn(
                sizeClasses[size],
                rating <= displayRating 
                  ? "fill-primary text-primary" 
                  : "text-muted-foreground/30",
                "transition-all duration-150 hover:scale-110"
              )}
            />
          </Button>
        ))}
      </div>
      
      {showLabel && (
        <div className="text-center">
          <p className="text-sm font-medium">
            {displayRating > 0 ? (
              <span className="flex items-center gap-1">
                {getRatingText(displayRating)} {displayRating}/10
              </span>
            ) : (
              'Rate this!'
            )}
          </p>
          {userRating > 0 && (
            <p className="text-xs text-muted-foreground">
              Your rating: {getRatingText(userRating)} {userRating}/10
            </p>
          )}
          {justRated && (
            <p className="text-xs text-primary animate-bounce-slow">
              Thanks for rating! 🎉
            </p>
          )}
        </div>
      )}
    </div>
  );
}
