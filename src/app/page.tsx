import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Award, Trophy, Flame, Sparkles } from 'lucide-react';
import { getDorms, getFits } from '@/lib/data';

export default function Home() {
  // Get top-rated items for the homepage
  const topDorms = getDorms().slice(0, 3);
  const topFits = getFits().slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main>
        <Hero />
        
        {/* Recent Winners Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-primary animate-bounce-slow" />
                <h2 className="text-3xl font-bold gradient-text">Recent Winners</h2>
                <Trophy className="h-6 w-6 text-primary animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check out the highest-rated dorms and most stylish fits from our amazing community! 
                These legends are setting the bar high!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Top Dorms */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-5 w-5 text-primary animate-pulse" />
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    Top Dorms 
                    <Flame className="h-4 w-4 text-orange-500" />
                  </h3>
                </div>
                <div className="space-y-4">
                  {topDorms.map((dorm, index) => (
                    <Card key={dorm.id} className="hover-lift hover-glow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg hover-scale">
                              <span className="text-sm font-bold text-primary">
                                {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium">{dorm.name}</h4>
                              <p className="text-sm text-muted-foreground">{dorm.addressOrArea}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-primary text-primary hover-scale" />
                              <span className="font-medium">{dorm.rating.average.toFixed(1)}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {dorm.rating.count} reviews
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Top Fits */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-primary animate-pulse" />
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    Trending Fits 
                    <Sparkles className="h-4 w-4 text-pink-500" />
                  </h3>
                </div>
                <div className="space-y-4">
                  {topFits.map((fit, index) => (
                    <Card key={fit.id} className="hover-lift hover-glow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg hover-scale">
                              <span className="text-sm font-bold text-primary">
                                {index === 0 ? 'Top' : index === 1 ? '2nd' : '3rd'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium">@{fit.creator}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{fit.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-primary text-primary hover-scale" />
                              <span className="font-medium">{fit.rating.average.toFixed(1)}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {fit.rating.count} votes
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-2">We&apos;re Growing Fast!</h2>
              <p className="text-muted-foreground">Join thousands of students making UH life more fun!</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2 hover-scale">
                <div className="text-3xl font-bold text-primary animate-bounce-slow">200+</div>
                <div className="text-muted-foreground flex items-center justify-center gap-1">
                  Dorm Reviews
                </div>
              </div>
              <div className="space-y-2 hover-scale">
                <div className="text-3xl font-bold text-primary animate-bounce-slow" style={{ animationDelay: '0.5s' }}>150+</div>
                <div className="text-muted-foreground flex items-center justify-center gap-1">
                  Fit Submissions
                </div>
              </div>
              <div className="space-y-2 hover-scale">
                <div className="text-3xl font-bold text-primary animate-bounce-slow" style={{ animationDelay: '1s' }}>50+</div>
                <div className="text-muted-foreground flex items-center justify-center gap-1">
                  Featured Students
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}