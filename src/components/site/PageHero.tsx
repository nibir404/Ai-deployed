import Image from "next/image";
import { Container } from "@/components/site/primitives/Container";
import { Eyebrow } from "@/components/site/primitives/Eyebrow";
import { TextReveal } from "@/components/site/primitives/TextReveal";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Optional hero image — full-bleed behind the heading */
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  /** Whether the heading should be sentence-case (default true) */
  sentence?: boolean;
};

/**
 * PageHero — shared hero block used on every sub-page.
 * Mono eyebrow + revealed headline + optional intro paragraph,
 * with an optional grayscale photo backdrop.
 */
export function PageHero({ eyebrow, title, description, image }: Props) {
  return (
    <section
      aria-label={eyebrow}
      className="relative pt-[120px] pb-16 md:pb-24 border-b hairline overflow-hidden"
    >
      {image && (
        <div className="absolute inset-0 -z-0 opacity-30">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/40 to-[var(--color-bg)]" />
        </div>
      )}
      <Container className="relative">
        <div className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <TextReveal
            as="h1"
            className="mt-8 font-display text-hero font-medium leading-[0.92] tracking-[-0.035em] text-ink"
          >
            {title}
          </TextReveal>
          {description && (
            <p className="mt-8 text-body text-ink-muted leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}