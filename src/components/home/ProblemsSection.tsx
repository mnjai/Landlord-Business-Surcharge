import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";

const PROBLEMS = [
  {
    n: "01",
    title: "An obligation you can't discharge from where you are",
    body: "The registration form isn't filed online. It has to be delivered by hand to Port of Spain, San Fernando, Tunapuna or Scarborough — and then the surcharge falls due four times a year after that.",
    href: "/check",
    label: "Check your position",
  },
  {
    n: "02",
    title: "No trustworthy eyes on the ground",
    body: "A relative checking in now and then isn't accountable, and asking them for a straight answer about the roof is awkward in a way that hiring someone never is.",
    href: "#report",
    label: "See what we send you",
  },
  {
    n: "03",
    title: "Inherited property that's stuck",
    body: "Deed never transferred, estate never administered, a house standing empty for years. It can't be rented, sold or insured properly until the paperwork is straightened out.",
    href: "#title-estate",
    label: "How we unstick it",
  },
];

export function ProblemsSection() {
  return (
    <section id="problems" className="py-16">
      <Container>
        <Eyebrow>What owners abroad actually call us about</Eyebrow>
        <SectionHeading>Three problems that don&apos;t solve themselves from 2,500 miles away</SectionHeading>
        <SectionDek>
          Distance turns ordinary property tasks into things that never quite get done. These are the three that
          cost the most.
        </SectionDek>

        <div className="grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.n} className="bg-card p-6">
              <div className="mb-3 font-mono text-[11px] font-semibold tracking-[0.12em] text-pen">{p.n}</div>
              <h3 className="mb-2.5 font-display text-[19px] leading-[1.2] font-bold tracking-[-0.012em]">
                {p.title}
              </h3>
              <p className="mb-3.5 text-[14.5px] text-ink-2">{p.body}</p>
              <Link href={p.href} className="border-b border-pen pb-px font-mono text-[12.5px] no-underline">
                {p.label} →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
