# Plano: Modificar Slideshow para Cores Claras

## Análise de Cores Atual

### Página Generate (cores claras):
- `--surface-primary: #FCFAF7` (off-white/cream muito claro)
- `--surface-secondary: #FFFFFF` (branco)
- `--surface-inverse: #000000` (preto)
- `--foreground-primary: #000000` (preto)
- `--foreground-secondary: #666666` (cinza médio)
- `--accent-primary: #FF9800` (laranja)

### Slideshow Atual (fundo preto com laranja):
- Fundo: `#000000` (preto)
- Textos: `#F7931A` (laranja)
- SVGs: Fundo preto + elementos em `#F7931A`

---

## Objetivo
Ajustar o slideshow para usar **cores claras compatíveis** com a página generate (fundo claro, texto escuro, acentos em laranja).

---

## 1. Alterações nos SVGs (Cores Claras)

### 1.1 `insumos.svg`
**Atual:** Fundo `#000000`, strokes `#F7931A`
**Novo:** Fundo `#FCFAF7` (surface-primary), strokes `#FF9800` (accent-primary)

```svg
<svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="400" fill="#FCFAF7"/>
  <!-- Grid pattern claro -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,152,0,0.15)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="400" fill="url(#grid)"/>
  
  <!-- Input boxes -->
  <rect x="250" y="160" width="200" height="40" rx="5" fill="none" stroke="#FF9800" stroke-width="2"/>
  <rect x="500" y="160" width="200" height="40" rx="5" fill="none" stroke="#FF9800" stroke-width="2"/>
  
  <!-- Plus signs -->
  <text x="470" y="185" font-family="Arial, sans-serif" font-size="24" fill="#FF9800" text-anchor="middle">+</text>
  <text x="720" y="185" font-family="Arial, sans-serif" font-size="24" fill="#FF9800" text-anchor="middle">+</text>
  
  <!-- Seed icon -->
  <circle cx="900" cy="180" r="30" fill="none" stroke="#FF9800" stroke-width="2"/>
  <path d="M 900 165 L 900 195 M 885 180 L 915 180" stroke="#FF9800" stroke-width="3" stroke-linecap="round"/>
</svg>
```

### 1.2 `backup.svg`
**Novo:** Fundo `#FCFAF7`, strokes/textos `#FF9800`

```svg
<svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="400" fill="#FCFAF7"/>
  
  <!-- Brain -->
  <ellipse cx="350" cy="200" rx="60" ry="40" fill="none" stroke="#FF9800" stroke-width="2"/>
  <path d="M 320 180 Q 350 160 380 180" fill="none" stroke="#FF9800" stroke-width="2"/>
  <path d="M 320 220 Q 350 240 380 220" fill="none" stroke="#FF9800" stroke-width="2"/>
  <circle cx="335" cy="200" r="3" fill="#FF9800"/>
  <circle cx="365" cy="200" r="3" fill="#FF9800"/>
  
  <!-- Cloud/File -->
  <path d="M 650 180 Q 650 160 670 160 L 730 160 Q 750 160 750 180 L 750 200 Q 750 220 730 220 L 670 220 Q 650 220 650 200 Z" fill="none" stroke="#FF9800" stroke-width="2"/>
  <path d="M 680 190 L 720 190 M 680 200 L 720 200" stroke="#FF9800" stroke-width="2"/>
  
  <!-- Arrow -->
  <path d="M 430 200 L 620 200" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#FF9800"/>
    </marker>
  </defs>
  
  <!-- Shield with check -->
  <path d="M 950 180 L 950 160 Q 950 140 970 140 L 1030 140 Q 1050 140 1050 160 L 1050 180 Q 1050 220 1000 240 Q 950 220 950 180 Z" fill="none" stroke="#FF9800" stroke-width="2"/>
  <path d="M 970 195 L 985 210 L 1030 175" fill="none" stroke="#FF9800" stroke-width="3" stroke-linecap="round"/>
</svg>
```

### 1.3 `clientside.svg`
**Novo:** Fundo `#FCFAF7`, strokes/textos `#FF9800`

