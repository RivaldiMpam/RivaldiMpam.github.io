---
layout: project
title: "Analisis NDVI Kecamatan Dramaga"
title_en: "Dramaga Sub-District NDVI Analysis"
subtitle: "Kerapatan Vegetasi Berbasis Google Earth Engine dan QGIS"
subtitle_en: "Vegetation Density Analysis Using Google Earth Engine and QGIS"
category: "GIS & Spatial Analysis"
category_en: "GIS & Spatial Analysis"
cover_image: "/images/software/peta-ndvi-dramaga.jpg"
permalink: /software/gee/ndvi-dramaga/
description: "Analisis kerapatan vegetasi (NDVI) Kecamatan Dramaga berbasis citra Sentinel-2 menggunakan Google Earth Engine dan QGIS, oleh Rivaldi Fiqriyansah."
---

<div class="lang-id" markdown="1">

## Latar Belakang & Konteks Tata Ruang
Sebagai warga yang lahir dan besar di Kecamatan Dramaga, perubahan ruang di sekitar koridor Kampus IPB University terasa cukup masif — kebun dan sawah terus terkonversi jadi permukiman padat, ruko, dan infrastruktur penunjang perkotaan, dengan dampak fisik yang paling terasa adalah suhu yang makin panas.

Pengamatan yang sifatnya subjektif ini bisa diuji secara kuantitatif memakai instrumen ilmiah yang terukur. Studi ini melakukan analisis spasial kerapatan vegetasi pada skala **Kecamatan Dramaga** menggunakan **Normalized Difference Vegetation Index (NDVI)** di **Google Earth Engine (GEE)**, dilanjutkan dengan proses kartografi profesional (*layouting*) di **QGIS**.

## Konsep & Metodologi
NDVI adalah indeks spektral yang menyederhanakan data multispektral untuk menilai kesehatan dan kerapatan vegetasi, dengan rumus:

`NDVI = (NIR - Red) / (NIR + Red)`

Daun sehat yang kaya klorofil menyerap kuat cahaya merah (*Red*) untuk fotosintesis dan memantulkan kuat radiasi inframerah dekat (*NIR*). Nilai NDVI berkisar **-1 hingga +1** — nilai negatif hingga mendekati nol mencirikan objek non-vegetasi (air, beton, permukiman), sedangkan nilai mendekati +1 merepresentasikan kanopi vegetasi yang lebat dan sehat.

Karena cahaya merah lebih rentan hamburan atmosferik (Rayleigh Scattering) dibanding NIR, studi ini memakai data **Surface Reflectance (SR)** yang sudah terkoreksi atmosferis agar nilai spektral permukaan bumi konsisten.

**Sumber data & parameter:**
- Citra **Sentinel-2 Surface Reflectance** (`COPERNICUS/S2_SR_HARMONIZED`), resolusi spasial 10 meter (Band NIR 8, Red 4).
- Rentang waktu **1 Januari – 31 Mei 2026**, mencakup musim hujan dan masa transisi.
- Filter tutupan awan koleksi `< 15%`, dengan cloud & cirrus masking biner memakai band **QA60**.
- Klasifikasi kerapatan memakai **persentil dinamis lokal (P33 dan P66)**, bukan ambang batas tetap, supaya adaptif terhadap karakteristik biogeofisik lokal Dramaga.

## Alur Kerja
<img src="/images/software/peta-ndvi-dramaga.jpg" alt="Peta NDVI dan Klasifikasi Kerapatan Vegetasi Kecamatan Dramaga" class="inline-image">

1. **Akuisisi & Cloud Masking** — Menarik koleksi Sentinel-2 SR periode Jan–Mei 2026, memfilter tutupan awan, lalu mereduksi tumpukan citra memakai fungsi **median** untuk menghasilkan komposit bersih tanpa celah data.
2. **Kalkulasi NDVI** — Menghitung NDVI dari band NIR (B8) dan Red (B4) untuk tiap citra, lalu diambil nilai median temporalnya.
3. **Klasifikasi Persentil Otomatis** — Mengekstrak Persentil 33 dan 66 dari populasi piksel NDVI wilayah kajian (`reduceRegion`) sebagai batas kelas Rendah–Sedang–Tinggi secara otomatis, lengkap dengan legenda peta interaktif dinamis. Sebaran populasi piksel yang jadi dasar perhitungan ini divisualisasikan lewat histogram pada bagian Hasil Analisis di bawah.
4. **Kalkulasi Luasan** — Menghitung luas tiap kelas kerapatan (km² dan hektare) memakai `ee.Image.pixelArea()` yang dikelompokkan per kelas.
5. **Layouting (QGIS)** — Mengekspor raster NDVI dan hasil klasifikasi dari GEE ke Google Drive, kemudian menyusun layout peta formal berstandar kartografis di QGIS.

