// ==========================================================
// Klasifikasi Tutupan Lahan (Hutan vs Non-Hutan)
// Taman Nasional Meru Betiri - Tahun 2025
// Landsat 8/9 Collection 2 Level 2 | Random Forest
// ==========================================================

// Fungsi cloud & cloud shadow masking pakai band QA_PIXEL
function maskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 4);
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}

// Rentang waktu citra: sepanjang tahun 2025
var startDate = '2025-01-01';
var endDate = '2025-12-31';

// Ambil koleksi Landsat 8 & 9, filter sesuai batas kawasan dan rentang waktu
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(meru_betiri)
  .filterDate(startDate, endDate);
var l9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(meru_betiri)
  .filterDate(startDate, endDate);

// Gabung L8 & L9, masking awan, komposit median, lalu potong sesuai AOI
var landsat = l8.merge(l9)
  .map(maskL8sr)
  .median()
  .clip(meru_betiri);

// Visualisasi true color buat pengecekan visual hasil komposit
var visTrue = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 7000,
  max: 12000
};
Map.centerObject(meru_betiri, 11);
Map.addLayer(landsat, visTrue, 'Landsat 8/9 - True Color (Bebas Awan)');

// Gabungkan titik sampel hutan & non-hutan dari Geometry Imports
var sampleData = hutan.merge(non_hutan);

// Band yang dipakai sebagai input training random forest
var bands = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'];

// Ekstrak nilai piksel citra pada tiap titik sampel
var training = landsat.select(bands).sampleRegions({
  collection: sampleData,
  properties: ['tuplah'], // 0 = hutan, 1 = non-hutan
  scale: 30 // resolusi spasial Landsat
});

// Training model Random Forest (50 decision tree)
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training,
  classProperty: 'tuplah',
  inputProperties: bands
});

// Terapkan model ke seluruh citra di area TN Meru Betiri
var classified = landsat.select(bands).classify(classifier);

// Visualisasi hasil klasifikasi: hijau = hutan, kuning = non-hutan
var visKlasifikasi = {
  min: 0,
  max: 1,
  palette: ['green', '#FFC107']
};
Map.addLayer(classified, visKlasifikasi, 'Hasil Klasifikasi Tutupan Lahan 2025');

// Uji akurasi model lewat confusion matrix pada data training
var trainAccuracy = classifier.confusionMatrix();
print('Residu Confusion Matrix:', trainAccuracy);
print('Overall Accuracy:', trainAccuracy.accuracy());
print('Kappa Coefficient:', trainAccuracy.kappa());

// Legenda peta di panel GEE
var legend = ui.Panel({
  style: {position: 'bottom-right', padding: '8px 15px'}
});
var legendTitle = ui.Label({
  value: 'Legenda Tutupan Lahan 2025',
  style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0'}
});
legend.add(legendTitle);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {backgroundColor: color, padding: '8px', margin: '0 0 4px 0'}
  });
  var description = ui.Label({
    value: name, style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('green', 'Hutan (0)'));
legend.add(makeRow('#FFC107', 'Non-Hutan (1)'));
Map.add(legend);

// Export hasil klasifikasi ke Google Drive
Export.image.toDrive({
  image: classified,
  description: 'Klasifikasi_Tuplah_Meru_Betiri_2025_L89',
  folder: 'GEE_Export',
  scale: 30,
  region: meru_betiri,
  maxPixels: 1e13
});
