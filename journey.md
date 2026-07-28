---
layout: default
title: Journey
permalink: /journey/
---

<!-- CSS untuk Layout, Navbar, dan Animasi Background -->
<style>
  :root {
    --bg-dark: #1a1a1a;
    --sidebar-bg: #2d2d2d;
    --active-blue: #0d6efd;
    --text-light: #f0f0f0;
    --text-muted: #a0a0a0;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    margin: 0;
  }

  /* --- STYLE ANIMASI BACKGROUND ABSTRAK --- */
  .bg-animation-container {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -2;
    overflow: hidden;
    background-color: #111;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5vh 0;
  }

  .bg-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    /* Efek gelap transparan dikurangi supaya background lebih terlihat */
    background: radial-gradient(circle, rgba(26,26,26,0.65) 0%, rgba(15,15,15,0.85) 100%);
    z-index: -1;
  }

  .bg-track {
    display: flex;
    width: max-content;
    opacity: 0.45; /* Diterangin dari 0.2 jadi 0.45 biar animasinya makin keliatan */
  }

  .bg-track img {
    height: 35vh;
    width: auto;
    object-fit: cover;
    margin: 0 15px;
    border-radius: 12px;
    filter: grayscale(60%) blur(1px); /* Grayscale sedikit dikurangi biar ada hint warnanya */
  }

  /* Animasi bergerak tanpa henti */
  .track-1 { animation: slideLeft 90s linear infinite; }
  .track-2 { animation: slideRight 100s linear infinite; }

  @keyframes slideLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes slideRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* --- STYLE NAVBAR --- */
  .navbar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 10;
  }
  .navbar a { text-decoration: none; color: var(--text-light); font-size: 16px; font-weight: bold; transition: 0.3s; }
  .navbar a:hover, .navbar a.active { color: var(--active-blue); }
  .separator { color: var(--text-muted); font-size: 16px; }

  /* --- STYLE KONTEN JOURNEY --- */
  .main-content { position: relative; z-index: 10; padding: 0 20px; text-align: center; }
  .main-content h1 { margin-bottom: 40px; } /* Margin bawah ditambah karena subtitle dihapus */

  .journey-wrapper {
    display: flex; flex-direction: row; gap: 30px;
    max-width: 1100px; width: 100%; margin: 0 auto 40px auto;
    align-items: flex-start; text-align: left;
  }

  .journey-sidebar {
    flex: 0 0 250px; background-color: rgba(45, 45, 45, 0.85); 
    backdrop-filter: blur(10px); border-radius: 12px; padding: 20px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 20px;
  }

  .tab-button {
    display: block; width: 100%; background: none; border: none;
    color: var(--text-muted); text-align: left; padding: 15px 25px;
    font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }
  .tab-button:hover { color: var(--text-light); background-color: rgba(255, 255, 255, 0.05); }
  .tab-button.active { color: var(--text-light); border-left: 4px solid var(--active-blue); background-color: rgba(13, 110, 253, 0.15); }

  .journey-content-area {
    flex: 1; background-color: rgba(30, 30, 30, 0.75); 
    backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); min-width: 0;
  }

  .tab-content { display: none; animation: fadeIn 0.5s ease; }
  .tab-content.active { display: block; }
  .tab-content h2 { color: var(--active-blue); margin-top: 0; margin-bottom: 5px; }
  .tab-content h3 { color: #f0f0f0; margin-top: 20px; margin-bottom: 10px; font-size: 18px; }
  .date-badge { display: inline-block; background-color: #333; padding: 5px 12px; border-radius: 20px; font-size: 0.85em; color: #ccc; margin-bottom: 20px; }

  /* STYLE SLIDESHOW */
  .slideshow-container { max-width: 100%; position: relative; margin: 25px auto 0; border-radius: 8px; overflow: hidden; border: 1px solid #444; }
  .mySlides { display: none; position: relative; }
  .mySlides img { width: 100%; height: 350px; object-fit: cover; display: block; }
  .slide-caption { position: absolute; bottom: 0; width: 100%; background: rgba(0, 0, 0, 0.7); color: #f2f2f2; padding: 12px 15px; text-align: center; font-size: 15px; box-sizing: border-box; }
  .prev, .next { cursor: pointer; position: absolute; top: 50%; width: auto; padding: 12px 18px; margin-top: -22px; color: white; font-weight: bold; font-size: 18px; transition: 0.3s ease; border-radius: 0 3px 3px 0; user-select: none; background-color: rgba(0,0,0,0.4); text-decoration: none; }
  .next { right: 0; border-radius: 3px 0 0 3px; }
  .prev:hover, .next:hover { background-color: rgba(13, 110, 253, 0.8); }
  .dot-container { text-align: center; padding: 10px 0; background-color: transparent; }
  .dot { cursor: pointer; height: 10px; width: 10px; margin: 0 4px; background-color: #555; border-radius: 50%; display: inline-block; transition: background-color 0.3s ease; }
  .active-dot, .dot:hover { background-color: var(--active-blue); }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade-anim { animation-name: fadeIn; animation-duration: 0.8s; }

  @media (max-width: 768px) {
    .journey-wrapper { flex-direction: column; }
    .journey-sidebar { width: 100%; display: flex; padding: 10px; position: static; }
    .tab-button { flex: 1; border-left: none; border-bottom: 3px solid transparent; text-align: center; padding: 10px; font-size: 14px; }
    .tab-button.active { border-bottom: 3px solid var(--active-blue); }
    .mySlides img { height: 250px; }
  }
</style>

<!-- ================= ANIMASI BACKGROUND FIXED ================= -->
<div class="bg-animation-container">
  <!-- Baris Atas Bergerak ke Kiri -->
  <div class="bg-track track-1">
    <!-- Set 1 -->
    <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="bg">
    <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="bg">
    <img src="/images/ININ/orthophoto-processing-data.jpg" alt="bg">
    <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan.jpg" alt="bg">
    <!-- Set 2 (Duplikat supaya loop tidak terputus) -->
    <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="bg">
    <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="bg">
    <img src="/images/ININ/orthophoto-processing-data.jpg" alt="bg">
    <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan.jpg" alt="bg">
  </div>
  <!-- Baris Bawah Bergerak ke Kanan -->
  <div class="bg-track track-2">
    <!-- Set 1 -->
    <img src="/images/ININ/topografi.jpg" alt="bg">
    <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan-2.jpg" alt="bg">
    <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="bg">
    <img src="/images/KIPI/joint-survey.jpg" alt="bg">
    <!-- Set 2 (Duplikat supaya loop tidak terputus) -->
    <img src="/images/ININ/topografi.jpg" alt="bg">
    <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan-2.jpg" alt="bg">
    <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="bg">
    <img src="/images/KIPI/joint-survey.jpg" alt="bg">
  </div>
</div>
<!-- Overlay gelap -->
<div class="bg-overlay"></div>
<!-- ============================================================ -->


<!-- ================= KONTEN UTAMA ================= -->
<div class="main-content">
  <!-- Navigasi Menu Atas -->
  <div class="navbar">
    <a href="/">Home</a> <span class="separator">|</span>
    <a href="/journey/" class="active">Journey</a> <span class="separator">|</span>
    <a href="/cv/">Experience</a> <span class="separator">|</span>
    <a href="/projects/">Projects</a> <span class="separator">|</span>
    <a href="/gallery/">Gallery</a> <span class="separator">|</span>
    <a href="/writing/">Writing</a> <span class="separator">|</span>
    <a href="/contact/">Contact</a>
  </div>

  <h1>Perjalanan Karir</h1>

  <div class="journey-wrapper">
    <!-- KIRI: Sidebar Navigasi -->
    <div class="journey-sidebar">
      <button class="tab-button active" onclick="bukaTab(event, 'magang')">Magang</button>
      <button class="tab-button" onclick="bukaTab(event, 'kipi')">PT KIPI</button>
      <button class="tab-button" onclick="bukaTab(event, 'inti')">PT Inti Innovaco</button>
    </div>

    <!-- KANAN: Area Konten & Slideshow -->
    <div class="journey-content-area">
      
      <!-- === TAB 1: MAGANG === -->
      <div id="magang" class="tab-content active">
        <h2>Masa Formatif & Langkah Pertama</h2>
        <span class="date-badge">Mei 2022 - Agustus 2022</span>
        
        <p>Ini titik nol saya. Pada bulan Mei 2022, saya baru akan lulus SMK kelas 3, dan sekolah menawarkan program magang ke Kalimantan Utara. Tanpa pikir panjang, kesempatan itu saya ambil.</p>
        <p>Empat bulan di sana, saya berperan sebagai Asisten GIS Analis. Keseharian saya waktu itu masih dominan di kantor mengelola berita acara pengukuran, memperbarui spreadsheet rekap data lahan, mengunggah ke database, serta membuat peta dan sketsa hasil ukur dari data yang diberikan tim lapangan. Semua dikerjakan menggunakan ArcMap 10.8, dibantu Garmin 64s untuk pengumpulan data, ditambah perangkat standar seperti Word dan Excel.</p>
        <p>Di penghujung masa magang, akhirnya saya diberikan kesempatan untuk turun langsung ke lapangan. Rasanya sangat berbeda - dari yang selama ini hanya memahami data di balik layar, sekarang bisa merasakan langsung bagaimana data tersebut diambil. Dan bonus yang tidak kalah berkesan: saya dikenalkan pada drone DJI Mavic 2 Pro untuk pertama kalinya, walaupun masih sebatas pembelajaran.</p>
        <p>Yang paling saya bawa pulang dari masa ini bukan hanya kemampuan teknis. Ini pertama kalinya saya merantau, pertama kalinya saya benar-benar bekerja, dan pertama kalinya saya serius memikirkan soal karir. Melihat para senior yang kompeten dan <em>passionate</em> di bidangnya, memotivasi saya untuk terus tumbuh. Di sinilah rasa percaya diri itu mulai terbentuk perlahan, tapi pasti.</p>
        
        <!-- Container Slider untuk Magang -->
        <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="Pengukuran Areal Kebakaran">
            <div class="slide-caption">Pengukuran Areal Kebakaran</div>
          </div>
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/pengukuran-lahan-2.jpg" alt="Pengukuran Lahan 2">
            <div class="slide-caption">Pengukuran Lahan</div>
          </div>
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/pengukuran-lahan-3.jpg" alt="Pengukuran Lahan 3">
            <div class="slide-caption">Kegiatan Pengukuran Lahan</div>
          </div>
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/pengukuran-lahan.jpg" alt="Pengukuran Lahan">
            <div class="slide-caption">Praktik Lapangan</div>
          </div>
          <a class="prev" onclick="plusSlides(-1, 'magang')">&#10094;</a>
          <a class="next" onclick="plusSlides(1, 'magang')">&#10095;</a>
        </div>
        <div class="dot-container">
          <span class="dot magang-dot" onclick="currentSlide(1, 'magang')"></span> 
          <span class="dot magang-dot" onclick="currentSlide(2, 'magang')"></span> 
          <span class="dot magang-dot" onclick="currentSlide(3, 'magang')"></span> 
          <span class="dot magang-dot" onclick="currentSlide(4, 'magang')"></span> 
        </div>
      </div>

      <!-- === TAB 2: PT KIPI === -->
      <div id="kipi" class="tab-content">
        <h2>PT Kalimantan Industrial Park Indonesia</h2>
        <span class="date-badge">15 Nov 2022 - Nov 2025</span>
        
        <h3>Asisten Surveyor</h3>
        <p>Setelah masa magang selesai, saya berlanjut bergabung sebagai karyawan. Kali ini posisinya Asisten Surveyor, dan porsi kerja saya mulai bergeser jauh ke lapangan. Pekerjaan utama saya di fase ini adalah pengukuran lahan masyarakat dan <em>stake out</em> pemasangan patok batas kawasan. Saya juga mulai dilibatkan dalam pengukuran menggunakan Total Station Topcon GM 50 series - dipakai untuk pengukuran jalan dan sebaran Bench Mark (BM). Hal yang menjadi <em>highlight</em> di masa ini adalah saya mulai diberikan kepercayaan untuk mengoperasikan drone DJI Mavic 2 Pro secara mandiri - baik untuk <em>aerial mapping</em> maupun patroli udara, memantau aktivitas ilegal atau potensi kebakaran di lahan perusahaan.</p>
        <p>Sesekali saya juga ikut <em>joint survey</em> bersama <em>tenant</em>, kontraktor, atau tim lain, yang mengajarkan saya cara berkomunikasi dan berkoordinasi lintas pihak. Kalau di masa magang saya lebih banyak duduk di depan laptop, di sini saya benar-benar merasakan kondisi medannya. Dan yang paling berkesan: saya dilatih terlebih dahulu, diberikan kepercayaan secara bertahap, baru melakukan eksekusi di lapangan. Bukan langsung dilepas dan diwajibkan bisa sendiri. Proses itulah yang membuat saya tumbuh secara teknis sekaligus mental.</p>
        
        <h3>Surveyor</h3>
        <p>Perkembangan berikutnya: saya pindah tim. Dari tim lahan ke tim proyek konstruksi, dengan posisi resmi Surveyor dan dibimbing langsung oleh seorang <em>Geodetic Engineer</em>. Di sinilah tonggak terbesar dalam perjalanan lapangan saya. Saya mulai berperan sebagai pengawas pekerjaan <em>land development</em> - mengawasi alat berat, berkomunikasi langsung dengan operator, <em>helper</em>, <em>driver</em>, sampai ikut bekerja lembur di lapangan. Topografi area-area luas menjadi rutinitas harian saya, sekarang dengan perangkat baru: GNSS Geodetic Efix F8 Vision Camera dan drone DJI Mavic 3 Basic. Di sinilah juga saya bermigrasi penuh dari ArcMap ke ArcGIS Pro.</p>
        <p>Beberapa pekerjaan yang paling berkesan: pengawasan <em>maintenance</em> jalan kawasan sepanjang 9,2 km, <em>land development</em> sekat bakar, sampai pengerjaan area komersial. Saya menyusun laporan harian dari data hasil ukur, memperbarui progres pekerjaan, dan mulai terbiasa dengan koordinasi internal maupun eksternal perusahaan. Hal yang paling saya sadari di fase ini: saya bukan lagi sekadar orang yang bertugas mengukur. Saya mulai menunjukkan kapabilitas yang lebih luas - dari teknis lapangan sampai manajemen pekerjaan secara mandiri. Hal tersebut yang membuat saya semakin serius mengejar jalur karir yang lebih jauh dari sekadar surveyor.</p>

        <!-- Container Slider untuk KIPI -->
        <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/DCP.jpg" alt="DCP">
            <div class="slide-caption">Dynamic Cone Penetrometer (DCP) Test</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Handling%20material.jpg" alt="Handling material">
            <div class="slide-caption">Handling Material di Lapangan</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="Land development area komersial">
            <div class="slide-caption">Land Development Area Komersial</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Pengawas%20repair%20jalan%20kawasan.jpg" alt="Pengawas repair jalan kawasan">
            <div class="slide-caption">Pengawasan Repair Jalan Kawasan</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="Survey with topcon gm 50 series">
            <div class="slide-caption">Survey Menggunakan Topcon GM 50 Series</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="Topografi 142 hektare">
            <div class="slide-caption">Topografi Area 142 Hektare</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Topografi%20jalan%20kawasan.jpg" alt="Topografi jalan kawasan">
            <div class="slide-caption">Topografi Jalan Kawasan</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/joint-survey.jpg" alt="joint survey">
            <div class="slide-caption">Joint Survey Lintas Tim</div>
          </div>
          <a class="prev" onclick="plusSlides(-1, 'kipi')">&#10094;</a>
          <a class="next" onclick="plusSlides(1, 'kipi')">&#10095;</a>
        </div>
        <div class="dot-container">
          <span class="dot kipi-dot" onclick="currentSlide(1, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(2, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(3, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(4, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(5, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(6, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(7, 'kipi')"></span> 
          <span class="dot kipi-dot" onclick="currentSlide(8, 'kipi')"></span> 
        </div>
      </div>

      <!-- === TAB 3: PT INTI INNOVACO === -->
      <div id="inti" class="tab-content">
        <h2>PT Inti Innovaco - Land Surveyor</h2>
        <span class="date-badge">Januari 2026 - Sekarang</span>
        
        <p>Titik baru. Kali ini saya kembali ke kota asal - Bogor - dan memulai lembaran yang sama sekali berbeda.</p>
        <p>Keputusan ini bukan tanpa pertimbangan. Saya ingin bekerja sambil serius menempuh pendidikan S1 Perencanaan Wilayah dan Kota (PWK) di Universitas Terbuka. Dan PT Inti Innovaco, sebagai developer perumahan, menjadi tempat yang tepat bagi saya untuk meneruskan jalur tersebut.</p>
        <p>Berbeda dari pengalaman sebelumnya yang berada di skala industri besar, di sini saya mengerjakan <em>land development</em> perumahan - skalanya lebih kecil, sekitar 4 hektare, tapi justru lebih detail dan lebih banyak hal baru yang harus saya pelajari ulang. Yang menjadi tantangan utama: saya bekerja sendiri tanpa tim surveyor. Untuk pertama kalinya dalam karir saya, semuanya saya tangani secara mandiri - pengukuran lahan, pembebasan lahan, mengelola dan mendokumentasikan data, semuanya.</p>
        <p>Seluruh ilmu dan pengalaman yang saya kumpulkan dari Kalimantan - memahami cara kerja <em>land development</em>, mampu menyiapkan data secara mandiri, terbiasa dengan pelaporan dan koordinasi - sekarang saya bawa dan terapkan di sini, secara mandiri dan di lingkungan yang sama sekali baru.</p>
        <p>Jujur saja, ini bukan sekadar pindah tempat kerja. Ini adalah awal dari transisi yang lebih besar dari seorang surveyor lapangan, menuju <em>Urban Planner</em> atau <em>GIS Analyst</em>. Saya mulai membuktikan bahwa kemampuan saya tidak terbatas hanya pada pengukuran di lapangan. Perjalanan ini masih berlanjut.</p>
        
        <!-- Container Slider untuk Inti Innovaco -->
        <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="cut n fill kavling">
            <div class="slide-caption">Proses Cut and Fill Kavling</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/orthophoto-processing-data.jpg" alt="orthophoto processing data">
            <div class="slide-caption">Processing Data Orthophoto</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/pengukuran-batas.jpg" alt="pengukuran batas">
            <div class="slide-caption">Pengukuran Batas Area</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/pengukuran-lahan.jpg" alt="pengukuran lahan">
            <div class="slide-caption">Kegiatan Pengukuran Lahan</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/tim-teknis.jpg" alt="tim teknis">
            <div class="slide-caption">Koordinasi Tim Teknis</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/topografi.jpg" alt="topografi">
            <div class="slide-caption">Survey Topografi</div>
          </div>
          <a class="prev" onclick="plusSlides(-1, 'inti')">&#10094;</a>
          <a class="next" onclick="plusSlides(1, 'inti')">&#10095;</a>
        </div>
        <div class="dot-container">
          <span class="dot inti-dot" onclick="currentSlide(1, 'inti')"></span> 
          <span class="dot inti-dot" onclick="currentSlide(2, 'inti')"></span> 
          <span class="dot inti-dot" onclick="currentSlide(3, 'inti')"></span> 
          <span class="dot inti-dot" onclick="currentSlide(4, 'inti')"></span> 
          <span class="dot inti-dot" onclick="currentSlide(5, 'inti')"></span> 
          <span class="dot inti-dot" onclick="currentSlide(6, 'inti')"></span> 
        </div>
      </div>

    </div>
  </div>
</div>

<!-- JavaScript untuk Navigasi Tab & Slideshow Interaktif -->
<script>
  let activeTabId = 'magang'; 
  let slideIndices = { 'magang': 1, 'kipi': 1, 'inti': 1 };
  let autoSlideTimer;

  // --- Fungsi Pindah Tab Navigasi ---
  function bukaTab(evt, namaFase) {
    clearInterval(autoSlideTimer);
    
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }

    let tablinks = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    document.getElementById(namaFase).style.display = "block";
    document.getElementById(namaFase).classList.add("active");
    evt.currentTarget.classList.add("active");

    activeTabId = namaFase;
    showSlides(slideIndices[activeTabId], activeTabId);
    resumeSlider();
  }

  // --- Fungsi Utama Slideshow ---
  function showSlides(n, tabId) {
    let slides = document.getElementsByClassName(tabId + "-slides");
    let dots = document.getElementsByClassName(tabId + "-dot");
    
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndices[tabId] = 1 }    
    if (n < 1) { slideIndices[tabId] = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slides[slideIndices[tabId]-1].style.display = "block";  
    dots[slideIndices[tabId]-1].className += " active-dot";
  }

  function plusSlides(n, tabId) {
    clearInterval(autoSlideTimer);
    showSlides(slideIndices[tabId] += n, tabId);
    resumeSlider();
  }

  function currentSlide(n, tabId) {
    clearInterval(autoSlideTimer);
    showSlides(slideIndices[tabId] = n, tabId);
    resumeSlider();
  }

  function autoPlaySlides() {
    slideIndices[activeTabId]++;
    showSlides(slideIndices[activeTabId], activeTabId);
  }

  function pauseSlider() {
    clearInterval(autoSlideTimer);
  }

  function resumeSlider() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(autoPlaySlides, 4000); 
  }

  window.onload = function() {
    showSlides(1, 'magang');
    resumeSlider();
  };
</script>
