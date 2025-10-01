import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function NyvaraLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/Nyvara Logo.png"
        alt="Nyvara Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
