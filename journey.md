---
layout: page
title: Journey
permalink: /journey/
---

<!-- CSS untuk Layout ala Astra (Sidebar Kiri & Konten Kanan) dalam Dark Mode -->
<style>
  :root {
    --bg-dark: #1a1a1a;
    --sidebar-bg: #2d2d2d;
    --active-blue: #0d6efd; /* Warna biru ala Astra untuk penanda aktif */
    --text-light: #f0f0f0;
    --text-muted: #a0a0a0;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-light);
  }

  .journey-wrapper {
    display: flex;
    flex-direction: row;
    gap: 30px;
    max-width: 900px;
    margin: 40px auto;
    align-items: flex-start;
  }

  /* Styling Sidebar Kiri */
  .journey-sidebar {
    flex: 0 0 250px;
    background-color: var(--sidebar-bg);
    border-radius: 12px;
    padding: 20px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    position: sticky;
    top: 20px;
  }

  .tab-button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    color: var(--text-muted);
    text-align: left;
    padding: 15px 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }

  .tab-button:hover {
    color: var(--text-light);
    background-color: rgba(255, 255, 255, 0.05);
  }

  /* State saat menu sedang aktif/diklik */
  .tab-button.active {
    color: var(--text-light);
    border-left: 4px solid var(--active-blue);
    background-color: rgba(13, 110, 253, 0.15);
  }

  /* Styling Konten Kanan */
  .journey-content-area {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }

  .tab-content {
    display: none; /* Disembunyikan secara default */
    animation: fadeIn 0.5s ease;
  }

  .tab-content.active {
    display: block; /* Ditampilkan jika punya class active */
  }

  .tab-content h2 {
    color: var(--active-blue);
    margin-top: 0;
    margin-bottom: 5px;
  }

  .tab-content .date-badge {
    display: inline-block;
    background-color: #333;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85em;
    color: #ccc;
    margin-bottom: 20px;
  }

  .tab-content img {
    width: 100%;
    border-radius: 8px;
    margin-top: 15px;
    border: 1px solid #444;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Responsif untuk layar HP (Sidebar berubah jadi di atas) */
  @media (max-width: 768px) {
    .journey-wrapper {
      flex-direction: column;
    }
    .journey-sidebar {
      width: 100%;
      flex: none;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
    }
    .tab-button {
      width: auto;
      flex: 1;
      border-left: none;
      border-bottom: 3px solid transparent;
      text-align: center;
      padding: 10px;
      font-size: 14px;
    }
    .tab-button.active {
      border-left: none;
      border-bottom: 3px solid var(--active-blue);
    }
  }
</style>

<h1>Perjalanan Karir</h1>
<p><em>Merekam jejak dari titik koordinat pertama di lapangan hingga analisis geospasial.</em></p>

<div class="journey-wrapper">
  
  <!-- KOLOM KIRI: Sidebar Navigasi -->
  <div class="journey-sidebar">
    <!-- onclick akan memanggil fungsi bukaTab() di JavaScript bawah -->
    <button class="tab-button active" onclick="bukaTab(event, 'magang')">Magang</button>
    <button class="tab-button" onclick="bukaTab(event, 'kipi')">PT KIPI</button>
    <button class="tab-button" onclick="bukaTab(event, 'inti')">PT Inti Innovaco</button>
  </div>

  <!-- KOLOM KANAN: Area Konten Storytelling -->
  <div class="journey-content-area">
    
    <!-- KONTEN 1: MAGANG -->
    <div id="magang" class="tab-content active">
      <h2>Masa Formatif & Langkah Pertama</h2>
      <span class="date-badge">Mei 2022 - Agustus 2022</span>
      <p>Perjalanan karir profesional saya dimulai pada bulan Mei 2022. Selama 4 bulan, saya melaksanakan magang sebagai Asisten Surveyor sekaligus Analis GIS di PT Kalimantan Industrial Park Indonesia[cite: 1].</p>
      <p>Fase ini menjadi titik krusial di mana saya mulai menerapkan langsung teori teknik geomatika yang telah saya pelajari ke dalam realitas lapangan industri skala besar. Ini adalah masa adaptasi dan observasi mendalam tentang bagaimana data spasial dikumpulkan dan dikelola.</p>
      <!-- Ganti src dengan foto dokumentasi magang -->
      <img src="/images/journey-magang.jpg" alt="Dokumentasi Magang">
    </div>

    <!-- KONTEN 2: PT KIPI -->
    <div id="kipi" class="tab-content">
      <h2>Terjun ke Proyek Skala Besar</h2>
      <span class="date-badge">15 November 2022 - November 2025</span>
      <p>Berawal pada 15 November 2022, saya resmi bergabung sebagai staf penuh dengan peran Asisten Surveyor dan Staf GIS hingga Februari 2024[cite: 1]. Tanggung jawab saya meliputi pelaksanaan survei lahan, patroli batas areal menggunakan drone, dan digitasi peta berbasis GIS[cite: 1].</p>
      <p>Melihat performa di lapangan, pada Maret 2024 saya dipercaya untuk mengambil peran lebih besar sebagai Surveyor[cite: 1]. Selama periode ini hingga kontrak berakhir di November 2025, fokus utama saya adalah eksekusi survei topografi menggunakan instrumen presisi tinggi (Total Station dan GNSS Geodetic), mengelola data spasial dengan ArcGIS Pro dan Civil 3D, serta mengawasi pekerjaan konstruksi dan penyiapan lahan kawasan industri secara langsung[cite: 1]. Tiga tahun di Kalimantan memberikan saya pemahaman komprehensif tentang kerasnya dinamika proyek lapangan.</p>
      <!-- Ganti src dengan foto penerbangan drone atau di Kalimantan -->
      <img src="/images/journey-kipi.jpg" alt="Dokumentasi PT KIPI">
    </div>

    <!-- KONTEN 3: PT INTI INNOVACO -->
    <div id="inti" class="tab-content">
      <h2>Menuju Perencanaan Wilayah Terintegrasi</h2>
      <span class="date-badge">Januari 2026 - Sekarang</span>
      <p>Memasuki awal 2026, saya kembali ke Bogor dan memulai babak baru sebagai Land Surveyor di PT Inti Innovaco[cite: 1]. Di sini, saya bertugas mengawal akurasi pengukuran untuk pengembangan lahan *developer*, menganalisis data survei, dan menyusun laporan teknis yang komprehensif[cite: 1].</p>
      <p>Bersamaan dengan posisi ini, saya juga mendalami ilmu Perencanaan Wilayah dan Kota secara akademis. Kombinasi antara data lapangan sebagai surveyor dan analisis makro sebagai seorang mahasiswa perencanaan membuat saya semakin berfokus pada integrasi *Spatial Analysis* menggunakan ArcGIS Pro dan skrip berbasis *cloud*. Transisi dari sekadar pengumpul data lapangan menjadi pengambil keputusan berbasis geospasial sedang dibentuk di fase ini.</p>
      <!-- Ganti src dengan foto terbaru saat di Inti Innovaco -->
      <img src="/images/journey-inti.jpg" alt="Dokumentasi PT Inti Innovaco">
    </div>

  </div>
</div>

<!-- JavaScript untuk mengatur perpindahan antar menu (Tab) -->
<script>
function bukaTab(evt, namaFase) {
  // 1. Sembunyikan semua elemen yang punya class="tab-content"
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }

  // 2. Hilangkan class "active" dari semua tombol menu di sidebar
  tablinks = document.getElementsByClassName("tab-button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // 3. Tampilkan konten yang dipilih dan tambahkan class "active" ke tombol yang diklik
  document.getElementById(namaFase).style.display = "block";
  document.getElementById(namaFase).classList.add("active");
  evt.currentTarget.classList.add("active");
}
</script>
