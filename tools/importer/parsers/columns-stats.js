/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-stats
 * Base block: columns
 * Source selector: section.how-section
 * Description: Columns block with stats - side-by-side layout with text/stats content and image
 * Generated: 2026-05-06
 */
export default function parse(element, { document }) {
  // Extract image from media area
  const image = element.querySelector('.how-media img, .how-media picture, img');

  // Extract text content from copy area
  const heading = element.querySelector('h2.how-title, h2, .how-title');
  const subtitle = element.querySelector('p.how-subtitle, .how-subtitle, .how-copy > p');

  // Extract stats items
  const statItems = Array.from(element.querySelectorAll('.problem-item'));

  // Build the text content cell (column 1)
  const textCell = [];
  if (heading) textCell.push(heading);
  if (subtitle) textCell.push(subtitle);

  // Build stats list as structured content
  if (statItems.length > 0) {
    const statsList = document.createElement('ul');
    statItems.forEach((item) => {
      const stat = item.querySelector('.problem-stat');
      const copy = item.querySelector('.problem-copy');
      if (stat || copy) {
        const li = document.createElement('li');
        if (stat) {
          const strong = document.createElement('strong');
          strong.textContent = stat.textContent.trim();
          li.appendChild(strong);
        }
        if (copy) {
          const span = document.createElement('span');
          span.innerHTML = ` ${copy.innerHTML.trim()}`;
          li.appendChild(span);
        }
        statsList.appendChild(li);
      }
    });
    textCell.push(statsList);
  }

  // Build the image cell (column 2)
  const imageCell = [];
  if (image) imageCell.push(image);

  // Build cells: one row with two columns (text | image)
  const cells = [
    [textCell, imageCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-stats', cells });
  element.replaceWith(block);
}
