---
layout: project
title: "Pengolahan Orthophoto Menggunakan WebODM"
title_en: "Orthophoto Processing Using WebODM"
subtitle: "Dokumentasi Pemetaan Udara Drone untuk Basemap Overlay Site Plan di Cimahpar, Bogor Utara"
subtitle_en: "Documenting Drone Aerial Mapping for Site Plan Basemap Overlay in Cimahpar, North Bogor"
category: "Drone Mapping & Photogrammetry"
category_en: "Drone Mapping & Photogrammetry"
cover_image: "/images/software/ortofoto-kanaya.jpg"
permalink: /software/orthophoto-kanaya/
description: "Dokumentasi pengolahan foto udara drone DJI Air 3 menggunakan WebODM untuk menghasilkan orthophoto sebagai basemap overlay site plan dan pemantauan progres lahan, oleh Rivaldi Fiqriyansah."
---

<style>
.lang-id table,
.lang-en table {
  width: 100%;
  border-collapse: collapse;
  margin: 28px 0;
  font-size: 0.95rem;
  line-height: 1.55;
}

.lang-id thead th,
.lang-en thead th {
  text-align: left;
  font-weight: 700;
  padding: 12px 16px;
  border-bottom: 2px solid rgba(128, 128, 128, 0.45);
  white-space: nowrap;
}

.lang-id tbody td,
.lang-en tbody td {
  padding: 12px 16px;
  vertical-align: top;
  border-bottom: 1px solid rgba(128, 128, 128, 0.22);
}

.lang-id tbody tr:last-child td,
.lang-en tbody tr:last-child td {
  border-bottom: none;
}

.lang-id tbody td:first-child,
.lang-en tbody td:first-child {
  width: 34%;
  font-weight: 600;
}

.lang-id table code,
.lang-en table code {
  white-space: nowrap;
  font-size: 0.88em;
}

@media (max-width: 640px) {
  .lang-id table,
  .lang-en table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 0.88rem;
  }
  .lang-id tbody td,
  .lang-en tbody td,
  .lang-id thead th,
  .lang-en thead th {
    padding: 10px 12px;
  }
  .lang-id tbody td:first-child,
  .lang-en tbody td:first-child {
    width: auto;
  }
  .lang-id tbody td:last-child,
  .lang-en tbody td:last-child {
    white-space: normal;
    min-width: 260px;
  }
}
</style>

<div class="lang-id" markdown="1">

## Latar Belakang
Ada satu masalah yang selalu muncul waktu saya mengerjakan perencanaan tapak di lahan yang lagi aktif dikerjakan: basemap-nya selalu ketinggalan zaman. Citra satelit bawaan ArcGIS, Google, atau Bing bisa aja diambil satu sampai tiga tahun lalu. Padahal di lapangan jalan kerja udah dibentuk, lahan udah dibuka, dan galian udah jalan.

Yang saya butuhkan sebenernya sederhana: latar visual yang nunjukin kondisi lahan hari ini, biar waktu poligon kavling, area komersial, dan RTH di-overlay di ArcGIS Pro, saya bisa langsung liat rencananya nyambung atau nggak sama kondisi eksisting. Kalau ini diulang berkala, progres pengerjaan lahan juga jadi kerekam secara visual.

Solusinya potret sendiri pakai drone, lalu diolah jadi orthophoto. Tulisan ini dokumentasi prosesnya pakai WebODM, software photogrammetry open source yang gratis.

Perlu digarisbawahi sejak awal: output ini murni buat visualisasi. Nggak pakai GCP, nggak pakai RTK, dan nggak ada pengukuran terestris. Batasannya saya bahas di bagian akhir.

## Konsep & Metodologi
Lokasinya di Cimahpar, Kecamatan Bogor Utara, Kota Bogor — calon kawasan perumahan Kanaya yang nantinya kebagi jadi dua cluster, Anurika dan Amerta. Luas tapak intinya sekitar 4 hektare, tapi waktu terbang saya sengaja melebar keluar batas biar area sekitarnya ikut kecakup, sehingga hasil akhirnya nutup 7,59 hektare.

| Parameter Akuisisi | Keterangan |
|---|---|
| Drone | DJI Air 3 (`DJI FC8282`) |
| Aplikasi | DJI Fly, remote smart controller bawaan |
| Ketinggian | 120 meter dari titik lepas landas |
| Metode | Terbang manual, tanpa misi grid otomatis |
| Tanggal | 18 Agustus 2026, pukul 10:18–10:24 (sekitar 6 menit) |
| Jumlah foto | 48 foto, dimensi 4032 × 2268 piksel |
| Cuaca | Cerah berawan tipis |

