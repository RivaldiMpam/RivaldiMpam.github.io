---
layout: project
title: "Spatial Data Recovery"
title_en: "Spatial Data Recovery"
subtitle: "Digitasi On Screen Peta PDF Menggunakan ArcGIS Pro"
subtitle_en: "On-Screen Digitizing of a PDF Map Using ArcGIS Pro"
category: "GIS & Spatial Analysis"
category_en: "GIS & Spatial Analysis"
cover_image: "/images/software/Hasil-digitasi-arcgispro.jpg"
permalink: /software/arcgis/digitasi/
---

<div class="lang-id" markdown="1">

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

<img src="/images/software/Hasil-digitasi-arcgispro.jpg" alt="Hasil Digitasi Persil Lahan Cigombong" class="inline-image">

</div>

<div class="lang-en" markdown="1">

## Problem Context: Missing Vector Data

In land asset management, the absence of valid spatial data is a major risk. The Cigombong land case, covering a total area of roughly **10.7 hectares** across approximately **60 parcels**, is a real example of this. The final vector data from a previous survey could not be found.

All that remained was raw measurement data in CSV format and the final output image in PDF format. An initial comparative analysis showed a discrepancy between the CSV measurement data and the PDF image. Based on the team's decision and senior guidance, the PDF document was ultimately set as the *source of truth* for geometric reference.

## Workflow

<img src="/images/software/georeference-pdf.jpg" alt="Georeferencing Process" class="inline-image">

1. **Georeferencing** — Registering the PDF document to a spatial coordinate system using 4 precisely mapped control points, so it matches the original orientation and scale.
2. **Geodatabase Structuring** — Creating a new *File Geodatabase* (.gdb) specifically for this project through the Catalog pane, followed by creating a dedicated parcel-polygon *Feature Class*.
3. **On-Screen Digitizing** — Manually extracting vectors following the parcel boundaries on the georeferenced PDF, making sure every polygon closes cleanly with no gaps.

## Data Enrichment & Final Results

The final step: giving "life" to the empty polygons by adding a new attribute structure (*Add Field*) in the Feature Class. The information added includes:

- **Landowner Name** — as an ownership identifier.
- **Land Area (m²)** — based on automatic geometry calculation.
- **Area in Hectares (Ha)** — as a broader reference for the area.

After a *cross-check* stage against the PDF document, the entire land asset dataset is now safely stored inside the geodatabase.

<img src="/images/software/Hasil-digitasi-arcgispro.jpg" alt="Digitizing Result for Cigombong Land Parcels" class="inline-image">

</div>
