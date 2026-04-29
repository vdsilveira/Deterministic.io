# Plano: Ajuste de Espaçamento e Cor

## Objetivos
1. Diminuir o espaço entre a frase "Segurança não precisa ser difícil. Precisa ser lógica." e o footer
2. Mudar a cor do texto da frase para ciano escuro (dark cyan)

---

## 1. Análise do Espaçamento Atual

### CSS Atual (globals.css):

**Slideshow (linhas 139-145):**
```css
.slideshow-container {
  position: relative;
  width: 100vw;
  height: 400px;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
}
/* Altura fixa de 400px */
```

**Vision Closing (linhas 248-255):**
```css
.vision-closing {
  text-align: center;
  font-weight: 600;
  color: #F7931A; /* Laranja - precisa mudar */
  margin-top: 40px; /* Espaço acima da frase */
  margin-bottom: 40px; /* Espaço abaixo da frase - PRECISA DIMINUIR */
  font-size: 18px;
}
```

**Footer (linhas 804-809):**
```css
.footer {
  background: var(--surface-inverse);
  color: var(--foreground-inverse);
  padding: 32px 32px; /* Padding interno do footer */
  margin-top: 32px; /* Espaço entre o conteúdo anterior e o footer */
}
```

### Cálculo do Espaço Atual:
- Após slideshow: 0px (slideshow termina no margin-left)
- Frase: `margin-top: 40px` + `margin-bottom: 40px` = 80px de espaço vertical
- Footer: `margin-top: 32px` + `padding: 32px 32px` = 64px antes do conteúdo do footer
- **Total:** ~144px entre frase e início do conteúdo do footer

---

## 2. Alterações Necessárias

### 2.1 Diminuir Espaçamento

**Arquivo:** `src/app/globals.css`

**A. Reduzir `margin-bottom` da `.vision-closing`:**
```css
.vision-closing {
  text-align: center;
  font-weight: 600;
  color: #F7931A; /* Mudar para ciano escuro */
  margin-top: 40px;
  margin-bottom: 20px; /* De 40px para 20px */
  font-size: 18px;
}
```

**B. Reduzir `margin-top` do `.footer`:**
```css
.footer {
  background: var(--surface-inverse);
  color: var(--foreground-inverse);
  padding: 32px 32px;
  margin-top: 16px; /* De 32px para 16px */
}
```

### 2.2 Mudar Cor para Ciano Escuro

**Ciano escuro** (dark cyan) - opções:
- `#008B8B` (Dark Cyan padrão)
- `#006064` (Dark Teal - mais escuro)
- `#004D40` (Material Design Dark Green - tons de ciano)

**Escolha sugerida:** `#006064` (Dark Teal) - combina com o tema escuro do site.

**CSS atualizado:**
```css
.vision-closing {
  text-align: center;
  font-weight: 600;
  color: #006064; /* Ciano escuro - Dark Teal */
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 18px;
}
```

---

## 3. Resumo das Alterações

| Arquivo | Propriedade | Atual | Novo |
|---------|------------|-------|------|
| `globals.css` linha 251 | `.vision-closing { color }` | `#F7931A` (laranja) | `#006064` (ciano escuro) |
| `globals.css` linha 253 | `.vision-closing { margin-bottom }` | `40px` | `20px` |
| `globals.css` linha 808 | `.footer { margin-top }` | `32px` | `16px` |

---

## 4. Estrutura Visual Esperada

```
[Slideshow - 400px]
       ↓ (sem gap)
[Frase: "Segurança não precisa ser difícil..."]
       ↓ (20px - reduzido de 40px)
[Footer padding-top: 32px]
       ↓ (16px - reduzido de 32px)
[Conteúdo do Footer]
```

**Redução total de espaço:** 
- Antes: 40px (margin-bottom) + 32px (footer margin-top) = 72px
- Depois: 20px + 16px = 36px
- **Economia de 50% do espaço vertical**

---

## 5. Verificação

1. `npm run build` - sem erros
2. Verificar visualmente se o espaço diminuiu
3. Confirmar se a cor está em ciano escuro (#006064)
4. Garantir que a frase ainda está centralizada (text-align: center)
5. Testar em diferentes resoluções (mobile/desktop)

---

## 6. Notas

- A cor `#006064` é um ciano escuro que combina com fundos escuros
- Se preferir um ciano mais azulado: `#01579B` (Dark Blue)
- Se preferir um ciano mais verdoso: `#004D40` (Dark Green)
- O importante é manter contraste suficiente com o fundo (que é claro, `--surface-primary: #FCFAF7`)