Soal terbang manual, alasannya kepenasaran. Waktu belajar WebODM dari video tutorial, saya perhatikan pas si pembuat video ngimpor fotonya, sebaran titik di peta WebODM-nya nggak beraturan — bukan pola grid rapi kayak yang saya kenal waktu dulu pakai Mavic 2 Pro dengan aplikasi route flight. Dari situ muncul pertanyaan: syaratnya kan cuma fotonya saling bertampalan, berarti jalurnya harus rapi atau nggak? Ya udah, saya coba aja, dengan overlap yang dijaga secara visual.

Perlu dicatat juga, tapak ini elevasinya nggak landai. Di terbang manual, ngikutin kontur permukaan susah dilakuin, jadi ketinggian relatif terhadap tanah nggak konstan. Konsekuensinya ke resolusi saya bahas di bagian hasil.

| Perangkat & Software | Spesifikasi |
|---|---|
| Prosesor | Intel Core i5-14400 (2,50 GHz) |
| RAM | 32 GB |
| GPU | NVIDIA GeForce RTX 3050 6 GB |
| Sistem operasi | Windows 11 64-bit |
| Software | WebODM 3.2.6, native Windows tanpa Docker |
| Engine | ODX 3.8.0, node lokal `node-odx-1` |

Parameter pemrosesan yang dipakai:

```
camera-lens:brown, rolling-shutter:true, rolling-shutter-readout:0,
auto-boundary-distance:0, feature-quality:ultra, min-num-features:16000,
gps-accuracy:10, pc-quality:high, pc-filter:2.5, mesh-octree-depth:12,
dsm:true, dem-resolution:10, orthophoto-resolution:5
```

Empat di antaranya paling berpengaruh:

| Parameter | Alasan |
|---|---|
| `rolling-shutter:true` | Air 3 pakai shutter elektronik. Tanpa koreksi ini, objek yang harusnya lurus bisa keliatan miring, terutama kalau drone lagi gerak cepat waktu motret. Buat terbang manual yang kecepatannya nggak konstan, ini wajib. |
| `camera-lens:brown` | Maksa pakai model distorsi lensa Brown, bukan ngebiarin software nebak sendiri. Lebih stabil buat dataset kecil tanpa GCP. |
| `orthophoto-resolution:5` | Sengaja nggak diturunin di bawah GSD asli. Angka lebih kecil cuma bikin file gede tanpa nambah detail, karena pikselnya sekadar diinterpolasi. |
| `gps-accuracy:10` | Ngasih tau software kalau GPS bawaan drone ini akurasinya orde meteran, jadi jangan terlalu dipercaya waktu penyesuaian. |

## Alur Kerja
<img src="/images/software/SS-webodm-task-kanaya.jpg" alt="Detail task pemrosesan di WebODM" class="inline-image">

1. **Seleksi Foto** — Buang foto lepas landas, mendarat, dan yang blur. File aslinya jangan diedit lewat aplikasi apa pun, karena EXIF geotag-nya bisa kehapus dan prosesnya bakal gagal total.
2. **Impor ke WebODM** — Bikin project baru, unggah 48 foto. WebODM langsung nampilin sebaran titik pemotretan di peta berdasarkan geotag EXIF, jadi cakupannya bisa langsung dicek.
3. **Setting Parameter** — Masukin opsi di atas lewat menu Options.
4. **Structure from Motion** — Software nyari titik fitur yang sama di antar-foto, lalu ngitung posisi dan orientasi tiap kamera beserta posisi 3D titik-titik itu. Tahap ini yang nentuin kualitas keseluruhan.
5. **Rekonstruksi Dense & Meshing** — Dari model jarang tadi dibikin point cloud rapat, lalu dijadiin permukaan mesh.
6. **DSM & Orthophoto** — Permukaan tadi dipakai buat bikin Digital Surface Model, lalu semua foto diproyeksiin ulang ke atasnya jadi orthophoto berskala seragam.
7. **Ekspor** — Unduh `odm_orthophoto.tif` dan `dsm.tif`, siap dibuka di ArcGIS Pro.

Total waktu pemrosesan 17 menit 11 detik untuk 48 foto, dengan ukuran output 895,67 MB.

## Hasil Analisis
<img src="/images/software/ortofoto-kanaya.jpg" alt="Orthophoto hasil pengolahan WebODM" class="inline-image">

