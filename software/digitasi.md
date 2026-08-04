---
layout: default
title: Spatial Data Recovery
permalink: /software/arcgis/digitasi/
---

<style>
  body { background-image: none !important; background-color: #121212 !important; max-width: 100% !important; padding: 20px 0 !important; margin: 0; overflow: hidden; }
  body.light-mode { background-color: #f5f5f5 !important; }
  .navbar { display: none !important; }
  #storymap-view { display: flex; width: 100vw; height: 100vh; background-color: #121212; }
  .story-panel { width: 500px; flex-shrink: 0; height: 100vh; background-color: #004a75; color: #ffffff; padding: 40px; overflow-y: auto; box-shadow: 10px 0 30px rgba(0,0,0,0.8); z-index: 2; }
  .map-panel { flex-grow: 1; height: 100vh; background-image: url('image_e89e69.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; z-index: 1; background-color: #1a1a1a; }
  .story-panel::-webkit-scrollbar { width: 8px; }
  .story-panel::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.3); border-radius: 10px; }
  .back-btn { display: inline-flex; align-items: center; gap: 8px; background-color: rgba(0, 0, 0, 0.4); color: #fff; border: 1px solid rgba(255,255,255,0.3); padding: 10px 18px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold; margin-bottom: 30px; text-decoration: none; transition: 0.3s; }
  .back-btn:hover { background-color: rgba(0, 0, 0, 0.8); }
  .story-section { margin-bottom: 45px; }
  .story-section h1 { font-size: 32px; margin-bottom: 20px; line-height: 1.3; }
  .story-section h2 { font-size: 22px; margin-bottom: 15px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 8px; color: #f89927; }
  .story-section p, .story-section ul, .story-section ol { font-size: 15px; line-height: 1.7; color: rgba(255, 255, 255, 0.9); margin-bottom: 15px; }
  .story-section li { margin-bottom: 10px; }
  .inline-image { width: 100%; border-radius: 6px; margin: 15px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: zoom-in; transition: transform 0.3s ease; border: 2px solid transparent; }
  .inline-image:hover { transform: scale(1.03); border: 2px solid #f89927; }
  .modal-overlay { display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); align-items: center; justify-content: center; }
  .modal-content { max-width: 90vw; max-height: 90vh; border-radius: 8px; box-shadow: 0 0 30px rgba(0,0,0,0.8); object-fit: contain; }
  .close-modal { position: absolute; top: 20px; right: 30px; color: #fff; font-size: 40px; font-weight: bold; cursor: pointer; transition: 0.3s; }
  .close-modal:hover { color: #f89927; }
  @media (max-width: 768px) { #storymap-view { flex-direction: column; overflow-y: auto; height: auto; } .story-panel { width: 100%; height: auto; min-height: 50vh; } .map-panel { width: 100%; height: 60vh; flex-grow: 0; } body { overflow: auto; } }
</style>

<div id="storymap-view">
  <div class="story-panel">
    <a href="/software/arcgis/" class="back-btn">
      <span>←</span> Kembali ke Katalog
    </a>
    <div class="story-section">
      <h1>Digitasi On Screen Gambar PDF Menggunakan ArcGIS Pro</h1>
      <p><em>Rivaldi Fiqriyansah — Land Surveyor</em></p>
    </div>
    <div class="story-section">
      <h2>Konteks Masalah: Hilangnya Data Vektor</h2>
      <p>Dalam manajemen aset lahan, ketiadaan data spasial yang valid adalah sebuah risiko besar. Kasus di lahan Cigombong dengan total luas sekitar <strong>10.7 hektare</strong> yang mencakup kurang lebih <strong>60 bidang persil</strong> menjadi contoh nyata. Data vektor final dari hasil pengukuran terdahulu tidak dapat ditemukan.</p>
      <p>Data yang tersisa hanyalah file mentah <em>raw data</em> berformat CSV dan sebuah gambar hasil final berformat PDF. Analisis komparasi awal menunjukkan adanya diskrepansi antara data ukur CSV dengan gambar PDF. Mengacu pada keputusan tim dan arahan senior, dokumen PDF tersebut akhirnya ditetapkan sebagai <em>source of truth</em> acuan geometri.</p>
    </div>
    <div class="story-section">
      <h2>Geoprocessing Workflow</h2>
      <img src="georeference-pdf.jpg" alt="Proses Georeferencing di ArcGIS Pro" class="inline-image" onclick="openModal(this.src)" title="Klik untuk memperbesar">
      <ol>
        <li><strong>Georeferencing:</strong> Mengikat dokumen PDF ke dalam sistem koordinat spasial menggunakan 4 titik kontrol (<em>control points</em>) yang dipetakan secara presisi agar sesuai dengan orientasi dan skala sebenarnya.</li>
        <li><strong>Geodatabase Structuring:</strong> Membuat <em>File Geodatabase</em> (.gdb) baru khusus untuk proyek ini melalui menu Catalog, dilanjutkan dengan pembuatan <em>Feature Class</em> khusus poligon persil.</li>
        <li><strong>On-Screen Digitizing:</strong> Melakukan ekstraksi vektor secara manual mengikuti batas-batas bidang lahan pada PDF yang telah ter-georeferensi, memastikan topologi setiap poligon tertutup rapat tanpa celah (<em>gap</em>).</li>
      </ol>
    </div>
    <div class="story-section">
      <h2>Data Enrichment & Hasil Akhir</h2>
      <p>Langkah terakhir adalah memberikan "nyawa" pada poligon kosong tersebut dengan menambahkan struktur atribut baru (<em>Add Field</em>) pada <em>Feature Class</em>. Informasi yang ditambahkan meliputi:</p>
      <ul>
        <li><strong>Nama Pemilik Lahan</strong> (sebagai identitas kepemilikan).</li>
        <li><strong>Luas Tanah (m²)</strong> (berdasarkan kalkulasi geometri otomatis).</li>
        <li><strong>Luas Hektare (Ha)</strong> (sebagai acuan makro kawasan).</li>
      </ul>
      <p>Setelah tahap <em>cross-check</em> dengan dokumen PDF, seluruh aset lahan kini telah tersimpan dengan aman di dalam Geodatabase.</p>
    </div>
  </div>
  <div class="map-panel"></div>
</div>

<div id="image-modal" class="modal-overlay" onclick="closeModal()">
  <span class="close-modal">&times;</span>
  <img id="zoomed-img" class="modal-content" src="">
</div>

<script>
  function openModal(imageSrc) { document.getElementById('zoomed-img').src = imageSrc; document.getElementById('image-modal').style.display = 'flex'; }
  function closeModal() { document.getElementById('image-modal').style.display = 'none'; document.getElementById('zoomed-img').src = ''; }
</script>
