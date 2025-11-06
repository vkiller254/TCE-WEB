// ==============================
// THIKA COLLEGE — HEADER, HAMBURGER & CARD FILTER
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  // ===== FOOTER YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== HAMBURGER MENU =====
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('show', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile menu when clicking a nav link
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      });
    });
  }

  // ===== CARD CATEGORY FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        // Highlight active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards with smooth transition
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => (card.style.opacity = '1'), 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => (card.style.display = 'none'), 300);
          }
        });
      });
    });
  }

});
// ==============================
// SEARCH BAR FUNCTIONALITY
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-wrap input[type='search']");
  const newsGrid = document.getElementById("newsGrid");
  const cards = newsGrid.querySelectorAll(".card");

  searchInput.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const excerpt = card.querySelector(".card-excerpt").textContent.toLowerCase();

      if (title.includes(term) || excerpt.includes(term)) {
        card.style.display = ""; // show
      } else {
        card.style.display = "none"; // hide
      }
    });
  });
});
