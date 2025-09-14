import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ApplicationForm } from '@/components/ApplicationForm';

export default function ApplyFitChecksPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Apply to Fit Checks</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcase your personal style and inspire others with your fashion choices. 
              Share your best outfits and styling tips!
            </p>
          </div>

          <ApplicationForm section="fit-checks" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
