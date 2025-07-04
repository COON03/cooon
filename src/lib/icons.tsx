import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  mood?: 'happy' | 'angry' | 'impatient';
}

const iconStyle = { imageRendering: 'pixelated' } as React.CSSProperties;

export const SwordIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M8 1L7 2V7L3 11V13H5V15H7V13H9V15H11V13H13V11L9 7V2L8 1Z" fill="#C0C0C0" />
    <path d="M8 2L9 3V7L8 8L7 7V3L8 2Z" fill="white" />
    <path d="M7 8H9L13 12H11L9 10H7L5 12H3L7 8Z" fill="#717171" />
    <path d="M7 13H9V15H7V13Z" fill="#A52A2A" />
  </svg>
);

export const EnhancedSwordIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M8 1L7 2V7L3 11V13H5V15H7V13H9V15H11V13H13V11L9 7V2L8 1Z" fill="#F7B500" />
        <path d="M8 2L9 3V7L8 8L7 7V3L8 2Z" fill="white" />
        <path d="M7 8H9L13 12H11L9 10H7L5 12H3L7 8Z" fill="#A47E00" />
        <path d="M7 13H9V15H7V13Z" fill="#8C0000" />
        <path d="M8 0L9 1L8 2L7 1L8 0Z" fill="white" />
    </svg>
);


export const AxeIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M6 6H10V15H6V6Z" fill="#A0522D" />
    <path d="M7 7H9V14H7V7Z" fill="#804000" />
    <path d="M4 1H12V7H4V1Z" fill="#C0C0C0" />
    <path d="M5 2H11V6H5V2Z" fill="#E0E0E0" />
    <path d="M4 1H5V2H4V1ZM11 1H12V2H11V1ZM4 6H5V7H4V6ZM11 6H12V7H11V6Z" fill="#A0A0A0" />
  </svg>
);

export const EnhancedAxeIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M6 6H10V15H6V6Z" fill="#A0522D"/>
        <path d="M7 7H9V14H7V7Z" fill="#804000"/>
        <path d="M4 1H12V7H4V1Z" fill="#F7B500"/>
        <path d="M5 2H11V6H5V2Z" fill="#FFE8A3"/>
        <path d="M4 1H5V2H4V1ZM11 1H12V2H11V1ZM4 6H5V7H4V6ZM11 6H12V7H11V6Z" fill="#A47E00"/>
        <path d="M2 3L3 4L2 5L1 4L2 3Z" fill="white" />
        <path d="M14 3L15 4L14 5L13 4L14 3Z" fill="white" />
    </svg>
);


export const BowIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M8 1C4 1 2 5 2 8C2 11 4 15 8 15V13C5 13 4 11 4 8C4 5 5 3 8 3H12L14 1H8Z" fill="#A0522D" />
    <path d="M8 2C6 2 5 4 5 8C5 12 6 14 8 14V12C7 12 6 10 6 8C6 6 7 4 8 4H11L13 2H8Z" fill="#804000" />
    <path d="M2 7H14V9H2V7Z" fill="#C0C0C0" />
  </svg>
);

export const EnhancedBowIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M8 1C4 1 2 5 2 8C2 11 4 15 8 15V13C5 13 4 11 4 8C4 5 5 3 8 3H12L14 1H8Z" fill="#F7B500"/>
        <path d="M8 2C6 2 5 4 5 8C5 12 6 14 8 14V12C7 12 6 10 6 8C6 6 7 4 8 4H11L13 2H8Z" fill="#A47E00"/>
        <path d="M2 7H14V9H2V7Z" fill="#FFE8A3"/>
        <path d="M14 7L15 8L14 9L13 8L14 7Z" fill="white" />
    </svg>
);

export const ScytheIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M3 13L10 6L12 8L5 15H3V13Z" fill="#4a044e" />
        <path d="M4 12L10 6L11 7L5 13H4V12Z" fill="#2e102f" />
        <path d="M9 5L13 1L15 3L11 7L9 5Z" fill="#a855f7" />
        <path d="M10 5L13 2L14 3L11 6L10 5Z" fill="#d8b4fe" />
        <path d="M13 1L12 0L16 4L15 3L13 1Z" fill="#facc15"/>
    </svg>
);

export const WhipIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M3 11H5V13H3V11Z" fill="#78350f" />
        <path d="M5 12C6 11 8 8 10 6C12 4 13 2 13 2" stroke="#fb923c" strokeWidth="1"/>
        <path d="M5 11C6 10 8 7 10 5C12 3 13 1 13 1" stroke="#fdba74" strokeWidth="1"/>
    </svg>
);

export const MagicStaffIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M7 4H9V15H7V4Z" fill="#854d0e"/>
        <path d="M8 5H9V15H8V5Z" fill="#a16207"/>
        <path d="M8 0L6 2L8 4L10 2L8 0Z" fill="#8b5cf6"/>
        <path d="M8 1L7 2L8 3L9 2L8 1Z" fill="#c4b5fd"/>
    </svg>
);

