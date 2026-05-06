/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-showcase
 * Base block: tabs
 * Source: https://www.monotype.com (section.monotype-portfolio-section)
 * Generated: 2026-05-06
 *
 * Extracts tabbed product showcase with features list and image per tab panel.
 * Each tab row: label in cell 1, rich content (heading, description, features, CTA, image) in cell 2.
 */
export default function parse(element, { document }) {
  // Extract tab buttons (labels)
  const tabButtons = Array.from(element.querySelectorAll('button.monotype-portfolio-tab'));

  // Extract tab panels
  const tabPanels = Array.from(element.querySelectorAll('.monotype-portfolio-panel'));

  const cells = [];

  // Build one row per tab: [tabLabel, content]
  tabButtons.forEach((btn, index) => {
    const panel = tabPanels[index];
    if (!panel) return;

    // Cell 1: Tab label with field hint
    const labelFrag = document.createDocumentFragment();
    labelFrag.appendChild(document.createComment(' field:tabLabel '));
    const labelText = document.createTextNode(btn.textContent.trim());
    labelFrag.appendChild(labelText);

    // Cell 2: Tab panel content with field hint
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content '));

    // Extract heading (h3)
    const heading = panel.querySelector('h3');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentFrag.appendChild(h3);
    }

    // Extract description paragraph
    const desc = panel.querySelector('.monotype-portfolio-copy > p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentFrag.appendChild(p);
    }

    // Extract features list
    const featuresList = panel.querySelector('ul.monotype-portfolio-features');
    if (featuresList) {
      const ul = document.createElement('ul');
      const features = Array.from(featuresList.querySelectorAll('li.monotype-portfolio-feature'));
      features.forEach((feat) => {
        const li = document.createElement('li');
        const strong = feat.querySelector('strong');
        const span = feat.querySelector('span');
        if (strong) {
          const b = document.createElement('strong');
          b.textContent = strong.textContent.trim();
          li.appendChild(b);
          if (span) {
            li.appendChild(document.createTextNode(' '));
            const s = document.createElement('span');
            s.textContent = span.textContent.trim();
            li.appendChild(s);
          }
        }
        ul.appendChild(li);
      });
      contentFrag.appendChild(ul);
    }

    // Extract CTA link
    const ctaLink = panel.querySelector('a.mt-cta');
    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href || ctaLink.getAttribute('href');
      a.textContent = ctaLink.textContent.trim();
      contentFrag.appendChild(a);
    }

    // Extract visual image
    const img = panel.querySelector('.monotype-portfolio-visual img');
    if (img) {
      const image = document.createElement('img');
      image.src = img.src || img.getAttribute('src');
      image.alt = img.alt || img.getAttribute('alt') || '';
      contentFrag.appendChild(image);
    }

    cells.push([labelFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-showcase', cells });
  element.replaceWith(block);
}
