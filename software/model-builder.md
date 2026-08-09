---
layout: project
title: "Automasi Ekstraksi Topografi"
title_en: "Topographic Extraction Automation"
subtitle: "Peta Topografi Tingkat Kecamatan Menggunakan ModelBuilder"
subtitle_en: "Sub-District-Level Topographic Map Using ModelBuilder"
category: "Urban Planning"
category_en: "Urban Planning"
cover_image: "/images/software/hasil-peta-topografi.jpg"
permalink: /software/arcgis/model-builder/
description: "Automasi ekstraksi topografi tingkat kecamatan dari data DEMNAS menggunakan ModelBuilder ArcGIS Pro, oleh Rivaldi Fiqriyansah."
---

<div class="lang-id" markdown="1">

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

<img src="/images/software/hasil-peta-topografi.jpg" alt="Hasil Peta Topografi Tingkat Kecamatan" class="inline-image">

</div>

<div class="lang-en" markdown="1">

## Purpose & Spatial Planning Context

In regional planning, a topographic map is essential base data. This map is produced at sub-district level to map out terrain configuration, elevation distribution, and slope patterns comprehensively.

This information is critical in the early planning stage — from determining land suitability and planning drainage systems, to identifying potential hazards. A 5-meter contour interval was chosen so the macro picture stays detailed without making the map overly dense.

## Data Sources

To ensure spatial accuracy, all data comes from the **Geospatial Information Agency (BIG)** portal:

- **Elevation Data (DEMNAS)** — Indonesia's high-resolution National Digital Elevation Model, reliable for topographic extraction across the country.
- **Administrative Boundaries (RBI)** — the Indonesian Base Map polygon vector data, used to clip the analysis area to the study sub-district.

## Workflow

This topographic extraction wasn't done manually — it was designed as an automated system using the **ModelBuilder** feature in ArcGIS Pro.

<img src="/images/software/modelbuilder-workflow.jpg" alt="ModelBuilder Workflow" class="inline-image">

1. **Extract by Mask** — Clipping the DEMNAS data using the sub-district boundary polygon.
2. **Project Raster** — Transforming the geographic coordinates into *WGS 1984 UTM Zone 48S* projection (meter units) for geometric accuracy.
3. **Contour** — Generating elevation lines at a 5-meter interval from the projected raster.

All these tools are locked in as dynamic parameters (a reusable template), so the same model can be reused for other sub-districts just by swapping the input data.

## Results & Benefits

Using ModelBuilder significantly cut down repetitive work time during the initial data preparation stage.

With the clerical workload shifted to an automated system, the focus can be fully redirected to **spatial analysis and technical policy formulation** — resulting in a workflow that's ready to support data-driven spatial decision-making.

<img src="/images/software/hasil-peta-topografi.jpg" alt="Resulting Sub-District Topographic Map" class="inline-image">

</div>
