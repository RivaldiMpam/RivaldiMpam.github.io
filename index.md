---
layout: default
---

<!-- CSS untuk Menu Navigasi & Dark Mode -->
<style>
  :root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --link-color: #e83e8c; /* Warna pink/ungu ala al-folio */
  }
  body.dark-mode {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --link-color: #ff80bf;
  }
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    margin-bottom: 50px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 15px;
  }
  .navbar a {
    text-decoration: none;
    color: var(--text-color);
    font-size: 16px;
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
  }
</style>

<!-- Bagian Navigasi Atas -->
<div class="navbar">
  <a href="#" class="active">about</a>
  <a href="#">blog</a>
  <a href="#">publications</a>
  <a href="#">projects</a>
  <a href="/cv/">CV</a>
  <button class="nav-btn" onclick="toggleLang()" title="Ganti Bahasa">🌐 ID/EN</button>
  <button class="nav-btn" onclick="toggleTheme()" title="Dark/Light Mode">🌓</button>
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
    <img src="https://via.placeholder.com/250x300?text=Foto+Profil" alt="Rivaldi Fiqriyansah" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    
    <div style="font-size: 0.85em; margin-top: 15px; line-height: 1.6;">
      <strong>Kontak & Info:</strong><br>
      📍 Dramaga, Bogor, Jawa Barat<br>
      📧 email.lo@gmail.com<br>
      🔗 <a href="#" style="color: var(--link-color);">LinkedIn</a> | <a href="#" style="color: var(--link-color);">Instagram</a>
    </div>
  </div>

</div>

<!-- Script JavaScript untuk interaksi tombol -->
<script>
  // Fungsi Dark Mode
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
  
  // Fungsi Ganti Bahasa (Sementara)
  function toggleLang() {
    alert("Fitur ganti bahasa sedang disiapkan! Nanti kita aktifkan setelah konten halaman utama rapi.");
  }
</script>
