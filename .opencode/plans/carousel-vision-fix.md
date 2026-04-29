# Plano Corrigido: Carrossel com Cards da Vision Section

## Problema Identificado
A implementação anterior criou um carrossel com cards BIP84/BIP49/BIP86, mas o solicitado era converter os cards da **Vision Section** (Insumos Customizáveis, Backup Mental e Digital, Execução Client-Side) em um carrossel horizontal.

## Objetivo
- Remover as seções trust strip e features grid (já feito)
- Transformar a Vision Section em um carrossel horizontal
- Cards devem ocupar a tela toda horizontalmente
- Movimento do carrossel: da direita para a esquerda
- Cada card deve ter imagem de fundo personalizada

---

## 1. Limpeza - Remover Carrossel Anterior

### 1.1 Remover do `page.tsx`:
- Remover `carouselCards` do objeto `translations` (pt-BR e en)
- Remover JSX do carrossel anterior (linhas 83-107)
- Remover import do `Image` do next/image (se não usado em outro lugar)

### 1.2 Remover de `globals.css`:
- Remover todo o CSS do `.carousel-container`, `.carousel-track`, `.carousel-card`, etc.

---

## 2. Criar Novo Carrossel - Vision Cards

### 2.1 Atualizar `translations` em `page.tsx`

**pt-BR:**
```javascript
visionContent: [
  { 
    title: 'Insumos Customizáveis', 
    text: 'Diferente do padrão BIP39, aqui você escolhe. Use frases memoráveis ou arquivos. Com apenas 4 campos, sua semente ganha vida.',
    image: '/images/carousel/insumos.svg'
  },
  { 
    title: 'Backup Mental e Digital', 
    text: 'Sua chave está na sua cabeça ou em arquivos que você já faz backup naturalmente. É a prova de perdas físicas.',
    image: '/images/carousel/backup.svg'
  },
  { 
    title: 'Execução Client-Side', 
    text: 'Processo matemático fixo. Tudo ocorre offline no navegador: não vemos seus dados, não guardamos sua privacidade.',
    image: '/images/carousel/clientside.svg'
  }
],
visionClosing: 'Segurança não precisa ser difícil. Precisa ser lógica.'
```

**en:**
```javascript
visionContent: [
  { 
    title: 'Customizable Inputs', 
    text: 'Unlike BIP39 standard, here you choose. Use memorable phrases or files. With just 4 fields, your seed comes to life.',
    image: '/images/carousel/insumos.svg'
  },
  { 
    title: 'Mental & Digital Backup', 
    text: 'Your key is in your head or in files you already naturally backup. Proof against physical losses.',
    image: '/images/carousel/backup.svg'
  },
  { 
    title: 'Client-Side Execution', 
    text: 'Fixed mathematical process. Everything happens offline in the browser: we don\'t see your data, we don\'t store anything.',
    image: '/images/carousel/clientside.svg'
  }
],
visionClosing: 'Security doesn\'t need to be hard. It needs to be logical.'
```

### 2.2 JSX do Carrossel (substituir Vision Section atual)

```jsx
{/* Vision Carousel Section */}
<div className="vision-carousel-container">
  <div className="vision-carousel-track">
    {t.visionContent.map((card, i) => (
      <div className="vision-carousel-card" key={i}>
        <div className="vision-card-bg">
          <Image 
            src={card.image} 
            alt={card.title}
            fill
            className="vision-card-image"
            onError={(e) => { e.currentTarget.src = '/images/carousel/placeholder.svg'; }}
          />
          <div className="vision-card-overlay" />
        </div>
        <div className="vision-card-content">
          <h3 className="vision-card-title">{card.title}</h3>
          <p className="vision-card-text">{card.text}</p>
        </div>
      </div>
    ))}
  </div>
</div>
<p className="vision-closing">{t.visionClosing}</p>
```

---

## 3. CSS do Novo Carrossel em `globals.css`

```css
/* Vision Carousel Section */
.vision-carousel-container {
  margin-top: 48px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.vision-carousel-container::-webkit-scrollbar {
  display: none;
}

.vision-carousel-track {
  display: flex;
  gap: 0;
  height: 400px;
}

.vision-carousel-card {
  flex: 0 0 100vw;
  height: 400px;
  position: relative;
  overflow: hidden;
  scroll-snap-align: start;
}

.vision-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vision-card-image {
  object-fit: cover;
  object-position: center;
}

.vision-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85));
}

.vision-card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  text-align: center;
}

.vision-card-title {
  font-size: 28px;
  font-weight: 700;
  color: #F7931A;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.vision-card-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.vision-closing {
  text-align: center;
  font-weight: 600;
  color: #F7931A;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
}
```

---

## 4. Criar Imagens SVG para os Cards

Criar arquivos em `/public/images/carousel/`:

- `insumos.svg` - Tema: personalização, inputs variados
- `backup.svg` - Tema: cérebro + nuvem/disco
- `clientside.svg` - Tema: navegador, offline, cadeado

Usar estilo consistente com gradientes escuros e elementos visuais temáticos.

---

## 5. Estrutura Final

```
Hero Grid (Bento)
  ↓
Trust Strip (REMOVIDO)
  ↓
Features Grid (REMOVIDO)
  ↓
Vision Carousel (NOVO - full width)
  - Card 1: Insumos Customizáveis (imagem fundo)
  - Card 2: Backup Mental e Digital (imagem fundo)
  - Card 3: Execução Client-Side (imagem fundo)
  ↓
Vision Closing Phrase
  ↓
Footer
```

---

## 6. Verificação

1. `npm run build` - sem erros
2. Carrossel ocupa toda largura da tela (100vw)
3. Scroll horizontal funcional (1 card por vez)
4. Imagens de fundo carregando
5. Botão PT/EN funcional (traduções no translations)
6. Frase final centralizada antes do footer
