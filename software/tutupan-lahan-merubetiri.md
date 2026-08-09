---
layout: project
title: "Klasifikasi Tutupan Lahan TN Meru Betiri"
title_en: "Meru Betiri National Park Land Cover Classification"
subtitle: "Persiapan Data untuk Analisis Forest Canopy Density Berbasis Random Forest di Google Earth Engine"
subtitle_en: "Data Preparation for Forest Canopy Density Analysis Using Random Forest in Google Earth Engine"
category: "GIS & Spatial Analysis"
category_en: "GIS & Spatial Analysis"
cover_image: "/images/software/SS-GEE-merubetiri.jpg"
permalink: /software/gee/tutupan-lahan-merubetiri/
description: "Klasifikasi tutupan lahan Taman Nasional Meru Betiri untuk analisis Forest Canopy Density berbasis Random Forest di Google Earth Engine, oleh Rivaldi Fiqriyansah."
---

<div class="lang-id" markdown="1">

## Latar Belakang
Studi kasus ini berawal dari obrolan santai dengan teman kuliah yang mengambil Fakultas Kehutanan di IPB. Dia sedang menyusun tugas akhir dengan salah satu metode analisisnya adalah **Forest Canopy Density (FCD)** — sebuah metode untuk menilai kerapatan tajuk hutan berdasarkan citra satelit. Berhubung ini istilah yang baru pertama kali gue dengar dan belum pernah dikerjakan sebelumnya, muncul rasa penasaran untuk pelajari sendiri di waktu luang.

Dari beberapa referensi yang gue baca, salah satu data dasar yang dibutuhkan sebelum masuk ke perhitungan indeks-indeks FCD adalah **peta tutupan lahan**, minimal terbagi jadi dua kelas: **hutan** dan **non-hutan**. Data ini nantinya berfungsi sebagai *mask* atau batas area kajian, supaya proses FCD hanya dihitung di zona yang memang teridentifikasi sebagai kawasan berhutan.

Sebagai latihan sekaligus persiapan data, gue coba petakan tutupan lahan di **Taman Nasional Meru Betiri** (Jawa Timur) menggunakan citra satelit dan machine learning di Google Earth Engine (GEE). Tulisan ini murni dokumentasi proses pengolahan datanya — belum masuk ke tahap analisis FCD itu sendiri.

## Konsep & Metodologi
Pendekatan yang dipakai adalah **supervised classification** dengan algoritma **Random Forest**, salah satu metode machine learning berbasis kumpulan pohon keputusan (*decision tree*) yang cukup andal untuk klasifikasi citra penginderaan jauh karena tahan terhadap noise dan tidak gampang overfitting.

**Sumber data & parameter:**
- Citra **Landsat 8 dan Landsat 9 Collection 2 Level 2** (`LANDSAT/LC08/C02/T1_L2` & `LANDSAT/LC09/C02/T1_L2`), digabung (*merge*) untuk memperbanyak ketersediaan piksel bebas awan.
- Rentang waktu **1 Januari – 31 Desember 2025**, direduksi jadi satu komposit tahunan memakai fungsi **median** supaya bebas dari gangguan awan dan bayangan awan.
- Cloud & cloud shadow masking memakai bit **QA_PIXEL** (bit 3 untuk bayangan awan, bit 4 untuk awan).
- Enam band spektral sebagai input klasifikasi: **Blue, Green, Red, NIR, SWIR 1, dan SWIR 2** (`SR_B2`–`SR_B7`).
- Batas kawasan (AOI) Taman Nasional Meru Betiri diakses langsung dari **ArcGIS REST Service milik BNPB** yang sudah terhubung di ArcGIS Pro, kemudian di-*select* dan di-*export* jadi shapefile, lalu diunggah ke Assets GEE sebagai batas area kajian.
- Data latih (*training sample*) sebanyak **77 titik hutan** dan **78 titik non-hutan**, diambil manual lewat Geometry Imports di GEE dengan menginterpretasi citra dasar sebagai acuan.

## Alur Kerja
<img src="/images/software/SS-GEE-merubetiri.jpg" alt="Code Editor dan Hasil Klasifikasi Tutupan Lahan di Google Earth Engine" class="inline-image">

