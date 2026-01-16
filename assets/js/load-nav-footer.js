async function loadPartial(id, file) {
  const currentUrl = new URL(window.location.href);
  let path;

  if (currentUrl.protocol === "https:") {
    path = `/portfolio/assets/partials/${file}`;
  } else {
    path = `/assets/partials/${file}`;
  }

  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to fetch: ${path}`);

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const placeholder = document.getElementById(id);

  doc.body.childNodes.forEach(n => placeholder.appendChild(n));
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('navbar-placeholder', 'navbar.html');
  await loadPartial('footer-placeholder', 'footer.html');

  if (window.location.protocol === "https:") {
    replaceNavLinks();
  }
});



document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('navbar-placeholder', 'navbar.html');
  await loadPartial('footer-placeholder', 'footer.html');

  const currentUrl = new URL(window.location.href);
  if (currentUrl.protocol == "https:") {
    replaceNavLinks();
  }

});