| Indikator | Nilai |
|---|---|
| Foto berhasil direkonstruksi | 48 dari 48 (100%) |
| Titik sparse | 101.279 dari 101.424 (99,9%) |
| Titik dense | 4.707.355 |
| GSD rata-rata | 3,95 cm |
| Reprojection error rata-rata | 0,72 piksel |
| Luas tercakup | 7,5925 ha |
| Sistem koordinat output | WGS 84 / UTM zone 48S |
| Rentang elevasi DSM | 209,02 – 240,16 m |

Jadi jawaban buat eksperimen tadi: terbang manual tanpa jalur grid ternyata bisa. Seluruh 48 foto berhasil ter-align, dan reprojection error 0,72 piksel tergolong sehat karena di bawah satu piksel umumnya sudah dianggap rekonstruksi yang baik.

<img src="/images/software/dsm-kanaya.jpg" alt="Digital Surface Model hasil WebODM" class="inline-image">

DSM-nya nunjukin rentang elevasi 209 sampai 240 meter, atau beda tinggi sekitar 31 meter di area 7,6 hektare. Ini juga yang bikin GSD rata-rata keluar di 3,95 cm meskipun saya terbang di 120 meter. Angka 120 meter di DJI Fly itu relatif terhadap titik lepas landas, bukan terhadap tanah di bawah drone. Karena tapaknya naik-turun, jarak drone ke permukaan jadi beda-beda dan resolusinya ikut nggak seragam. Untuk keperluan visual, hal ini nggak jadi masalah.

Satu catatan lain dari quality report, rata-rata satu titik di tanah cuma keliatan di 3,62 foto. Angka itu tergolong tipis. Peta cakupan di report juga nunjukin bagian tengah aman dengan cakupan empat foto atau lebih, sementara tepiannya cuma dua sampai tiga foto. Ini konsekuensi wajar dari terbang manual yang overlap-nya nggak terkontrol. Artinya metode ini masih aman di skala 4–8 hektare, tapi buat area yang jauh lebih luas kemungkinan besar bakal bermasalah.

### Pemanfaatan di ArcGIS Pro
<img src="/images/software/overlay-siteplan-kanaya.png" alt="Overlay layer site plan di atas orthophoto" class="inline-image">

Setelah masuk ArcGIS Pro, orthophoto ini jadi latar buat layer perencanaan seperti kavling, area komersial, RTH, marketing gallery, dan area parkir. Manfaatnya ada tiga.

Pertama, kondisi lahan yang bener-bener aktual. Jalan kerja, galian, dan area yang udah dibuka keliatan apa adanya. Kedua, konteks sekitar jadi kebaca. Permukiman eksisting, aliran sungai, dan jalan akses semuanya jelas, dan itu langsung ngaruh ke penilaian rencana. Ketiga, pemantauan progres, yang dalam praktik paling kepakai. Karena terbangnya cuma 6 menit dan prosesnya 17 menit, ini gampang diulang berkala. Numpuk orthophoto dari beberapa tanggal ngasih rekaman visual perkembangan lahan yang nggak bisa digantiin foto tangan.

## Catatan & Batasan
Quality report WebODM nampilin tabel Accuracy dengan angka Horizontal CE90 absolut 0,260 m. Keliatannya meyakinkan, tapi angka itu sebaiknya nggak dikutip sebagai akurasi.

Alasannya, angka tersebut dihitung dari konsistensi internal antara posisi kamera hasil penyesuaian dan koordinat GPS di EXIF foto, dan perhitungannya berasumsi GPS EXIF-nya nggak punya bias sistematis. Padahal GPS drone konsumer non-RTK justru bias sistematisnya orde meteran, dan bias yang seragam ke satu arah nggak bakal kedeteksi oleh statistik internal. Waktu orthophoto ini saya georeferensikan di ArcGIS Pro terhadap data referensi, pergeserannya ternyata sekitar 4,4 meter.

| Aspek | Penilaian |
|---|---|
| Ketajaman visual | Baik, GSD sekitar 4 cm |
| Geometri relatif | Baik |
| Posisi absolut | Meleset beberapa meter |
| Elevasi absolut | Nggak bisa dipercaya |

Produk ini layak dipakai sebagai latar visual, dokumentasi progres, bahan baca konteks tapak, dan alat komunikasi visual ke klien atau atasan. Sebaliknya, nggak layak dipakai buat penarikan batas bidang, hitung luas legal, hitung volume cut and fill, atau apa pun yang nuntut koordinat absolut. Untuk keperluan itu jalannya cuma satu, yaitu masang GCP dan ngukurnya pakai GNSS geodetik.

## Langkah Selanjutnya
Orthophoto mentah dari WebODM ini masih perlu digeser posisinya biar pas sama data referensi yang ada. Proses georeferensinya di ArcGIS Pro, mulai dari milih jenis transformasi, ngedeteksi titik kontrol yang salah tunjuk, sampai seberapa jauh hasilnya bisa diperbaiki, saya bahas terpisah di tulisan berikutnya.

