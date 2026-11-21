import type {AnchorHTMLAttributes, ReactNode} from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & {
  href: string;
  children: ReactNode;
  /** Show the small ↗ marker after the text. Turn it off where an icon or the context already makes it clear. */
  mark?: boolean;
};

/** A link to another site that opens in a new tab, with safe rel values and a note for screen readers. */
export default function ExternalLink({children, mark = true, ...props}: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      {mark && <span aria-hidden="true" className="external-mark">↗</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
