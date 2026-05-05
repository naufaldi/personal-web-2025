import { Moon, Sun } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'circle' 
  | 'circle-blur' 
  | 'gif'
  | 'polygon';

type StartPosition = 
  | 'center' 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right';

export interface ThemeToggleButtonProps {
  theme?: 'light' | 'dark';
  showLabel?: boolean;
  variant?: AnimationVariant;
  start?: StartPosition;
  url?: string;
  className?: string;
  onClick?: () => void;
}

const positions: Record<StartPosition, string> = {
  center: 'center',
  'top-left': 'top left',
  'top-right': 'top right',
  'bottom-left': 'bottom left',
  'bottom-right': 'bottom right',
};

const coordinateForStart = (
  start: StartPosition,
  axis: 'x' | 'y',
): string => {
  if (start === 'center') {
    return '50';
  }

  if (axis === 'x') {
    return start.includes('left') ? '0' : '100';
  }

  return start.includes('top') ? '0' : '100';
};

const createCircleTransitionCss = (
  start: StartPosition,
  blur = false,
): string => {
  const cx = coordinateForStart(start, 'x');
  const cy = coordinateForStart(start, 'y');
  const animationName = blur ? 'circle-blur-expand' : 'circle-expand';
  const duration = blur ? '0.5s' : '0.4s';
  const blurFrom = blur ? 'filter: blur(4px);' : '';
  const blurTo = blur ? 'filter: blur(0);' : '';
  const filter = blur ? 'filter: blur(0);' : '';

  return `
    @supports (view-transition-name: root) {
      ::view-transition-old(root) { 
        animation: none;
      }
      ::view-transition-new(root) {
        animation: ${animationName} ${duration} ease-out;
        transform-origin: ${positions[start]};
        ${filter}
      }
      @keyframes ${animationName} {
        from {
          clip-path: circle(0% at ${cx}% ${cy}%);
          ${blurFrom}
        }
        to {
          clip-path: circle(150% at ${cx}% ${cy}%);
          ${blurTo}
        }
      }
    }
  `;
};

const createGifTransitionCss = (url: string): string => `
  @supports (view-transition-name: root) {
    ::view-transition-old(root) {
      animation: fade-out 0.4s ease-out;
    }
    ::view-transition-new(root) {
      animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
      mask-image: url('${url}');
      mask-size: 0%;
      mask-repeat: no-repeat;
      mask-position: center;
    }
    @keyframes fade-out {
      to {
        opacity: 0;
      }
    }
    @keyframes gif-reveal {
      0% {
        mask-size: 0%;
      }
      20% {
        mask-size: 35%;
      }
      60% {
        mask-size: 35%;
      }
      100% {
        mask-size: 300%;
      }
    }
  }
`;

const createPolygonTransitionCss = (theme: ThemeToggleButtonProps['theme']): string => `
  @supports (view-transition-name: root) {
    ::view-transition-old(root) {
      animation: none;
    }
    ::view-transition-new(root) {
      animation: ${theme === 'light' ? 'wipe-in-dark' : 'wipe-in-light'} 1.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes wipe-in-dark {
      from {
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
      }
      to {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
    @keyframes wipe-in-light {
      from {
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
      }
      to {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
  }
`;

const createTransitionCss = ({
  variant,
  start,
  url,
  theme,
}: Pick<ThemeToggleButtonProps, 'variant' | 'start' | 'url' | 'theme'>): string => {
  switch (variant) {
    case 'circle':
      return createCircleTransitionCss(start ?? 'center');
    case 'circle-blur':
      return createCircleTransitionCss(start ?? 'center', true);
    case 'gif':
      return url ? createGifTransitionCss(url) : '';
    case 'polygon':
      return createPolygonTransitionCss(theme);
    default:
      return '';
  }
};

const appendTemporaryStyle = (css: string): void => {
  if (!css) {
    return;
  }

  const styleId = `theme-transition-${Date.now()}`;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);

  window.setTimeout(() => {
    document.getElementById(styleId)?.remove();
  }, 3000);
};

export const ThemeToggleButton = ({
  theme = 'light',
  showLabel = false,
  variant = 'circle',
  start = 'center',
  url,
  className,
  onClick,
}: ThemeToggleButtonProps) => {
  
  const handleClick = useCallback(() => {
    appendTemporaryStyle(createTransitionCss({ variant, start, url, theme }));
    onClick?.();
  }, [onClick, variant, start, url, theme]);

  return (
    <Button
      variant="outline"
      size={showLabel ? 'default' : 'icon'}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden transition-all',
        showLabel && 'gap-2',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      {showLabel && (
        <span className="text-sm">
          {theme === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
    </Button>
  );
};

export const useThemeTransition = () => {
  const startTransition = useCallback((updateFn: () => void) => {
    if (document.startViewTransition) {
      document.startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);
  return { startTransition };
};
