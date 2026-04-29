# Plano: Adicionar Lottie GIF no Rodapé

## Objetivo
Adicionar animação Lottie no canto superior direito do rodapé (footer), alinhado com a margem superior.

---

## 1. Instalação da Dependência

```bash
cd /l/disk0/viniciusd/Projetos/Utils/site && npm install @lottiefiles/dotlottie-react
```

---

## 2. Alterações em `src/components/Footer.tsx`

### 2.1 Importações (linha 3-4)
Adicionar:
```javascript
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
```

### 2.2 JSX - Adicionar Lottie no rodapé
Modificar o retorno (após linha 54):
```jsx
return (
  <footer className="footer">
    <div className="footer-content">
      {/* Lottie Animation - Top Right */}
      <div className="footer-lottie">
        <DotLottieReact
          src="https://lottie.host/c3d57b41-1027-4012-b09a-e7ff07580d64/6HkMtjEyi6.lottie"
          loop
          autoplay
          style={{ width: '80px', height: '80px' }}
        />
      </div>
      
      <h2 className="footer-title">{t.title}</h2>
      {/* resto do conteúdo permanece igual */}
```

---

## 3. Alterações em `src/app/globals.css`

Adicionar ao final do arquivo (após linha 950):

```css
/* Footer Lottie */
.footer-content {
  position: relative; /* Necessário para posicionamento absoluto do lottie */
  padding-top: 20px; /* Espaço extra no topo para o lottie */
}

.footer-lottie {
  position: absolute;
  top: 0; /* Encostado na margem superior */
  right: 32px; /* Alinhado à direita, respeitando o padding do footer */
  z-index: 2;
}

.footer-lottie svg {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); /* Sombra opcional para destacar */
}
```

---

## 4. Ajuste no `package.json`

A instalação automática via `npm install` adicionará:
```json
"@lottiefiles/dotlottie-react": "^x.x.x"
```

---

## 5. Estrutura Final do Footer

```
<footer className="footer"> (padding: 32px 32px)
  <div className="footer-content"> (position: relative; padding-top: 20px)
    
    <div className="footer-lottie"> (position: absolute; top: 0; right: 32px)
      <DotLottieReact /> (80x80px)
    </div>
    
    <h2 className="footer-title">Título</h2>
    <p className="footer-subtitle">Subtítulo</p>
    
    <div className="donation-grid">
      <!-- QR Codes e endereços -->
    </div>
    
  </div>
</footer>
```

---

## 6. Comportamento Esperado

1. **Posicionamento:** Lottie fica no canto superior direito, encostado na margem superior (top: 0)
2. **Animação:** Loop automático, tocando desde o carregamento
3. **Tamanho:** 80x80px (proporcional ao footer)
4. **Sobreposição:** `z-index: 2` garante que fique acima do conteúdo
5. **Responsividade:** Em telas menores, pode precisar de ajuste (media query)

---

## 7. Verificação Pós-Implementação

1. `npm run build` - sem erros de compilação
2. `npm run dev` - verificar se Lottie aparece no canto superior direito
3. Animação tocando em loop
4. Verificar se não sobrepõe o texto do título em telas menores
5. Testar PT/EN (Lottie é independente de idioma)

---

## 8. Notas Importantes

- O Lottie usa URL externa (lottie.host) - requer conexão com internet
- Se a animação não carregar, o espaço de 80x80px ficará vazio (sem erro)
- O `footer-content` precisa de `position: relative` para o absoluto funcionar
- `top: 0` garante que fique encostado na margem superior do container
