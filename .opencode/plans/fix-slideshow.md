# Plano de Correção: Slideshow

## Problemas Identificados

### 1. Cores do Slideshow não combinam com o tema
- Site usa: fundo `--surface-inverse: #000000` (preto), acento `--accent-primary: #FF9800` (laranja)
- SVGs atuais têm gradientes coloridos (azul, roxo, verde) que destoam

### 2. Textos em português aparecem ao trocar para inglês
- Possível problema no `useEffect` ou no timing da troca de idioma

---

## Soluções

### 1. Corrigir Cores dos SVGs

**Novo padrão:**
- Fundo: `#000000` (preto sólido, igual ao footer)
- Elementos gráficos: `#F7931A` (laranja do site)
- Textos nos SVGs: `#F7931A` ou branco

**Arquivos a atualizar:**
- `/public/images/carousel/insumos.svg`
- `/public/images/carousel/backup.svg`
- `/public/images/carousel/clientside.svg`

**Exemplo de template para os novos SVGs:**
```svg
<svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="400" fill="#000000"/>
  <!-- Elementos gráficos em #F7931A -->
  <circle cx="600" cy="200" r="50" fill="none" stroke="#F7931A" stroke-width="2"/>
  <text x="600" y="210" font-family="Arial" font-size="16" fill="#F7931A" text-anchor="middle">Texto</text>
</svg>
```

### 2. Corrigir Troca de Idioma

**Problema no código atual (page.tsx linhas 40-46):**
```javascript
useEffect(() => {
  setCurrentSlide(0);
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % t.visionContent.length);
  }, 4000);
  return () => clearInterval(interval);
}, [language]); // language é uma string, não o objeto t
```

**Problema:** O `useEffect` depende de `language`, mas o `setInterval` usa `t.visionContent.length` que pode não ter atualizado ainda.

**Solução:** Forçar re-render e garantir que o slideshow use o idioma correto:
```javascript
useEffect(() => {
  setCurrentSlide(0); // Reset para primeiro slide
  const interval = setInterval(() => {
    setCurrentSlide((prev) => {
      const maxSlides = translations[language].visionContent.length;
      return (prev + 1) % maxSlides;
    });
  }, 4000);
  return () => clearInterval(interval);
}, [language]);
```

### 3. Ajustar CSS do Slideshow

**Adicionar ao `globals.css` para garantir que o fundo combine:**
```css
.slideshow-container {
  background: #000000; /* Fundo preto igual ao tema */
}

.slide-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9));
  /* Mais escuro para combinar com fundo preto */
}
```

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-------------|
| `public/images/carousel/insumos.svg` | Recriar com fundo preto (#000000) e elementos em #F7931A |
| `public/images/carousel/backup.svg` | Recriar com fundo preto (#000000) e elementos em #F7931A |
| `public/images/carousel/clientside.svg` | Recriar com fundo preto (#000000) e elementos em #F7931A |
| `src/app/page.tsx` | Corrigir lógica de troca de idioma no useEffect |
| `src/app/globals.css` | Ajustar overlay do slide para combinar com fundo preto |

---

## Verificação Pós-Correção

1. `npm run build` - sem erros
2. Slideshow fundo preto, elementos laranja (igual ao tema)
3. Trocar PT → EN: textos mudam imediatamente
4. Trocar EN → PT: textos mudam imediatamente
5. Slideshow reset para slide 1 ao trocar idioma
6. Botão PT/EN funcional
