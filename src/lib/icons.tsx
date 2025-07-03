import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
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

export const AxeIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M6 6H10V15H6V6Z" fill="#A0522D" />
    <path d="M7 7H9V14H7V7Z" fill="#804000" />
    <path d="M4 1H12V7H4V1Z" fill="#C0C0C0" />
    <path d="M5 2H11V6H5V2Z" fill="#E0E0E0" />
    <path d="M4 1H5V2H4V1ZM11 1H12V2H11V1ZM4 6H5V7H4V6ZM11 6H12V7H11V6Z" fill="#A0A0A0" />
  </svg>
);

export const BowIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M8 1C4 1 2 5 2 8C2 11 4 15 8 15V13C5 13 4 11 4 8C4 5 5 3 8 3H12L14 1H8Z" fill="#A0522D" />
    <path d="M8 2C6 2 5 4 5 8C5 12 6 14 8 14V12C7 12 6 10 6 8C6 6 7 4 8 4H11L13 2H8Z" fill="#804000" />
    <path d="M2 7H14V9H2V7Z" fill="#C0C0C0" />
  </svg>
);

export const ScytheIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M3 13L10 6L12 8L5 15H3V13Z" fill="#A0522D" />
    <path d="M4 12L10 6L11 7L5 13H4V12Z" fill="#804000" />
    <path d="M9 5L13 1L15 3L11 7L9 5Z" fill="#C0C0C0" />
    <path d="M10 5L13 2L14 3L11 6L10 5Z" fill="white" />
  </svg>
);

export const SpearIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M8 1L7 2H9L8 1Z" fill="#C0C0C0" />
    <path d="M8 2L7 3H9L8 2Z" fill="white" />
    <path d="M8 2V15H7V2H8Z" fill="#A0522D" />
    <path d="M8 3V15H7V3H8Z" fill="#804000" />
  </svg>
);

export const DaggerIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M8 4L7 5V9L5 11V12H11V11L9 9V5L8 4Z" fill="#C0C0C0" />
    <path d="M8 5L9 6V9L8 10L7 9V6L8 5Z" fill="white" />
    <path d="M6 12H10V13H6V12Z" fill="#A52A2A" />
  </svg>
);

export const WhipIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M3 11H5V13H3V11Z" fill="#A0522D"/>
    <path d="M5 12C6 11 8 8 10 6C12 4 13 2 13 2" stroke="#717171" strokeWidth="1"/>
    <path d="M5 11C6 10 8 7 10 5C12 3 13 1 13 1" stroke="#C0C0C0" strokeWidth="1"/>
  </svg>
);

export const ClawIcon = ({ className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M3 10H8V12H3V10Z" fill="#A0522D" />
    <path d="M2 4L4 6L6 4Z M6 4L8 6L10 4Z M10 4L12 6L14 4Z" fill="#C0C0C0" />
    <path d="M3 5L5 7L7 5Z M7 5L9 7L11 5Z M11 5L13 7L15 5Z" fill="white" />
    <path d="M2 4V8H3V4L2 4Z M6 4V8H7V4L6 4Z M10 4V8H11V4L10 4Z" fill="#B0B0B0" />
  </svg>
);

export const GoldCoinIcon = ({ className }: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={cn("inline-block", className)}>
    <circle cx="8" cy="8" r="7" fill="#FFD700" />
    <circle cx="8" cy="8" r="6" fill="#FEEA00" />
    <path d="M8 4C6.5 4 5.5 5 5 6H7C7.5 5.5 8 5 9 5C10.5 5 11.5 6 11.5 7.5C11.5 9 10 9.5 9.5 10V11H7.5V9.5C8 9 9.5 8.5 9.5 7.5C9.5 6.5 9 6 8 6C7.5 6 7 6.25 7 6.5H5C5 5.25 6 4 8 4Z" fill="#DAA520" />
  </svg>
);

export const KnightIcon = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <rect x="18" y="22" width="12" height="16" fill="#a5a5a5"/>
        <rect x="19" y="23" width="10" height="14" fill="#c0c0c0"/>
        
        <rect x="16" y="16" width="16" height="10" fill="#6d6d6d"/>
        <rect x="17" y="17" width="14" height="8" fill="#a5a5a5"/>
        <rect x="20" y="20" width="8" height="2" fill="#212121"/>
        <rect x="21" y="20" width="2" height="2" fill="white"/>
        <rect x="25" y="20" width="2" height="2" fill="white"/>
        
        <rect x="23" y="14" width="2" height="4" fill="#d00000"/>
        
        <rect x="34" y="28" width="6" height="8" fill="#6d6d6d"/>
        <rect x="35" y="29" width="4" height="6" fill="#a5a5a5"/>
    </svg>
);

export const MageIcon = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M24 12L16 18V38H32V18L24 12Z" fill="#4a148c"/>
        <path d="M24 14L18 19V36H30V19L24 14Z" fill="#6a1b9a"/>
        
        <path d="M24 6L14 16H34L24 6Z" fill="#311b92"/>
        <path d="M24 8L16 16H32L24 8Z" fill="#4527a0"/>
        <rect x="20" y="14" width="8" height="2" fill="#ffd700"/>
        
        <rect x="20" y="22" width="2" height="2" fill="white"/>
        <rect x="26" y="22" width="2" height="2" fill="white"/>
        
        <rect x="36" y="26" width="4" height="10" fill="#8d6e63"/>
        <rect x="38" y="24" width="4" height="4" fill="#00bcd4"/>
    </svg>
);

export const RogueIcon = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <path d="M24 14C18 14 14 18 14 24V38H34V24C34 18 30 14 24 14Z" fill="#212121"/>
        <path d="M24 16C19 16 16 20 16 24V36H32V24C32 20 29 16 24 16Z" fill="#424242"/>
        
        <path d="M24 10L18 18H30L24 10Z" fill="#212121"/>
        
        <rect x="21" y="22" width="2" height="2" fill="#e0e0e0"/>
        <rect x="25" y="22" width="2" height="2" fill="#e0e0e0"/>
        
        <rect x="36" y="28" width="2" height="6" fill="#a52a2a"/>
        <path d="M37 28L35 26H39L37 28Z" fill="#c0c0c0"/>
    </svg>
);

export const VillagerIcon = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
        <rect x="16" y="20" width="16" height="18" fill="#8d6e63"/>
        <rect x="17" y="21" width="14" height="16" fill="#a1887f"/>
        
        <rect x="18" y="14" width="12" height="8" fill="#ffe0b2"/>
        <rect x="19" y="15" width="10" height="6" fill="#ffcc80"/>

        <rect x="16" y="12" width="16" height="4" fill="#4e342e"/>
        <rect x="17" y="13" width="14" height="2" fill="#3e2723"/>
        
        <rect x="21" y="18" width="2" height="2" fill="#212121"/>
        <rect x="25" y="18" width="2" height="2" fill="#212121"/>
        
        <rect x="35" y="26" width="6" height="6" fill="#ffe0b2"/>
        <rect x="36" y="27" width="4" height="4" fill="#ffcc80"/>
    </svg>
);
