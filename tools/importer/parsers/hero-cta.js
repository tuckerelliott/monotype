/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-cta
 * Base block: hero
 * Source: https://www.monotype.com
 * Selector: .mt-cta-section-default-wrapper
 * Generated: 2026-05-06
 *
 * UE Model fields: heading (richtext), text (richtext), ctas (richtext)
 */
export default function parse(element, { document }) {
  // Extract heading - h2.cta-section-title or fallback to any heading
  const heading = element.querySelector('h2.cta-section-title, h1.cta-section-title, h2, h1');

  // Extract description text - .cta-section-description or fallback
  const description = element.querySelector('.cta-section-description, .mt-text-editor, p');

  // Extract CTA links - from .cta-section-ctas container
  const ctaContainer = element.querySelector('.cta-section-ctas');
  const ctaLinks = ctaContainer
    ? Array.from(ctaContainer.querySelectorAll('a.mt-cta, a'))
    : Array.from(element.querySelectorAll(':scope a.mt-cta, :scope a.button'));

  // Build cells array matching UE model: heading, text, ctas (3 rows, 1 column each)
  const cells = [];

  // Row 1: heading field
  const headingCell = document.createDocumentFragment();
  headingCell.appendChild(document.createComment(' field:heading '));
  if (heading) {
    headingCell.appendChild(heading);
  }
  cells.push([headingCell]);

  // Row 2: text field (description paragraph)
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  if (description) {
    textCell.appendChild(description);
  }
  cells.push([textCell]);

  // Row 3: ctas field (action links)
  if (ctaLinks.length > 0) {
    const ctasCell = document.createDocumentFragment();
    ctasCell.appendChild(document.createComment(' field:ctas '));
    ctaLinks.forEach((link) => {
      // Remove decorative SVG icons from CTA links for clean import
      const imgs = link.querySelectorAll('img[src^="data:image/svg"]');
      imgs.forEach((img) => img.remove());
      ctasCell.appendChild(link);
    });
    cells.push([ctasCell]);
  } else {
    // Empty row for ctas - no field hint needed for empty cells
    cells.push(['']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cta', cells });
  element.replaceWith(block);
}