Seluruh proses di GEE ditulis terprogram lewat JavaScript, mulai dari cloud masking sampai ekspor hasil.

<a href="/files/GEE_NDVI_Dramaga.js" download class="btn btn-outline">Unduh Script GEE</a>

## Hasil Analisis
Sebelum diklasifikasikan, sebaran nilai NDVI seluruh piksel wilayah kajian dipetakan dulu dalam bentuk histogram (dihasilkan langsung dari console GEE):

<img src="/images/software/distribusi-ndvi-dramaga.png" alt="Histogram Distribusi Nilai NDVI Kecamatan Dramaga" class="inline-image">

Bentuk kurvanya condong ke kanan (*right-skewed*) — ekor panjang di rentang 0,6–0,9 jauh lebih tebal dibanding sisi negatif hingga nol. Ini yang jadi alasan kenapa klasifikasi di studi ini memakai **persentil dinamis (P33/P66)**, bukan ambang batas tetap yang lazim dipakai di literatur umum (misalnya 0,3 dan 0,6): pada distribusi yang miring seperti ini, ambang tetap akan menghasilkan proporsi kelas yang timpang dan kurang mencerminkan karakteristik biogeofisik lokal Dramaga yang memang didominasi vegetasi rapat di sisi barat-utara. Dengan persentil, dua titik potong (**P33 = 0,54** dan **P66 = 0,75**) langsung diambil dari posisi 33% dan 66% populasi piksel pada kurva di atas, sehingga tiap kelas otomatis berisi proporsi wilayah yang lebih seimbang.

Dari titik potong tersebut, distribusi luas wilayah Kecamatan Dramaga terbagi sebagai berikut:

<table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 0.92rem;">
<thead>
<tr style="border-bottom: 2px solid var(--border);">
<th style="text-align:left; padding: 10px 8px;">Kelas Kerapatan</th>
<th style="text-align:left; padding: 10px 8px;">Rentang NDVI</th>
<th style="text-align:right; padding: 10px 8px;">Luas (km²)</th>
<th style="text-align:right; padding: 10px 8px;">Persentase</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid var(--border);">
<td style="padding: 10px 8px;">Kerapatan Rendah (Merah)</td>
<td style="padding: 10px 8px;">&lt; 0,54</td>
<td style="text-align:right; padding: 10px 8px;">8,35</td>
<td style="text-align:right; padding: 10px 8px;">32,79%</td>
</tr>
<tr style="border-bottom: 1px solid var(--border);">
<td style="padding: 10px 8px;">Kerapatan Sedang (Kuning)</td>
<td style="padding: 10px 8px;">0,54 – 0,75</td>
<td style="text-align:right; padding: 10px 8px;">8,59</td>
<td style="text-align:right; padding: 10px 8px;">33,73%</td>
</tr>
<tr style="border-bottom: 1px solid var(--border);">
<td style="padding: 10px 8px;">Kerapatan Tinggi (Hijau Tua)</td>
<td style="padding: 10px 8px;">&gt; 0,75</td>
<td style="text-align:right; padding: 10px 8px;">8,53</td>
<td style="text-align:right; padding: 10px 8px;">33,48%</td>
</tr>
<tr>
<td style="padding: 10px 8px;"><strong>Total</strong></td>
<td style="padding: 10px 8px;">-</td>
<td style="text-align:right; padding: 10px 8px;"><strong>25,47</strong></td>
<td style="text-align:right; padding: 10px 8px;"><strong>100,00%</strong></td>
</tr>
</tbody>
</table>

**Sebaran spasialnya:** kerapatan rendah terkonsentrasi di sepanjang Jl. Raya Dramaga, kawasan kos mahasiswa Desa Babakan bagian selatan, dan blok permukiman komersial di sisi timur yang berbatasan dengan Ciomas — didominasi permukaan kedap air. Kerapatan sedang menyebar di bagian tengah dan selatan sebagai zona transisi (semak, kebun hortikultura rakyat, pekarangan warga). Kerapatan tinggi mendominasi wilayah barat dan utara, termasuk area rektorat dan hutan penelitian IPB, didominasi tegakan pohon berkayu rapat dan bambu bantaran sungai.