export const ChainIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M4 2H7V5H4V2Z M9 5H12V8H9V5Z M4 8H7V11H4V8Z" fill="#71717a"/>
        <path d="M5 3H6V4H5V3Z M10 6H11V7H10V6Z M5 9H6V10H5V9Z" fill="#a1a1aa"/>
        <path d="M6 5L9 5L9 6L6 6V5Z M8 8L7 8L7 9L8 9V8Z" fill="#a1a1aa"/>
        <path d="M12 11H14V13H12V11Z" fill="#facc15"/>
    </svg>
);

export const RapierIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M8 1L7 2V11L8 12L9 11V2L8 1Z" fill="#e5e7eb"/>
        <path d="M8 2L9 3V11L8 11.5V2Z" fill="#f9fafb"/>
        <path d="M4 11H12V13H4V11Z" fill="#ca8a04"/>
        <path d="M5 13V14H11V13H5Z" fill="#fde047"/>
    </svg>
);

export const BoomerangIcon = ({ className }: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M4 2L8 6V8L2 2V4L6 8H4L2 6V2Z" fill="#a16207"/>
        <path d="M4 2H2V6L4 4V2Z" fill="#eab308"/>
    </svg>
);

export const GoldCoinIcon = ({ className }: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={cn("inline-block", className)}>
    <circle cx="8" cy="8" r="7" fill="#FFD700" />
    <circle cx="8" cy="8" r="6" fill="#FEEA00" />
    <path d="M8 4C6.5 4 5.5 5 5 6H7C7.5 5.5 8 5 9 5C10.5 5 11.5 6 11.5 7.5C11.5 9 10 9.5 9.5 10V11H7.5V9.5C8 9 9.5 8.5 9.5 7.5C9.5 6.5 9 6 8 6C7.5 6 7 6.25 7 6.5H5C5 5.25 6 4 8 4Z" fill="#DAA520" />
  </svg>
);

export const KnightIcon = ({ className, mood }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M24 40C17.3726 40 12 34.6274 12 28C12 21.3726 17.3726 16 24 16C30.6274 16 36 21.3726 36 28C36 34.6274 30.6274 40 24 40Z" fill="#9CA3AF"/>
        <path d="M24 38C18.4772 38 14 33.5228 14 28C14 22.4772 18.4772 18 24 18C29.5228 18 34 22.4772 34 28C34 33.5228 29.5228 38 24 38Z" fill="#D1D5DB"/>
        <path d="M18 14H30L32 20H16L18 14Z" fill="#6B7280"/>
        <path d="M20 22H28V26H20V22Z" fill="#374151"/>
        <rect x="23" y="10" width="2" height="5" fill="#DC2626"/>
        {!mood && (<>
            <rect x="21" y="23" width="2" height="2" fill="white"/>
            <rect x="25" y="23" width="2" height="2" fill="white"/>
        </>)}
        {mood === 'happy' && (<>
            <path d="M20 24C21 22 23 22 24 24" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M24 24C25 22 27 22 28 24" stroke="white" strokeWidth="1.5" fill="none" />
        </>)}
        {mood === 'angry' && (<>
            <path d="M20 23 l 4 1.5" stroke="white" strokeWidth="1.5" />
            <path d="M28 23 l -4 1.5" stroke="white" strokeWidth="1.5" />
        </>)}
        {mood === 'impatient' && (<>
            <rect x="20" y="23" width="4" height="1" fill="white"/>
            <rect x="24" y="23" width="4" height="1" fill="white"/>
        </>)}
        <path d="M8 28C8 26.8954 8.89543 26 10 26C11.1046 26 12 26.8954 12 28C12 29.1046 11.1046 30 10 30C8.89543 30 8 29.1046 8 28Z" fill="#9CA3AF"/>
    </svg>
);

