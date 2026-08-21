---
layout: project
title: "Pengolahan Orthophoto Menggunakan WebODM"
title_en: "Orthophoto Processing Using WebODM"
subtitle: "Dokumentasi Pemetaan Udara Drone untuk Basemap Overlay Site Plan di Cimahpar, Bogor Utara"
subtitle_en: "Documenting Drone Aerial Mapping for Site Plan Basemap Overlay in Cimahpar, North Bogor"
category: "Drone Mapping & Photogrammetry"
category_en: "Drone Mapping & Photogrammetry"
cover_image: "/images/software/ortofoto-kanaya.jpg"
permalink: /software/webodm/orthophoto-kanaya/
description: "Dokumentasi pengolahan foto udara drone DJI Air 3 menggunakan WebODM untuk menghasilkan orthophoto sebagai basemap overlay site plan dan pemantauan progres lahan, oleh Rivaldi Fiqriyansah."
---

<div class="lang-id" markdown="1">

## Latar Belakang
Ada satu masalah yang selalu muncul waktu gue ngerjain perencanaan tapak di lahan yang lagi aktif dikerjakan: **basemap-nya selalu ketinggalan zaman.** Citra satelit bawaan ArcGIS, Google, atau Bing bisa aja diambil satu sampai tiga tahun lalu. Padahal di lapangan, jalan kerja udah dibentuk, lahan udah dibuka, galian udah jalan. Citra lama itu praktis nggak nunjukin apa-apa.

Yang gue butuhin sebenernya sederhana: **latar visual yang bener-bener nunjukin kondisi lahan hari ini.** Biar waktu poligon kavling, area komersial, dan RTH di-overlay di ArcGIS Pro, gue bisa langsung liat rencananya nyambung atau nggak sama kondisi eksisting. Bonusnya, kalau ini diulang berkala, progres pengerjaan lahan jadi kerekam secara visual.

Solusinya ya potret sendiri pakai drone, terus diolah jadi orthophoto. Tulisan ini dokumentasi prosesnya pakai **WebODM** — software photogrammetry open source yang gratis.

Satu hal yang perlu gue tegasin di awal: **output ini murni buat visualisasi.** Nggak pakai GCP, nggak pakai RTK, nggak ada pengukuran terestris. Jadi jangan dipakai buat narik batas bidang atau ngitung volume. Bagian akhir tulisan gue khususin buat bahas batasan ini.

## Konsep & Metodologi
Lokasinya di **Cimahpar, Kecamatan Bogor Utara, Kota Bogor** — calon kawasan perumahan Kanaya yang nantinya kebagi jadi dua cluster, Anurika dan Amerta. Luas tapak intinya sekitar **4 hektare**, tapi waktu terbang gue sengaja melebar keluar batas biar area sekitarnya ikut kecakup. Hasil akhirnya nutup **7,59 hektare**.

**Akuisisi:**
- Drone **DJI Air 3**, terbang di ketinggian **120 meter**, dikendalikan lewat **DJI Fly** dari remote bawaan (tipe smart controller).
- Terbang **full manual**, tanpa misi grid otomatis.
- **48 foto**, diambil dari pukul 10:18 sampai 10:24 tanggal **18 Agustus 2026** — sekitar **6 menit**. Cuaca cerah berawan tipis. Cukup satu baterai.
- Kamera terekam sebagai `DJI FC8282` dengan dimensi foto **4032 × 2268 piksel**.

Soal terbang manual ini, alasannya kepenasaran. Waktu belajar WebODM dari video tutorial, gue perhatiin pas si pembuat video ngimpor fotonya, **sebaran titik di peta WebODM-nya nggak beraturan** — bukan pola grid rapi kayak yang gue kenal waktu dulu pakai Mavic 2 Pro dengan aplikasi route flight. Dari situ muncul pertanyaan: *syaratnya kan cuma fotonya saling bertampalan? Berarti jalurnya harus rapi atau nggak?* Ya udah, gue coba aja. Terbang bebas, yang penting overlap-nya gue jaga secara visual.

Perlu dicatat juga, tapak ini elevasinya nggak landai — ada naik-turun yang lumayan. Di terbang manual, ngikutin kontur permukaan itu susah dilakuin, jadi ketinggian relatifnya nggak konstan terhadap tanah. Konsekuensinya ke resolusi gue bahas di bagian hasil.

**Perangkat & software:**

