# AGENTS.md - BTC Key Generator

## Comandos Essenciais

```bash
# Desenvolvimento
cd site && npm run dev

# Build estático
cd site && npm run build
# Output em site/out/

# Teste (requer servidor rodando)
cd site && node test-playwright.js
```

## Estrutura do Projeto

```
site/
├── src/
│   ├── app/
│   │   └── page.tsx      # Página principal com 11 campos
│   └── lib/
│       ├── blake3.ts    # Hash BLAKE3
│       ├── bip39.ts    # Derivação BIP39
│       └── bitcoin.ts  # Geração endereços
├── out/               # Build estático
└── opencode.json       # Configuração MCP
```

## Entrypoint

- `src/app/page.tsx` - Componente React principal
- `src/lib/bip39.ts` - Lógica de processamento de 11 inputs

## Build

- Sempre rode `npm run build` antes de entregar
- Output gera em `site/out/`
- Deploy: qualquer servidor estático (Vercel, Netlify, etc)

## Regras

- Client-side only - sem dados sensíveis para servidores
- 11 campos obrigatórios (texto ou arquivo)
- Same-origin derivation: hashTRansform.js logic
- NUNCA rodar comandos de build sem autorização explícita do usuário

## MCPs Ativos

- `context7` - Análise de código
- `playwright` - Testes de browser