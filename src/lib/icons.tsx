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
  <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M3 4H13V11H12V12H10V13H6V12H4V11H3V4Z" fill="#B0B0B0"/>
    <path d="M2 5H14V9H2V5Z" fill="#C0C0C0"/>
    <path d="M4 6H12V8H4V6Z" fill="#A0A0A0"/>
    <rect x="7" y="6" width="2" height="2" fill="#222222"/>
    <rect x="4" y="3" width="8" height="1" fill="#D0D0D0"/>
  </svg>
);

export const MageIcon = ({ className }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M3 10H13V12H11V13H5V12H3V10Z" fill="#4B0082" />
    <path d="M4 11H12V12H4V11Z" fill="#8A2BE2" />
    <path d="M8 3L4 9H12L8 3Z" fill="#4B0082" />
    <path d="M8 4L6 8H10L8 4Z" fill="#8A2BE2" />
    <path d="M7 9H9V10H7V9Z" fill="#FFD700" />
  </svg>
);

export const RogueIcon = ({ className }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M3 4H13V10H12V9H11V8H5V9H4V10H3V4Z" fill="#36454F" />
    <path d="M4 5H12V7H4V5Z" fill="#5A5A5A" />
    <path d="M6 7H10V8H6V7Z" fill="#222222" />
    <path d="M4 10H12V12H4V10Z" fill="#A0522D" />
  </svg>
);

export const VillagerIcon = ({ className }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconStyle} className={className}>
    <path d="M5 4H11V6H12V7H4V6H5V4Z" fill="#D2B48C" />
    <path d="M6 3H10V4H6V3Z" fill="#A0522D" />
    <path d="M4 7H12V12H4V7Z" fill="#008080" />
    <path d="M5 8H11V11H5V8Z" fill="#00AAAA" />
  </svg>
);
