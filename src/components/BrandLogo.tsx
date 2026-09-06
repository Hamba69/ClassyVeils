import Image from 'next/image';
import logo from '../../public/brand/classyveils-refined.png';

export default function BrandLogo({ variant = 'full', priority = false, className = '' }: { variant?: 'full' | 'mark'; priority?: boolean; className?: string }) {
  return <Image src={logo} alt="Classy Veils — Celebrate Your Veil" preload={priority} className={`${variant === 'mark' ? 'h-16 w-auto rounded-lg' : 'h-auto w-full'} ${className}`} sizes={variant === 'mark' ? '72px' : '(min-width: 640px) 18rem, 14rem'} />;
}
