const linksList = document.getElementById('links-list');
const container = document.getElementById('saved-links-container');

// Função para carregar links do localStorage
function loadLinks() {
  linksList.innerHTML = '';
  const links = JSON.parse(localStorage.getItem('savedLinks') || '[]');
  links.forEach(link => {
    const div = document.createElement('div');
    div.className = 'link-item';
    div.innerHTML = `<a href="${link.url}" target="_blank">${link.desc}</a>`;
    linksList.appendChild(div);
  });
}

// Função para salvar links no localStorage
function saveLinks() {
  const rows = container.querySelectorAll('.link-input-row');
  const links = [];
  rows.forEach(row => {
    const desc = row.querySelector('.link-desc').value.trim();
    const url = row.querySelector('.link-url').value.trim();
    if (desc && url) {
      links.push({ desc, url });
    }
  });
  localStorage.setItem('savedLinks', JSON.stringify(links));
  loadLinks();
}

// Detecta quando o usuário digita nos inputs
container.addEventListener('input', (e) => {
  if (!e.target.classList.contains('link-desc') && !e.target.classList.contains('link-url')) return;

  const lastRow = container.querySelector('.link-input-row:last-child');
  const desc = lastRow.querySelector('.link-desc').value.trim();
  const url = lastRow.querySelector('.link-url').value.trim();

  // Se tiver algo escrito na última linha, cria uma nova linha
  if (desc || url) {
    const newRow = lastRow.cloneNode(true);
    newRow.querySelector('.link-desc').value = '';
    newRow.querySelector('.link-url').value = '';
    container.appendChild(newRow);
  }

  saveLinks();
});

// Inicializa
loadLinks();
