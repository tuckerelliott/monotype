export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('product-card');
    const cells = [...row.children];
    if (cells.length >= 2) {
      cells[0].classList.add('card-image');
      cells[1].classList.add('card-body');
    }
  });
}
