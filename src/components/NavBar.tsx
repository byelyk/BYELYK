'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-scale">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center hover-glow">
              <span className="text-primary-foreground font-bold text-sm">RM</span>
            </div>
            <span className="font-bold text-xl gradient-text">RATE MY</span>
            <span className="text-sm text-muted-foreground">BYELYK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dorm-wars" 
              className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
            >
              🏠 Dorm Wars
            </Link>
            <Link 
              href="/fit-checks" 
              className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
            >
              👗 Fit Checks
            </Link>
            <Link 
              href="/apply" 
              className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-1"
            >
              ✨ Apply
            </Link>
            <ThemeToggle />
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
                🏠 Dorm Wars
              </Link>
              <Link 
                href="/fit-checks" 
                className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                👗 Fit Checks
              </Link>
              <Link 
                href="/apply" 
                className="text-sm font-medium hover:text-primary transition-colors hover-scale flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ✨ Apply
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
