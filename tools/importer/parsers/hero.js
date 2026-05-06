/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero
 * Model fields: image (reference), imageAlt (text), text (richtext)
 * Output: 1 row, 3 columns matching model field order
 */
export default function parse(element, { document }) {
  // Column 1: image (empty - no background image in source)
  const imageCell = document.createElement('div');

  // Column 2: imageAlt (empty - no image)
  const altCell = document.createElement('div');

  // Column 3: text (richtext - heading, description, CTAs)
  const textCell = document.createDocumentFragment();

  const heading = element.querySelector('.hero-left h1, .hero-left h2, h1, h2');
  if (heading) {
    textCell.appendChild(heading);
  }

  const description = element.querySelector('.hero-sub, .hero-left > p, p');
  if (description) {
    textCell.appendChild(description);
  }

  const ctaLinks = Array.from(
    element.querySelectorAll('.hero-actions > a.mt-cta, .hero-actions a.mt-cta, .hero-actions a')
  );
  if (ctaLinks.length > 0) {
    const ctaContainer = document.createElement('p');
    ctaLinks.forEach((link) => {
      const imgs = link.querySelectorAll('img');
      imgs.forEach((img) => img.remove());
      ctaContainer.appendChild(link);
    });
    textCell.appendChild(ctaContainer);
  }

  // Build cells: 1 row with 3 columns [image, imageAlt, text]
  const cells = [
    [imageCell, altCell, textCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