| Komponen | Spesifikasi |
|---|---|
| Prosesor | Intel Core i5-14400 (2,50 GHz) |
| RAM | 32 GB |
| GPU | NVIDIA GeForce RTX 3050 6 GB |
| OS | Windows 11 64-bit |
| Software | WebODM 3.2.6 (native Windows, tanpa Docker) |
| Engine | ODX 3.8.0, node lokal `node-odx-1` |

**Parameter pemrosesan yang dipakai:**

```
camera-lens:brown, rolling-shutter:true, rolling-shutter-readout:0,
auto-boundary-distance:0, feature-quality:ultra, min-num-features:16000,
gps-accuracy:10, pc-quality:high, pc-filter:2.5, mesh-octree-depth:12,
dsm:true, dem-resolution:10, orthophoto-resolution:5
```

Beberapa yang paling ngaruh:

- **`rolling-shutter:true`** — Air 3 pakai shutter elektronik. Tanpa koreksi ini, objek yang harusnya lurus bisa keliatan miring, apalagi kalau drone lagi gerak cepat waktu motret. Buat terbang manual yang kecepatannya nggak konstan kayak punya gue, ini wajib.
- **`camera-lens:brown`** — maksa pakai model distorsi lensa Brown, bukan ngebiarin software nebak sendiri. Lebih stabil buat dataset kecil tanpa GCP.
- **`orthophoto-resolution:5`** — sengaja nggak gue turunin di bawah GSD asli. Naruh angka lebih kecil cuma bikin file gede tanpa nambah detail; pikselnya cuma diinterpolasi.
- **`gps-accuracy:10`** — ngasih tau software kalau GPS bawaan drone ini akurasinya orde meteran, jadi jangan terlalu dipercaya waktu penyesuaian.

## Alur Kerja
<img src="/images/software/SS-webodm-task-kanaya.jpg" alt="Detail task pemrosesan di WebODM" class="inline-image">

1. **Seleksi Foto** — Buang foto lepas landas, mendarat, dan yang blur. File aslinya jangan diedit lewat aplikasi apa pun, karena EXIF geotag-nya bisa kehapus dan prosesnya bakal gagal total.
2. **Impor ke WebODM** — Bikin project baru, unggah 48 foto. WebODM langsung nampilin sebaran titik pemotretan di peta berdasarkan geotag EXIF, jadi bisa langsung keliatan cakupannya.
3. **Setting Parameter** — Masukin opsi di atas lewat menu Options.
4. **Structure from Motion** — Software nyari titik-titik fitur yang sama di antar-foto, terus ngitung posisi dan orientasi tiap kamera plus posisi 3D titik-titik itu. Ini tahap yang nentuin semuanya.
5. **Rekonstruksi Dense & Meshing** — Dari model jarang tadi dibikin point cloud rapat, terus dijadiin permukaan mesh.
6. **DSM & Orthophoto** — Permukaan tadi dipakai buat bikin Digital Surface Model, terus semua foto diproyeksiin ulang ke atas permukaan itu jadi orthophoto yang skalanya seragam.
7. **Ekspor** — Unduh `odm_orthophoto.tif` dan `dsm.tif`, siap dibuka di ArcGIS Pro.

Total waktu pemrosesan: **17 menit 11 detik** buat 48 foto. Total ukuran output 895,67 MB.

## Hasil Analisis
<img src="/images/software/ortofoto-kanaya.jpg" alt="Orthophoto hasil pengolahan WebODM" class="inline-image">

| Indikator | Nilai |
|---|---|
| Foto berhasil direkonstruksi | **48 dari 48 (100%)** |
| Titik sparse | 101.279 dari 101.424 (99,9%) |
| Titik dense | 4.707.355 |
| GSD rata-rata | 3,95 cm |
| Reprojection error rata-rata | 0,72 piksel |
| Luas tercakup | 7,5925 ha |
| Sistem koordinat output | WGS 84 / UTM zone 48S |
| Rentang elevasi DSM | 209,02 – 240,16 m |

Jadi jawaban buat eksperimen tadi: **ya, terbang manual tanpa jalur grid ternyata bisa.** Seluruh 48 foto berhasil ter-align, dan reprojection error 0,72 piksel itu sehat — di bawah 1 piksel umumnya udah dianggap rekonstruksi yang baik.

<img src="/images/software/dsm-kanaya.jpg" alt="Digital Surface Model hasil WebODM" class="inline-image">

