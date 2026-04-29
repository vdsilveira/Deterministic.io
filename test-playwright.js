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

  // Teste 1: Landing Page
  console.log('\n📄 Testando Landing Page (/)...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const title = await page.title();
  console.log('📄 Título:', title);

  // Verificar botão CTA
  const ctaButton = await page.locator('.cta-button').first();
  const ctaText = await ctaButton.textContent();
  console.log('🔘 CTA Button:', ctaText);

  // Verificar links GitHub e Docs
  const githubLink = await page.locator('a[href*="github.com"]').count();
  const docsLink = await page.locator('a[href*="readme"]').count();
  console.log('🔗 GitHub links:', githubLink, '| Docs links:', docsLink);

  // Clicar no CTA para ir para /generate
  console.log('\n➡️ Navegando para /generate...');
  await ctaButton.click();
  await page.waitForURL('**/generate');

  // Teste 2: Generate Page
  console.log('\n📝 Testando Generate Page (/generate)...');

  // Verificar botão voltar
  const backLink = await page.locator('.back-link').count();
  console.log('⬅️ Back link encontrado:', backLink > 0);

  // Verificar campos de input
  const fields = await page.locator('.field-input').count();
  console.log('📝 Campos encontrados:', fields);

  // Preencher campos
  console.log('\n🧪 Preenchendo campos de teste...');
  for (let i = 1; i <= 11; i++) {
    await page.locator('.field-input').nth(i - 1).fill(`input-teste-${i}`);
  }

  // Verificar contador
  const counter = await page.locator('.input-count').textContent();
  console.log('🔢 Contador:', counter);

  // Verificar botão gerar
  const btnGerar = await page.locator('.generate-button');
  const btnEnabled = await btnGerar.isEnabled();
  console.log('🔘 Botão Gerar habilitado:', btnEnabled);

  // Clicar em gerar
  console.log('\n⚡ Clicando em Gerar Chaves...');
  await btnGerar.click();

  // Esperar resultados
  await page.waitForSelector('.seed-phrase', { timeout: 10000 }).catch(() => {});

  // Verificar resultados
  const seedPhrase = await page.locator('.seed-phrase').textContent().catch(() => 'Não gerado');
  console.log('\n✅ Seed Phrase gerada:', seedPhrase ? 'Sim' : 'Não');

  const addresses = await page.locator('.address-value').allTextContents();
  console.log('🏠 Endereços gerados:', addresses.length);

  const wif = await page.locator('.wif-value').textContent().catch(() => 'Não gerado');
  console.log('🔑 WIF gerado:', wif ? 'Sim' : 'Não');

  // Teste 3: Verificar download executável (mocked)
  const execBtn = await page.locator('.executable-btn').count();
  console.log('\n📦 Botão executável encontrado:', execBtn > 0);

  // Voltar para landing
  console.log('\n⬅️ Testando navegação de volta...');
  await page.locator('.back-link').click();
  await page.waitForURL('**/');

  console.log('\n✅ Todos os testes concluídos!');
  console.log('💡 Feche o browser manualmente quando terminar.');

  await browser.close();
})();
