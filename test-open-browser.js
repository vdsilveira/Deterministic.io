const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Abrindo browser...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  
  const page = await context.newPage();
  
  console.log('🌐 Navegando para http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const title = await page.title();
  console.log('📄 Título:', title);
  
  const fields = await page.locator('.field-input').count();
  console.log('📝 Campos encontrados:', fields);
  
  console.log('\n🧪 Preenchendo campos...');
  for (let i = 1; i <= 11; i++) {
    await page.locator(`.field-input`).nth(i - 1).fill(`teste-${i}`);
  }
  
  // Habilitar e clicar
  await page.evaluate(() => {
    const btn = document.querySelector('.generate-button');
    if (btn) btn.removeAttribute('disabled');
  });
  
  await page.locator('.generate-button').click();
  await page.waitForSelector('.seed-phrase', { timeout: 10000 }).catch(() => {});
  
  console.log('✅ Site testado e funcionando!');
  console.log('\n⏳ Browser aberto. Interaja com o site!');
  console.log('💡 O browser NÃO vai fechar. Feche manualmente quando quiser.');
  
  // Espera infinita - mantém browser aberto
  await new Promise(resolve => {
    process.on('SIGINT', resolve);
    process.on('SIGTERM', resolve);
  });
  
  await browser.close();
  console.log('Browser fechado.');
})();