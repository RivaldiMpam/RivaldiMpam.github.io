---
layout: default
title: ArcGIS Pro Projects
permalink: /software/arcgis/
---

<style>
  body { background-image: none !important; background-color: #121212 !important; max-width: 100% !important; padding: 20px 0 !important; }
  body.light-mode { background-color: #f5f5f5 !important; }
  .navbar { max-width: 1100px; margin: 0 auto 40px auto; padding-left: 20px; padding-right: 20px; }
  #catalog-view { display: block; max-width: 1100px; margin: 0 auto; padding: 0 20px; animation: fadeIn 0.5s ease; }
  .catalog-header { text-align: center; margin-bottom: 40px; }
  .catalog-header h1 { font-size: 28px; margin-bottom: 10px; }
  .catalog-header p { color: #a0a0a0; }
  .catalog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  
  .esri-card {
    background-color: #1e1e1e; border-top: 4px solid #f89927; border-radius: 4px; padding: 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
    border-left: 1px solid rgba(150,150,150,0.1); border-right: 1px solid rgba(150,150,150,0.1); border-bottom: 1px solid rgba(150,150,150,0.1);
  }
  .esri-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.5); }
  .esri-card h3 { margin: 10px 0 15px 0; color: #0d6efd; }
  .card-tag { font-size: 12px; text-transform: uppercase; color: #a0a0a0; letter-spacing: 1px; }
  .card-footer { display: flex; justify-content: space-between; font-size: 13px; color: #a0a0a0; margin-top: 20px; border-top: 1px solid rgba(150,150,150,0.1); padding-top: 10px; }
</style>

<div id="catalog-view">
  <div class="catalog-header">
    <h1>ArcGIS Pro Portfolio</h1>
    <p>Kumpulan studi kasus, otomatisasi, dan analisis geospasial.</p>
  </div>

  <div class="catalog-grid">
    
    <!-- KARTU PERTAMA: TOPOGRAFI -->
    <div class="esri-card" onclick="window.location.href='/software/arcgis/model-builder/'">
      <span class="card-tag">Geoprocessing Workflow</span>
      <h3>Automasi Ekstraksi Topografi</h3>
      <p style="font-size: 14px;">Menggunakan ModelBuilder untuk ekstraksi kontur dan elevasi secara otomatis dari data DEMNAS skala kecamatan.</p>
      <div class="card-footer">
        <span>StoryMap Format</span>
        <span>ArcGIS Pro 3.x</span>
      </div>
    </div>

    <!-- KARTU KEDUA: CIGOMBONG -->
    <div class="esri-card" onclick="window.location.href='/software/arcgis/digitasi/'">
      <span class="card-tag">Spatial Data Recovery</span>
      <h3>Penyelamatan Aset Persil Cigombong</h3>
      <p style="font-size: 14px;">Menggunakan teknik georeferencing dan on-screen digitizing untuk memulihkan 60 bidang data vektor dari PDF ke Geodatabase.</p>
      <div class="card-footer">
        <span>StoryMap Format</span>
        <span>ArcGIS Pro 3.x</span>
      </div>
    </div>

  </div>
</div>
