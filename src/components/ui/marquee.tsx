import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [--duration:30s] w-full",
        "bg-primary text-primary-foreground",
        className
      )}
    >
      <div
        className={cn("flex min-w-full shrink-0 animate-marquee items-center justify-around gap-[--gap]", {
          "[animation-direction:reverse]": reverse,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
