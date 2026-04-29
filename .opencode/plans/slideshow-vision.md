# Plano: Slideshow Automático para Vision Section

## Problema Identificado
A implementação atual criou um carrossel de scroll manual, mas o solicitado é um **slideshow automático** (tipo apresentação PowerPoint) que transiciona sozinho da direita para a esquerda.

## Objetivo
- Slideshow automático com 3 slides (Insumos, Backup, Client-Side)
- Transição automática a cada 4-5 segundos
- Efeito de deslize da direita para esquerda
- Cada slide ocupa toda a largura da tela (100vw)
- Imagens de fundo temáticas
- Indicadores de slide (pontos) na parte inferior

---

## 1. Alterações em `src/app/page.tsx`

### 1.1 Adicionar estado para controle do slide atual

No componente `Home()`, adicionar:
```javascript
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % t.visionContent.length);
  }, 4000); // 4 segundos
  return () => clearInterval(interval);
}, [language]); // Reset ao trocar idioma
```

### 1.2 JSX do Slideshow (substituir o carrossel atual)

```jsx
{/* Vision Slideshow */}
<div className="slideshow-container">
  {t.visionContent.map((card, index) => (
    <div 
      key={index}
      className={`slideshow-slide ${index === currentSlide ? 'active' : ''}`}
    >
      <div className="slide-bg">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="slide-image"
          onError={(e) => { e.currentTarget.src = '/images/carousel/placeholder.svg'; }}
        />
        <div className="slide-overlay" />
      </div>
      <div className="slide-content">
        <h3 className="slide-title">{card.title}</h3>
        <p className="slide-text">{card.text}</p>
      </div>
    </div>
  ))}
  
  {/* Indicadores */}
  <div className="slide-indicators">
    {t.visionContent.map((_, index) => (
      <button
        key={index}
        className={`indicator ${index === currentSlide ? 'active' : ''}`}
        onClick={() => setCurrentSlide(index)}
      />
    ))}
  </div>
</div>
<p className="vision-closing">{t.visionClosing}</p>
```

---

## 2. CSS do Slideshow em `src/app/globals.css`

```css
/* Vision Slideshow */
.slideshow-container {
  position: relative;
  width: 100vw;
  height: 400px;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
}

.slideshow-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.6s ease-in-out;
}

.slideshow-slide.active {
  opacity: 1;
  transform: translateX(0);
}

.slideshow-slide.active ~ .slideshow-slide {
  transform: translateX(-100%);
}

.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide-image {
  object-fit: cover;
  object-position: center;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85));
}

.slide-content {
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

.slide-title {
  font-size: 28px;
  font-weight: 700;
  color: #F7931A;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slide-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* Indicadores */
.slide-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: #F7931A;
  transform: scale(1.2);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.7);
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

## 3. Remover CSS Antigo

Remover do `globals.css`:
- `.vision-carousel-container`
- `.vision-carousel-track`
- `.vision-carousel-card`
- `.vision-card-bg`
- `.vision-card-image`
- `.vision-card-overlay`
- `.vision-card-content`
- `.vision-card-title` (antigo)
- `.vision-card-text` (antigo)

---

## 4. Estrutura Final

```
Hero Grid (Bento)
  ↓
Slideshow Automático (100vw)
  - Slide 1: Insumos Customizáveis (aparece primeiro)
  - Slide 2: Backup Mental e Digital (transiciona após 4s)
  - Slide 3: Execução Client-Side (transiciona após 4s)
  - Indicadores na parte inferior
  - Loop infinito (volta para slide 1 após o último)
  ↓
Frase Final: "Segurança não precisa ser difícil..."
  ↓
Footer
```

---

## 5. Comportamento do Slideshow

1. Slide 1 aparece (0s)
2. Após 4s → Slide 2 desliza da direita
3. Após 4s → Slide 3 desliza da direita
4. Após 4s → Volta para Slide 1 (loop)
5. Clique nos indicadores pula para o slide selecionado
6. Transição suave (0.6s ease-in-out)

---

## 6. Verificação

1. `npm run build` - sem erros
2. Slideshow inicia automaticamente
3. Transição suave da direita para esquerda
4. Loop contínuo (3 → 1)
5. Clique nos indicadores funciona
6. Botão PT/EN funcional (traduções)
7. Reset do slide ao trocar idioma
