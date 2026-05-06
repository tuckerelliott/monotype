/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-product.
 * Base block: cards.
 * Source: https://www.monotype.com (section.selector-section)
 * Generated: 2026-05-06
 *
 * Extracts product cards from the selector section. Each card contains a product name,
 * description, audience info (made-for), and a CTA link. Source has no per-card images,
 * so cell 1 (image) is left empty per the UE model.
 *
 * UE Model fields: image (image), content (richtext)
 */
export default function parse(element, { document }) {
  // Find all product cards within the element
  const productCards = element.querySelectorAll('.product-card');

  const cells = [];

  productCards.forEach((card) => {
    // Cell 1: Image (source has no per-card images, leave empty)
    const imageCell = [];

    // Cell 2: Content (product name, description, made-for, CTA)
    const contentCell = [];

    // Product name as heading
    const cardName = card.querySelector('.card-name');
    if (cardName) {
      const heading = document.createElement('h3');
      heading.textContent = cardName.textContent.replace(/\.\s*$/, '').trim();
      const contentHint = document.createComment(' field:content ');
      contentCell.push(contentHint);
      contentCell.push(heading);
    }

    // Description
    const cardFeature = card.querySelector('.card-feature');
    if (cardFeature) {
      const desc = document.createElement('p');
      desc.textContent = cardFeature.textContent.trim();
      contentCell.push(desc);
    }

    // Made-for audience info
    const madeForLabel = card.querySelector('.made-for-label');
    const madeForList = card.querySelector('.made-for-list');
    if (madeForLabel && madeForList) {
      const audience = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = madeForLabel.textContent.trim();
      audience.appendChild(strong);
      audience.append(' ' + madeForList.textContent.trim());
      contentCell.push(audience);
    }

    // CTA link
    const ctaLink = card.querySelector('a.mt-cta');
    if (ctaLink) {
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.textContent.replace(/\s+/g, ' ').trim();
      contentCell.push(link);
    }

    // Each row = [imageCell, contentCell] per library example (2 columns)
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
