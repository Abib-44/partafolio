document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.skills__filter');
  const cards = document.querySelectorAll('.skill-card');

  if (!filters.length || !cards.length) return;

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(btn => btn.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.dataset.filter;

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
