// This component renders the SVG blueprint directly into the DOM,
// allowing CSS and JS to target its internal elements for animation.
export default function BlueprintBackground({ className }: { className?: string }) {
    return (
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        className={className}
        style={{ backgroundColor: '#0A2342' }}
      >
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A3554" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3A5774" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
  
        <g stroke="#87CEEB" strokeWidth="2" fill="none" strokeOpacity="0.8">
          <rect x="400" y="200" width="1120" height="680" strokeWidth="4" stroke="#FFFFFF" />
          <circle cx="960" cy="540" r="150" />
          <circle cx="960" cy="540" r="100" strokeDasharray="10,5" />
  
          <g id="hotspot-1-shape">
            <rect x="500" y="300" width="200" height="150" />
            <line x1="500" y1="300" x2="400" y2="200" />
            <line x1="700" y1="450" x2="810" y2="540" />
          </g>
  
          <g id="hotspot-2-shape">
            <path d="M 1420 780 Q 1320 640, 1420 500" />
            <line x1="1420" y1="780" x2="1520" y2="880" />
            <line x1="1520" y1="880" x2="1520" y2="200" />
          </g>
  
          <g id="hotspot-3-shape">
            <rect x="860" y="250" width="200" height="100" rx="10" />
            <line x1="960" y1="250" x2="960" y2="390" />
          </g>
        </g>
  
        <g fill="#87CEEB" style={{ fontFamily: 'monospace', fontSize: '16px' }}>
          <text x="505" y="290">SECTION A-1</text>
          <text x="1330" y="490">COMPONENT C-3</text>
          <text x="890" y="240">MODULE B-2</text>
        </g>
      </svg>
    );
  }
  