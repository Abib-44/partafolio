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


document.addEventListener('DOMContentLoaded', () => {
  const isDeploy = window.location.hostname === 'abib-44.github.io';
  if (!isDeploy) return; // se siamo in locale, non facciamo niente

  // Seleziono tutti i link nella navbar
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Sostituisco solo i link interni del sito
    if (href.includes('index.html')) {
      link.setAttribute('href', '/portfolio/');
    } else if (href.includes('competences.html')) {
      link.setAttribute('href', '/portfolio/pages/competences.html');
    } else if (href.includes('projects.html')) {
      link.setAttribute('href', '/portfolio/pages/projects.html');
    } else if (href.includes('contact.html')) {
      link.setAttribute('href', '/portfolio/pages/contact.html');
    } else if (href.includes('hobbies.html')) {
      link.setAttribute('href', '/portfolio/pages/hobbies.html');
    }
  });
});
