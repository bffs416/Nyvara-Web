import Image from 'next/image';

export default function NyvaraLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Nyvara Group Logo"
      width={205}
      height={24}
      className={className}
      priority
    />
  );
}
