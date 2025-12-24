const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 Iniciando generación de captura de pantalla...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });
  
  console.log('📄 Abriendo página HTML...');
  const page = await browser.newPage();
  
  // Configurar viewport para que coincida con el diseño
  await page.setViewport({ 
    width: 1400, 
    height: 500,
    deviceScaleFactor: 2 // Para mejor calidad
  });
  
  // Obtener la ruta absoluta del archivo HTML
  const htmlPath = path.join(__dirname, 'github-stats.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log(`📂 Cargando: ${fileUrl}`);
  
  await page.goto(fileUrl, { 
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  // Esperar a que se carguen las estadísticas
  console.log('⏳ Esperando a que se carguen las estadísticas...');
  await page.waitForTimeout(5000); // Esperar 5 segundos para que la API responda
  
  // Verificar que los elementos estén cargados
  await page.waitForSelector('.stats-card', { timeout: 10000 });
  
  console.log('📸 Capturando imagen...');
  
  // Obtener las dimensiones del elemento stats-card
  const element = await page.$('.stats-card');
  const boundingBox = await element.boundingBox();
  
  // Tomar screenshot del elemento específico con padding
  await page.screenshot({
    path: 'github-stats-preview.png',
    clip: {
      x: Math.max(0, boundingBox.x - 20),
      y: Math.max(0, boundingBox.y - 20),
      width: boundingBox.width + 40,
      height: boundingBox.height + 40
    },
    omitBackground: false
  });
  
  console.log('✅ Captura guardada como github-stats-preview.png');
  
  // Verificar que el archivo se creó
  if (fs.existsSync('github-stats-preview.png')) {
    const stats = fs.statSync('github-stats-preview.png');
    console.log(`📊 Tamaño del archivo: ${(stats.size / 1024).toFixed(2)} KB`);
  }
  
  await browser.close();
  console.log('🎉 ¡Proceso completado con éxito!');
})().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