1. **Persiapan Batas Kawasan** — Menarik boundary Taman Nasional Meru Betiri dari ArcGIS REST Service BNPB di ArcGIS Pro, meng-*export*-nya sebagai shapefile, lalu mengunggahnya ke Assets GEE untuk dipakai sebagai AOI (*Area of Interest*) sekaligus filter spasial pada seluruh proses.
2. **Akuisisi & Cloud Masking** — Menarik koleksi Landsat 8 dan 9 sepanjang tahun 2025, menggabungkan keduanya, memfilter awan dan bayangan awan lewat band QA_PIXEL, lalu mereduksinya jadi satu komposit median dan memotongnya sesuai batas kawasan.
3. **Penentuan Titik Sampel** — Membuat titik sampel untuk kelas hutan (77 titik) dan non-hutan (78 titik) secara manual berdasarkan interpretasi visual citra, kemudian menggabungkan keduanya jadi satu koleksi data latih.
4. **Ekstraksi Nilai Piksel** — Mengambil nilai enam band spektral (`SR_B2`–`SR_B7`) pada tiap titik sampel memakai `sampleRegions`, dengan skala 30 meter sesuai resolusi asli citra Landsat.
5. **Training Model Random Forest** — Melatih classifier `smileRandomForest` dengan 50 pohon keputusan menggunakan data latih dan properti kelas `tuplah` (0 = hutan, 1 = non-hutan).
6. **Klasifikasi & Uji Akurasi** — Menerapkan model ke seluruh citra di area kajian, lalu mengevaluasi performanya lewat *confusion matrix*, *overall accuracy*, dan *kappa coefficient* dari data training.
7. **Export Hasil** — Mengekspor raster hasil klasifikasi ke Google Drive dalam resolusi 30 meter untuk diproses lebih lanjut di ArcGIS Pro.

Seluruh proses ditulis terprogram lewat JavaScript di GEE Code Editor, mulai dari cloud masking sampai export hasil.

<a href="/files/GEE_Tuplah_MeruBetiri.js" download class="btn btn-outline">Unduh Script GEE</a>

## Hasil Analisis
Model Random Forest diuji langsung terhadap data training lewat *confusion matrix* berikut:

<img src="/images/software/console-tuplah-merubetiri.jpg" alt="Confusion Matrix, Overall Accuracy, dan Kappa Coefficient di Console GEE" class="inline-image">

Dari total 77 titik sampel hutan, seluruhnya (77) berhasil diklasifikasikan dengan benar tanpa kesalahan. Dari 78 titik sampel non-hutan, 77 titik terklasifikasi benar dan hanya 1 titik yang keliru terdeteksi sebagai hutan. Kombinasi ini menghasilkan:

- **Overall Accuracy: 99,35%**
- **Kappa Coefficient: 0,987** (mendekati 1, menandakan tingkat kesepakatan hasil klasifikasi terhadap data referensi yang hampir sempurna)

Perlu dicatat, angka ini dihitung dari data training itu sendiri (bukan data validasi independen), jadi lebih menggambarkan seberapa baik model "menghafal" pola dari sampel yang diberikan, bukan murni akurasi terhadap kondisi lapangan yang belum pernah dilihat model. Meski begitu, hasilnya cukup jadi indikator awal bahwa pemisahan spektral antara kelas hutan dan non-hutan di kawasan ini relatif tegas.

Setelah diekspor dan diproses lebih lanjut di ArcGIS Pro, berikut hasil akhir peta tutupan lahan Taman Nasional Meru Betiri tahun 2025:

<img src="/images/software/peta-tutupan-lahan-merubetiri.jpg" alt="Peta Tutupan Lahan Taman Nasional Meru Betiri 2025" class="inline-image">

Secara visual, kelas non-hutan (kuning) terkonsentrasi di sisi utara dan barat laut kawasan — area yang berbatasan langsung dengan lahan pertanian dan permukiman di luar batas taman nasional — sementara mayoritas kawasan bagian tengah, timur, dan selatan masih didominasi tutupan hutan (hijau) yang relatif rapat dan menerus.

## Langkah Selanjutnya
Peta tutupan lahan biner ini rencananya bakal jadi salah satu input dasar buat eksplorasi **analisis Forest Canopy Density (FCD)** di kesempatan berikutnya — sekalian jadi ajang belajar metode baru yang terinspirasi dari diskusi soal tugas akhir Fakultas Kehutanan IPB tadi. Selain itu, hasil klasifikasi ini juga bisa dipakai sebagai data pendukung untuk pemantauan perubahan tutupan lahan kawasan konservasi dari waktu ke waktu.

</div>

<div class="lang-en" markdown="1">

## Background
This case study started from a casual conversation with a college friend majoring in Forestry at IPB University. He was working on his thesis, and one of the analysis methods involved was **Forest Canopy Density (FCD)** — a method for assessing forest canopy density based on satellite imagery. Since it was a term I'd never heard before and had never worked on, curiosity kicked in to learn it independently in my spare time.

From the references I read, one of the base datasets needed before diving into FCD index calculations is a **land cover map**, split into at least two classes: **forest** and **non-forest**. This data later serves as a mask or study-area boundary, so the FCD process is only computed within zones identified as forested.

As a practice run and data-preparation step, I tried mapping land cover in **Meru Betiri National Park** (East Java) using satellite imagery and machine learning in Google Earth Engine. This write-up is purely documentation of the data processing itself — it doesn't yet cover the FCD analysis stage.

