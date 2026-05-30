import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-98',
          // Variants
          variant === 'primary' &&
            'bg-gradient-to-r from-bamboo-500 via-bamboo-600 to-bamboo-700 text-luxury-darker shadow-lg shadow-bamboo-950/20 hover:from-bamboo-400 hover:to-bamboo-600 hover:shadow-xl hover:shadow-bamboo-500/10 hover:scale-[1.02]',
          variant === 'secondary' &&
            'bg-luxury-light text-luxury-darker hover:bg-white hover:scale-[1.02] shadow-sm',
          variant === 'outline' &&
            'border border-bamboo-500/30 text-bamboo-400 hover:border-bamboo-400 hover:bg-bamboo-500/5 hover:text-bamboo-300',
          variant === 'glass' &&
            'glass-panel border border-white/5 text-luxury-light hover:bg-white/10 hover:border-white/10',
          // Sizes
          size === 'sm' && 'h-9 px-4 text-xs tracking-wider uppercase',
          size === 'md' && 'h-11 px-6 text-sm tracking-wide',
          size === 'lg' && 'h-14 px-8 text-base tracking-wide font-semibold',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