DSM-nya nunjukin rentang elevasi 209 sampai 240 meter — beda tinggi sekitar 31 meter di area 7,6 hektare. Ini juga yang bikin **GSD rata-rata keluar di 3,95 cm** meskipun gue terbang di 120 meter. Angka 120 meter di DJI Fly itu relatif terhadap titik lepas landas, bukan terhadap tanah di bawah drone. Karena tapaknya naik-turun, jarak drone ke permukaan jadi beda-beda, dan resolusinya ikut nggak seragam. Buat keperluan visual sih nggak masalah.

Satu catatan dari quality report: **rata-rata satu titik di tanah cuma keliatan di 3,62 foto.** Itu tergolong tipis. Peta cakupan di report juga nunjukin bagian tengah aman (kecakup 4 foto atau lebih) tapi tepiannya cuma kecakup 2–3 foto. Wajar sih, konsekuensi dari terbang manual yang overlap-nya nggak terkontrol. Artinya metode ini masih aman di skala 4–8 hektare, tapi buat area yang jauh lebih luas kemungkinan besar bakal bermasalah.

### Dipakai buat apa di ArcGIS Pro
<img src="/images/software/overlay-siteplan-kanaya.jpg" alt="Overlay layer site plan di atas orthophoto" class="inline-image">

Setelah masuk ArcGIS Pro, orthophoto ini jadi latar buat layer perencanaan — kavling, area komersial, RTH, marketing gallery, area parkir. Manfaat konkretnya ada tiga:

- **Kondisi lahan yang bener-bener aktual.** Jalan kerja, galian, dan area yang udah dibuka keliatan apa adanya.
- **Konteks sekitar jadi kebaca.** Permukiman eksisting, aliran sungai, dan jalan akses semuanya keliatan jelas — dan itu langsung ngaruh ke penilaian rencana.
- **Pemantauan progres.** Ini yang paling kepakai. Karena terbangnya cepet (6 menit) dan prosesnya cepet (17 menit), ini gampang diulang berkala. Numpuk orthophoto dari beberapa tanggal ngasih rekaman visual perkembangan lahan yang nggak bisa digantiin foto tangan.

## Catatan & Batasan
Quality report WebODM nampilin tabel *Accuracy* dengan angka **Horizontal CE90 absolut 0,260 m**. Keliatannya meyakinkan banget, tapi **angka itu jangan dikutip sebagai akurasi.**

Alasannya, angka itu dihitung dari konsistensi internal antara posisi kamera hasil penyesuaian dan koordinat GPS di EXIF foto — dan perhitungannya berasumsi GPS EXIF-nya nggak punya bias sistematis. Padahal GPS drone konsumer non-RTK justru bias sistematisnya orde meteran, dan bias yang seragam ke satu arah nggak bakal kedeteksi sama statistik internal. Waktu orthophoto ini gue georeferensiin di ArcGIS Pro terhadap data referensi, pergeserannya ternyata **sekitar 4,4 meter**.

Jadi rangkumannya:

| Aspek | Penilaian |
|---|---|
| Ketajaman visual | Baik (GSD ~4 cm) |
| Geometri relatif (bentuk & proporsi internal) | Baik |
| Posisi absolut | Meleset beberapa meter |
| Elevasi absolut | Nggak bisa dipercaya |

**Layak dipakai buat:** latar visual, dokumentasi progres, baca konteks tapak, komunikasi visual ke klien atau atasan.

**Nggak layak dipakai buat:** penarikan batas bidang, hitung luas legal, hitung volume cut and fill, atau apa pun yang nuntut koordinat absolut. Buat itu, jalannya cuma satu: pasang GCP dan ukur pakai GNSS geodetik.

## Langkah Selanjutnya
Orthophoto mentah dari WebODM ini masih perlu digeser posisinya biar pas sama data referensi yang ada. Proses georeferensinya di ArcGIS Pro — milih jenis transformasi, ngedeteksi titik kontrol yang salah tunjuk, dan seberapa jauh hasilnya bisa diperbaiki — gue bahas terpisah di tulisan berikutnya.

<a href="#" class="btn btn-outline">Lanjut ke Georeferensi Orthophoto di ArcGIS Pro</a>

</div>

<div class="lang-en" markdown="1">

## Background
There's one problem that always comes up when I work on site planning for land that's actively under construction: **the basemap is always out of date.** The default satellite imagery in ArcGIS, Google, or Bing might have been captured one to three years ago. Meanwhile on the ground, access roads have been cut, the land has been cleared, and excavation is already underway. That old imagery effectively shows nothing.

