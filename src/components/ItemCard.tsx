import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Sparkles } from 'lucide-react';
import { Dorm, Fit } from '@/lib/types';
import { RatingControl } from '@/components/RatingControl';

interface ItemCardProps {
  item: Dorm | Fit;
  type: 'dorm' | 'fit';
}

export function ItemCard({ item, type }: ItemCardProps) {
  const isDorm = type === 'dorm';
  const dorm = isDorm ? (item as Dorm) : null;
  const fit = !isDorm ? (item as Fit) : null;

  return (
    <Card className="group hover-lift hover-glow overflow-hidden">
      <Link href={isDorm ? `/dorm-wars/${item.id}` : `/fit-checks/${item.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.photos[0]?.url || '/placeholder.jpg'}
            alt={item.photos[0]?.alt || (isDorm ? (item as Dorm).name : `@${(item as Fit).creator}`)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 hover-scale">
              {isDorm ? dorm?.type.replace('-', ' ') : 'Fit'}
            </Badge>
          </div>
          {item.rating.average >= 8 && (
            <div className="absolute top-3 left-3">
              <div className="flex items-center gap-1 bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                <Sparkles className="h-3 w-3" />
                HOT
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {isDorm ? dorm?.name : `@${fit?.creator}`}
              </h3>
              {isDorm && (
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {dorm?.addressOrArea}
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            {isDorm && dorm && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {dorm.roomTypes.join(', ')}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-primary text-primary hover-scale" />
                  <span className="font-medium">{item.rating.average.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">
                    ({item.rating.count}) {item.rating.average >= 8 ? 'Hot' : item.rating.average >= 6 ? 'Good' : 'OK'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {(isDorm ? dorm?.tags.slice(0, 2) : fit?.styleTags.slice(0, 2))?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs hover-scale">
                      {tag}
                    </Badge>
                  ))}
                  {(isDorm ? (dorm?.tags.length || 0) : (fit?.styleTags.length || 0)) > 2 && (
                    <Badge variant="outline" className="text-xs hover-scale">
                      +{(isDorm ? (dorm?.tags.length || 0) : (fit?.styleTags.length || 0)) - 2} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <RatingControl
                itemId={item.id}
                itemType={isDorm ? 'DORM' : 'FIT'}
                size="sm"
                showLabel={false}
                variant={isDorm ? 'stars' : 'hearts'}
              />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
