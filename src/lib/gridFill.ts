/**
 * Helpers for grids whose card count doesn't evenly divide the
 * desktop column count. Without intervention, an odd card count
 * (e.g. 5 in a 3-col grid) leaves a visible empty cell at the end
 * of the last row.
 *
 * `gridFillProps` returns `{ "data-fill": span }` for the last
 * card when the count doesn't divide evenly, so a CSS rule can
 * make that card span the remaining columns of its row.
 *
 * Pair with `gridFillCss` (a static string of CSS rules to drop
 * into `globals.css`) so the visual behaviour lives next to the
 * design tokens.
 *
 * Example:
 *   <div className="grid grid-cols-3 gap-px">
 *     {items.map((it, i, arr) => (
 *       <Card key={it.id} {...gridFillProps(arr.length, 3, i)} />
 *     ))}
 *   </div>
 */
export function gridFillProps(
  total: number,
  cols: number,
  index: number,
): { "data-fill"?: number } {
  if (index !== total - 1) return {};
  const remainder = total % cols;
  if (remainder === 0) return {};
  return { "data-fill": cols - remainder + 1 };
}

/**
 * CSS rules to drop into globals.css. The selectors are written
 * to target the data-fill attribute on the last grid item at the
 * desktop breakpoint where the grid spans 3 or 4 columns.
 *
 * Important: this is "best-effort" — Tailwind's responsive grid
 * utilities vary per layout. The defaults here cover the
 * `lg:grid-cols-3` and `lg:grid-cols-4` breakpoints used across
 * the site.
 */
export const GRID_FILL_CSS = `
  /* When the last card carries data-fill="2", span 2 cols at the
     3-col desktop breakpoint so it fills the dangling cell. */
  @media (min-width: 1024px) {
    .lg\\:grid-cols-3 > [data-fill="2"] {
      grid-column: span 2 / span 2;
    }
    .lg\\:grid-cols-4 > [data-fill="2"] {
      grid-column: span 2 / span 2;
    }
    .lg\\:grid-cols-4 > [data-fill="3"] {
      grid-column: span 3 / span 3;
    }
  }

  /* The last card in an odd-count group is visually a "closing"
     tile — give it a subtle accent border so it reads as a deliberate
     unit, not a stretched lone card. The rule is opt-in via the
     parent grid carrying [data-fill-grid]. */
  [data-fill-grid="true"] > [data-fill] {
    border-color: var(--color-accent);
  }
`;