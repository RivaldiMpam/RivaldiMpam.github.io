---
layout: default
title: ArcGIS Pro Projects
permalink: /software/arcgis/
---

<style>
  /* --- OVERRIDE BACKGROUND TEMA UTAMA --- */
  /* Khusus halaman ini, matikan background foto daun dan perlebar halamannya */
  body {
    background-image: none !important;
    background-color: #121212 !important; /* Polos gelap */
    max-width: 1300px !important; /* Diperlebar biar layout side-by-side lega banget */
  }
  
  body.light-mode {
    background-color: #f5f5f5 !important; /* Polos terang untuk mode light */
  }

  /* --- WARNA & VARIABEL --- */
  :root {
    --esri-blue: #005e95;
    --card-bg: #1e1e1e;
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
    color: #a0a0a0;
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
    border-left: 1px solid rgba(150,150,150,0.1);
    border-right: 1px solid rgba(150,150,150,0.1);
    border-bottom: 1px solid rgba(150,150,150,0.1);
  }

  .esri-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  }

  .card-tag {
    font-size: 12px;
    text-transform: uppercase;
    color: #a0a0a0;
    margin-bottom: 10px;
    display: block;
    letter-spacing: 1px;
  }

  .esri-card h3 {
    margin: 0 0 15px 0;
    color: #0d6efd;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #a0a0a0;
    margin-top: 20px;
    border-top: 1px solid rgba(150,150,150,0.1);
    padding-top: 10px;
  }

  /* --- 2. TAMPILAN STORYMAPS (BERDAMPINGAN/SIDE-BY-SIDE) --- */
  #storymap-view {
    display: none; /* Nanti diubah jadi flex via JS */
    width: 100%;
    height: 85vh; 
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    animation: fadeIn 0.5s ease;
    background-color: #1a1a1a;
  }

  /* Panel Kiri: Tulisan Cerita */
  .story-panel {
    width: 400px; /* Lebar fix panel cerita */
    flex-shrink: 0; /* Supaya lebarnya gak menyusut */
    height: 100%;
    background-color: #004a75; /* Biru Esri */
    color: #ffffff;
    padding: 40px 30px;
    overflow-y: auto;
    box-shadow: 5px 0 25px rgba(0,0,0,0.4);
    z-index: 2; /* Memastikan batas bayangannya ada di atas peta */
  }

  /* Panel Kanan: Gambar Peta Hasil */
  .map-panel {
    flex-grow: 1; /* Peta akan mengisi sisa ruang yang ada di layar */
    height: 100%;
    background-image: url('/images/software/hasil-peta-topografi.jpg');
    background-size: cover; /* Gambar akan memenuhi area kanan */
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
  }

  /* Kustomisasi Scrollbar Panel Kiri */
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
    margin-bottom: 40px;
  }
  
  .story-section h1 {
    font-size: 28px;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .story-section h2 {
    font-size: 20px;
    margin-bottom: 15px;
    border-bottom: 2px solid rgba(255,255,255,0.2);
    padding-bottom: 8px;
    color: #f89927;
  }

  .story-section p, .story-section ul, .story-section ol {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 15px;
  }

  .story-section li {
    margin-bottom: 10px;
  }

  .inline-image {
    width: 100%;
    border-radius: 6px;
    margin: 15px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* Responsif untuk Layar HP */
  @media (max-width: 768px) {
    #storymap-view {
      flex-direction: column;
      height: auto;
    }
    .story-panel {
      width: 100%;
      height: 50vh;
    }
    .map-panel {
      width: 100%;
      height: 50vh;
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
<!-- Perhatikan tidak ada lagi background image di container ini -->
<div id="storymap-view">
  
  <!-- Panel Narasi Kiri (Fix Width, Bisa di-scroll) -->
  <div class="story-panel">
    <button class="back-btn" onclick="closeStory()">
      <span>←</span> Kembali ke Katalog
    </button>
    
    <div class="story-section">
      <h1>Automasi Ekstraksi Topografi Tingkat Kecamatan</h1>
      <p><em>Rivaldi Fiqriyansah — Planner's Workflow Series</em></p>
    </div>

    <div class="story-section">
      <h2>Tujuan & Konteks Tata Ruang</h2>
      <p>Dalam perencanaan wilayah, peta topografi merupakan data dasar esensial. Tujuan pembuatan peta ini di tingkat kecamatan adalah untuk memetakan konfigurasi rupa bumi, sebaran elevasi, serta pola kelerengan secara komprehensif.</p>
      <p>Informasi ini sangat krusial dalam tahap awal perencanaan, seperti menentukan kesesuaian lahan, merencanakan sistem drainase, dan mengidentifikasi potensi kebencanaan. Interval kontur 5 meter dipilih untuk memberikan gambaran makro yang detail tanpa membuat peta menjadi terlalu padat.</p>
    </div>

    <div class="story-section">
      <h2>Akuisisi Sumber Data</h2>
      <p>Untuk memastikan akurasi spasial, seluruh data bersumber dari portal <strong>Badan Informasi Geospasial (BIG)</strong>:</p>
      <ul>
        <li><strong>Data Elevasi (DEMNAS):</strong> Digital Elevation Model Nasional dengan resolusi tinggi, sangat andal untuk ekstraksi topografi di Indonesia.</li>
        <li><strong>Batas Administrasi (RBI):</strong> Data vektor poligon Peta Rupa Bumi Indonesia untuk membatasi area analisis pada lingkup kecamatan studi.</li>
      </ul>
    </div>

    <div class="story-section">
      <h2>Geoprocessing Workflow</h2>
      <p>Ekstraksi topografi ini tidak dilakukan secara manual, melainkan dirancang ke dalam sistem otomatisasi menggunakan fitur <strong>ModelBuilder</strong> di ArcGIS Pro.</p>
      
      <img src="/images/software/modelbuilder-workflow.jpg" alt="ModelBuilder Workflow" class="inline-image">
      
      <ol>
        <li><strong>Extract by Mask:</strong> Memotong data DEMNAS menggunakan poligon batas kecamatan.</li>
        <li><strong>Project Raster:</strong> Transformasi koordinat geografis ke proyeksi <em>WGS 1984 UTM Zone 48S</em> (satuan meter) untuk akurasi geometris.</li>
        <li><strong>Contour:</strong> Menarik garis ketinggian dengan interval setiap 5 meter dari raster yang telah terproyeksi.</li>
      </ol>
      <p>Seluruh <em>tools</em> ini dikunci sebagai parameter dinamis (template <em>reusable</em>).</p>
    </div>

    <div class="story-section">
      <h2>The Planner's Insight</h2>
      <p>Pemanfaatan ModelBuilder memberikan efisiensi waktu yang sangat signifikan, memangkas proses repetitif dalam penyiapan data awal.</p>
      <p>Dengan bergesernya beban kerja dari ranah klerikal ke sistem otomatis, fokus pekerjaan dapat dialihkan sepenuhnya pada tahap <strong>analisis tata ruang dan perumusan kebijakan teknis</strong>. Hasil akhirnya adalah sistem kerja cerdas yang siap mendukung pengambilan keputusan berbasis data spasial.</p>
    </div>

  </div> <!-- End Story Panel -->

  <!-- Panel Peta Kanan (Flex Grow, Terpisah dari Tulisan) -->
  <div class="map-panel"></div>

</div> <!-- End StoryMap View -->

<!-- ================= JAVASCRIPT UNTUK INTERAKSI ================= -->
<script>
  function openStory() {
    document.getElementById('catalog-view').style.display = 'none';
    // Diubah menjadi flex agar bisa side-by-side
    document.getElementById('storymap-view').style.display = 'flex';
  }

  function closeStory() {
    document.getElementById('storymap-view').style.display = 'none';
    document.getElementById('catalog-view').style.display = 'block';
  }
</script>
