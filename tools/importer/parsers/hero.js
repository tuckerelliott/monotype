/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero
 * Base block: hero
 * Source: https://www.monotype.com
 * Selector: section.hero
 * Generated: 2026-05-06
 *
 * Source structure:
 * - .hero-left: h1 heading (with .hero-accent span), p.hero-sub description, .hero-actions with CTA links
 * - .hero-right: .step-list with .step-item children (each has .step-number and .step-copy with strong + text)
 *
 * Target structure (from library):
 * Row 1: background image (optional - not present in source, skip)
 * Row 2: heading, subheading, CTAs, and steps content
 */
export default function parse(element, { document }) {
  // Extract heading from hero-left
  const heading = element.querySelector('.hero-left h1, .hero-left h2, h1, h2');

  // Extract description/subheading
  const description = element.querySelector('.hero-sub, .hero-left > p, p');

  // Extract CTA links (from .hero-actions)
  const ctaLinks = Array.from(
    element.querySelectorAll('.hero-actions > a.mt-cta, .hero-actions a.mt-cta, .hero-actions a')
  );

  // Extract step items from hero-right
  const stepItems = Array.from(element.querySelectorAll('.step-list .step-item, .step-item'));

  // Build content cell: heading + description + CTAs in a single cell
  // Following library description: Row with title (heading), subheading, call-to-action
  const contentFrag = document.createDocumentFragment();

  // Field: heading
  if (heading) {
    contentFrag.appendChild(document.createComment(' field:heading '));
    contentFrag.appendChild(heading);
  }

  // Field: description
  if (description) {
    contentFrag.appendChild(document.createComment(' field:description '));
    contentFrag.appendChild(description);
  }

  // Field: cta (CTA links)
  if (ctaLinks.length > 0) {
    contentFrag.appendChild(document.createComment(' field:cta '));
    const ctaContainer = document.createElement('p');
    ctaLinks.forEach((link) => {
      // Remove inline SVG icons from CTA links - keep only text
      const imgs = link.querySelectorAll('img');
      imgs.forEach((img) => img.remove());
      ctaContainer.appendChild(link);
    });
    contentFrag.appendChild(ctaContainer);
  }

  // Build cells array
  const cells = [];

  // Row 1: main hero content (heading, description, CTAs) in single cell
  cells.push([contentFrag]);

  // Row 2: steps content (each step as a structured entry)
  if (stepItems.length > 0) {
    const stepsFrag = document.createDocumentFragment();
    stepsFrag.appendChild(document.createComment(' field:steps '));

    stepItems.forEach((item) => {
      const stepNumber = item.querySelector('.step-number');
      const stepCopy = item.querySelector('.step-copy');

      if (stepNumber || stepCopy) {
        const stepDiv = document.createElement('div');
        if (stepNumber) {
          const numEl = document.createElement('strong');
          numEl.textContent = stepNumber.textContent.trim();
          stepDiv.appendChild(numEl);
        }
        if (stepCopy) {
          stepDiv.appendChild(document.createTextNode(' '));
          // Preserve the strong element and text content
          const copyClone = stepCopy.cloneNode(true);
          while (copyClone.firstChild) {
            stepDiv.appendChild(copyClone.firstChild);
          }
        }
        stepsFrag.appendChild(stepDiv);
      }
    });

    cells.push([stepsFrag]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
