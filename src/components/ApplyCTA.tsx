import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Shirt, ArrowRight } from 'lucide-react';

interface ApplyCTAProps {
  section: 'dorm-wars' | 'fit-checks';
  className?: string;
}

export function ApplyCTA({ section, className }: ApplyCTAProps) {
  const isDormWars = section === 'dorm-wars';
  
  return (
    <Card className={`bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
              {isDormWars ? (
                <Home className="h-6 w-6 text-primary" />
              ) : (
                <Shirt className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {isDormWars ? 'Want to be featured in Dorm Wars?' : 'Want to showcase your fit?'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isDormWars 
                  ? 'Apply to have your dorm featured in our YouTube series!'
                  : 'Submit your outfit and get featured in our style content!'
                }
              </p>
            </div>
          </div>
          
          <Button asChild className="flex items-center gap-2">
            <Link href={`/apply/${section}`}>
              {isDormWars ? 'Apply to Dorm Wars' : 'Submit a Fit'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
