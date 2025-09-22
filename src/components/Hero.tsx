import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Home, Shirt, Sparkles, Heart, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-sparkle" />
            <span className="text-sm font-medium text-primary">Welcome to the fun zone!</span>
            <Sparkles className="h-6 w-6 text-primary animate-sparkle" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Rate Dorms. Rank Fits. Crown Winners.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the University of Houston&apos;s most fun dorm and fashion rating community! 
            Discover the best housing options and showcase your style with fellow Coogs!
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="group hover-lift hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto group-hover:bg-primary/20 transition-colors animate-float">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Dorm Wars 
                  <Zap className="h-5 w-5 text-primary animate-pulse" />
                </h3>
                <p className="text-muted-foreground mb-6">
                  Rate and review UH residence halls! Find your perfect dorm, 
                  see what students really think, and help others make the best choice. 
                  It&apos;s like Yelp but way more fun!
                </p>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary hover-scale" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.8/5 from 200+ reviews</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 btn-playful">
                    <Link href="/dorm-wars">Browse Dorms</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 btn-playful">
                    <Link href="/apply/dorm-wars">Apply to Feature</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover-lift hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto group-hover:bg-primary/20 transition-colors animate-float" style={{ animationDelay: '1s' }}>
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Fit Checks 
                  <Heart className="h-5 w-5 text-primary animate-pulse" />
                </h3>
                <p className="text-muted-foreground mb-6">
                  Showcase your style and rate campus fashion! Get inspired by 
                  fellow students&apos; outfits and share your own looks. 
                  Fashion is art, and you&apos;re the artist!
                </p>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary hover-scale" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.9/5 from 150+ fits</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 btn-playful">
                    <Link href="/fit-checks">Browse Fits</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 btn-playful">
                    <Link href="/apply/fit-checks">Submit a Fit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
