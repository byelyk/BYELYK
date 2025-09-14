import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Shirt, ArrowRight } from 'lucide-react';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Apply to be Featured</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Want to be featured in our YouTube series? Choose which section you&apos;d like to apply for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Dorm Wars</h2>
                <p className="text-muted-foreground mb-6 text-center">
                  Showcase your residence hall and help other students find their perfect dorm. 
                  Share what makes your living space special!
                </p>
                <ul className="space-y-2 mb-8 text-sm text-muted-foreground">
                  <li>• Show off your dorm room setup</li>
                  <li>• Highlight unique amenities</li>
                  <li>• Share your living experience</li>
                  <li>• Help future students decide</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/apply/dorm-wars">
                    Apply to Dorm Wars
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Fit Checks</h2>
                <p className="text-muted-foreground mb-6 text-center">
                  Showcase your personal style and inspire others with your fashion choices. 
                  Share your best outfits and styling tips!
                </p>
                <ul className="space-y-2 mb-8 text-sm text-muted-foreground">
                  <li>• Show off your best outfits</li>
                  <li>• Share styling tips and tricks</li>
                  <li>• Inspire other students</li>
                  <li>• Build your fashion presence</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/apply/fit-checks">
                    Apply to Fit Checks
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">1. Apply</h4>
                <p>Fill out our application form with your details and photos.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">2. Review</h4>
                <p>We&apos;ll review your application and get back to you within a week.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">3. Feature</h4>
                <p>If selected, we&apos;ll work with you to create amazing content!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
