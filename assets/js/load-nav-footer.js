const loadNavbar = () => {
  const currentUrl = new URL(window.location.href);
  
  if (currentUrl.pathname == '/index.html') {
    nav = './assets/partials/navbar.html'
  } else {
    nav = '../assets/partials/navbar.html'
  }
  fetch(nav)
    .then(response => {
      if (!response.ok) throw new Error(`Errore nel caricamento: ${response.status}`);
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const placeholder = document.querySelector('#navbar-placeholder');
      if (!placeholder) return;

      doc.body.childNodes.forEach(node => placeholder.append(node));
    })
    .catch(err => console.error(err));
};

document.addEventListener('DOMContentLoaded', loadNavbar);
