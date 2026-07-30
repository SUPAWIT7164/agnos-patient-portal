import type { ReactNode, SVGProps } from "react";
import { cn } from "@/utils/cn";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function base(props: IconProps, paths: ReactNode) {
  const { className, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-4 w-4 shrink-0", className)}
      {...rest}
    >
      {paths}
    </svg>
  );
}

export function IconClipboard(props: IconProps) {
  return base(
    props,
    <>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </>,
  );
}

export function IconMonitor(props: IconProps) {
  return base(
    props,
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>,
  );
}

export function IconShieldCheck(props: IconProps) {
  return base(
    props,
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>,
  );
}

export function IconZap(props: IconProps) {
  return base(props, <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />);
}

export function IconSave(props: IconProps) {
  return base(
    props,
    <>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </>,
  );
}

export function IconReset(props: IconProps) {
  return base(
    props,
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </>,
  );
}

export function IconArrowRight(props: IconProps) {
  return base(props, <path d="M5 12h14M13 6l6 6-6 6" />);
}

export function IconWifi(props: IconProps) {
  return base(
    props,
    <>
      <path d="M5 12.5a9 9 0 0 1 14 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    </>,
  );
}

export function IconUser(props: IconProps) {
  return base(
    props,
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>,
  );
}

export function IconPhone(props: IconProps) {
  return base(
    props,
    <path d="M8 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5L17 11.5 21 13v3a2 2 0 0 1-2 2A14 14 0 0 1 5 7a2 2 0 0 1 2-2Z" />,
  );
}

export function IconHeart(props: IconProps) {
  return base(
    props,
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  );
}

export function IconTrash(props: IconProps) {
  return base(
    props,
    <>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </>,
  );
}

export function IconAlert(props: IconProps) {
  return base(
    props,
    <>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
    </>,
  );
}

export function IconCheckCircle(props: IconProps) {
  return base(
    props,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5L16 9.5" />
    </>,
  );
}

export function IconInfo(props: IconProps) {
  return base(
    props,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>,
  );
}
