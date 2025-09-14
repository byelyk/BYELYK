'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, Trophy, Medal, Award } from 'lucide-react';
import { Dorm, Fit } from '@/lib/types';

interface LeaderboardProps {
  items: (Dorm | Fit)[];
  type: 'dorm' | 'fit';
}

export function Leaderboard({ items, type }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState('all-time');

  // Sort items by rating (both tabs show same data for MVP)
  const sortedItems = [...items].sort((a, b) => b.rating.average - a.rating.average);
  const topItems = sortedItems.slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-medium text-muted-foreground w-5 text-center">
          {index + 1}
        </span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          {type === 'dorm' ? 'Dorm Wars' : 'Fit Checks'} Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-time">All-Time</TabsTrigger>
            <TabsTrigger value="this-week" disabled>
              This Week
              <Badge variant="secondary" className="ml-2 text-xs">
                Soon
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-time" className="space-y-2">
            {topItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No {type === 'dorm' ? 'dorms' : 'fits'} to display yet.
              </div>
            ) : (
              <div className="space-y-2">
                {topItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getRankIcon(index)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                          {type === 'dorm' ? (item as Dorm).name : `@${(item as Fit).creator}`}
                        </h4>
                        {type === 'dorm' && (
                          <p className="text-sm text-muted-foreground">
                            {(item as Dorm).addressOrArea}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">
                          {item.rating.average.toFixed(1)}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.rating.count} reviews
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="this-week">
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Weekly leaderboards coming soon!</p>
              <p className="text-sm">Track your weekly performance and compete with others.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
