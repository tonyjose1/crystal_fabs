'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'motion';
import BlueprintBackground from './BlueprintBackground';

// Data for our interactive hotspots
const hotspots = [
  {
    id: 1,
    name: 'Structural Frame',
    // Positioning and size relative to a 1920x1080 canvas
    style: { top: '27.7%', left: '26%', width: '10.4%', height: '13.8%' },
    image: '/images/products/item1.jpg',
    title: 'Precision Structural Frames',
    description: 'High-tensile steel frames engineered for maximum durability and load-bearing capacity.',
  },
  {
    id: 2,
    name: 'Decorative Panel',
    // Positioning and size relative to a 1920x1080 canvas
    style: { top: '46.3%', left: '74%', width: '5.2%', height: '25.9%' },
    image: '/images/products/item4.jpg',
    title: 'Custom Decorative Panels',
    description: 'Laser-cut decorative panels with custom patterns, available in a variety of finishes.',
  },
  {
    id: 3,
    name: 'Central Module',
    // Positioning and size relative to a 1920x1080 canvas
    style: { top: '23.1%', left: '44.8%', width: '10.4%', height: '9.2%' },
    image: '/images/products/item2.jpg',
    title: 'Complex Central Modules',
    description: 'Intricate, multi-part modules assembled with robotic precision welding.',
  },
];

export default function InteractiveBlueprint() {
  const [activeHotspot, setActiveHotspot] = useState<(typeof hotspots)[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable this interactive element on mobile for a better UX
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initial animation for blueprint lines
    // This will now work because the SVG is in the DOM
    animate(
      '#blueprint-container g#hotspot-1-shape path, #blueprint-container g#hotspot-1-shape rect, #blueprint-container g#hotspot-1-shape line, #blueprint-container g#hotspot-2-shape path, #blueprint-container g#hotspot-2-shape rect, #blueprint-container g#hotspot-2-shape line, #blueprint-container g#hotspot-3-shape path, #blueprint-container g#hotspot-3-shape rect, #blueprint-container g#hotspot-3-shape line',
      { pathLength: [0, 1], opacity: [0, 1] },
      { duration: 2, delay: stagger(0.3) }
    );
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-background text-text-primary">
        <Image
          src="/images/cover.jpg"
          alt="Crystal Fabs"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-20"
        />
        <div className="z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">Crystal Fabs</h1>
          <p className="text-lg md:text-xl">Your trusted partner for custom steel fabrication.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="blueprint-container" className="relative w-full h-screen overflow-hidden bg-[#0A2342]">
      {/* Background Blueprint SVG */}
      <BlueprintBackground className="absolute top-0 left-0 w-full h-full opacity-70" />

      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute border-2 border-cyan-400/50 hover:border-cyan-300 hover:bg-cyan-300/10 transition-all duration-300 cursor-pointer"
          style={hotspot.style}
          onMouseEnter={() => setActiveHotspot(hotspot)}
          onMouseLeave={() => setActiveHotspot(null)}
        />
      ))}

      {/* Revealed Content */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1/4 p-8 text-white">
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: activeHotspot?.id === hotspot.id ? 1 : 0 }}
          >
            <h2 className="text-5xl font-bold font-serif text-cyan-300 mb-4">{hotspot.title}</h2>
            <p className="text-xl text-cyan-100/80">{hotspot.description}</p>
          </div>
        ))}
         {!activeHotspot && (
          <div className="transition-opacity duration-500" style={{ opacity: activeHotspot ? 0 : 1 }}>
            <h2 className="text-5xl font-bold font-serif text-white mb-4">Engineering Excellence</h2>
            <p className="text-xl text-white/80">Hover over the blueprint sections to explore our capabilities.</p>
          </div>
        )}
      </div>


      {/* Revealed Image */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {hotspots.map((hotspot) => (
          <Image
            key={hotspot.id}
            src={hotspot.image}
            alt={hotspot.name}
            fill
            style={{
              objectFit: 'contain',
              opacity: activeHotspot?.id === hotspot.id ? 1 : 0,
              clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 50% 100%)',
            }}
            className="transition-opacity duration-500"
          />
        ))}
      </div>
    </div>
  );
}
