---
layout: default
title: Automasi Ekstraksi Topografi
permalink: /software/arcgis/model-builder/
---

<style>
  /* --- OVERRIDE TEMA UTAMA UNTUK HALAMAN INI --- */
  body {
    background-image: none !important;
    background-color: #121212 !important;
    max-width: 100% !important; /* Lepas batas maksimal lebar bawaan */
    padding: 20px 0 !important; /* Hapus padding kiri-kanan bawaan */
  }
  
  body.light-mode {
    background-color: #f5f5f5 !important;
  }

  /* Rapikan Navbar agar tetap rapi saat max-width dilepas */
  .navbar {
    max-width: 1100px;
    margin: 0 auto 40px auto;
    padding-left: 20px;
    padding-right: 20px;
  }

  /* --- 1. TAMPILAN KATALOG --- */
  #catalog-view {
    display: block;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
    animation: fadeIn 0.5s ease;
  }

  .catalog-header {
    text-align: center;
    margin-bottom: 40px;
  }
  .catalog-header h1 { font-size: 28px; margin-bottom: 10px; }
  .catalog-header p { color: #a0a0a0; }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .esri-card {
    background-color: #1e1e1e;
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

  .esri-card h3 { margin: 10px 0 15px 0; color: #0d6efd; }
  .card-tag { font-size: 12px; text-transform: uppercase; color: #a0a0a0; letter-spacing: 1px; }
  .card-footer {
    display: flex; justify-content: space-between; font-size: 13px;
    color: #a0a0a0; margin-top: 20px; border-top: 1px solid rgba(150,150,150,0.1); padding-top: 10px;
  }

  /* --- 2. TAMPILAN STORYMAPS (FULL SCREEN IMMERSIVE) --- */
  #storymap-view {
    display: flex; /* Diubah via JS */
    position: fixed; /* Bikin nempel di layar penuh */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #121212; /* Background gelap biar A4 portrait nge-blend */
    z-index: 1000; /* Menutupi elemen lain termasuk navbar */
  }

  /* Panel Kiri: Tulisan Cerita */
  .story-panel {
    width: 450px; /* Lebar area baca diperlebar sedikit */
    flex-shrink: 0;
    height: 100vh;
    background-color: #004a75; /* Biru Esri */
    color: #ffffff;
    padding: 40px;
    overflow-y: auto;
    box-shadow: 10px 0 30px rgba(0,0,0,0.8);
    z-index: 2;
  }

  /* Panel Kanan: Gambar Peta Hasil (SOLUSI A4 PORTRAIT) */
  .map-panel {
    flex-grow: 1;
    height: 100vh;
    background-image: url('/images/software/hasil-peta-topografi.jpg');
    background-size: contain; /* INI KUNCINYA: Peta utuh 100%, gak akan dicrop! */
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    background-color: #1a1a1a;
  }

  /* Scrollbar Panel Kiri */
  .story-panel::-webkit-scrollbar { width: 8px; }
  .story-panel::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.3); border-radius: 10px; }

  /* Tombol Kembali */
  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background-color: rgba(0, 0, 0, 0.4); color: #fff;
    border: 1px solid rgba(255,255,255,0.3); padding: 10px 18px;
    border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;
    margin-bottom: 30px; transition: 0.3s;
  }
  .back-btn:hover { background-color: rgba(0, 0, 0, 0.8); }

  /* Tipografi di dalam Story Panel */
  .story-section { margin-bottom: 45px; }
  .story-section h1 { font-size: 32px; margin-bottom: 20px; line-height: 1.3; }
  .story-section h2 { font-size: 22px; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 8px; color: #f89927; }
  .story-section p, .story-section ul, .story-section ol { font-size: 16px; line-height: 1.7; color: rgba(255, 255, 255, 0.9); margin-bottom: 15px; }
  .story-section li { margin-bottom: 10px; }

  /* Gambar Interaktif (ModelBuilder) */
  .inline-image {
    width: 100%;
    border-radius: 6px;
    margin: 15px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    cursor: zoom-in; /* Kursor berubah jadi kaca pembesar */
    transition: transform 0.3s ease;
    border: 2px solid transparent;
  }
  .inline-image:hover {
    transform: scale(1.03);
    border: 2px solid #f89927; /* Highlight oranye saat dihover */
  }

  /* --- 3. MODAL / LIGHTBOX (UNTUK ZOOM GAMBAR) --- */
  .modal-overlay {
    display: none; position: fixed; z-index: 2000;
    left: 0; top: 0; width: 100vw; height: 100vh;
    background-color: rgba(0,0,0,0.9);
    align-items: center; justify-content: center;
  }
  .modal-content {
    max-width: 90vw; max-height: 90vh;
    border-radius: 8px; box-shadow: 0 0 30px rgba(0,0,0,0.8);
    object-fit: contain;
  }
  .close-modal {
    position: absolute; top: 20px; right: 30px;
    color: #fff; font-size: 40px; font-weight: bold;
    cursor: pointer; transition: 0.3s;
  }
  .close-modal:hover { color: #f89927; }

  /* Responsif Layar HP */
  @media (max-width: 768px) {
    #storymap-view { flex-direction: column; overflow-y: auto; }
    .story-panel { width: 100%; height: auto; min-height: 50vh; }
    .map-panel { width: 100%; height: 60vh; flex-grow: 0; }
  }
</style>

<!-- ================= VIEW 2: FULL SCREEN STORYMAPS ================= -->
<div id="storymap-view">
  
  <!-- Panel Narasi Kiri -->
  <div class="story-panel">
    <a href="/software/arcgis/" class="back-btn">
  <span>←</span> Kembali ke Katalog
</a>
    
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
      
      <!-- GAMBAR INTERAKTIF: Ditambah fungsi onclick untuk zoom -->
      <img src="/images/software/modelbuilder-workflow.jpg" alt="ModelBuilder Workflow" class="inline-image" onclick="openModal(this.src)" title="Klik untuk memperbesar">
      
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
  </div>

  <!-- Panel Peta Kanan (100% Utuh) -->
  <div class="map-panel"></div>

</div>

<!-- ================= MODAL / LIGHTBOX (ZOOM GAMBAR) ================= -->
<div id="image-modal" class="modal-overlay" onclick="closeModal()">
  <span class="close-modal">&times;</span>
  <img id="zoomed-img" class="modal-content" src="">
</div>

<!-- ================= JAVASCRIPT LOGIC ================= -->
<script>
  // Fungsi Buka Zoom Gambar (Lightbox)
  function openModal(imageSrc) {
    document.getElementById('zoomed-img').src = imageSrc;
    document.getElementById('image-modal').style.display = 'flex';
  }

  // Fungsi Tutup Zoom Gambar
  function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
    document.getElementById('zoomed-img').src = '';
  }
</script>
