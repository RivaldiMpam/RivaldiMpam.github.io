---
layout: page
title: Journey
permalink: /journey/
---

<!-- CSS untuk Layout Lebih Lebar & Fitur Slideshow -->
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
  }

  /* 1. PERBAIKAN LEBAR AREA (Biar gak sempit di PC) */
  .journey-wrapper {
    display: flex;
    flex-direction: row;
    gap: 30px;
    max-width: 1100px;
    width: 100%;
    margin: 40px auto;
    align-items: flex-start;
  }

  .journey-sidebar {
    flex: 0 0 250px;
    background-color: var(--sidebar-bg);
    border-radius: 12px;
    padding: 20px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    position: sticky;
    top: 20px;
  }

  .tab-button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    color: var(--text-muted);
    text-align: left;
    padding: 15px 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }

  .tab-button:hover {
    color: var(--text-light);
    background-color: rgba(255, 255, 255, 0.05);
  }

  .tab-button.active {
    color: var(--text-light);
    border-left: 4px solid var(--active-blue);
    background-color: rgba(13, 110, 253, 0.15);
  }

  .journey-content-area {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    min-width: 0;
  }

  .tab-content {
    display: none; 
    animation: fadeIn 0.5s ease;
  }

  .tab-content.active {
    display: block; 
  }

  .tab-content h2 { color: var(--active-blue); margin-top: 0; margin-bottom: 5px; }
  .tab-content h3 { color: #f0f0f0; margin-top: 20px; margin-bottom: 10px; font-size: 18px; }
  
  .date-badge {
    display: inline-block; background-color: #333; padding: 5px 12px; 
    border-radius: 20px; font-size: 0.85em; color: #ccc; margin-bottom: 20px;
  }

  /* 2. STYLE UNTUK SLIDESHOW FOTO */
  .slideshow-container {
    max-width: 100%;
    position: relative;
    margin: 25px auto 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #444;
  }

  .mySlides {
    display: none;
    position: relative;
  }

  .mySlides img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    display: block;
  }

  /* Teks Caption di atas foto */
  .slide-caption {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #f2f2f2;
    padding: 12px 15px;
    text-align: center;
    font-size: 15px;
    box-sizing: border-box;
  }

  /* Tombol Prev & Next */
  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 12px 18px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.3s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    background-color: rgba(0,0,0,0.4);
    text-decoration: none;
  }
  .next { right: 0; border-radius: 3px 0 0 3px; }
  .prev:hover, .next:hover { background-color: rgba(13, 110, 253, 0.8); }

  /* Titik Indikator (Dots) */
  .dot-container {
    text-align: center;
    padding: 10px 0;
    background-color: rgba(255, 255, 255, 0.02);
  }
  .dot {
    cursor: pointer;
    height: 10px; width: 10px;
    margin: 0 4px;
    background-color: #555;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.3s ease;
  }
  .active-dot, .dot:hover { background-color: var(--active-blue); }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-anim { animation-name: fadeIn; animation-duration: 0.8s; }

  @media (max-width: 768px) {
    .journey-wrapper { flex-direction: column; }
    .journey-sidebar { width: 100%; display: flex; padding: 10px; position: static; }
    .tab-button { flex: 1; border-left: none; border-bottom: 3px solid transparent; text-align: center; padding: 10px; font-size: 14px; }
    .tab-button.active { border-bottom: 3px solid var(--active-blue); }
    .mySlides img { height: 250px; }
  }
</style>

