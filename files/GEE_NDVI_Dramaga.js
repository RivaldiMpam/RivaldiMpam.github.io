// =========================================================================
// ANALISIS NDVI DAN KLASIFIKASI KERAPATAN VEGETASI DINAMIS KECAMATAN DRAMAGA
// Dibuat oleh: Rivaldi Fiqriyansah (Berbasis Sentinel-2 SR 10m)
// =========================================================================

// 1. Inisialisasi Wilayah Kajian (Region of Interest / ROI)
var roi = dramaga;

// 2. Fungsi Cloud Masking Sentinel-2 Berbasis Band QA60
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
                .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}

// 3. Panggil Koleksi Citra Sentinel-2 Surface Reflectance
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(roi)
  .filterDate('2026-01-01', '2026-05-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
  .map(maskS2clouds);

// 4. Fungsi Menghitung NDVI
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};

// 5. Hitung NDVI dan Ambil Nilai Median Temporal
var s2Ndvi = s2.map(addNDVI);
var ndviMedian = s2Ndvi.select('NDVI').median().clip(roi);

// 6. Parameter Visualisasi Gradien NDVI (Kontinu)
var ndviVis = {
  min: 0.0,
  max: 0.8,
  palette: ['blue', 'white', 'green']
};

// 7. Tampilkan Hasil ke Peta
Map.centerObject(roi, 12.5);
Map.addLayer(ndviMedian, ndviVis, 'NDVI Kecamatan Dramaga (Jan-Mei 2026)');
Map.addLayer(ee.Image().paint(roi, 0, 2), {palette: 'red'}, 'Batas Administratif Kecamatan Dramaga');

// 8. Tampilkan Histogram Distribusi Nilai NDVI di Console
var histogram = ui.Chart.image.histogram({
  image: ndviMedian,
  region: roi,
  scale: 10,
  minBucketWidth: 0.02
});

histogram.setOptions({
  title: 'Distribusi Nilai NDVI Kecamatan Dramaga (Resolusi 10m)',
  hAxis: {title: 'Nilai NDVI', viewWindow: {min: -0.2, max: 1.0}},
  vAxis: {title: 'Jumlah Piksel (Kerapatan)'},
  colors: ['#1d6b01']
});
print(histogram);

// 9. PROSES KLASIFIKASI VEGETASI DINAMIS (METODE PERSENTIL LOKAL)
var percentiles = ndviMedian.reduceRegion({
  reducer: ee.Reducer.percentile([33, 66]),
  geometry: roi,
  scale: 10,
  maxPixels: 1e13
});

var p33 = ee.Number(percentiles.get('NDVI_p33'));
var p66 = ee.Number(percentiles.get('NDVI_p66'));

print('Batas Rendah - Sedang (Persentil 33):', p33);
print('Batas Sedang - Tinggi (Persentil 66):', p66);

var ndviClassified = ee.Image(0)
  .where(ndviMedian.lt(p33), 1)
  .where(ndviMedian.gte(p33).and(ndviMedian.lt(p66)), 2)
  .where(ndviMedian.gte(p66), 3)
  .updateMask(ndviMedian.mask())
  .clip(roi);

var classVis = {
  min: 1,
  max: 3,
  palette: ['#ff0000', '#ffff00', '#008000']
};
Map.addLayer(ndviClassified, classVis, 'Klasifikasi Kerapatan Vegetasi Dramaga');

// 10. PEMBUATAN LEGENDA PETA INTERAKTIF DINAMIS (UI PANEL)
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    backgroundColor: 'white',
    border: '1px solid gray'
  }
});

var legendTitle = ui.Label({
  value: 'Kelas Kerapatan Vegetasi (NDVI)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 6px 0',
    padding: '0'
  }
});
legend.add(legendTitle);

var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 8px 4px 0'
    }
  });

  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 0', fontSize: '12px'}
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

var palette = ['#ff0000', '#ffff00', '#008000'];

ee.Dictionary({
  batasBawah: p33.format('%.2f'),
  batasAtas: p66.format('%.2f')
}).evaluate(function(nilai) {
  var names = [
    'Kerapatan Rendah (< ' + nilai.batasBawah + ')',
    'Kerapatan Sedang (' + nilai.batasBawah + ' - ' + nilai.batasAtas + ')',
    'Kerapatan Tinggi (> ' + nilai.batasAtas + ')'
  ];

  for (var i = 0; i < 3; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
  Map.add(legend);
});

// 11. MENGHITUNG LUASAN AREA PER KELAS (Km2 & Ha)
var areaImage = ee.Image.pixelArea().addBands(ndviClassified);
var areaStats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 'constant',
    groupName: 'class',
  }),
  geometry: roi,
  scale: 10,
  maxPixels: 1e13
});

var classAreas = ee.List(areaStats.get('groups'));
classAreas.evaluate(function(areas) {
  print('=== LAPORAN LUASAN KERAPATAN VEGETASI ===');
  var classNames = ['Kerapatan Rendah', 'Kerapatan Sedang', 'Kerapatan Tinggi'];
  areas.forEach(function(item) {
    var classNum = item.class;
    var areaM2 = item.sum;
    var areaKm2 = areaM2 / 1000000;
    var areaHa = areaM2 / 10000;
    print(classNames[classNum - 1] + ': ' + areaKm2.toFixed(2) + ' Km2 / ' + areaHa.toFixed(2) + ' Ha');
  });
});

// 12. EXPORT HASIL KE GOOGLE DRIVE
Export.image.toDrive({
  image: ndviMedian,
  description: 'NDVI_Dramaga_2026',
  folder: 'GEE_Export_Dramaga',
  region: roi,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

Export.image.toDrive({
  image: ndviClassified.toByte(),
  description: 'Kelas_Kerapatan_Vegetasi_2026',
  folder: 'GEE_Export_Dramaga',
  region: roi,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});
