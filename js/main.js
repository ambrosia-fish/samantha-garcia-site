// Theme handling
function setTheme(theme) {
  if (theme) {
    document.documentElement.style.setProperty('--current-primary', `var(--${theme}-primary)`);
    document.documentElement.style.setProperty('--current-accent', `var(--${theme}-accent)`);
  } else {
    // Reset to home theme
    document.documentElement.style.setProperty('--current-primary', 'var(--home-primary)');
    document.documentElement.style.setProperty('--current-accent', 'var(--home-accent)');
  }
}

// Set initial theme based on current page
const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
if (currentPage && currentPage !== 'index') {
  setTheme(currentPage);
}

// Navigation hover effects
document.querySelectorAll('.nav-link').forEach(link => {
  const page = link.getAttribute('href').replace('.html', '').replace('/', '');
  
  // Set active state for current page
  if (page === currentPage) {
    link.classList.add('active');
  }

  // Only apply hover effects on non-current pages
  if (page !== currentPage) {
    link.addEventListener('mouseover', () => {
      if (page) setTheme(page);
    });

    link.addEventListener('mouseout', () => {
      setTheme(currentPage || null);
    });
  }
});

// Reset theme when clicking logo (only if not on home page)
document.querySelector('.logo').addEventListener('click', (e) => {
  if (currentPage !== 'index' && currentPage !== '') {
    e.preventDefault();
    window.location.href = '/';
  }
});