<h1>Perjalanan Karir</h1>
<p><em>Merekam jejak dari titik koordinat pertama di lapangan hingga analisis geospasial.</em></p>

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
      
      <p>Ini titik nol gue. Bulan Mei 2022, gue baru mau lulus SMK kelas 3, dan sekolah nawarin program magang ke Kalimantan Utara. Tanpa pikir panjang, gue ambil.</p>
      
      <p>Empat bulan di sana, gue berperan sebagai Asisten GIS Analis. Keseharian gue waktu itu masih dominan di kantor manage berita acara pengukuran, update spreadsheet rekap data lahan, upload ke database, bikin peta dan sketsa hasil ukur dari data yang dikasih tim lapangan. Semua dikerjain pakai ArcMap 10.8, dibantu Garmin 64s buat pengumpulan data, plus tools standar spt Word dan Excel.</p>
      
      <p>Di penghujung magang, akhirnya gue dikasih kesempatan turun lapangan juga. Rasanya beda banget - dari yang selama ini cuma ngerti data di balik layar, sekarang bisa ngerasain langsung gimana data itu diambil. Dan bonus yang gak kalah berkesan: gue dikenalkan ke drone DJI Mavic 2 Pro untuk pertama kalinya, walaupun masih sebatas pembelajaran.</p>
      
      <p>Yang paling gue bawa pulang dari masa ini bukan cuma skill teknisnya. Ini pertama kali gue merantau, pertama kali gue beneran kerja, pertama kali pikiran gue serius mikirin soal karir. Ngeliat para senior yang kompeten dan passionate di bidangnya, entah kenapa langsung bikin gue pengen terus tumbuh. Di sinilah rasa percaya diri itu mulai terbentuk pelan-pelan, tapi pasti.</p>
      
      <!-- Container Slider untuk Magang -->
      <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
        
        <div class="mySlides magang-slides fade-anim">
          <img src="/images/magang/pengukuran-areal-kebakaran.jpg" alt="Pengukuran Areal Kebakaran">
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
      <p>Setelah magang selesai, gue lanjut bergabung sebagai karyawan. Kali ini posisinya Asisten Surveyor, dan porsi kerja gue mulai bergeser jauh ke lapangan. Kerjaan utama gue di fase ini adalah pengukuran lahan masyarakat dan stake out pemasangan patok batas kawasan. Gue juga mulai dilibatkan dalam pengukuran menggunakan Total Station Topcon GM 50 series - dipakai untuk pengukuran jalan dan sebaran Bench Mark (BM). Nah, yang jadi highlight di masa ini adalah gue mulai dikasih kepercayaan untuk mengoperasikan drone DJI Mavic 2 Pro secara mandiri - baik untuk aerial mapping maupun patroli udara, memantau aktivitas ilegal atau potensi kebakaran di lahan perusahaan.</p>
      <p>Sesekali gue juga ikut joint survey bareng tenant, kontraktor, atau tim lain, yang ngajarin gue cara komunikasi dan koordinasi lintas pihak. Kalau di masa magang gue lebih banyak duduk di depan laptop, di sini gue beneran merasakan medannya. Dan yang paling berkesan: gue dilatih dulu, dikasih kepercayaan pelan-pelan, baru eksekusi di lapangan. Bukan langsung dilempar dan disuruh bisa sendiri. Proses itulah yang bikin gue tumbuh secara teknis sekaligus mental.</p>
      
      <h3>Surveyor</h3>
      <p>Perkembangan berikutnya: gue pindah tim. Dari tim lahan ke tim project konstruksi, dengan posisi resmi Surveyor dan senior langsung dari seorang Geodetic Engineer. Di sinilah tonggak terbesar dalam perjalanan lapangan gue. Gue mulai berperan sebagai pengawas pekerjaan land development - ngawasin alat berat, komunikasi langsung sama operator, helper, driver, sampai ikut kerja lembur di lapangan. Topografi area-area luas jadi makanan sehari-hari gue, sekarang dengan senjata baru: GNSS Geodetic Efix F8 Vision Camera dan drone DJI Mavic 3 Basic. Di sinilah juga gue migrasi penuh dari ArcMap ke ArcGIS Pro.</p>
      <p>Beberapa pekerjaan yang paling gue inget: pengawasan maintenance jalan kawasan sepanjang 9,2 km, land development sekat bakar, sampai pengerjaan area komersial. Gue menyusun daily report dari data hasil ukur, update progress pekerjaan, dan mulai terbiasa koordinasi internal maupun eksternal perusahaan. Yang paling gue sadarin di fase ini: gue bukan lagi sekadar orang yang bisa ngukur. Gue mulai nunjukin kapabilitas yang lebih luas - dari teknis lapangan sampai manajemen pekerjaan kecil-kecilan. Dan rasanya, itu yang bikin gue makin serius ngejar jalur karir yang lebih jauh dari sekadar surveyor.</p>

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
      
      <p>Titik baru. Kali ini gue balik ke kota asal - Bogor - dan mulai dari lembaran yang sama sekali berbeda.</p>
      
      <p>Keputusan ini bukan tanpa pertimbangan. Gue mau kerja sambil serius ngejar S1 Perencanaan Wilayah dan Kota (PWK) di Universitas Terbuka. Dan PT Inti Innovaco, sebagai developer perumahan, jadi tempat yang pas buat gue meneruskan jalur itu.</p>
      
      <p>Beda dari pengalaman sebelumnya yang di skala industri besar, di sini gue ngerjain land development perumahan - skala lebih kecil, sekitar 4 hektare, tapi justru lebih detail dan lebih banyak hal baru yang harus gue pelajari ulang. Yang jadi tantangan utama: gue sendirian tanpa tim surveyor. Untuk pertama kalinya dalam karir gue, semua gue tangani sendiri - pengukuran lahan, pembebasan lahan, manage dan dokumentasi data, semuanya.</p>
      
      <p>Semua ilmu dan pengalaman yang gue kumpulin dari Kalimantan - ngerti cara kerja land development, bisa nyiapin data sendiri, terbiasa laporan dan koordinasi - sekarang gue bawa dan terapin di sini, secara mandiri dan di lingkungan yang sama sekali baru.</p>
      
      <p>Kalau mau jujur, ini bukan cuma soal pindah kerja. Ini awal dari transisi yang lebih besar dari seorang surveyor lapangan, menuju Urban Planner atau GIS Analyst. Gue mulai buktiin bahwa kemampuan gue bukan cuma soal ngukur di lapangan. Perjalanan ini masih berlanjut.</p>
      
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

