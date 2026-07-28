---
layout: default
title: Home
permalink: /
---

<!-- CSS untuk Tampilan -->
<style>
  :root {
    /* DEFAULT SEKARANG DARK MODE */
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --link-color: #ff80bf;
    /* Latar belakang dengan efek overlay gelap agar teks tetap terbaca */
    --bg-image: linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.9)), url('/images/background-utama.jpg'); 
  }
  
  body.light-mode {
    /* MODE TERANG KETIKA TOMBOL DIKLIK */
    --bg-color: #ffffff;
    --text-color: #333333;
    --link-color: #e83e8c;
    --bg-image: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url('/images/background-utama.jpg');
  }
  
  body {
    background-color: var(--bg-color);
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: var(--text-color);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s, background-image 0.3s;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 20px 40px 20px;
  }

  /* Style untuk Foto Sampul / Banner */
  .cover-photo {
    width: 100%;
    height: 250px;
    background-image: url('/images/sampul-banner.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 12px 12px 0 0;
    margin-bottom: 25px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }

  .navbar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(150, 150, 150, 0.2);
    padding-bottom: 15px;
  }
  
  .navbar a {
    text-decoration: none;
    color: var(--text-color);
    font-size: 16px;
    font-weight: bold;
  }
  
  .navbar a:hover, .navbar a.active {
    color: var(--link-color);
  }
  
  .separator {
    color: var(--text-color);
    font-size: 16px;
  }

  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    font-size: 18px;
    margin-left: 15px;
  }

  /* Style untuk Dropdown Bahasa */
  .lang-select {
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--text-color);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
  }

  .lang-select option {
    color: #333; /* Warna hitam agar teks dropdown tetap terlihat jelas di browser */
  }
</style>

<!-- Foto Sampul (Banner) -->
<div class="cover-photo"></div>

<!-- Bagian Navigasi Atas -->
<div class="navbar">
  <a href="/" class="active">Home</a> <span class="separator">|</span>
  <a href="/journey/">Journey</a> <span class="separator">|</span>
  <a href="/cv/">Experience</a> <span class="separator">|</span>
  <a href="/projects/">Projects</a> <span class="separator">|</span>
  <a href="/gallery/">Gallery</a> <span class="separator">|</span>
  <a href="/writing/">Writing</a> <span class="separator">|</span>
  <a href="/contact/">Contact</a>
  
  <!-- Dropdown Bahasa -->
  <select class="lang-select" id="lang-switcher" onchange="switchLanguage()">
    <option value="id">ID</option>
    <option value="en">EN</option>
  </select>

  <!-- Tombol Tema -->
  <button class="nav-btn" onclick="toggleTheme()" title="Ganti Terang/Gelap">🌓</button>
</div>

<!-- Bagian Konten Utama -->
<h1>Rivaldi Fiqriyansah - Land Surveyor, Spatial Analysis & Urban Planning</h1>

<div style="display: flex; flex-wrap: wrap; gap: 40px; margin-top: 30px;">
  
  <!-- KOLOM KIRI: Teks Biografi (Ditambah ID untuk target JavaScript) -->
  <div style="flex: 1; min-width: 300px; line-height: 1.6;">
    <p id="text-welcome">Selamat datang di portofolio digital saya.</p>
    
    <p id="text-p1">Saat ini saya bekerja sebagai <strong>Land Surveyor</strong> untuk pengembang di kawasan Bogor, sekaligus menempuh studi S1 <strong>Perencanaan Wilayah dan Kota (PWK)</strong>. Saya memiliki ketertarikan yang sangat kuat terhadap analisis geospasial makro dan bagaimana data spasial dapat diolah menjadi landasan pengambilan keputusan tata ruang yang komprehensif.</p>
    
    <p id="text-p2">Tujuan profesional saya adalah bertransisi secara utuh menjadi seorang <em>Urban Planner</em> dan <em>Geospatial Analyst</em>, berfokus pada <em>Spatial Analysis</em>, <em>Remote Sensing</em>, dan Pemetaan Tematik menggunakan ArcGIS Pro dan skrip cloud.</p>
  </div>

  <!-- KOLOM KANAN: Foto Profil & Kontak -->
  <div style="flex: 0 0 250px;">
    <img src="/images/foto-profil.jpg" alt="Rivaldi Fiqriyansah" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    
    <div style="font-size: 0.85em; margin-top: 15px; line-height: 1.6;">
      <span id="text-contact"><strong>Kontak & Info:</strong></span><br>
      📍 Dramaga, Bogor, Jawa Barat<br>
      📧 rivaldifiqriyansah@gmail.com<br>
      🔗 <a href="https://www.linkedin.com/in/rivaldi-fiqriyansah-b6b1b3282/" target="_blank" style="color: var(--link-color);">LinkedIn</a>
    </div>
  </div>

</div>

<!-- Script JavaScript untuk interaksi -->
<script>
  // Fungsi ubah tema
  function toggleTheme() {
    document.body.classList.toggle('light-mode');
  }

  // Kamus Bahasa
  const translations = {
    id: {
      welcome: "Selamat datang di portofolio digital saya.",
      p1: "Saat ini saya bekerja sebagai <strong>Land Surveyor</strong> untuk pengembang di kawasan Bogor, sekaligus menempuh studi S1 <strong>Perencanaan Wilayah dan Kota (PWK)</strong>. Saya memiliki ketertarikan yang sangat kuat terhadap analisis geospasial makro dan bagaimana data spasial dapat diolah menjadi landasan pengambilan keputusan tata ruang yang komprehensif.",
      p2: "Tujuan profesional saya adalah bertransisi secara utuh menjadi seorang <em>Urban Planner</em> dan <em>Geospatial Analyst</em>, berfokus pada <em>Spatial Analysis</em>, <em>Remote Sensing</em>, dan Pemetaan Tematik menggunakan ArcGIS Pro dan skrip cloud.",
      contact: "<strong>Kontak & Info:</strong>"
    },
    en: {
      welcome: "Welcome to my digital portfolio.",
      p1: "I am currently working as a <strong>Land Surveyor</strong> for a developer in the Bogor area, while also pursuing my undergraduate degree in <strong>Urban and Regional Planning</strong>. I have a strong interest in macro geospatial analysis and how spatial data can be processed into a foundation for comprehensive spatial planning decisions.",
      p2: "My professional goal is to fully transition into an <em>Urban Planner</em> and <em>Geospatial Analyst</em>, focusing on <em>Spatial Analysis</em>, <em>Remote Sensing</em>, and Thematic Mapping using ArcGIS Pro and cloud scripts.",
      contact: "<strong>Contact & Info:</strong>"
    }
  };

  // Fungsi ubah bahasa
  function switchLanguage() {
    const lang = document.getElementById('lang-switcher').value;
    
    document.getElementById('text-welcome').innerHTML = translations[lang].welcome;
    document.getElementById('text-p1').innerHTML = translations[lang].p1;
    document.getElementById('text-p2').innerHTML = translations[lang].p2;
    document.getElementById('text-contact').innerHTML = translations[lang].contact;
  }
</script>
