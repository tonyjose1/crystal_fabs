'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import InteractiveDots from './InteractiveDots';

export default function InteractiveDotsBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#F0EEE6');

  useEffect(() => {
    setMounted(true);
    // Direct color mapping to avoid timing issues with getComputedStyle during transitions
    const colors = {
      light: '#FFFFFF',
      dark: '#000000'
    };
    setBackgroundColor(resolvedTheme === 'dark' ? colors.dark : colors.light);
  }, [resolvedTheme, theme]);

  if (!mounted) {
    return null;
  }

  const dotColor = resolvedTheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 transition-colors duration-300 pointer-events-none">
      <InteractiveDots backgroundColor={backgroundColor} dotColor={dotColor} />
    </div>
  );
}
