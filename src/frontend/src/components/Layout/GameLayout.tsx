import { Outlet } from '@tanstack/react-router';
import { SiFacebook, SiX } from 'react-icons/si';

export default function GameLayout() {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'doom-battle-royale';

  return (
    <div className="min-h-screen bg-doom-darker text-foreground">
      <Outlet />
      
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-doom-darker/80 backdrop-blur-sm border-t border-doom-red/20 py-3 px-4 z-40">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="text-doom-muted">
            © {new Date().getFullYear()} Doom Battle Royale. Built with ❤️ using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-doom-orange hover:text-doom-red transition-colors font-semibold"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-doom-muted hover:text-doom-orange transition-colors">
              <SiX className="w-4 h-4" />
            </a>
            <a href="#" className="text-doom-muted hover:text-doom-orange transition-colors">
              <SiFacebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
