import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface DoomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DoomButton = forwardRef<HTMLButtonElement, DoomButtonProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative px-8 py-4 font-black uppercase tracking-wider text-lg',
          'bg-doom-red text-white border-2 border-doom-orange',
          'clip-corners transition-all duration-200',
          'hover:bg-doom-orange hover:border-doom-red hover:scale-105',
          'active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          'shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,102,0,0.8)]',
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </button>
    );
  }
);

DoomButton.displayName = 'DoomButton';

export default DoomButton;
