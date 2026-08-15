import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Flag } from "./Flag";
import { DatesGrid } from "./DatesGrid";
import { WorkedExample } from "./WorkedExample";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-11 mb-3.5 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em] first:mt-0"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-7 mb-2 font-display text-lg font-bold tracking-[-0.01em]" {...props} />,
  p: (props) => <p className="mb-4.5" {...props} />,
  ul: (props) => <ul className="mb-4.5 list-none space-y-2 pl-0" {...props} />,
  li: (props) => (
    <li className="relative pl-5 before:absolute before:left-0 before:text-pen before:content-['—']" {...props} />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
  em: (props) => <em {...props} />,
  a: ({ href, ...props }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal && href) {
      return <Link href={href} className="text-pen underline decoration-pen underline-offset-2" {...props} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pen underline decoration-pen underline-offset-2"
        {...props}
      />
    );
  },
  Flag,
  DatesGrid,
  WorkedExample,
};