```svg
<svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="400" fill="#FCFAF7"/>
  
  <!-- Circuit pattern claro -->
  <defs>
    <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="2" fill="rgba(255,152,0,0.3)"/>
      <path d="M 30 0 L 30 28 M 30 32 L 30 60 M 0 30 L 28 30 M 32 30 L 60 30" stroke="rgba(255,152,0,0.2)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="400" fill="url(#circuit)"/>
  
  <!-- Browser window -->
  <rect x="200" y="120" width="300" height="180" rx="8" fill="none" stroke="#FF9800" stroke-width="2"/>
  <rect x="200" y="120" width="300" height="30" rx="8" fill="rgba(255,152,0,0.15)"/>
  <circle cx="220" cy="135" r="5" fill="#ff4444"/>
  <circle cx="235" cy="135" r="5" fill="#ffaa00"/>
  <circle cx="250" cy="135" r="5" fill="#44ff44"/>
  
  <!-- Math symbol -->
  <text x="600" y="200" font-family="Arial, sans-serif" font-size="20" fill="#FF9800" text-anchor="middle">f(x)</text>
  
  <!-- Arrow -->
  <path d="M 520 210 L 570 210" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#FF9800"/>
    </marker>
  </defs>
  
  <!-- Lock/Result -->
  <rect x="800" y="140" width="140" height="140" rx="8" fill="none" stroke="#FF9800" stroke-width="2"/>
  <rect x="820" y="160" width="100" height="60" rx="5" fill="none" stroke="#FF9800" stroke-width="2"/>
  <path d="M 850 195 L 865 210 L 885 185" fill="none" stroke="#FF9800" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Bottom text -->
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="18" fill="#FF9800" text-anchor="middle">Sem servidor • Sem rastreamento • 100% Offline</text>
</svg>
```

---

## 2. Alterações no CSS (`globals.css`)

### 2.1 Atualizar `.slideshow-container`
**Atual:** Fundo transparente (herda do body)
**Novo:** Garantir que o fundo seja claro

```css
.slideshow-container {
  position: relative;
  width: 100vw;
  height: 400px;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
  background: #FCFAF7; /* Fundo claro igual à página generate */
}
```

### 2.2 Atualizar `.slide-overlay`
**Atual:** Gradiente escuro `rgba(0,0,0,0.3)` para `rgba(0,0,0,0.9)`
**Novo:** Gradiente claro para contraste com fundo claro

```css
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(252,250,247,0.3), rgba(252,250,247,0.9));
  /* Overlay claro que combina com #FCFAF7 */
}
```

### 2.3 Atualizar `.slide-content`
**Atual:** Textos claros (brancs) com sombra
**Novo:** Textos escuros (preto/cinza) sem sombra

```css
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
  color: #FF9800; /* Laranja accent-primary */
  margin-bottom: 20px;
  /* Removido text-shadow pois fundo é claro */
}

.slide-text {
  font-size: 16px;
  color: #000000; /* Preto - foreground-primary */
  line-height: 1.6;
  max-width: 600px;
  /* Removido text-shadow */
}
```

---

## 3. Verificação de Contraste

| Elemento | Cor Nova | Fundo | Contraste |
|----------|---------|-------|-----------|
| Título (.slide-title) | `#FF9800` (laranja) | `#FCFAF7` (cream) | ✅ Alto |
| Texto (.slide-text) | `#000000` (preto) | `#FCFAF7` (cream) | ✅ Excelente |
| Overlay | `rgba(252,250,247,0.9)` | `#FCFAF7` | ✅ Suave |

---

## 4. Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `public/images/carousel/insumos.svg` | Fundo `#FCFAF7`, strokes `#FF9800` |
| `public/images/carousel/backup.svg` | Fundo `#FCFAF7`, strokes `#FF9800` |
| `public/images/carousel/clientside.svg` | Fundo `#FCFAF7`, strokes `#FF9800` |
| `src/app/globals.css` | `.slideshow-container`, `.slide-overlay`, `.slide-content`, `.slide-title`, `.slide-text` |

---

## 5. Estrutura Visual Esperada

```
[Slideshow - Fundo #FCFAF7 (cream claro)]
  ├── Título: "Insumos Customizáveis" (laranja #FF9800)
  ├── Texto: "Diferente do padrão..." (preto #000000)
  └── Overlay claro para legibilidade
```

---

## 6. Verificação Pós-Implementação

1. `npm run build` - sem erros
2. Slideshow fundo claro (#FCFAF7)
3. Textos em preto (#000000) com títulos em laranja (#FF9800)
4. SVGs com elementos em laranja sobre fundo claro
5. Contraste adequado (legibilidade)
6. Consistência visual com página generate
7. Testar PT/EN (traduções mantidas)