## Concept & Methodology
The approach used is **supervised classification** with the **Random Forest** algorithm, a machine learning method based on an ensemble of decision trees that's fairly reliable for remote sensing image classification because it's resistant to noise and not prone to overfitting.

**Data sources & parameters:**
- **Landsat 8 and Landsat 9 Collection 2 Level 2** imagery (`LANDSAT/LC08/C02/T1_L2` & `LANDSAT/LC09/C02/T1_L2`), merged to increase the availability of cloud-free pixels.
- Time range of **January 1 – December 31, 2025**, reduced into a single annual composite using a **median** function to filter out cloud and cloud-shadow interference.
- Cloud & cloud shadow masking using **QA_PIXEL** bits (bit 3 for cloud shadow, bit 4 for cloud).
- Six spectral bands as classification inputs: **Blue, Green, Red, NIR, SWIR 1, and SWIR 2** (`SR_B2`–`SR_B7`).
- The Meru Betiri National Park boundary (AOI) was pulled directly from **BNPB's ArcGIS REST Service** already connected in ArcGIS Pro, then selected and exported as a shapefile before being uploaded to GEE Assets as the study-area boundary.
- Training samples of **77 forest points** and **78 non-forest points**, collected manually via Geometry Imports in GEE by visually interpreting the base imagery.

## Workflow
<img src="/images/software/SS-GEE-merubetiri.jpg" alt="Code Editor and Land Cover Classification Result in Google Earth Engine" class="inline-image">

1. **Boundary Preparation** — Pulling the Meru Betiri National Park boundary from BNPB's ArcGIS REST Service in ArcGIS Pro, exporting it as a shapefile, then uploading it to GEE Assets to serve as the AOI (Area of Interest) and spatial filter throughout the whole process.
2. **Acquisition & Cloud Masking** — Pulling the Landsat 8 and 9 collections for the full 2025 year, merging both, filtering out cloud and cloud shadow via the QA_PIXEL band, then reducing them into a single median composite and clipping it to the study-area boundary.
3. **Sample Point Collection** — Creating sample points for the forest class (77 points) and non-forest class (78 points) manually based on visual image interpretation, then merging both into a single training dataset.
4. **Pixel Value Extraction** — Pulling the values of six spectral bands (`SR_B2`–`SR_B7`) at each sample point using `sampleRegions`, at a scale of 30 meters matching the native Landsat resolution.
5. **Random Forest Training** — Training a `smileRandomForest` classifier with 50 decision trees using the training data and the `tuplah` class property (0 = forest, 1 = non-forest).
6. **Classification & Accuracy Testing** — Applying the model across the entire study area, then evaluating its performance through a confusion matrix, overall accuracy, and kappa coefficient computed from the training data.
7. **Exporting Results** — Exporting the classification raster to Google Drive at 30-meter resolution for further processing in ArcGIS Pro.

The entire process was written programmatically in JavaScript in the GEE Code Editor, from cloud masking through to exporting the results.

<a href="/files/GEE_Tuplah_MeruBetiri.js" download class="btn btn-outline">Download GEE Script</a>

## Results
The Random Forest model was tested directly against the training data through the following confusion matrix:

<img src="/images/software/console-tuplah-merubetiri.jpg" alt="Confusion Matrix, Overall Accuracy, and Kappa Coefficient in the GEE Console" class="inline-image">

Out of 77 forest sample points, all 77 were classified correctly with no errors. Out of 78 non-forest sample points, 77 were classified correctly and only 1 was mistakenly detected as forest. This combination results in:

- **Overall Accuracy: 99.35%**
- **Kappa Coefficient: 0.987** (close to 1, indicating an almost-perfect level of agreement between the classification result and the reference data)

It's worth noting this figure is computed from the training data itself (not an independent validation set), so it reflects how well the model "memorized" the patterns given rather than pure accuracy against unseen field conditions. Still, it's a good early indicator that the spectral separation between the forest and non-forest classes in this area is relatively distinct.

After being exported and further processed in ArcGIS Pro, here's the final land cover map of Meru Betiri National Park for 2025:

<img src="/images/software/peta-tutupan-lahan-merubetiri.jpg" alt="Meru Betiri National Park Land Cover Map 2025" class="inline-image">

Visually, the non-forest class (yellow) is concentrated on the northern and northwestern sides of the area — bordering directly on agricultural land and settlements outside the national park boundary — while the majority of the central, eastern, and southern parts remain dominated by relatively dense, continuous forest cover (green).

## Next Steps
This binary land cover map is planned to serve as one of the base inputs for exploring **Forest Canopy Density (FCD) analysis** down the line — doubling as a chance to learn a new method inspired by that conversation about the IPB Forestry thesis. Beyond that, this classification result can also serve as supporting data for monitoring land cover change in the conservation area over time.

</div>
