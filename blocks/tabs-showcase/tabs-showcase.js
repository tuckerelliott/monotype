export default function decorate(block) {
  const rows = [...block.children];
  const tabNav = document.createElement('div');
  tabNav.className = 'tabs-showcase-nav';
  const tabPanels = document.createElement('div');
  tabPanels.className = 'tabs-showcase-panels';

  rows.forEach((row, i) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const label = cells[0].textContent.trim();
    const content = cells[1];

    const panel = document.createElement('div');
    panel.className = `tabs-showcase-panel${i === 0 ? ' is-active' : ''}`;
    panel.append(content);

    const btn = document.createElement('button');
    btn.className = `tabs-showcase-tab${i === 0 ? ' is-active' : ''}`;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      tabNav.querySelectorAll('.tabs-showcase-tab').forEach((t) => t.classList.remove('is-active'));
      tabPanels.querySelectorAll('.tabs-showcase-panel').forEach((p) => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      panel.classList.add('is-active');
    });
    tabNav.append(btn);
    tabPanels.append(panel);
  });

  block.textContent = '';
  block.append(tabNav, tabPanels);
}
