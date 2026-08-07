---
layout: project
title: "Analisis NDVI Kecamatan Dramaga"
subtitle: "Kerapatan Vegetasi Berbasis Google Earth Engine dan QGIS"
category: "GIS & Spatial Analysis"
cover_image: "/images/software/peta-ndvi-dramaga.jpg"
permalink: /software/gee/ndvi-dramaga/
---
 
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
3. **Klasifikasi Persentil Otomatis** — Mengekstrak Persentil 33 dan 66 dari populasi piksel NDVI wilayah kajian (`reduceRegion`) sebagai batas kelas Rendah–Sedang–Tinggi secara otomatis, lengkap dengan legenda peta interaktif dinamis.
4. **Kalkulasi Luasan** — Menghitung luas tiap kelas kerapatan (km² dan hektare) memakai `ee.Image.pixelArea()` yang dikelompokkan per kelas.
5. **Layouting (QGIS)** — Mengekspor raster NDVI dan hasil klasifikasi dari GEE ke Google Drive, kemudian menyusun layout peta formal berstandar kartografis di QGIS.
Seluruh proses di GEE ditulis terprogram lewat JavaScript, mulai dari cloud masking sampai ekspor hasil.
 
<a href="/files/GEE_NDVI_Dramaga.js" download class="btn btn-outline">Unduh Script GEE</a>
 
## Hasil Analisis
Titik potong klasifikasi yang dihasilkan: **P33 = 0,54** dan **P66 = 0,75**. Dari situ, distribusi luas wilayah Kecamatan Dramaga terbagi sebagai berikut:
 
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
 
