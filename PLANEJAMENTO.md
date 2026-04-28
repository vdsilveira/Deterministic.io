# Planejamento: Site de Geração de Chaves Bitcoin

## 1. Visão Geral

- **Objetivo:** Site estático (frontend-only) para gerar frases seed, endereços Bitcoin e chaves privadas a partir de texto/arquivos
- **Segurança:** Todo processamento no navegador - nenhum dado sai do servidor
- **Stack:** Next.js 14+ (App Router) + TypeScript

---

## 2. Funcionalidades

### Inputs
- Campo de texto para digitação livre
- Upload de arquivo (qualquer tipo)

### Processo
1. Ler input (texto ou arquivo)
2. Hash BLAKE3 (512 bits)
3. Derivar 12 palavras BIP39
4. Validar mnemônico
5. Gerar seed (PBKDF2)
6. Derivar BIP84, BIP49, BIP86

### Output
- Seed Frase (12 palavras)
- Endereço Native SegWit (BIP84): bc1q...
- Endereço Nested SegWit (BIP49): 3...
- Endereço Taproot (BIP86): bc1p...
- Chave Privada (WIF) para cada tipo

---

## 3. Derivation Paths

| Tipo | BIP | Path | Endereço |
|------|-----|------|----------|
| Native SegWit | BIP84 | m/84'/0'/0'/0/0 | bc1q... |
| Nested SegWit | BIP49 | m/49'/0'/0'/0/0 | 3... |
| Taproot | BIP86 | m/86'/0'/0'/0/0 | bc1p... |

---

## 4. Bibliotecas

```json
{
  "@noble/hashes": "^1.4.0",
  "@noble/secp256k1": "^2.1.0",
  "@scure/bip39": "^1.4.0",
  "@scure/bip32": "^1.3.0"
}
```

---

## 5. Estrutura de Pastas

```
site/
├── src/
│   ├── app/
│   │   ├── page.tsx       # Página principal
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── InputTexto.tsx
│   │   ├── InputArquivo.tsx
│   │   ├── Resultado.tsx
│   │   └── Aviso.tsx
│   └── lib/
│       ├── bitcoin.ts     # Derivação BIP84/49/86
│       └── blake3.ts     # Hash BLAKE3
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 6. UI Layout

```
┌─────────────────────────────────────────┐
│  [ Input de Texto ]                     │
│  ou                                     │
│  [ Upload de Arquivo ]                  │
│                                         │
│  [ Gerar ]                              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Seed Frase: word1 word2 ... word12    │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │ BIP84  │ │ BIP49  │ │ BIP86  │    │
│  └─────────┘ └─────────┘ └─────────┘    │
│  Endereço: bc1q...                      │
│  Chave WIF: L1a...                      │
└─────────────────────────────────────────┘
```

---

## 7. Segurança

- Client-side only
- HTTPS obrigatório
- CSP headers
- Avisos claros sobre riscos
- No cache

---

## 8. Cronograma

1. Setup Next.js + dependências
2. Implementar lógica hashing/derivação
3. Criar componentes de input
4. Criar componente de resultados
5. Aplicar estilos
6. Testar
7. Deploy

---

*Planejamento criado em: 2026-04-28*
