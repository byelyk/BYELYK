import { AuthForm } from '@/components/AuthForm';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Sign in to rate dorms, vote on fits, and apply for features.
            </p>
            <p className="text-sm mt-2">
              New here? <a href="/auth/register" className="text-primary hover:underline">Create an account</a>
            </p>
          </div>
          
          <AuthForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
