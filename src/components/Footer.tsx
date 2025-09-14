import Link from 'next/link';
import { Youtube, Instagram, Music } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RM</span>
              </div>
              <span className="font-bold text-xl">RATE MY</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The University of Houston&apos;s most fun dorm and fashion rating community! 🎉
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Explore 🗺️</h3>
            <div className="space-y-2">
              <Link href="/dorm-wars" className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-scale">
                🏠 Dorm Wars
              </Link>
              <Link href="/fit-checks" className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-scale">
                👗 Fit Checks
              </Link>
              <Link href="/apply" className="block text-sm text-muted-foreground hover:text-foreground transition-colors hover-scale">
                ✨ Apply
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us 📱</h3>
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@BYELYK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/byelyk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@byelyk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover-scale"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal ⚖️</h3>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                This website is not affiliated with the University of Houston. 🤝
              </p>
              <p className="text-xs text-muted-foreground">
                All content is user-generated and for entertainment purposes. Have fun! 🎉
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Rate My by BYELYK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
