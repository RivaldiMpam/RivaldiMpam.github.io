---
layout: project
title: "Spatial Data Recovery"
subtitle: "Digitasi On Screen Peta PDF Menggunakan ArcGIS Pro"
category: "GIS & Spatial Analysis"
cover_image: "/images/software/Hasil-digitasi-arcgispro.jpg"
permalink: /software/arcgis/digitasi/
---

## Konteks Masalah: Hilangnya Data Vektor

Dalam manajemen aset lahan, ketiadaan data spasial yang valid adalah risiko besar. Kasus di lahan Cigombong dengan total luas sekitar **10,7 hektare**, mencakup kurang lebih **60 bidang persil**, jadi contoh nyata. Data vektor final dari hasil pengukuran terdahulu tidak bisa ditemukan.

Yang tersisa hanya file mentah *raw data* berformat CSV dan gambar hasil final berformat PDF. Analisis komparasi awal menunjukkan ada selisih antara data ukur CSV dengan gambar PDF. Berdasarkan keputusan tim dan arahan senior, dokumen PDF akhirnya ditetapkan sebagai *source of truth* acuan geometri.

## Alur Kerja

<img src="/images/software/georeference-pdf.jpg" alt="Proses Georeferencing" class="inline-image">

1. **Georeferencing** — Mengikat dokumen PDF ke sistem koordinat spasial menggunakan 4 titik kontrol (*control points*) yang dipetakan presisi, biar sesuai orientasi dan skala aslinya.
2. **Geodatabase Structuring** — Membuat *File Geodatabase* (.gdb) baru khusus proyek ini lewat menu Catalog, dilanjutkan pembuatan *Feature Class* khusus poligon persil.
3. **On-Screen Digitizing** — Ekstraksi vektor manual mengikuti batas bidang lahan pada PDF yang sudah ter-georeferensi, memastikan tiap poligon tertutup rapat tanpa celah (*gap*).

## Data Enrichment & Hasil Akhir

Langkah terakhir: memberi "nyawa" pada poligon kosong dengan menambahkan struktur atribut baru (*Add Field*) di *Feature Class*. Informasi yang ditambahkan:

- **Nama Pemilik Lahan** — sebagai identitas kepemilikan.
- **Luas Tanah (m²)** — berdasarkan kalkulasi geometri otomatis.
- **Luas Hektare (Ha)** — sebagai acuan makro kawasan.

Setelah tahap *cross-check* dengan dokumen PDF, seluruh aset lahan kini tersimpan aman di dalam Geodatabase.
