/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards variant.
 * Base block: cards
 * Source selector: .mt-gallery-listing
 * UE Model: card (fields: image, text)
 * Generated: 2026-05-06
 *
 * Source structure:
 *   .mt-gallery-listing
 *     h2.mt-heading-1 (section heading - not part of block table)
 *     div.mt-body (section description - not part of block table)
 *     div.mt-grid
 *       div.mt-item (repeated per card)
 *         div.mt-content
 *           a.mt-image > picture > img (card image with link)
 *           div.mt-content-text > a > div.mt-text-editor > p (card text)
 *
 * Target structure (from library-example.md):
 *   | Cards | |
 *   |-------|-------|
 *   | image | text  |  (per card row)
 */
export default function parse(element, { document }) {
  // Extract all card items from the grid
  const cardItems = element.querySelectorAll('.mt-item');

  const cells = [];

  cardItems.forEach((item) => {
    // Cell 1: Image with field hint
    const imgEl = item.querySelector('img');
    const imageCell = [];

    if (imgEl) {
      const imageHint = document.createComment(' field:image ');
      const picture = imgEl.closest('picture') || imgEl;
      imageCell.push(imageHint);
      imageCell.push(picture);
    }

    // Cell 2: Text content with field hint
    const textCell = [];
    const textHint = document.createComment(' field:text ');
    textCell.push(textHint);

    // Extract heading/title from the card text area
    const textContent = item.querySelector('.mt-content-text p, .mt-text-editor p');
    if (textContent) {
      // Create a strong element for the card title (maps to bold/heading in markdown)
      const titleEl = document.createElement('strong');
      titleEl.textContent = textContent.textContent.trim();
      textCell.push(titleEl);
    }

    // Extract the link href for CTA
    const linkEl = item.querySelector('.mt-content-text a[href], a.mt-image[href]');
    if (linkEl && linkEl.getAttribute('href')) {
      const ctaLink = document.createElement('a');
      ctaLink.setAttribute('href', linkEl.getAttribute('href'));
      ctaLink.textContent = textContent ? textContent.textContent.trim() : 'Read more';
      textCell.push(ctaLink);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
