// ====== Funzione per calcolare il path relativo dei partials ======
function getPartialPath(file) {
  const segments = window.location.pathname.split('/').filter(s => s);
  // -1 perché l'ultimo segmento è il file HTML corrente
  const depth = segments.length - 1;
  let prefix = '';
  for (let i = 0; i < depth; i++) prefix += '../';
  return prefix + 'assets/partials/' + file;
}

// ====== Funzione asincrona per caricare un partial nel DOM ======
async function loadPartial(id, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Errore nel caricamento: ${response.status}`);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const placeholder = document.querySelector(`#${id}`);
    if (!placeholder) return;
    // Appendo tutti i nodi del body
    doc.body.childNodes.forEach(node => placeholder.append(node));
    return true; // Indica che il partial è stato caricato
  } catch (err) {
    console.error(`Impossibile caricare ${path}:`, err);
    return false;
  }
}

// ====== Event listener per caricare navbar e footer ======
document.addEventListener('DOMContentLoaded', async () => {
  const navLoaded = await loadPartial('navbar-placeholder', getPartialPath('navbar.html'));
  console.log('Navbar caricata?', navLoaded);

  const footerLoaded = await loadPartial('footer-placeholder', getPartialPath('footer.html'));
  console.log('Footer caricata?', footerLoaded);
});