<a href="#" class="btn btn-outline">Lanjut ke Georeferensi Orthophoto di ArcGIS Pro</a>

</div>

<div class="lang-en" markdown="1">

## Background
There's one problem that always comes up when I work on site planning for land that's actively under construction: the basemap is always out of date. The default satellite imagery in ArcGIS, Google, or Bing might have been captured one to three years ago. Meanwhile on the ground, access roads have been cut, the land has been cleared, and excavation is already underway.

What I actually needed was simple: a visual backdrop showing the site as it is today, so that when the parcel, commercial area, and green space polygons get overlaid in ArcGIS Pro, I can immediately see whether the plan fits existing conditions. If this is repeated periodically, construction progress also gets recorded visually.

The solution was to shoot it myself with a drone, then process it into an orthophoto. This write-up documents that process using WebODM, free and open source photogrammetry software.

One point to underline from the start: this output is purely for visualization. No GCPs, no RTK, and no terrestrial survey. I discuss the limitations in the closing section.

## Concept & Methodology
The site is in Cimahpar, North Bogor District, Bogor City — the future Kanaya residential area, which will eventually be split into two clusters, Anurika and Amerta. The core site is around 4 hectares, but I deliberately flew beyond the boundary so the surrounding area would also be captured, bringing the final coverage to 7.59 hectares.

| Acquisition Parameter | Detail |
|---|---|
| Drone | DJI Air 3 (`DJI FC8282`) |
| Application | DJI Fly, bundled smart controller |
| Altitude | 120 meters above the takeoff point |
| Method | Manual flight, no automated grid mission |
| Date | 18 August 2026, 10:18–10:24 (around 6 minutes) |
| Image count | 48 photos, 4032 × 2268 pixels |
| Weather | Clear with light cloud |

As for the manual flight, it came down to curiosity. While learning WebODM from a tutorial video, I noticed that when the creator imported his photos, the distribution of capture points on the WebODM map was irregular — not the neat grid pattern I knew from back when I used a Mavic 2 Pro with a route flight app. That raised a question: the only requirement is that the photos overlap, so does the flight path actually have to be tidy? I simply tried it, keeping the overlap in check visually.

Worth noting too, this site isn't flat. On a manual flight, following the terrain surface is difficult, so height relative to the ground isn't constant. I discuss the effect on resolution in the results section.

| Hardware & Software | Specification |
|---|---|
| Processor | Intel Core i5-14400 (2.50 GHz) |
| RAM | 32 GB |
| GPU | NVIDIA GeForce RTX 3050 6 GB |
| Operating system | Windows 11 64-bit |
| Software | WebODM 3.2.6, native Windows without Docker |
| Engine | ODX 3.8.0, local node `node-odx-1` |

Processing parameters used:

```
camera-lens:brown, rolling-shutter:true, rolling-shutter-readout:0,
auto-boundary-distance:0, feature-quality:ultra, min-num-features:16000,
gps-accuracy:10, pc-quality:high, pc-filter:2.5, mesh-octree-depth:12,
dsm:true, dem-resolution:10, orthophoto-resolution:5
```

Four of them matter most:

| Parameter | Reason |
|---|---|
| `rolling-shutter:true` | The Air 3 uses an electronic shutter. Without this correction, objects that should be straight can appear skewed, especially when the drone is moving quickly at the moment of capture. For a manual flight with inconsistent speed, this is essential. |
| `camera-lens:brown` | Forces the Brown lens distortion model rather than letting the software guess on its own. More stable for a small dataset without GCPs. |
| `orthophoto-resolution:5` | Deliberately not set below the native GSD. A smaller number only produces a larger file with no added detail, since the pixels are merely interpolated. |
| `gps-accuracy:10` | Tells the software that this drone's built-in GPS is accurate to the order of meters, so it shouldn't be trusted too heavily during adjustment. |

## Workflow
<img src="/images/software/SS-webodm-task-kanaya.jpg" alt="Processing task details in WebODM" class="inline-image">

