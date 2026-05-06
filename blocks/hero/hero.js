export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const content = row.querySelector(':scope > div');
  if (content) {
    content.classList.add('hero-content');
  }
}