export const MageIcon = ({ className, mood }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M24 40C17.3726 40 12 34.6274 12 28C12 21.3726 17.3726 16 24 16C30.6274 16 36 21.3726 36 28C36 34.6274 30.6274 40 24 40Z" fill="#A78BFA"/>
        <path d="M24 38C18.4772 38 14 33.5228 14 28C14 22.4772 18.4772 18 24 18C29.5228 18 34 22.4772 34 28C34 33.5228 29.5228 38 24 38Z" fill="#C4B5FD"/>
        <path d="M24 6L14 20H34L24 6Z" fill="#6D28D9"/>
        <path d="M24 8L16 20H32L24 8Z" fill="#8B5CF6"/>
        <rect x="14" y="19" width="20" height="2" fill="#FBBF24"/>
        {!mood && (<>
            <rect x="21" y="24" width="2" height="2" fill="#FAF5FF"/>
            <rect x="25" y="24" width="2" height="2" fill="#FAF5FF"/>
        </>)}
        {mood === 'happy' && (<>
            <path d="M20 25C21 23 23 23 24 25" stroke="#FAF5FF" strokeWidth="1.5" fill="none" />
            <path d="M24 25C25 23 27 23 28 25" stroke="#FAF5FF" strokeWidth="1.5" fill="none" />
        </>)}
        {mood === 'angry' && (<>
            <path d="M20 24 l 4 1.5" stroke="#FAF5FF" strokeWidth="1.5" />
            <path d="M28 24 l -4 1.5" stroke="#FAF5FF" strokeWidth="1.5" />
        </>)}
        {mood === 'impatient' && (<>
            <rect x="20" y="24" width="4" height="1" fill="#FAF5FF"/>
            <rect x="24" y="24" width="4" height="1" fill="#FAF5FF"/>
        </>)}
        <path d="M38 28C38 26.8954 38.8954 26 40 26C41.1046 26 42 26.8954 42 28C42 29.1046 41.1046 30 40 30C38.8954 30 38 29.1046 38 28Z" fill="#C4B5FD"/>
    </svg>
);

export const RogueIcon = ({ className, mood }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M24 40C17.3726 40 12 34.6274 12 28C12 21.3726 17.3726 16 24 16C30.6274 16 36 21.3726 36 28C36 34.6274 30.6274 40 24 40Z" fill="#4A5568"/>
        <path d="M24 38C18.4772 38 14 33.5228 14 28C14 22.4772 18.4772 18 24 18C29.5228 18 34 22.4772 34 28C34 33.5228 29.5228 38 24 38Z" fill="#718096"/>
        <path d="M16 24V20C16 16 20 12 24 12C28 12 32 16 32 20V24H16Z" fill="#1A202C"/>
        {!mood && (<>
            <rect x="21" y="23" width="2" height="2" fill="#FCA5A5"/>
            <rect x="25" y="23" width="2" height="2" fill="#FCA5A5"/>
        </>)}
        {mood === 'happy' && (<>
            <path d="M20 24C21 22 23 22 24 24" stroke="#FCA5A5" strokeWidth="1.5" fill="none" />
            <path d="M24 24C25 22 27 22 28 24" stroke="#FCA5A5" strokeWidth="1.5" fill="none" />
        </>)}
        {mood === 'angry' && (<>
            <path d="M20 23 l 4 1.5" stroke="#FCA5A5" strokeWidth="1.5" />
            <path d="M28 23 l -4 1.5" stroke="#FCA5A5" strokeWidth="1.5" />
        </>)}
        {mood === 'impatient' && (<>
            <rect x="20" y="23" width="4" height="1" fill="#FCA5A5"/>
            <rect x="24" y="23" width="4" height="1" fill="#FCA5A5"/>
        </>)}
        <path d="M8 28C8 26.8954 8.89543 26 10 26C11.1046 26 12 26.8954 12 28C12 29.1046 11.1046 30 10 30C8.89543 30 8 29.1046 8 28Z" fill="#718096"/>
    </svg>
);

export const VillagerIcon = ({ className, mood }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M24 40C17.3726 40 12 34.6274 12 28C12 21.3726 17.3726 16 24 16C30.6274 16 36 21.3726 36 28C36 34.6274 30.6274 40 24 40Z" fill="#D97706"/>
        <path d="M24 38C18.4772 38 14 33.5228 14 28C14 22.4772 18.4772 18 24 18C29.5228 18 34 22.4772 34 28C34 33.5228 29.5228 38 24 38Z" fill="#F59E0B"/>
        <rect x="16" y="12" width="16" height="6" fill="#78350F"/>
        <rect x="16" y="17" width="16" height="2" fill="#FBBF24"/>
        {!mood && (<>
            <rect x="21" y="24" width="2" height="2" fill="#000000"/>
            <rect x="25" y="24" width="2" height="2" fill="#000000"/>
        </>)}
        {mood === 'happy' && (<>
            <path d="M20 25C21 23 23 23 24 25" stroke="black" strokeWidth="1.5" fill="none" />
            <path d="M24 25C25 23 27 23 28 25" stroke="black" strokeWidth="1.5" fill="none" />
        </>)}
        {mood === 'angry' && (<>
            <path d="M20 24 l 4 1.5" stroke="black" strokeWidth="1.5" />
            <path d="M28 24 l -4 1.5" stroke="black" strokeWidth="1.5" />
        </>)}
        {mood === 'impatient' && (<>
            <rect x="20" y="24" width="4" height="1" fill="black"/>
            <rect x="24" y="24" width="4" height="1" fill="black"/>
        </>)}
        <path d="M38 28C38 26.8954 38.8954 26 40 26C41.1046 26 42 26.8954 42 28C42 29.1046 41.1046 30 40 30C38.8954 30 38 29.1046 38 28Z" fill="#F59E0B"/>
    </svg>
);
