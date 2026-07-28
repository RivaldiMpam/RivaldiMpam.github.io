---
layout: page
title: Gallery
permalink: /gallery/
---

<!-- CSS untuk Layout, Navbar, dan Animasi Background -->
<style>
  :root {
    --bg-dark: #1a1a1a;
    --sidebar-bg: #2d2d2d;
    --active-blue: #0d6efd;
    --text-light: #f0f0f0;
    --text-muted: #a0a0a0;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    margin: 0;
  }

  /* --- STYLE ANIMASI BACKGROUND ABSTRAK --- */
  .bg-animation-container {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -2;
    overflow: hidden;
    background-color: #111;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5vh 0;
  }

  .bg-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: radial-gradient(circle, rgba(26,26,26,0.65) 0%, rgba(15,15,15,0.85) 100%);
    z-index: -1;
  }

  .bg-track {
    display: flex;
    width: max-content;
    opacity: 0.45;
  }

  .bg-track img {
    height: 35vh;
    width: auto;
    object-fit: cover;
    margin: 0 15px;
    border-radius: 12px;
    filter: grayscale(60%) blur(1px);
  }

  .track-1 { animation: slideLeft 90s linear infinite; }
  .track-2 { animation: slideRight 100s linear infinite; }

  @keyframes slideLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes slideRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* --- STYLE NAVBAR --- */
  .navbar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 10;
  }
  .navbar a {
    text-decoration: none;
    color: var(--text-light);
    font-size: 16px;
    font-weight: bold;
    transition: 0.3s;
  }
  .navbar a:hover, .navbar a.active {
    color: var(--active-blue);
  }
  .separator {
    color: var(--text-muted);
    font-size: 16px;
  }

  /* --- STYLE KONTEN GALERI --- */
  .main-content {
    position: relative;
    z-index: 10;
    padding: 0 20px;
    text-align: center;
  }

  .main-content h1 {
    margin-bottom: 10px;
    font-size: 2.2em;
  }

  .subtitle {
    color: var(--text-muted);
    margin-bottom: 40px;
    font-size: 1em;
  }

  /* Filter Kategori - Terinspirasi dari Pertamina */
  .filter-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
  }

  .filter-btn {
    background: rgba(45, 45, 45, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-muted);
    padding: 10px 28px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .filter-btn:hover {
    background: rgba(13, 110, 253, 0.2);
    color: var(--text-light);
    border-color: var(--active-blue);
  }

  .filter-btn.active {
    background: var(--active-blue);
    color: white;
    border-color: var(--active-blue);
  }

  /* Grid Galeri */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto 50px auto;
  }

  .gallery-item {
    background: rgba(45, 45, 45, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
  }

  .gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-color: var(--active-blue);
  }

  .gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  .gallery-item .info {
    padding: 15px 18px 18px;
    text-align: left;
  }

  .gallery-item .info h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    color: var(--text-light);
  }

  .gallery-item .info .category {
    display: inline-block;
    font-size: 12px;
    color: var(--active-blue);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .gallery-item .info .date {
    font-size: 12px;
    color: var(--text-muted);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    .filter-btn {
      padding: 8px 18px;
      font-size: 12px;
    }
    .bg-track img {
      height: 25vh;
    }
    .main-content h1 {
      font-size: 1.8em;
    }
  }
</style>

<!-- ================= ANIMASI BACKGROUND FIXED ================= -->
<div class="bg-animation-container">
  <!-- Baris Atas -->
  <div class="bg-track track-1">
    <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="bg">
    <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="bg">
    <img src="/images/ININ/orthophoto-processing-data.jpg" alt="bg">
    <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan.jpg" alt="bg">
    <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="bg">
    <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="bg">
    <img src="/images/ININ/orthophoto-processing-data.jpg" alt="bg">
    <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan.jpg" alt="bg">
  </div>
  <!-- Baris Bawah -->
  <div class="bg-track track-2">
    <img src="/images/ININ/topografi.jpg" alt="bg">
    <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan-2.jpg" alt="bg">
    <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="bg">
    <img src="/images/KIPI/joint-survey.jpg" alt="bg">
    <img src="/images/ININ/topografi.jpg" alt="bg">
    <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan-2.jpg" alt="bg">
    <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="bg">
    <img src="/images/KIPI/joint-survey.jpg" alt="bg">
  </div>
</div>
<div class="bg-overlay"></div>
<!-- ============================================================ -->

<!-- ================= KONTEN UTAMA ================= -->
<div class="main-content">

  <!-- Navigasi Menu Atas -->
  <div class="navbar">
    <a href="/">Home</a> <span class="separator">|</span>
    <a href="/journey/">Journey</a> <span class="separator">|</span>
    <a href="/cv/">Experience</a> <span class="separator">|</span>
    <a href="/projects/">Projects</a> <span class="separator">|</span>
    <a href="/gallery/" class="active">Gallery</a> <span class="separator">|</span>
    <a href="/writing/">Writing</a> <span class="separator">|</span>
    <a href="/contact/">Contact</a>
  </div>

  <!-- Judul -->
  <h1>Galeri Dokumentasi</h1>
  <p class="subtitle">Kegiatan lapangan dan proyek yang telah saya kerjakan</p>

  <!-- Filter Kategori - Terinspirasi dari Pertamina -->
  <div class="filter-container">
    <button class="filter-btn active" data-filter="all">Semua</button>
    <button class="filter-btn" data-filter="magang">Magang</button>
    <button class="filter-btn" data-filter="kipi">PT KIPI</button>
    <button class="filter-btn" data-filter="inti">PT Inti Innovaco</button>
  </div>

  <!-- Grid Galeri -->
  <div class="gallery-grid" id="galleryGrid">
    <!-- Item akan di-generate oleh JavaScript -->
  </div>

</div>

<script>
  // ===== DATA GALERI =====
  // Tambahkan foto-foto di sini sesuai dengan yang sudah ada di folder /images/
  // Format: { src, title, category, date, description? }
  
  const galleryData = [
    // ---- MAGANG ----
    {
      src: '/images/magang/Pengukuran-areal-kebakaran.jpg',
      title: 'Pengukuran Areal Kebakaran',
      category: 'magang',
      date: 'Juni 2022'
    },
    {
      src: '/images/magang/pengukuran-lahan.jpg',
      title: 'Pengukuran Lahan',
      category: 'magang',
      date: 'Juni 2022'
    },
    {
      src: '/images/magang/pengukuran-lahan-2.jpg',
      title: 'Pengukuran Lahan 2',
      category: 'magang',
      date: 'Juli 2022'
    },
    {
      src: '/images/magang/pengukuran-lahan-3.jpg',
      title: 'Pengukuran Lahan 3',
      category: 'magang',
      date: 'Juli 2022'
    },

    // ---- PT KIPI ----
    {
      src: '/images/KIPI/DCP.jpg',
      title: 'Dynamic Cone Penetrometer Test',
      category: 'kipi',
      date: '2023'
    },
    {
      src: '/images/KIPI/Handling%20material.jpg',
      title: 'Handling Material',
      category: 'kipi',
      date: '2023'
    },
    {
      src: '/images/KIPI/Land%20development%20area%20komersial.jpg',
      title: 'Land Development Area Komersial',
      category: 'kipi',
      date: '2024'
    },
    {
      src: '/images/KIPI/Pengawas%20repair%20jalan%20kawasan.jpg',
      title: 'Pengawasan Repair Jalan Kawasan',
      category: 'kipi',
      date: '2024'
    },
    {
      src: '/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg',
      title: 'Survey dengan Topcon GM 50 Series',
      category: 'kipi',
      date: '2023'
    },
    {
      src: '/images/KIPI/Topografi%20142%20hektare.jpg',
      title: 'Topografi 142 Hektare',
      category: 'kipi',
      date: '2024'
    },
    {
      src: '/images/KIPI/Topografi%20jalan%20kawasan.jpg',
      title: 'Topografi Jalan Kawasan',
      category: 'kipi',
      date: '2024'
    },
    {
      src: '/images/KIPI/joint-survey.jpg',
      title: 'Joint Survey Lintas Tim',
      category: 'kipi',
      date: '2023'
    },

    // ---- PT INTI INNOVACO ----
    {
      src: '/images/ININ/cut-n-fill-kavling.jpg',
      title: 'Proses Cut and Fill Kavling',
      category: 'inti',
      date: 'Jan 2026'
    },
    {
      src: '/images/ININ/orthophoto-processing-data.jpg',
      title: 'Processing Data Orthophoto',
      category: 'inti',
      date: 'Feb 2026'
    },
    {
      src: '/images/ININ/pengukuran-batas.jpg',
      title: 'Pengukuran Batas Area',
      category: 'inti',
      date: 'Jan 2026'
    },
    {
      src: '/images/ININ/pengukuran-lahan.jpg',
      title: 'Kegiatan Pengukuran Lahan',
      category: 'inti',
      date: 'Feb 2026'
    },
    {
      src: '/images/ININ/tim-teknis.jpg',
      title: 'Koordinasi Tim Teknis',
      category: 'inti',
      date: 'Jan 2026'
    },
    {
      src: '/images/ININ/topografi.jpg',
      title: 'Survey Topografi',
      category: 'inti',
      date: 'Feb 2026'
    }
  ];

  // ===== RENDER GALERI =====
  function renderGallery(filter = 'all') {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === filter);

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; padding: 40px 0;">Belum ada foto untuk kategori ini.</p>`;
      return;
    }

    filtered.forEach(item => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      
      // Map category ke label yang lebih rapi
      const categoryMap = {
        'magang': 'Magang',
        'kipi': 'PT KIPI',
        'inti': 'PT Inti Innovaco'
      };

      div.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="info">
          <span class="category">${categoryMap[item.category] || item.category}</span>
          <h3>${item.title}</h3>
          <span class="date">${item.date}</span>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  // ===== FILTER BUTTON =====
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderGallery(this.dataset.filter);
    });
  });

  // ===== RENDER AWAL =====
  renderGallery('all');
</script>
