export default function decorate(block) {
  const content = block.querySelector(':scope > div');
  if (content) {
    content.classList.add('hero-cta-content');
  }
}