## Insight & Rekomendasi Perencanaan Wilayah
- **Kenyamanan termal (UHI)** — Zona kerapatan rendah di Dramaga timur dan selatan jadi sumber akumulasi panas lokal. Rekomendasi: **Koefisien Dasar Hijau (KDH)** wajib minimal 35–45% untuk perizinan perumahan dan ruko baru, plus penanaman pohon peneduh di sepanjang Jl. Raya Dramaga.
- **Proteksi hidrologis & mitigasi banjir** — Penurunan area vegetasi penyerap memicu run-off dan genangan di hilir. Rekomendasi: sempadan sungai lindung mutlak 10–15 meter di bantaran Cihideung dan Cisadane, serta syarat minimal 2 lubang biopori/sumur resapan per unit kos baru dalam regulasi bangunan desa.
- **Keberlanjutan agroforestri** — Kerapatan tinggi (NDVI > 0,75) berisiko didominasi tanaman cepat panen bawah tajuk yang memangkas anakan pohon alami. Rekomendasi: penyisihan minimal 15–20% lahan agroforestri untuk regenerasi pohon lokal berkayu, sekaligus memanfaatkan hasil NDVI ini sebagai basis taksiran cadangan karbon wilayah untuk insentif ekologis daerah.

## Penutup
Integrasi Google Earth Engine dan QGIS menunjukkan bahwa penginderaan jauh bisa jadi alat bantu pengambilan keputusan yang efisien bagi perencana wilayah. Klasifikasi vegetasi Kecamatan Dramaga jadi tidak lagi bersifat tebakan, melainkan punya basis data kuantitatif yang solid untuk mendukung rencana pembangunan yang tangguh bencana dan berkelanjutan.

</div>

<div class="lang-en" markdown="1">

## Background & Spatial Planning Context
Having been born and raised in Dramaga Sub-District, the spatial changes around the IPB University campus corridor feel quite massive — gardens and rice fields keep converting into dense settlements, shophouses, and supporting urban infrastructure, with rising temperature being the most noticeable physical impact.

This subjective observation can be tested quantitatively using a measurable scientific instrument. This study carries out a spatial vegetation density analysis at the **Dramaga Sub-District** scale using the **Normalized Difference Vegetation Index (NDVI)** in **Google Earth Engine (GEE)**, followed by professional cartographic layouting in **QGIS**.

## Concept & Methodology
NDVI is a spectral index that simplifies multispectral data to assess vegetation health and density, using the formula:

`NDVI = (NIR - Red) / (NIR + Red)`

Healthy, chlorophyll-rich leaves strongly absorb red light for photosynthesis and strongly reflect near-infrared (NIR) radiation. NDVI values range from **-1 to +1** — negative values down to near zero characterize non-vegetated objects (water, concrete, built-up areas), while values approaching +1 represent dense, healthy vegetation canopy.

Because red light is more susceptible to atmospheric (Rayleigh) scattering than NIR, this study uses **Surface Reflectance (SR)** data that has already been atmospherically corrected, so the surface spectral values stay consistent.

**Data sources & parameters:**
- **Sentinel-2 Surface Reflectance** imagery (`COPERNICUS/S2_SR_HARMONIZED`), 10-meter spatial resolution (NIR Band 8, Red Band 4).
- Time range of **January 1 – May 31, 2026**, covering the rainy season and transition period.
- Cloud cover filter `< 15%`, with binary cloud & cirrus masking using the **QA60** band.
- Density classification using **local dynamic percentiles (P33 and P66)**, instead of fixed thresholds, so the classes stay adaptive to Dramaga's local biogeophysical characteristics.

## Workflow
<img src="/images/software/peta-ndvi-dramaga.jpg" alt="NDVI Map and Vegetation Density Classification of Dramaga Sub-District" class="inline-image">

1. **Acquisition & Cloud Masking** — Pulling the Sentinel-2 SR collection for the Jan–May 2026 period, filtering cloud cover, then reducing the image stack using a **median** function to produce a clean, gap-free composite.
2. **NDVI Calculation** — Computing NDVI from the NIR (B8) and Red (B4) bands for each image, then taking the temporal median value.
3. **Automatic Percentile Classification** — Extracting the 33rd and 66th percentiles from the NDVI pixel population of the study area (`reduceRegion`) as automatic Low–Medium–High class boundaries, complete with a dynamic interactive map legend. The pixel population distribution behind this calculation is visualized as a histogram in the Results section below.
4. **Area Calculation** — Calculating the area of each density class (km² and hectares) using `ee.Image.pixelArea()`, grouped by class.
5. **Layouting (QGIS)** — Exporting the NDVI raster and classification results from GEE to Google Drive, then assembling a formal, cartographically standardized map layout in QGIS.

The entire GEE process was written programmatically in JavaScript, from cloud masking through to exporting the results.

