---
layout: default
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
    --bg-image: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop');
  }
  
  body {
    background-color: var(--bg-color);
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Bikin background diam saat di-scroll */
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
    background-image: background-image: url('/images/sampul-banner.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 12px 12px 0 0;
    margin-bottom: 25px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }

  .navbar {
    display: flex;
    justify-content: center; /* Menu dibikin di tengah biar rapi */
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(150, 150, 150, 0.2);
    padding-bottom: 15px;
  }
  .navbar a {
    text-decoration: none;
    color: var(--text-color);
    font-size: 15px;
    font-weight: 500;
  }
  .navbar a:hover, .navbar a.active {
    color: var(--link-color);
  }
  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    font-size: 18px;
    margin-left: 10px;
  }
</style>

<!-- Foto Sampul (Banner) -->
<div class="cover-photo"></div>

<!-- Bagian Navigasi Atas -->
<div class="navbar">
  <a href="/" class="active">Home</a>
  <a href="#">Projects</a>
  <a href="#">Skills</a>
  <a href="#">Blog/Insight</a>
  <a href="#">Publications</a>
  <a href="#">About Me</a>
  <a href="/cv/">CV</a>
  <a href="#">Contact</a>
  <button class="nav-btn" onclick="toggleTheme()" title="Ganti Terang/Gelap">🌓</button>
</div>

<!-- Bagian Konten Utama -->
<h1>Rivaldi Fiqriyansah - Land Surveyor, Spatial Analysis & Urban Planning</h1>
<p><em>Dramaga, Bogor | ArcGIS Pro | Google Earth Engine</em></p>

<div style="display: flex; flex-wrap: wrap; gap: 40px; margin-top: 30px;">
  
  <!-- KOLOM KIRI: Teks Biografi -->
  <div style="flex: 1; min-width: 300px; line-height: 1.6;">
    <p>Selamat datang di portofolio digital saya.</p>
    
    <p>Saat ini saya bekerja sebagai <strong>Land Surveyor</strong> untuk pengembang di kawasan Bogor, sekaligus menempuh studi S1 <strong>Perencanaan Wilayah dan Kota (PWK)</strong>. Saya memiliki ketertarikan yang sangat kuat terhadap analisis geospasial makro dan bagaimana data spasial dapat diolah menjadi landasan pengambilan keputusan tata ruang yang komprehensif.</p>
    
    <p>Tujuan profesional saya adalah bertransisi secara utuh menjadi seorang <em>Urban Planner</em> dan <em>Geospatial Analyst</em>, berfokus pada <em>Spatial Analysis</em>, <em>Remote Sensing</em>, dan Pemetaan Tematik menggunakan ArcGIS Pro dan skrip cloud.</p>
  </div>

  <!-- KOLOM KANAN: Foto Profil & Kontak -->
  <div style="flex: 0 0 250px;">
    <img <img src="/images/foto-profil.jpg" alt="Rivaldi Fiqriyansah" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    
    <div style="font-size: 0.85em; margin-top: 15px; line-height: 1.6;">
      <strong>Kontak & Info:</strong><br>
      📍 Dramaga, Bogor, Jawa Barat<br>
      📧 rivaldifiqriyansah@gmail.com<br>
      🔗 <a href="https://www.linkedin.com/in/rivaldi-fiqriyansah-b6b1b3282/" target="_blank" style="color: var(--link-color);">LinkedIn</a>
    </div>
  </div>

</div>

<!-- Script JavaScript untuk interaksi tombol -->
<script>
  // Fungsi ubah tema sekarang dari Dark (default) ke Light
  function toggleTheme() {
    document.body.classList.toggle('light-mode');
  }
</script>
