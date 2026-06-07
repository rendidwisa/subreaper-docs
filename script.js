// ==========================================
// 1. Sidebar kiri toggle
// ==========================================
const layout = document.querySelector('.layout');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
const overlay = document.getElementById('sidebarOverlay');

const savedState = localStorage.getItem('sidebar-closed');
if (savedState === 'true') {
  layout.classList.add('sidebar-closed');
} else {
  layout.classList.remove('sidebar-closed');
}

function handleMobileOverlay() {
  if (window.innerWidth <= 768) {
    if (!layout.classList.contains('sidebar-closed')) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  } else {
    overlay.classList.remove('active');
  }
}

sidebarCloseBtn.addEventListener('click', () => {
  layout.classList.add('sidebar-closed');
  localStorage.setItem('sidebar-closed', 'true');
  handleMobileOverlay();
});

sidebarOpenBtn.addEventListener('click', () => {
  layout.classList.remove('sidebar-closed');
  localStorage.setItem('sidebar-closed', 'false');
  handleMobileOverlay();
});

overlay.addEventListener('click', () => {
  layout.classList.add('sidebar-closed');
  localStorage.setItem('sidebar-closed', 'true');
  handleMobileOverlay();
});

window.addEventListener('resize', handleMobileOverlay);
const observer = new MutationObserver(handleMobileOverlay);
observer.observe(layout, { attributes: true, attributeFilter: ['class'] });
handleMobileOverlay();

// ==========================================
// 2. Load halaman & bangun Table of Contents
// ==========================================
function buildTableOfContents() {
  const contentDiv = document.getElementById('content');
  const tocNav = document.getElementById('tocNav');
  if (!tocNav) return;

  const headings = contentDiv.querySelectorAll('h2, h3');
  tocNav.innerHTML = '';

  if (headings.length === 0) {
    tocNav.innerHTML = '<span style="color:#484f58;font-size:0.8rem;">No headings</span>';
    return;
  }

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}-${Math.random().toString(36).substr(2, 5)}`;
    }

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.classList.add(heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2');

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      document.querySelectorAll('.toc-nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });

    tocNav.appendChild(link);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = tocNav.querySelector(`a[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc-nav a').forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -80% 0px' });

  headings.forEach(h => observer.observe(h));
}

// Global state untuk mencegah infinite loop saat update hash otomatis
let isInternalLoading = false;

async function loadPage(page) {
  if (isInternalLoading) return;
  
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<div class="loading">Loading…</div>';

  try {
    const response = await fetch(`content/${page}.md`);
    if (!response.ok) throw new Error('Page not found');
    const markdown = await response.text();
    contentDiv.innerHTML = marked.parse(markdown);
    addCopyButtons();

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page) link.classList.add('active');
    });

    // Amankan perubahan hash agar tidak menembak listener secara redundan
    isInternalLoading = true;
    window.location.hash = page;
    setTimeout(() => { isInternalLoading = false; }, 50);

    buildTableOfContents();
  } catch (err) {
    contentDiv.innerHTML = '<h1>404</h1><p>Page not found.</p>';
    const tocNav = document.getElementById('tocNav');
    if (tocNav) tocNav.innerHTML = '';
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
        setTimeout(() => button.textContent = 'Copy', 1500);
      } catch {
        button.textContent = 'Failed';
      }
    });
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

// ==========================================
// 3. Centralized Routing Engine (Perbaikan Utama)
// ==========================================

// Fungsi tunggal untuk membaca rute dari URL hash saat ini
function router() {
  const currentHash = window.location.hash.slice(1) || 'welcome';
  loadPage(currentHash);
}

// Pantau perubahan hash secara realtime (klik tautan internal .md maupun navigasi luar)
window.addEventListener('hashchange', router);

// Inisialisasi halaman pertama kali saat web dibuka
document.addEventListener('DOMContentLoaded', router);

// Handler untuk Navigasi Kiri (Sidebar)
document.querySelector('.nav').addEventListener('click', (e) => {
  const link = e.target.closest('.nav-link');
  if (!link) return;
  
  const page = link.dataset.page;

  if (window.innerWidth <= 768) {
    layout.classList.add('sidebar-closed');
    localStorage.setItem('sidebar-closed', 'true');
    handleMobileOverlay();
  }
});