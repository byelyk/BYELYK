'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Heart, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingControlProps {
  currentRating?: number;
  onRate: (rating: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'stars' | 'hearts' | 'thumbs';
}

export function RatingControl({ 
  currentRating = 0, 
  onRate, 
  disabled = false,
  size = 'md',
  showLabel = true,
  variant = 'stars'
}: RatingControlProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justRated, setJustRated] = useState(false);

  const handleRate = async (rating: number) => {
    if (disabled || isSubmitting) return;
    
    setIsSubmitting(true);
    setJustRated(true);
    try {
      await onRate(rating);
      // Show success feedback
      setTimeout(() => setJustRated(false), 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || currentRating;
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
      const texts = ['', '💔', '😔', '😐', '😊', '😍', '🥰', '😘', '💕', '💖', '💝'];
      return texts[rating] || '';
    } else if (variant === 'thumbs') {
      return rating > 5 ? '👍' : rating > 0 ? '👎' : '';
    } else {
      const texts = ['', '😴', '😐', '😕', '😔', '😊', '😄', '😃', '😍', '🤩', '🔥'];
      return texts[rating] || '';
    }
  };

  const Icon = getIcon();

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
              justRated && rating === currentRating && "animate-wiggle"
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
              'Rate this! ⭐'
            )}
          </p>
          {currentRating > 0 && (
            <p className="text-xs text-muted-foreground">
              Your rating: {getRatingText(currentRating)} {currentRating}/10
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
