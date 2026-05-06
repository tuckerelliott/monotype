/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Monotype section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for styled sections.
 * Runs in afterTransform only.
 * Selectors validated against captured DOM from https://www.monotype.com
 *
 * Sections from page-templates.json:
 *   1. section.hero (style: dark)
 *   2. section.how-section (no style)
 *   3. section.selector-section (no style)
 *   4. section.monotype-portfolio-section (no style)
 *   5. section.workflow-tabs-section (style: dark)
 *   6. .mt-gallery-listing (no style)
 *   7. .mt-cta-section-default-wrapper (style: accent)
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;

    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid shifting DOM positions
    const reversedSections = [...sections].reverse();

    for (const section of reversedSections) {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block after the section element if it has a style
      if (section.style) {
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metadataBlock);
      }

      // Insert <hr> before section element if it is not the first section
      if (section !== sections[0]) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
