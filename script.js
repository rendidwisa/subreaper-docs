async function loadPage(page) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<div class="loading">Loading…</div>';
 
  try {
    const response = await fetch(`content/${page}.md`);
    if (!response.ok) throw new Error('Page not found');
    const markdown = await response.text();
    contentDiv.innerHTML = marked.parse(markdown);
    addCopyButtons();
    // Highlight active link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page) link.classList.add('active');
    });

    // Update URL hash tanpa reload
    window.location.hash = page;
  } catch (err) {
    contentDiv.innerHTML = '<h1>404</h1><p>Page not found.</p>';
  }
}

function addCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText || '';

      try {
        await navigator.clipboard.writeText(code);

        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 1500);
      } catch {
        button.textContent = 'Failed';
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

// Inisialisasi: load halaman sesuai hash atau default 'welcome'
const initialPage = window.location.hash.slice(1) || 'welcome';
loadPage(initialPage);

// Delegasi event untuk navigasi
document.querySelector('.nav').addEventListener('click', (e) => {
  e.preventDefault();
  const link = e.target.closest('.nav-link');
  if (!link) return;
  const page = link.dataset.page;
  loadPage(page);
});