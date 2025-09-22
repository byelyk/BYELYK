'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
// import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = null; // No authentication for now

  const handleSignOut = async () => {
    toast.success('Signed out successfully');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-scale">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center hover-glow">
              <span className="text-primary-foreground font-bold text-sm">RU</span>
            </div>
            <span className="font-bold text-xl gradient-text">RUMERED</span>
            <span className="text-sm text-muted-foreground">BYELYK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dorm-wars" 
              className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
            >
              Dorm Wars
            </Link>
            <Link 
              href="/fit-checks" 
              className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
            >
              Fit Checks
            </Link>
            <Link 
              href="/apply" 
              className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
            >
              Apply
            </Link>
            {((session as any)?.user as any)?.role === 'ADMIN' && (
              <Link 
                href="/admin" 
                className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
              >
                🔧 Admin
              </Link>
            )}
            <ThemeToggle />
            {session ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {(session as any)?.user?.name}
                    {((session as any)?.user as any)?.role === 'ADMIN' && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Admin
                      </span>
                    )}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/register">
                  <Button variant="outline" size="sm">Register</Button>
                </Link>
                <Link href={`https://app.stack-auth.com/authenticate?project_id=${process.env.NEXT_PUBLIC_STACK_PROJECT_ID}`}>
                  <Button size="sm">Sign In</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/dorm-wars" 
                className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dorm Wars
              </Link>
              <Link 
                href="/fit-checks" 
                className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Fit Checks
              </Link>
              <Link 
                href="/apply" 
                className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply
              </Link>
              {((session as any)?.user as any)?.role === 'ADMIN' && (
                <Link 
                  href="/admin" 
                  className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔧 Admin
                </Link>
              )}
              {session ? (
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{(session as any)?.user?.name}</span>
                    {((session as any)?.user as any)?.role === 'ADMIN' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Register</Button>
                  </Link>
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full">Sign In</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
