/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://www.monotype.com
 * Selector: section.workflow-tabs-section
 * Generated: 2026-05-06
 *
 * Transforms a tabbed before/after testimonial section into a Tabs block.
 * Each tab has a label (col 1) and rich content (col 2) containing
 * the before state (eyebrow, heading, body) and after state (quote + attribution).
 */
export default function parse(element, { document }) {
  // Extract the section heading (used as context, not placed in block table)
  const sectionHeading = element.querySelector('h2.workflow-tabs-title, .workflow-tabs-header h2');

  // Extract tab labels from navigation buttons
  const tabButtons = Array.from(element.querySelectorAll('.workflow-tabs-nav button.workflow-tab, .workflow-tabs-nav .workflow-tab'));

  // Extract tab panels
  const panels = Array.from(element.querySelectorAll('.workflow-panels .workflow-panel'));

  const cells = [];

  // Build one row per tab: [label, content]
  tabButtons.forEach((btn, index) => {
    const panel = panels[index];
    if (!panel) return;

    // Cell 1: Tab label with field hint
    const labelFrag = document.createDocumentFragment();
    labelFrag.appendChild(document.createComment(' field:label '));
    const labelText = document.createElement('p');
    labelText.textContent = btn.textContent.trim();
    labelFrag.appendChild(labelText);

    // Cell 2: Tab content - before/after testimonial
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content '));

    // Before section
    const beforeSection = panel.querySelector('.workflow-card-before');
    if (beforeSection) {
      const eyebrow = beforeSection.querySelector('p.eyebrow');
      if (eyebrow) {
        const eyebrowEl = document.createElement('p');
        eyebrowEl.textContent = eyebrow.textContent.trim();
        contentFrag.appendChild(eyebrowEl);
      }

      const title = beforeSection.querySelector('h3.title, h3');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent.trim();
        contentFrag.appendChild(h3);
      }

      const body = beforeSection.querySelector('p.body');
      if (body) {
        const bodyEl = document.createElement('p');
        bodyEl.textContent = body.textContent.trim();
        contentFrag.appendChild(bodyEl);
      }
    }

    // After section (testimonial quote)
    const afterSection = panel.querySelector('.workflow-card-after');
    if (afterSection) {
      const flipLabel = afterSection.querySelector('p.flip-label');
      if (flipLabel) {
        const labelEl = document.createElement('p');
        labelEl.textContent = flipLabel.textContent.trim();
        contentFrag.appendChild(labelEl);
      }

      const quoteText = afterSection.querySelector('.flip-text');
      if (quoteText) {
        const blockquote = document.createElement('blockquote');
        blockquote.textContent = quoteText.textContent.trim();
        contentFrag.appendChild(blockquote);
      }

      const meta = afterSection.querySelector('.flip-meta');
      if (meta) {
        const metaEl = document.createElement('p');
        metaEl.innerHTML = `<em>${meta.textContent.trim()}</em>`;
        contentFrag.appendChild(metaEl);
      }
    }

    cells.push([labelFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