What I actually needed was simple: **a visual backdrop that genuinely reflects the site as it is today.** That way, when the parcel, commercial area, and green space polygons get overlaid in ArcGIS Pro, I can immediately see whether the plan fits the existing conditions. As a bonus, if this is repeated periodically, construction progress gets recorded visually.

The solution was to shoot it myself with a drone and process it into an orthophoto. This write-up documents that process using **WebODM** — free, open source photogrammetry software.

One thing worth stating upfront: **this output is purely for visualization.** No GCPs, no RTK, no terrestrial survey. So don't use it for demarcating boundaries or calculating volumes. The closing section of this write-up is dedicated to those limitations.

## Concept & Methodology
The site is in **Cimahpar, North Bogor District, Bogor City** — the future Kanaya residential area, which will eventually be split into two clusters, Anurika and Amerta. The core site is around **4 hectares**, but I deliberately flew beyond the boundary so the surrounding area would also be captured. The final result covers **7.59 hectares**.

**Acquisition:**
- **DJI Air 3** drone, flown at **120 meters**, controlled through **DJI Fly** on the bundled smart controller.
- Flown **fully manually**, with no automated grid mission.
- **48 photos**, captured between 10:18 and 10:24 on **18 August 2026** — roughly **6 minutes**. Clear weather with light cloud. One battery was enough.
- The camera is recorded as `DJI FC8282` with photo dimensions of **4032 × 2268 pixels**.

As for the manual flight, it came down to curiosity. While learning WebODM from a tutorial video, I noticed that when the creator imported his photos, **the distribution of capture points on the WebODM map was irregular** — not the neat grid pattern I knew from back when I used a Mavic 2 Pro with a route flight app. That raised a question: *the only requirement is that the photos overlap, right? So does the flight path actually have to be tidy?* So I just tried it. Free flight, keeping the overlap in check visually.

Worth noting too, this site isn't flat — there's a fair bit of rise and fall. On a manual flight, following the terrain surface is difficult, so the height relative to the ground isn't constant. I discuss the effect on resolution in the results section.

**Hardware & software:**

| Component | Specification |
|---|---|
| Processor | Intel Core i5-14400 (2.50 GHz) |
| RAM | 32 GB |
| GPU | NVIDIA GeForce RTX 3050 6 GB |
| OS | Windows 11 64-bit |
| Software | WebODM 3.2.6 (native Windows, no Docker) |
| Engine | ODX 3.8.0, local node `node-odx-1` |

**Processing parameters used:**

```
camera-lens:brown, rolling-shutter:true, rolling-shutter-readout:0,
auto-boundary-distance:0, feature-quality:ultra, min-num-features:16000,
gps-accuracy:10, pc-quality:high, pc-filter:2.5, mesh-octree-depth:12,
dsm:true, dem-resolution:10, orthophoto-resolution:5
```

The ones that matter most:

- **`rolling-shutter:true`** — the Air 3 uses an electronic shutter. Without this correction, objects that should be straight can appear skewed, especially when the drone is moving quickly at the moment of capture. For a manual flight with inconsistent speed like mine, this is essential.
- **`camera-lens:brown`** — forces the Brown lens distortion model rather than letting the software guess on its own. More stable for a small dataset without GCPs.
- **`orthophoto-resolution:5`** — deliberately not set below the native GSD. Entering a smaller number only produces a larger file with no additional detail; the pixels are merely interpolated.
- **`gps-accuracy:10`** — tells the software that this drone's built-in GPS is accurate to the order of meters, so it shouldn't be trusted too heavily during adjustment.

## Workflow
<img src="/images/software/SS-webodm-task-kanaya.jpg" alt="Processing task details in WebODM" class="inline-image">

1. **Photo Culling** — Remove takeoff, landing, and blurred shots. Don't edit the original files in any application, because the EXIF geotags can be stripped and the whole process will fail.
2. **Import to WebODM** — Create a new project and upload the 48 photos. WebODM immediately plots the capture points on a map from the EXIF geotags, so coverage is visible right away.
3. **Parameter Setup** — Enter the options above through the Options menu.
4. **Structure from Motion** — The software finds matching feature points across photos, then computes the position and orientation of each camera along with the 3D positions of those points. This is the stage that determines everything.
5. **Dense Reconstruction & Meshing** — From that sparse model, a dense point cloud is built and then turned into a mesh surface.
6. **DSM & Orthophoto** — That surface is used to generate a Digital Surface Model, then all photos are reprojected onto it to produce an orthophoto with uniform scale.
7. **Export** — Download `odm_orthophoto.tif` and `dsm.tif`, ready to open in ArcGIS Pro.

