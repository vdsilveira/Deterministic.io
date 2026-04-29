# Plano: Substituir Trust Strip + Features Grid por Carrossel

## Objetivo
Remover as seções "Trust Strip" e "Features Grid" e criar um carrossel horizontal com cards que têm imagens de fundo.

---

## 1. Remoções em `src/app/page.tsx`

### 1.1 Objeto `translations` (linhas 14-19 e 32-37)
- **Remover** `trust` array (pt-BR e en)
- **Remover** `features` array (pt-BR e en)

### 1.2 JSX (linhas 81-94)
- **Remover** `<div className="trust-strip">...</div>`
- **Remover** `<div className="features-grid">...</div>`

---

## 2. Adições em `src/app/page.tsx`

### 2.1 Novo array no `translations` (pt-BR e en)

```javascript
carouselCards: [
  { 
    title: 'BIP84 - Native SegWit', 
    desc: 'Endereços bc1q...\nMenor custo de transação',
    image: '/images/carousel/bip84.jpg'
  },
  { 
    title: 'BIP49 - Nested SegWit', 
    desc: 'Endereços 3...\nCompatível com carteiras legadas',
    image: '/images/carousel/bip49.jpg'
  },
  { 
    title: 'BIP86 - Taproot', 
    desc: 'Endereços bc1p...\nMáxima privacidade e eficiência',
    image: '/images/carousel/bip86.jpg'
  },
  { 
    title: 'Client-Side Only', 
    desc: 'Seus dados nunca saem do navegador',
    image: '/images/carousel/security.jpg'
  },
  { 
    title: 'Geração Rápida', 
    desc: 'Processamento instantâneo offline',
    image: '/images/carousel/speed.jpg'
  }
]
```

### 2.2 JSX do Carrossel (substituir seções removidas)

```jsx
{/* Carousel Section */}
<div className="carousel-container">
  <div className="carousel-track">
    {t.carouselCards.map((card, i) => (
      <div className="carousel-card" key={i}>
        <div className="carousel-card-bg">
          <Image 
            src={card.image} 
            alt={card.title}
            fill
            className="carousel-image"
            onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg'; }}
          />
          <div className="carousel-overlay" />
        </div>
        <div className="carousel-content">
          <h3 className="carousel-card-title">{card.title}</h3>
          <p className="carousel-card-desc">
            {card.desc.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## 3. Alterações em `src/app/globals.css`

### 3.1 Remover CSS antigo
- `.trust-strip` (linhas 138-150)
- `.trust-strip span` (linhas 147-150)
- `.features-grid` (linhas 152-157)
- `.feature-card` (linhas 159-168)
- `.feature-badge` (linhas 170-174)
- `.feature-desc` (linhas 176-179)

### 3.2 Adicionar CSS do Carrossel (ao final do arquivo)

```css
/* Carousel Section */
.carousel-container {
  margin-top: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  display: flex;
  gap: 16px;
  padding: 8px 0 16px 0;
}

.carousel-card {
  flex: 0 0 300px;
  height: 200px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  scroll-snap-align: start;
  cursor: pointer;
  transition: transform 0.2s;
}

.carousel-card:hover {
  transform: scale(1.02);
}

.carousel-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-image {
  object-fit: cover;
  object-position: center;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
}

.carousel-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: white;
}

.carousel-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #F7931A;
  margin-bottom: 8px;
}

.carousel-card-desc {
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.9;
}
```

---

## 4. Imagens Necessárias

### 4.1 Criar diretório
```bash
mkdir -p public/images/carousel
```

### 4.2 Imagens sugeridas (300x200px ou proporção 3:2)
- `bip84.jpg` - Visual relacionado a SegWit (ex: gráfico de rede)
- `bip49.jpg` - Visual relacionado a Nested SegWit (ex: ícone de compatibilidade)
- `bip86.jpg` - Visual relacionado a Taproot (ex: símbolo Taproot)
- `security.jpg` - Visual de segurança (ex: cadeado em fundo escuro)
- `speed.jpg` - Visual de velocidade (ex: relâmpago/raio)

### 4.3 Placeholder (caso não tenha imagens reais)
Criar um SVG simples como fallback em `/public/images/carousel/placeholder.jpg`

---

## 5. Estrutura Final Esperada

```
Hero Grid (Bento)
  ↓
Carousel Horizontal (NOVO - substitui trust + features)
  - Scroll horizontal com snap
  - Cards com imagem de fundo + overlay escuro
  - Texto em branco com título laranja
  ↓
Vision Section (já implementado)
  ↓
Footer
```

---

## 6. Verificação Pós-Implementação

1. `npm run build` - Verificar erros de compilação
2. Testar scroll horizontal do carrossel (desktop e mobile)
3. Verificar se imagens carregam (tratamento de erro com onError)
4. Testar botão PT/EN (traduções no translations)
5. Validar responsividade (cards 300px fixos, scroll funcional)

---

## 7. Notas Importantes

- O carrossel usa `scroll-snap-type: x mandatory` para melhor UX em mobile
- `scrollbar-width: none` remove a barra de rolagem (cross-browser)
- Overlay gradiente garante legibilidade do texto sobre a imagem
- `next/image` é usado para otimização automática de imagens
- Fallback de imagem implementado via `onError` no componente Image
