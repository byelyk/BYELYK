import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ApplicationForm } from '@/components/ApplicationForm';

export default function ApplyDormWarsPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Apply to Dorm Wars</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcase your residence hall and help other students find their perfect dorm. 
              Share what makes your living space special!
            </p>
          </div>

          <ApplicationForm section="dorm-wars" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
