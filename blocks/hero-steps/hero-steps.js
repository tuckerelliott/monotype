export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const contentRow = rows[0];
  const cols = [...contentRow.children];

  if (cols.length >= 2) {
    cols[0].classList.add('hero-steps-content');
    cols[1].classList.add('hero-steps-list');
  }

  block.querySelectorAll('.hero-steps-list .step-item, .hero-steps-list > div > div').forEach((item, i) => {
    item.classList.add('step-item');
    const num = item.querySelector('.step-number');
    if (!num) {
      const numEl = document.createElement('div');
      numEl.className = 'step-number';
      numEl.textContent = String(i + 1).padStart(2, '0');
      item.prepend(numEl);
    }
  });
}
