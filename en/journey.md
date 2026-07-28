---
layout: default
title: Journey
permalink: /en/journey/
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
    background: radial-gradient(circle, rgba(26,26,26,0.65) 0%, rgba(15,15,15,0.85) 100%);
    z-index: -1;
  }

  .bg-track {
    display: flex;
    width: max-content;
    opacity: 0.45;
  }

  .bg-track img {
    height: 35vh;
    width: auto;
    object-fit: cover;
    margin: 0 15px;
    border-radius: 12px;
    filter: grayscale(60%) blur(1px);
  }

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

  /* --- STYLE KONTEN JOURNEY --- */
  .main-content { position: relative; z-index: 10; padding: 0 20px; text-align: center; }
  .main-content h1 { margin-bottom: 40px; }

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
  <div class="bg-track track-1">
    <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="bg">
    <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="bg">
    <img src="/images/ININ/orthophoto-processing-data.jpg" alt="bg">
    <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan.jpg" alt="bg">
    <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="bg">
    <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="bg">
    <img src="/images/ININ/orthophoto-processing-data.jpg" alt="bg">
    <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan.jpg" alt="bg">
  </div>
  <div class="bg-track track-2">
    <img src="/images/ININ/topografi.jpg" alt="bg">
    <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan-2.jpg" alt="bg">
    <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="bg">
    <img src="/images/KIPI/joint-survey.jpg" alt="bg">
    <img src="/images/ININ/topografi.jpg" alt="bg">
    <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="bg">
    <img src="/images/magang/pengukuran-lahan-2.jpg" alt="bg">
    <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="bg">
    <img src="/images/KIPI/joint-survey.jpg" alt="bg">
  </div>
</div>
<div class="bg-overlay"></div>
<!-- ============================================================ -->

