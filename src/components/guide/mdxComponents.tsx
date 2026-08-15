import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Flag } from "./Flag";
import { DatesGrid } from "./DatesGrid";
import { WorkedExample } from "./WorkedExample";
import { Box } from "./Box";
import { Sources } from "./Sources";
import { Cta } from "./Cta";
import { ExemptionTable } from "./ExemptionTable";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-11 mb-3.5 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em] first:mt-0"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-7 mb-2 font-display text-lg font-bold tracking-[-0.01em]" {...props} />,
  p: (props) => <p className="mb-4.5" {...props} />,
  // Marker styling lives on the list wrapper (scoped to direct-child <li>s) rather than
  // on <li> itself — ul and ol share the same li component, and only this way do the
  // em-dash and the numbered marker stay correctly separated between the two.
  ul: (props) => (
    <ul
      className="mb-4.5 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-pen [&>li]:before:content-['—']"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mdx-ol mb-4.5 list-none space-y-2.5 pl-0 [&>li]:relative [&>li]:pl-9 [&>li]:before:absolute [&>li]:before:top-px [&>li]:before:left-0 [&>li]:before:font-mono [&>li]:before:text-xs [&>li]:before:font-semibold [&>li]:before:text-pen"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
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
  Box,
  Sources,
  Cta,
  ExemptionTable,
};
