---
layout: project
title: "Automasi Ekstraksi Topografi"
subtitle: "Peta Topografi Tingkat Kecamatan Menggunakan ModelBuilder"
category: "Urban Planning"
cover_image: "/images/software/hasil-peta-topografi.jpg"
permalink: /software/arcgis/model-builder/
---

## Tujuan & Konteks Tata Ruang

Dalam perencanaan wilayah, peta topografi adalah data dasar yang penting. Peta ini dibuat di tingkat kecamatan untuk memetakan konfigurasi rupa bumi, sebaran elevasi, serta pola kelerengan secara menyeluruh.

Informasi ini krusial di tahap awal perencanaan — mulai dari menentukan kesesuaian lahan, merencanakan sistem drainase, sampai mengidentifikasi potensi kebencanaan. Interval kontur 5 meter dipilih supaya gambaran makronya tetap detail tanpa bikin peta terlalu padat.

## Sumber Data

Untuk memastikan akurasi spasial, seluruh data bersumber dari portal **Badan Informasi Geospasial (BIG)**:

- **Data Elevasi (DEMNAS)** — Digital Elevation Model Nasional resolusi tinggi, andal buat ekstraksi topografi di Indonesia.
- **Batas Administrasi (RBI)** — data vektor poligon Peta Rupa Bumi Indonesia, buat membatasi area analisis pada lingkup kecamatan studi.

## Alur Kerja

Ekstraksi topografi ini nggak dikerjakan manual, tapi dirancang jadi sistem otomatisasi pakai fitur **ModelBuilder** di ArcGIS Pro.

<img src="/images/software/modelbuilder-workflow.jpg" alt="ModelBuilder Workflow" class="inline-image">

1. **Extract by Mask** — Memotong data DEMNAS pakai poligon batas kecamatan.
2. **Project Raster** — Transformasi koordinat geografis ke proyeksi *WGS 1984 UTM Zone 48S* (satuan meter) buat akurasi geometris.
3. **Contour** — Menarik garis ketinggian dengan interval 5 meter dari raster yang sudah terproyeksi.

Seluruh *tools* ini dikunci sebagai parameter dinamis (template *reusable*), jadi bisa dipakai ulang buat kecamatan lain tinggal ganti input datanya.

## Hasil & Manfaat

Pemanfaatan ModelBuilder memangkas waktu kerja yang repetitif secara signifikan di tahap penyiapan data awal.

Dengan beban kerja klerikal bergeser ke sistem otomatis, fokus pekerjaan bisa dialihkan sepenuhnya ke tahap **analisis tata ruang dan perumusan kebijakan teknis** — hasil akhirnya sistem kerja yang siap mendukung pengambilan keputusan berbasis data spasial.