1. **Photo Culling** — Remove takeoff, landing, and blurred shots. Don't edit the original files in any application, because the EXIF geotags can be stripped and the whole process will fail.
2. **Import to WebODM** — Create a new project and upload the 48 photos. WebODM immediately plots the capture points on a map from the EXIF geotags, so coverage can be checked right away.
3. **Parameter Setup** — Enter the options above through the Options menu.
4. **Structure from Motion** — The software finds matching feature points across photos, then computes the position and orientation of each camera along with the 3D positions of those points. This stage determines the overall quality.
5. **Dense Reconstruction & Meshing** — From that sparse model, a dense point cloud is built and then turned into a mesh surface.
6. **DSM & Orthophoto** — That surface is used to generate a Digital Surface Model, then all photos are reprojected onto it to produce an orthophoto with uniform scale.
7. **Export** — Download `odm_orthophoto.tif` and `dsm.tif`, ready to open in ArcGIS Pro.

Total processing time was 17 minutes 11 seconds for 48 photos, with an output size of 895.67 MB.

## Results
<img src="/images/software/ortofoto-kanaya.jpg" alt="Orthophoto produced by WebODM" class="inline-image">

| Indicator | Value |
|---|---|
| Images reconstructed | 48 of 48 (100%) |
| Sparse points | 101,279 of 101,424 (99.9%) |
| Dense points | 4,707,355 |
| Average GSD | 3.95 cm |
| Average reprojection error | 0.72 pixels |
| Area covered | 7.5925 ha |
| Output coordinate system | WGS 84 / UTM zone 48S |
| DSM elevation range | 209.02 – 240.16 m |

So the answer to that experiment: a manual flight without a grid pattern does work. All 48 photos aligned successfully, and a reprojection error of 0.72 pixels is healthy, since below one pixel is generally considered a good reconstruction.

<img src="/images/software/dsm-kanaya.jpg" alt="Digital Surface Model produced by WebODM" class="inline-image">

The DSM shows an elevation range from 209 to 240 meters, or around 31 meters of relief across 7.6 hectares. That's also why the average GSD came out at 3.95 cm even though I flew at 120 meters. The 120-meter figure in DJI Fly is relative to the takeoff point, not to the ground beneath the drone. Because the site rises and falls, the drone's distance to the surface varies and the resolution varies with it. For visual purposes, this isn't a problem.

Another note from the quality report: on average, a single ground point is only visible in 3.62 photos. That figure is on the thin side. The coverage map in the report also shows the central area is safe with four or more photos, while the edges have only two to three. This is a reasonable consequence of a manual flight where overlap isn't controlled. It means the method is still safe at a 4–8 hectare scale, but for a much larger area it would likely run into trouble.

### Use in ArcGIS Pro
<img src="/images/software/overlay-siteplan-kanaya.png" alt="Site plan layers overlaid on the orthophoto" class="inline-image">

Once in ArcGIS Pro, this orthophoto becomes the backdrop for planning layers such as parcels, commercial area, green space, marketing gallery, and parking areas. There are three benefits.

First, genuinely current site conditions. Access roads, excavation, and cleared areas are visible exactly as they are. Second, the surrounding context becomes legible. Existing settlements, the river, and access roads are all clear, and that directly affects how the plan is assessed. Third, progress monitoring, which is the most useful in practice. Because the flight takes only 6 minutes and processing 17 minutes, it's easy to repeat periodically. Stacking orthophotos from several dates gives a visual record of the site's development that handheld photos can't replace.

## Notes & Limitations
The WebODM quality report displays an Accuracy table with an absolute Horizontal CE90 of 0.260 m. It looks convincing, but that figure is best not quoted as accuracy.

The reason is that it's computed from the internal consistency between the adjusted camera positions and the GPS coordinates in the photo EXIF, and that calculation assumes the EXIF GPS carries no systematic bias. In reality, consumer non-RTK drone GPS has systematic bias on the order of meters, and a uniform bias in one direction won't be detected by internal statistics. When I georeferenced this orthophoto in ArcGIS Pro against reference data, the displacement turned out to be around 4.4 meters.

| Aspect | Assessment |
|---|---|
| Visual sharpness | Good, GSD around 4 cm |
| Relative geometry | Good |
| Absolute position | Off by several meters |
| Absolute elevation | Not trustworthy |

This product is suitable as a visual backdrop, progress documentation, material for reading site context, and a visual communication tool for clients or supervisors. Conversely, it isn't suitable for demarcating parcel boundaries, calculating legal areas, cut-and-fill volume calculations, or anything requiring absolute coordinates. For those purposes there's only one route, namely installing GCPs and surveying them with geodetic GNSS.

## Next Steps
This raw orthophoto from WebODM still needs to be shifted into position to line up with existing reference data. I cover the georeferencing process in ArcGIS Pro separately in the next write-up, from choosing the transformation type and detecting misplaced control points through to how far the result can actually be improved.

<a href="#" class="btn btn-outline">Continue to Orthophoto Georeferencing in ArcGIS Pro</a>

</div>
