import React from 'react';

interface TotalLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'classic';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Authentic TotalEnergies and Classic Total Vector SVG Logos
 */
export const TotalLogo: React.FC<TotalLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  if (variant === 'classic') {
    // Classic TOTAL Logo (3 dynamic swooshes: Red, Blue, Orange + Bold TOTAL wordmark)
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className={size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular background */}
          <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          
          {/* Top Red Swoosh */}
          <path
            d="M 24 38 C 36 22, 64 22, 76 34 C 70 30, 48 28, 30 42 Z"
            fill="#E31837"
          />
          {/* Middle Blue Swoosh */}
          <path
            d="M 18 52 C 28 35, 72 34, 82 50 C 68 42, 38 43, 24 58 Z"
            fill="#005A9C"
          />
          {/* Bottom Orange/Yellow Swoosh */}
          <path
            d="M 22 66 C 35 52, 68 50, 78 62 C 64 56, 40 58, 28 72 Z"
            fill="#FF8200"
          />
        </svg>

          <div className="flex flex-col justify-center">
            <span className="font-black tracking-tight text-red-600 text-lg sm:text-xl leading-none">
              TOTAL
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#005A9C] uppercase leading-none mt-0.5">
              Energies
            </span>
          </div>
      </div>
    );
  }

  // Modern TotalEnergies Multi-Energy Ribbon Logo
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* TotalEnergies Continuous Energetic Multi-Color Ribbon Symbol */}
      <svg
        viewBox="0 0 140 100"
        className={
          size === 'sm'
            ? 'w-10 h-7'
            : size === 'lg'
            ? 'w-24 h-16'
            : 'w-16 h-11 sm:w-20 sm:h-13'
        }
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient 1: Red to Warm Orange */}
          <linearGradient id="teRedOrange" x1="15%" y1="10%" x2="85%" y2="40%">
            <stop offset="0%" stopColor="#ED0000" />
            <stop offset="50%" stopColor="#FF3300" />
            <stop offset="100%" stopColor="#FF7A00" />
          </linearGradient>

          {/* Gradient 2: Orange to Bright Yellow */}
          <linearGradient id="teOrangeYellow" x1="10%" y1="0%" x2="90%" y2="80%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="60%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FFD000" />
          </linearGradient>

          {/* Gradient 3: Yellow to Green */}
          <linearGradient id="teYellowGreen" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#FFD000" />
            <stop offset="40%" stopColor="#9BC638" />
            <stop offset="100%" stopColor="#00A859" />
          </linearGradient>

          {/* Gradient 4: Green to Cyan / Sky Blue */}
          <linearGradient id="teGreenCyan" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#00A859" />
            <stop offset="50%" stopColor="#00B2E3" />
            <stop offset="100%" stopColor="#0072CE" />
          </linearGradient>

          {/* Gradient 5: Blue to Purple / Indigo */}
          <linearGradient id="teBluePurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0072CE" />
            <stop offset="50%" stopColor="#1E429F" />
            <stop offset="100%" stopColor="#5E2750" />
          </linearGradient>

          {/* Gradient 6: Indigo to Red Loop */}
          <linearGradient id="tePurpleRed" x1="0%" y1="50%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="#5E2750" />
            <stop offset="60%" stopColor="#C8102E" />
            <stop offset="100%" stopColor="#ED0000" />
          </linearGradient>
        </defs>

        {/* Outer Ribbon Wave: Fluid T and E connection */}
        {/* Loop segment 1 - Red upper arch */}
        <path
          d="M 28 44 C 28 24, 46 12, 68 12 C 90 12, 108 24, 116 38 C 122 48, 122 62, 112 74 C 104 84, 90 88, 76 86 C 60 84, 48 74, 46 62 C 44 48, 56 36, 70 36 C 82 36, 92 44, 94 54"
          stroke="url(#teRedOrange)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Loop segment 2 - Orange to Yellow transition */}
        <path
          d="M 68 12 C 90 12, 108 24, 116 38 C 122 48, 122 62, 112 74"
          stroke="url(#teOrangeYellow)"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Loop segment 3 - Yellow to Green lower curve */}
        <path
          d="M 116 54 C 118 64, 112 74, 104 82 C 92 90, 76 90, 62 86 C 46 80, 36 68, 36 52"
          stroke="url(#teYellowGreen)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Loop segment 4 - Green to Sky Blue baseline wave */}
        <path
          d="M 88 86 C 74 90, 58 88, 44 80 C 30 72, 22 58, 24 42 C 26 28, 38 18, 54 18"
          stroke="url(#teGreenCyan)"
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Loop segment 5 - Blue to Purple internal return loop */}
        <path
          d="M 26 50 C 26 66, 38 80, 54 84 C 68 86, 82 82, 92 72 C 100 62, 100 50, 92 40 C 84 32, 72 32, 62 38"
          stroke="url(#teBluePurple)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Center Energetic Core Highlight */}
        <circle cx="70" cy="50" r="4.5" fill="#ED0000" />
      </svg>

      {/* Wordmark typography */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B1528] font-sans">
              Total
            </span>
            <span className="text-xl sm:text-2xl font-normal tracking-tight text-[#0072CE] font-sans ml-0.5">
              Energies
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">
            Ethiopia · Addis Ababa
          </span>
        </div>
      )}
    </div>
  );
};
