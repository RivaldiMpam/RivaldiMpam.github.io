---
layout: default
title: ArcGIS Pro Projects
permalink: /software/arcgis/
---

<style>
  /* --- WARNA & VARIABEL --- */
  :root {
    --esri-blue: #005e95;
    --esri-dark-blue: #003a5c;
    --card-bg: rgba(30, 30, 30, 0.8);
  }

  body.light-mode {
    --card-bg: #ffffff;
  }

  /* --- 1. TAMPILAN KATALOG --- */
  #catalog-view {
    display: block;
    animation: fadeIn 0.5s ease;
  }

  .catalog-header {
    text-align: center;
    margin-bottom: 40px;
  }
  .catalog-header h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  .catalog-header p {
    color: var(--text-muted, #a0a0a0);
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .esri-card {
    background-color: var(--card-bg);
    border-top: 4px solid #f89927;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    border: 1px solid rgba(150,150,150,0.1);
    border-top: 4px solid #f89927;
  }

  .esri-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  }

  .card-tag {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--text-muted, #a0a0a0);
    margin-bottom: 10px;
    display: block;
    letter-spacing: 1px;
  }

  .esri-card h3 {
    margin: 0 0 15px 0;
    color: var(--active-blue, #0d6efd);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-muted, #a0a0a0);
    margin-top: 20px;
    border-top: 1px solid rgba(150,150,150,0.1);
    padding-top: 10px;
  }

  /* --- 2. TAMPILAN STORYMAPS (REFERENSI BARU) --- */
  #storymap-view {
    display: none; /* Disembunyikan awalnya */
    position: relative;
    width: 100%;
    height: 85vh; /* Membuatnya nyaris full screen */
    
    /* Background peta ditaruh di sini biar immersive */
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/software/hasil-peta-topografi.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    animation: fadeIn 0.5s ease;
  }

  /* Panel Cerita Melayang di Kiri */
  .story-panel {
    position: absolute;
    top: 0;
    left: 0; /* Bisa diganti misal left: 5% kalau mau ngambang */
    width: 450px;
    height: 100%;
    background-color: rgba(0, 74, 117, 0.95); /* Warna Biru Khas Esri StoryMaps */
    color: #ffffff;
    padding: 40px;
    overflow-y: auto;
    box-shadow: 5px 0 25px rgba(0,0,0,0.6);
  }

  /* Kustomisasi Scrollbar agar estetis */
  .story-panel::-webkit-scrollbar {
    width: 6px;
  }
  .story-panel::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  /* Tombol Kembali */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 30px;
    transition: background 0.3s;
  }
  .back-btn:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  /* Tipografi di dalam Story Panel */
  .story-section {
    margin-bottom: 45px;
  }
  
  .story-section h1 {
    font-size: 32px;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .story-section h2 {
    font-size: 22px;
    margin-bottom: 15px;
    border-bottom: 2px solid rgba(255,255,255,0.2);
    padding-bottom: 8px;
    color: #f89927; /* Aksen Oranye Esri */
  }

  .story-section p, .story-section ul, .story-section ol {
    font-size: 16px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 15px;
  }

  .story-section li {
    margin-bottom: 10px;
  }

  /* Gambar di dalam teks cerita */
  .inline-image {
    width: 100%;
    border-radius: 6px;
    margin: 15px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* Responsif untuk layar HP */
  @media (max-width: 768px) {
    .story-panel {
      width: 100%;
      position: relative;
      background-color: rgba(0, 74, 117, 1);
    }
    #storymap-view {
      overflow-y: auto;
    }
  }
</style>

<!-- ================= VIEW 1: KATALOG ================= -->
<div id="catalog-view">
  <div class="catalog-header">
    <h1>ArcGIS Pro Portfolio</h1>
    <p>Kumpulan studi kasus, otomatisasi, dan analisis geospasial.</p>
  </div>

  <div class="catalog-grid">
    <!-- Kartu Materi 1 -->
    <div class="esri-card" onclick="openStory()">
      <span class="card-tag">Geoprocessing Workflow</span>
      <h3>Automasi Ekstraksi Topografi</h3>
      <p style="font-size: 14px;">Menggunakan ModelBuilder untuk ekstraksi kontur dan elevasi secara otomatis dari data DEMNAS skala kecamatan.</p>
      <div class="card-footer">
        <span>StoryMap Format</span>
        <span>ArcGIS Pro 3.x</span>
      </div>
    </div>
  </div>
</div>

<!-- ================= VIEW 2: STORYMAPS MODE ================= -->
<div id="storymap-view">
  
  <!-- Panel Narasi Kiri (Bisa di-scroll) -->
  <div class="story-panel">
    <button class="back-btn" onclick="closeStory()">
      <span>←</span> Kembali ke Katalog
    </button>
    
    <!-- Bagian 1: Judul -->
    <div class="story-section">
      <h1>Automasi Ekstraksi Topografi Tingkat Kecamatan</h1>
      <p><em>Rivaldi Fiqriyansah — Planner's Workflow Series</em></p>
    </div>

    <!-- Bagian 2: Tujuan -->
    <div class="story-section">
      <h2>Tujuan & Konteks Tata Ruang</h2>
      <p>Dalam perencanaan wilayah, peta topografi merupakan data dasar esensial. Tujuan pembuatan peta ini di tingkat kecamatan adalah untuk memetakan konfigurasi rupa bumi, sebaran elevasi, serta pola kelerengan secara komprehensif.</p>
      <p>Informasi ini sangat krusial dalam tahap awal perencanaan, seperti menentukan kesesuaian lahan, merencanakan sistem drainase, dan mengidentifikasi potensi kebencanaan. Interval kontur 5 meter dipilih untuk memberikan gambaran makro yang detail tanpa membuat peta menjadi terlalu padat.</p>
    </div>

    <!-- Bagian 3: Sumber Data -->
    <div class="story-section">
      <h2>Akuisisi Sumber Data</h2>
      <p>Untuk memastikan akurasi spasial, seluruh data bersumber dari portal <strong>Badan Informasi Geospasial (BIG)</strong>:</p>
      <ul>
        <li><strong>Data Elevasi (DEMNAS):</strong> Digital Elevation Model Nasional dengan resolusi tinggi, sangat andal untuk ekstraksi topografi di Indonesia.</li>
        <li><strong>Batas Administrasi (RBI):</strong> Data vektor poligon Peta Rupa Bumi Indonesia untuk membatasi area analisis pada lingkup kecamatan studi.</li>
      </ul>
    </div>

    <!-- Bagian 4: Proses ModelBuilder -->
    <div class="story-section">
      <h2>Geoprocessing Workflow</h2>
      <p>Ekstraksi topografi ini tidak dilakukan secara manual, melainkan dirancang ke dalam sistem otomatisasi menggunakan fitur <strong>ModelBuilder</strong> di ArcGIS Pro.</p>
      
      <!-- Gambar Workflow disisipkan di dalam cerita -->
      <img src="/images/software/modelbuilder-workflow.jpg" alt="ModelBuilder Workflow" class="inline-image">
      
      <ol>
        <li><strong>Extract by Mask:</strong> Memotong data DEMNAS menggunakan poligon batas kecamatan.</li>
        <li><strong>Project Raster:</strong> Transformasi koordinat geografis ke proyeksi <em>WGS 1984 UTM Zone 48S</em> (satuan meter) untuk akurasi geometris.</li>
        <li><strong>Contour:</strong> Menarik garis ketinggian dengan interval setiap 5 meter dari raster yang telah terproyeksi.</li>
      </ol>
      <p>Seluruh <em>tools</em> ini dikunci sebagai parameter dinamis (template <em>reusable</em>).</p>
    </div>

    <!-- Bagian 5: Insight -->
    <div class="story-section">
      <h2>The Planner's Insight</h2>
      <p>Pemanfaatan ModelBuilder memberikan efisiensi waktu yang sangat signifikan, memangkas proses repetitif dalam penyiapan data awal.</p>
      <p>Dengan bergesernya beban kerja dari ranah klerikal ke sistem otomatis, fokus pekerjaan dapat dialihkan sepenuhnya pada tahap <strong>analisis tata ruang dan perumusan kebijakan teknis</strong>. Hasil akhirnya adalah sistem kerja cerdas yang siap mendukung pengambilan keputusan berbasis data spasial.</p>
    </div>

  </div> <!-- End Story Panel -->

</div> <!-- End StoryMap View -->

<!-- ================= JAVASCRIPT UNTUK INTERAKSI ================= -->
<script>
  function openStory() {
    document.getElementById('catalog-view').style.display = 'none';
    document.getElementById('storymap-view').style.display = 'block';
  }

  function closeStory() {
    document.getElementById('storymap-view').style.display = 'none';
    document.getElementById('catalog-view').style.display = 'block';
  }
</script>
