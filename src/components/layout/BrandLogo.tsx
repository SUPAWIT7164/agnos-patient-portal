import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/utils/cn";

interface BrandLogoProps {
  href?: string;
  className?: string;
  priority?: boolean;
  showWordmark?: boolean;
}

/**
 * Agnos brand mark from /public/agnos.jpg
 */
export function BrandLogo({
  href = "/",
  className,
  priority = false,
  showWordmark = false,
}: BrandLogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/agnos.jpg"
        alt={APP_NAME}
        width={140}
        height={56}
        priority={priority}
        className="h-9 w-auto object-contain sm:h-10"
      />
      {showWordmark ? (
        <span className="hidden text-sm font-semibold tracking-tight text-[var(--color-secondary)] lg:inline">
          Patient Portal
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="min-w-0 transition-opacity hover:opacity-80"
      aria-label={APP_NAME}
    >
      {content}
    </Link>
  );
}
