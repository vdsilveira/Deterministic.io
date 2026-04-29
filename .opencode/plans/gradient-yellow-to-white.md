# Plano: Gradiente Amarelo → Branco no Slideshow

## Problema Atual

### CSS Atual (`.slide-overlay`, linha 187):
```css
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(252,250,247,0.1), rgba(252,250,247,0.8));
}
```

**Cores atuais:**
- Topo: `rgba(252,250,247,0.1)` (quase transparente, creme)
- Fundo: `rgba(252,250,247,0.8)` (quase sólido, creme)

**Objetivo:** Mudar para gradiente de **amarelo** (laranja claro) **para branco** (ou creme).

---

## 1. Esquema de Cores Proposto

### Opção 1: Amarelo Claro → Branco (Mais suave)
```css
background: linear-gradient(to bottom, 
  rgba(255, 235, 59, 0.3),   /* Amarelo claro no topo */
  rgba(255, 255, 255, 0.9)    /* Branco no fund */
);
```

### Opção 2: Laranja Claro → Creeme (Mais alinhado ao tema)
```css
background: linear-gradient(to bottom, 
  rgba(255, 152, 0, 0.2),    /* Laranja accent-primary claro */
  rgba(252, 250, 247, 0.9)   /* surface-primary no fund */
);
```

### Opção 3 (Recomendada): Amarelo → Branco Puro
```css
background: linear-gradient(to bottom, 
  rgba(255, 235, 59, 0.4),   /* Amarelo vibrante */
  rgba(255, 255, 255, 0.95)   /* Branco */
);
```

---

## 2. Alteração no CSS (`src/app/globals.css`)

### 2.1 Localização Exata
- **Arquivo:** `/l/disk0/viniciusd/Projetos/Utils/site/src/app/globals.css`
- **Linha:** 187
- **Propriedade:** `background` dentro de `.slide-overlay`

### 2.2 Novo CSS (Opção 3 - Recomendada)
```css
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(255, 235, 59, 0.4),   /* Amarelo */
    rgba(255, 255, 255, 0.95)   /* Branco */
  );
}
```

---

## 3. Alternativa: Gradiente Diagonal (Mais dinâmico)

Se preferir um efeito mais moderno:
```css
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(255, 235, 59, 0.3),   /* Amarelo claro */
    rgba(255, 255, 255, 0.95)   /* Branco */
  );
}
```

---

## 4. Verificação de Contraste

| Elemento | Cor | Fundo (Gradiente) | Contraste |
|----------|-----|-------------------|-----------|
| Título (.slide-title) | `#FF9800` (laranja) | Amarelo claro → Branco | ✅ Excelente |
| Texto (.slide-text) | `#000000` (preto) | Branco final | ✅ Perfeito |

---

## 5. Arquivo a Modificar

| Arquivo | Linha | Alteração |
|---------|-------|-----------|
| `src/app/globals.css` | 187 | `.slide-overlay { background }` - Mudar de `rgba(252,250,247,...)` para `rgba(255,235,59,...)` → `rgba(255,255,255,...)` |

---

## 6. Estrutura Visual Esperada

```
[Slide 1: Insumos Customizáveis]
  ├── Fundo: SVG com elementos em #FF9800
  ├── Overlay: Gradiente Amarelo (#FFEB3B) → Branco (#FFFFFF)
  ├── Título: "Insumos Customizáveis" em #FF9800
  └── Texto: "Diferente do padrão..." em #000000
```

---

## 7. Verificação Pós-Implementação

1. `npm run build` - sem erros
2. Gradiente visível: Amarelo no topo → Branco no fund
3. Textos legíveis (contraste mantido)
4. Consistência com o tema do site
5. Testar PT/EN (traduções não afetadas)

---

## 8. Notas Importantes

- **Amarelo (`#FFEB3B`):** Cor vibrante que combina com o laranja accent (`#FF9800`)
- **Branco (`#FFFFFF`):** Garante máximo contraste para texto preto
- **Opacidade:** Ajustada para manter os elementos do SVG visíveis através do overlay
- **Efeito:** Gradiente suave que não prejudica a leitura