Total processing time: **17 minutes 11 seconds** for 48 photos. Total output size: 895.67 MB.

## Results
<img src="/images/software/ortofoto-kanaya.jpg" alt="Orthophoto produced by WebODM" class="inline-image">

| Indicator | Value |
|---|---|
| Images reconstructed | **48 of 48 (100%)** |
| Sparse points | 101,279 of 101,424 (99.9%) |
| Dense points | 4,707,355 |
| Average GSD | 3.95 cm |
| Average reprojection error | 0.72 pixels |
| Area covered | 7.5925 ha |
| Output coordinate system | WGS 84 / UTM zone 48S |
| DSM elevation range | 209.02 – 240.16 m |

So the answer to that experiment: **yes, a manual flight without a grid pattern does work.** All 48 photos aligned successfully, and a reprojection error of 0.72 pixels is healthy — below 1 pixel is generally considered a good reconstruction.

<img src="/images/software/dsm-kanaya.jpg" alt="Digital Surface Model produced by WebODM" class="inline-image">

The DSM shows an elevation range from 209 to 240 meters — around 31 meters of relief across 7.6 hectares. That's also why the **average GSD came out at 3.95 cm** even though I flew at 120 meters. The 120-meter figure in DJI Fly is relative to the takeoff point, not to the ground beneath the drone. Because the site rises and falls, the drone's distance to the surface varies, and the resolution varies with it. For visual purposes that's not a problem.

One note from the quality report: **on average, a single ground point is only visible in 3.62 photos.** That's on the thin side. The coverage map in the report also shows the central area is safe (covered by 4 or more photos) while the edges are only covered by 2–3. Understandable — it's a consequence of a manual flight where overlap isn't controlled. It means this method is still safe at a 4–8 hectare scale, but for a much larger area it would likely run into trouble.

### How it's used in ArcGIS Pro
<img src="/images/software/overlay-siteplan-kanaya.jpg" alt="Site plan layers overlaid on the orthophoto" class="inline-image">

Once in ArcGIS Pro, this orthophoto becomes the backdrop for the planning layers — parcels, commercial area, green space, marketing gallery, parking areas. There are three concrete benefits:

- **Genuinely current site conditions.** Access roads, excavation, and cleared areas are visible exactly as they are.
- **Surrounding context becomes legible.** Existing settlements, the river, and access roads are all clearly visible — and that directly affects how the plan is assessed.
- **Progress monitoring.** This is the most useful in practice. Because the flight is quick (6 minutes) and processing is quick (17 minutes), it's easy to repeat periodically. Stacking orthophotos from several dates gives a visual record of the site's development that handheld photos can't replace.

## Notes & Limitations
The WebODM quality report displays an *Accuracy* table with **absolute Horizontal CE90 of 0.260 m**. It looks extremely convincing, but **that figure should not be quoted as accuracy.**

The reason is that it's computed from the internal consistency between the adjusted camera positions and the GPS coordinates in the photo EXIF — and that calculation assumes the EXIF GPS carries no systematic bias. In reality, consumer non-RTK drone GPS has systematic bias on the order of meters, and a uniform bias in one direction won't be detected by internal statistics. When I georeferenced this orthophoto in ArcGIS Pro against reference data, the displacement turned out to be **around 4.4 meters**.

In summary:

| Aspect | Assessment |
|---|---|
| Visual sharpness | Good (GSD ~4 cm) |
| Relative geometry (internal shape & proportion) | Good |
| Absolute position | Off by several meters |
| Absolute elevation | Not trustworthy |

**Suitable for:** visual backdrop, progress documentation, reading site context, visual communication with clients or supervisors.

**Not suitable for:** demarcating parcel boundaries, calculating legal areas, cut-and-fill volume calculations, or anything requiring absolute coordinates. For those, there's only one route: install GCPs and survey them with geodetic GNSS.

## Next Steps
This raw orthophoto from WebODM still needs to be shifted into position to line up with the existing reference data. I cover that georeferencing process in ArcGIS Pro — choosing the transformation type, detecting misplaced control points, and how far the result can actually be improved — separately in the next write-up.

<a href="#" class="btn btn-outline">Continue to Orthophoto Georeferencing in ArcGIS Pro</a>

</div>
