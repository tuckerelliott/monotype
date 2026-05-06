export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  const cols = [...rows[0].children];
  if (cols.length >= 2) {
    cols[0].classList.add('columns-stats-media');
    cols[1].classList.add('columns-stats-content');
  }

  block.querySelectorAll('.columns-stats-content > div').forEach((item) => {
    if (item.querySelector('strong') && item.textContent.match(/\d+/)) {
      item.classList.add('stat-item');
    }
  });
}
