function getRelativeRoot() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  let depth = parts.length - 1;
  let prefix = '';
  while (depth--) prefix += '../';
  return prefix;
}

async function loadPartial(id, file) {
  const root = getRelativeRoot();
  const path = root + 'assets/partials/' + file;

  const response = await fetch(path);
  if (!response.ok) throw new Error(path);

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const placeholder = document.getElementById(id);

  doc.body.childNodes.forEach(n => placeholder.appendChild(n));
}

function replaceNavLinks() {
  const navLinks = document.querySelectorAll('.nav__link');

  console.log('Nav links trovati:', navLinks.length);

  navLinks.forEach((link, i) => {
    const href = link.getAttribute('href');
    console.log(`Link ${i} prima:`, href);

    if (!href) return;

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
    } else if (href.includes('avatar.jpeg')) {
      link.setAttribute('href', '/portfolio/assets/img/avatar.jpeg');
    }

    console.log(`Link ${i} dopo:`, link.getAttribute('href'));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('navbar-placeholder', 'navbar.html');
  await loadPartial('footer-placeholder', 'footer.html');

  const currentUrl = new URL(window.location.href);
  if (currentUrl.protocol == "https:") {
    replaceNavLinks();
  }

});
