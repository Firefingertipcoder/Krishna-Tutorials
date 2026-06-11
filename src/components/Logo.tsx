import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = true }) => {
  const sizeMap = {
    sm: { width: 'w-10 h-10', text: 'text-sm' },
    md: { width: 'w-16 h-16', text: 'text-xl' },
    lg: { width: 'w-32 h-32', text: 'text-3xl' },
    xl: { width: 'w-48 h-48', text: 'text-4xl' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High-fidelity vector replica of the uploaded Krishna Tutorials Circular Logo */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeMap[size].width} shrink-0`}
      >
        {/* White solid circular background to match the sticker badge exactly */}
        <circle cx="250" cy="250" r="242" fill="white" stroke="none" />
        
        {/* Circular Outer Loop border in deep brand color */}
        <circle cx="250" cy="250" r="236" stroke="#003B65" strokeWidth="12" fill="none" />

        {/* Combined vector graphic representing growing dots and reaching trainee figure */}
        <g transform="translate(-48, 48) scale(0.85)" fill="#003B65">
          {/* Growing dots */}
          <circle cx="150" cy="290" r="6" />
          <circle cx="150.5" cy="265" r="7" />
          <circle cx="156" cy="240" r="8" />
          <circle cx="164" cy="215" r="9.5" />
          <circle cx="178" cy="190" r="11" />
          <circle cx="196" cy="165" r="13" />
          <circle cx="218" cy="142" r="15" />
          <circle cx="247" cy="122" r="18" />
          <circle cx="282" cy="104" r="22" />
          <circle cx="323" cy="90" r="26" />

          {/* Reaching figure */}
          <g transform="translate(-5, -25)">
            <circle cx="245" cy="200" r="20" />
            <path
              d="M245,218 
                 C245,230 205,285 190,320 
                 C180,310 200,260 230,240 
                 L225,325 
                 C212,380 203,400 203,420 
                 C213,420 220,380 245,335 
                 C258,350 268,380 273,405
                 C275,395 264,340 255,310 
                 C262,290 310,210 327,150 
                 C310,180 270,225 245,235 
                 Z"
            />
          </g>
        </g>

        {/* Text Area layout matched to the right half bounds */}
        <text
          x="192"
          y="232"
          fill="#003B65"
          fontFamily="Montserrat, var(--font-sans), sans-serif"
          fontWeight="900"
          fontSize="46"
          letterSpacing="-0.5"
        >
          Krishna
        </text>
        <text
          x="192"
          y="282"
          fill="#003B65"
          fontFamily="Montserrat, var(--font-sans), sans-serif"
          fontWeight="900"
          fontSize="46"
          letterSpacing="-0.5"
        >
          Tutorials
        </text>

        {/* Dividing Underline */}
        <line x1="180" y1="302" x2="438" y2="302" stroke="#003B65" strokeWidth="5.5" strokeLinecap="round" />

        {/* Tagline footer: Expect Great Things in gorgeous italic serif */}
        <text
          x="309"
          y="336"
          textAnchor="middle"
          fill="#003B65"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="21"
          letterSpacing="0.5"
        >
          Expect Great Things
        </text>
      </svg>

      {/* Main inline header title (optionally shown next to logo badge) */}
      {showTagline && (
        <div className="flex flex-col select-none">
          <span className="font-sans font-black tracking-tight text-xl md:text-2xl text-[#003B65]">
            Krishna <span className="font-semibold text-sky-600">Tutorials</span>
          </span>
          <span className="text-[10px] md:text-xs font-serif italic text-gray-500 font-bold tracking-wide">
            Expect Great Things ~ Since 2015
          </span>
        </div>
      )}
    </div>
  );
};