<!-- ================= KONTEN UTAMA ================= -->
<div class="main-content">
  
  <h1>Career Journey</h1>

  <div class="journey-wrapper">
    <!-- KIRI: Sidebar Navigasi -->
    <div class="journey-sidebar">
      <button class="tab-button active" onclick="bukaTab(event, 'magang')">Internship</button>
      <button class="tab-button" onclick="bukaTab(event, 'kipi')">PT KIPI</button>
      <button class="tab-button" onclick="bukaTab(event, 'inti')">PT Inti Innovaco</button>
    </div>

    <!-- KANAN: Area Konten & Slideshow -->
    <div class="journey-content-area">
      
      <!-- === TAB 1: MAGANG === -->
      <div id="magang" class="tab-content active">
        <h2>Formative Period & First Steps</h2>
        <span class="date-badge">May 2022 - August 2022</span>
        
        <p>This is my starting point. In May 2022, just before graduating from vocational high school (SMK), I was offered an internship program in North Kalimantan. Without hesitation, I took the opportunity.</p>
        <p>During my four months there, I served as a GIS Analyst Assistant. My daily routine mostly involved office work: managing measurement reports, updating land data spreadsheets, uploading to the database, and creating maps and measurement sketches based on field data. Everything was executed using ArcMap 10.8, supported by Garmin 64s for data collection, alongside standard tools like Word and Excel.</p>
        <p>Towards the end of my internship, I was finally given the chance to go directly into the field. It felt entirely different—transitioning from merely understanding data behind a screen to experiencing firsthand how that data is collected. An unforgettable bonus: I was introduced to the DJI Mavic 2 Pro drone for the first time, albeit mostly for learning purposes.</p>
        <p>The most valuable thing I brought home wasn't just technical skills. It was my first time migrating for work, my first real job experience, and the first time I seriously thought about my career. Seeing competent and passionate seniors in the field motivated me to keep growing. This is where my confidence began to build, slowly but surely.</p>
        
        <!-- Container Slider untuk Magang -->
        <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/Pengukuran-areal-kebakaran.jpg" alt="Pengukuran Areal Kebakaran">
            <div class="slide-caption">Burned Area Measurement</div>
          </div>
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/pengukuran-lahan-2.jpg" alt="Pengukuran Lahan 2">
            <div class="slide-caption">Land Measurement</div>
          </div>
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/pengukuran-lahan-3.jpg" alt="Pengukuran Lahan 3">
            <div class="slide-caption">Land Measurement Activities</div>
          </div>
          <div class="mySlides magang-slides fade-anim">
            <img src="/images/magang/pengukuran-lahan.jpg" alt="Pengukuran Lahan">
            <div class="slide-caption">Field Practice</div>
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
        
        <h3>Assistant Surveyor</h3>
        <p>After my internship ended, I stayed on as a full-time employee. This time, as an Assistant Surveyor, and my workload shifted significantly to the field. My primary tasks during this phase included surveying community lands and staking out area boundaries. I was also involved in measurements using the Topcon GM 50 series Total Station—utilized for road surveys and Bench Mark (BM) distribution. A major highlight during this period was being trusted to operate the DJI Mavic 2 Pro drone independently, both for aerial mapping and aerial patrols to monitor illegal activities or potential fires within company grounds.</p>
        <p>Occasionally, I participated in joint surveys with tenants, contractors, or other teams, which taught me how to communicate and coordinate across different parties. Unlike my internship where I mostly sat behind a laptop, here I truly experienced the field conditions. What impressed me the most: I was trained first, given trust gradually, and only then executed tasks in the field. It wasn't about being thrown in and expected to know everything immediately. That process allowed me to grow both technically and mentally.</p>
        
        <h3>Surveyor</h3>
        <p>The next progression: I switched teams. From the land team to the construction project team, with the official title of Surveyor, mentored directly by a Geodetic Engineer. This was the biggest milestone in my field journey. I began acting as a supervisor for land development projects—overseeing heavy machinery, communicating directly with operators, helpers, drivers, and even working overtime in the field. Topographical surveys of large areas became my daily routine, now equipped with new tools: the GNSS Geodetic Efix F8 Vision Camera and the DJI Mavic 3 Basic drone. This is also where I fully migrated from ArcMap to ArcGIS Pro.</p>
        <p>Some of my most memorable tasks included supervising the maintenance of a 9.2 km estate road, land development for firebreaks, and commercial area construction. I compiled daily reports from measurement data, updated work progress, and grew accustomed to internal and external company coordination. The realization that hit me hardest during this phase: I was no longer just a person tasked with measuring. I had begun demonstrating broader capabilities—from technical fieldwork to independent project management. This realization drove me to seriously pursue a career path beyond being a surveyor.</p>

        <!-- Container Slider untuk KIPI -->
        <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/DCP.jpg" alt="DCP">
            <div class="slide-caption">Dynamic Cone Penetrometer (DCP) Test</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Handling%20material.jpg" alt="Handling material">
            <div class="slide-caption">Material Handling in the Field</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Land%20development%20area%20komersial.jpg" alt="Land development area komersial">
            <div class="slide-caption">Commercial Area Land Development</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Pengawas%20repair%20jalan%20kawasan.jpg" alt="Pengawas repair jalan kawasan">
            <div class="slide-caption">Estate Road Repair Supervision</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Survey%20with%20topcon%20gm%2050%20series.jpg" alt="Survey with topcon gm 50 series">
            <div class="slide-caption">Surveying with Topcon GM 50 Series</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Topografi%20142%20hektare.jpg" alt="Topografi 142 hektare">
            <div class="slide-caption">142 Hectare Area Topography</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/Topografi%20jalan%20kawasan.jpg" alt="Topografi jalan kawasan">
            <div class="slide-caption">Estate Road Topography</div>
          </div>
          <div class="mySlides kipi-slides fade-anim">
            <img src="/images/KIPI/joint-survey.jpg" alt="joint survey">
            <div class="slide-caption">Cross-Team Joint Survey</div>
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
        <span class="date-badge">January 2026 - Present</span>
        
        <p>A new chapter. This time I returned to my hometown—Bogor—and started a completely different page.</p>
        <p>This decision was made with careful consideration. I wanted to work while seriously pursuing my bachelor's degree in Urban and Regional Planning at Universitas Terbuka. PT Inti Innovaco, as a housing developer, became the perfect place for me to continue on this path.</p>
        <p>Unlike my previous experience in a large-scale industrial setting, here I work on residential land development. The scale is smaller—around 4 hectares—but it is much more detailed and requires me to relearn many new things. The main challenge: I work alone without a surveyor team. For the first time in my career, I handle everything independently—land measurement, land acquisition, and data management and documentation.</p>
        <p>All the knowledge and experience I gathered in Kalimantan—understanding how land development works, preparing data independently, and being accustomed to reporting and coordination—I now bring and apply here, completely on my own in a brand-new environment.</p>
        <p>Honestly, this is not just a change of workplace. It is the beginning of a larger transition from a field surveyor to an Urban Planner or GIS Analyst. I am starting to prove that my capabilities extend far beyond field measurements. This journey is still ongoing.</p>
        
        <!-- Container Slider untuk Inti Innovaco -->
        <div class="slideshow-container" onmouseenter="pauseSlider()" onmouseleave="resumeSlider()">
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/cut-n-fill-kavling.jpg" alt="cut n fill kavling">
            <div class="slide-caption">Plot Cut and Fill Process</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/orthophoto-processing-data.jpg" alt="orthophoto processing data">
            <div class="slide-caption">Orthophoto Data Processing</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/pengukuran-batas.jpg" alt="pengukuran batas">
            <div class="slide-caption">Boundary Measurement</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/pengukuran-lahan.jpg" alt="pengukuran lahan">
            <div class="slide-caption">Land Measurement Activities</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/tim-teknis.jpg" alt="tim teknis">
            <div class="slide-caption">Technical Team Coordination</div>
          </div>
          <div class="mySlides inti-slides fade-anim">
            <img src="/images/ININ/topografi.jpg" alt="topografi">
            <div class="slide-caption">Topographical Survey</div>
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

  window.addEventListener('load', function() {
    showSlides(1, 'magang');
    resumeSlider();
  });
</script>