<a href="/files/GEE_NDVI_Dramaga.js" download class="btn btn-outline">Download GEE Script</a>

## Results
Before classification, the distribution of NDVI values across all pixels in the study area was first mapped as a histogram (generated directly from the GEE console):

<img src="/images/software/distribusi-ndvi-dramaga.png" alt="NDVI Value Distribution Histogram for Dramaga Sub-District" class="inline-image">

The curve shape is right-skewed — the long tail in the 0.6–0.9 range is much thicker than the negative-to-zero side. This is why this study's classification uses **dynamic percentiles (P33/P66)** rather than the fixed thresholds commonly used in general literature (e.g. 0.3 and 0.6): on a skewed distribution like this, fixed thresholds would produce an unbalanced class proportion that doesn't reflect Dramaga's local biogeophysical characteristics, which is indeed dominated by dense vegetation in the west-north side. With percentiles, the two cut points (**P33 = 0.54** and **P66 = 0.75**) are taken directly from the 33% and 66% positions of the pixel population on the curve above, so each class automatically contains a more balanced area proportion.

From those cut points, the area distribution of Dramaga Sub-District breaks down as follows:

<table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 0.92rem;">
<thead>
<tr style="border-bottom: 2px solid var(--border);">
<th style="text-align:left; padding: 10px 8px;">Density Class</th>
<th style="text-align:left; padding: 10px 8px;">NDVI Range</th>
<th style="text-align:right; padding: 10px 8px;">Area (km²)</th>
<th style="text-align:right; padding: 10px 8px;">Percentage</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid var(--border);">
<td style="padding: 10px 8px;">Low Density (Red)</td>
<td style="padding: 10px 8px;">&lt; 0.54</td>
<td style="text-align:right; padding: 10px 8px;">8.35</td>
<td style="text-align:right; padding: 10px 8px;">32.79%</td>
</tr>
<tr style="border-bottom: 1px solid var(--border);">
<td style="padding: 10px 8px;">Medium Density (Yellow)</td>
<td style="padding: 10px 8px;">0.54 – 0.75</td>
<td style="text-align:right; padding: 10px 8px;">8.59</td>
<td style="text-align:right; padding: 10px 8px;">33.73%</td>
</tr>
<tr style="border-bottom: 1px solid var(--border);">
<td style="padding: 10px 8px;">High Density (Dark Green)</td>
<td style="padding: 10px 8px;">&gt; 0.75</td>
<td style="text-align:right; padding: 10px 8px;">8.53</td>
<td style="text-align:right; padding: 10px 8px;">33.48%</td>
</tr>
<tr>
<td style="padding: 10px 8px;"><strong>Total</strong></td>
<td style="padding: 10px 8px;">-</td>
<td style="text-align:right; padding: 10px 8px;"><strong>25.47</strong></td>
<td style="text-align:right; padding: 10px 8px;"><strong>100.00%</strong></td>
</tr>
</tbody>
</table>

**Spatial distribution:** low density is concentrated along Jl. Raya Dramaga, the student boarding-house area in southern Babakan Village, and the commercial settlement block on the eastern side bordering Ciomas — dominated by impervious surfaces. Medium density spreads across the central and southern parts as a transition zone (shrubland, community horticultural gardens, residential yards). High density dominates the western and northern areas, including the rectorate area and IPB's research forest, dominated by dense woody stands and riverbank bamboo.

## Insights & Regional Planning Recommendations
- **Thermal comfort (UHI)** — The low-density zone in eastern and southern Dramaga is a local heat accumulation source. Recommendation: a mandatory minimum **Green Coverage Ratio (KDH)** of 35–45% for new housing and shophouse permits, plus shade tree planting along Jl. Raya Dramaga.
- **Hydrological protection & flood mitigation** — The decline in absorbent vegetation area triggers runoff and downstream waterlogging. Recommendation: an absolute 10–15 meter protected river buffer along the Cihideung and Cisadane riverbanks, plus a minimum requirement of 2 biopores/infiltration wells per new boarding-house unit in village building regulations.
- **Agroforestry sustainability** — High density (NDVI > 0.75) risks being dominated by fast-harvest understory crops that crowd out natural tree regeneration. Recommendation: setting aside a minimum 15–20% of land for agroforestry to regenerate native woody trees, while also using this NDVI result as a basis for estimating regional carbon stock for ecological incentive schemes.

## Closing
The integration of Google Earth Engine and QGIS shows that remote sensing can be an efficient decision-support tool for regional planners. Vegetation classification in Dramaga Sub-District is no longer a guess — it now has a solid quantitative data basis to support disaster-resilient and sustainable development plans.

</div>