<!-- JavaScript untuk Navigasi Tab & Slideshow Interaktif -->
<script>
  let activeTabId = 'magang'; 
  let slideIndices = { 'magang': 1, 'kipi': 1, 'inti': 1 };
  let autoSlideTimer;

  // --- Fungsi Pindah Tab Navigasi ---
  function bukaTab(evt, namaFase) {
    // Stop slider sementara saat pindah tab
    clearInterval(autoSlideTimer);
    
    // Sembunyikan semua tab
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }

    // Reset tombol active
    let tablinks = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    // Tampilkan tab yg diklik
    document.getElementById(namaFase).style.display = "block";
    document.getElementById(namaFase).classList.add("active");
    evt.currentTarget.classList.add("active");

    // Update tab yang aktif dan mulai slidernya
    activeTabId = namaFase;
    showSlides(slideIndices[activeTabId], activeTabId);
    resumeSlider();
  }

  // --- Fungsi Utama Slideshow ---
  function showSlides(n, tabId) {
    let slides = document.getElementsByClassName(tabId + "-slides");
    let dots = document.getElementsByClassName(tabId + "-dot");
    
    if (slides.length === 0) return; // Jaga-jaga kalau kosong

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

  // Kontrol panah Prev/Next
  function plusSlides(n, tabId) {
    clearInterval(autoSlideTimer); // Reset timer pas di-klik manual
    showSlides(slideIndices[tabId] += n, tabId);
    resumeSlider(); // Lanjut putar otomatis
  }

  // Kontrol klik titik bulat (Dots)
  function currentSlide(n, tabId) {
    clearInterval(autoSlideTimer);
    showSlides(slideIndices[tabId] = n, tabId);
    resumeSlider();
  }

  // Fitur Autoplay & Pause
  function autoPlaySlides() {
    slideIndices[activeTabId]++;
    showSlides(slideIndices[activeTabId], activeTabId);
  }

  function pauseSlider() {
    clearInterval(autoSlideTimer);
  }

  function resumeSlider() {
    clearInterval(autoSlideTimer);
    // Foto berganti otomatis setiap 4 detik (4000 ms)
    autoSlideTimer = setInterval(autoPlaySlides, 4000); 
  }

  // Jalankan slider tab pertama (Magang) saat web selesai dimuat
  window.onload = function() {
    showSlides(1, 'magang');
    resumeSlider();
  };
</script>
