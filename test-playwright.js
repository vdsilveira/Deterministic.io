const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Abrindo browser...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  console.log('🌐 Navegando para http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const title = await page.title();
  console.log('📄 Título:', title);
  
  // Verificar campos de input
  const fields = await page.locator('.field-input').count();
  console.log('📝 Campos encontrados:', fields);
  
  // Teste: preencher alguns campos
  console.log('\n🧪 Preenchendo campos de teste...');
  for (let i = 1; i <= 11; i++) {
    await page.locator(`.field-input`).nth(i - 1).fill(`input-teste-${i}`);
  }
  
  // Verificar botão
  const btnGerar = await page.locator('.generate-button');
  const btnText = await btnGerar.textContent();
  console.log('🔘 Botão:', btnText);
  
  // Habilitar botão (remover disabled)
  await page.evaluate(() => {
    const btn = document.querySelector('.generate-button');
    if (btn) btn.removeAttribute('disabled');
  });
  
  // Clicar em gerar
  console.log('⚡ Clicando em Gerar Chaves...');
  await btnGerar.click();
  
  // Esperar resultados
  await page.waitForSelector('.seed-phrase', { timeout: 10000 }).catch(() => {});
  
  // Verificar resultados
  const seedPhrase = await page.locator('.seed-phrase').textContent().catch(() => 'Não gerado');
  console.log('\n✅ Seed Phrase:', seedPhrase.substring(0, 50) + '...');
  
  const addresses = await page.locator('.address-value').allTextContents();
  console.log('🏠 Endereços:');
  for (const addr of addresses) {
    console.log('   -', addr.substring(0, 40) + '...');
  }
  
  const wif = await page.locator('.wif-value').textContent().catch(() => 'Não gerado');
  console.log('🔑 WIF:', wif.substring(0, 40) + '...');
  
  console.log('\n✅ Teste concluído! Browser permanece aberto.');
  console.log('💡 Feche o browser manualmente quando terminar.');
  
  // Manter browser aberto
  await browser.close();
})();