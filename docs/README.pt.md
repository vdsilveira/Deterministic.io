# Deterministic.Online

> Gere carteiras Bitcoin a partir de fontes de entropia customizáveis. Diferente do padrão BIP39, **VOCÊ** escolhe seus insumos.

[![GitHub stars](https://img.shields.io/github/stars/vdsilveira/Deterministic.Online?style=social)](https://github.com/vdsilveira/Deterministic.Online)
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://deterministic.online)
[![License](https://img.shields.io/github/license/vdsilveira/Deterministic.Online)](LICENSE)

---

## 🎯 O que é o Deterministic.Online?

O Deterministic.Online é um **gerador de chaves Bitcoin client-side** que cria carteiras determinísticas a partir de até 11 insumos customizáveis (texto ou arquivos). Construído com Next.js e alimentado por hashing BLAKE3, ele dá a você controle total sobre suas fontes de entropia.

### Principais Funcionalidades

- ✅ **Determinístico**: Mesmos insumos sempre produzem as mesmas chaves Bitcoin
- ✅ **Insumos Flexíveis**: 4-11 campos (texto ou arquivos)
- ✅ **Apenas Client-Side**: Nenhum dado sai do seu navegador
- ✅ **Suporte Multi-Endereço**: BIP84 (Native SegWit), BIP49 (Nested SegWit), BIP86 (Taproot)
- ✅ **Capaz Offline**: Exportação estática completa para máquinas air-gapped
- ✅ **Bilingue**: English & Português (pt-BR)
- ✅ **Powered by BLAKE3**: Hashing criptográfico moderno e rápido

---

## 🚀 Começo Rápido

### Online (Recomendado)
1. Visite **[deterministic.online](https://deterministic.online)**
2. Clique em **"Começar"** ou **"Get Started"**
3. Preencha pelo menos **4 campos** (texto ou upload de arquivos)
4. Clique em **"GERAR CHAVES"**
5. Copie sua seed phrase, endereços e chave WIF

### Offline (Segurança Máxima)
1. Faça download do executável offline em **[/download](https://deterministic.online/download)**
2. Execute em uma máquina air-gapped
3. Gere chaves sem exposição à internet

---

## 📖 Guia do Usuário

### Entendendo o Sistema de Insumos

O Deterministic.Online usa **até 11 campos de insumos** para criar sua seed phrase Bitcoin.

#### Requisitos Mínimos
- **Pelo menos 4 campos** devem ser preenchidos
- Campos 1-4 são as fontes de entropia primárias
- Campos 5-11 são opcionais mas aumentam a segurança

#### Tipos de Insumo

| Tipo | Descrição | Exemplo |
|------|-------------|---------|
| **Texto** | Qualquer string que você digitar | `"Minha frase secreta 123"` |
| **Arquivo** | Qualquer arquivo (imagens, documentos, ZIPs) | `foto.jpg`, `backup.txt` |

#### Como Campos Vazios São Derivados

Se você preencher apenas 4 campos, os campos 5-11 são **automaticamente derivados** dos primeiros 4:

| Campo Vazio | Deriva De | Sufixo do Índice |
|-------------|--------------|--------------|
| Campo 5 | Insumo 1 | `+ "5"` |
| Campo 6 | Insumo 2 | `+ "6"` |
| Campo 7 | Insumo 3 | `+ "7"` |
| Campo 8 | Insumo 4 | `+ "8"` |
| Campo 9 | Insumo 1 | `+ "9"` |
| Campo 10 | Insumo 2 | `+ "10"` |
| Campo 11 | Insumo 3 | `+ "11"` |

> 💡 **Dica**: Quanto mais campos únicos você preencher, mais segura será sua seed!

---

### Passo a Passo: Gerando Suas Chaves

1. **Acesse a Página de Geração**
   - Clique em "Começar" na página inicial
   - Ou navegue diretamente para `/generate`

2. **Preencha os Campos de Insumo**
   - Digite texto em qualquer campo, OU
   - Clique em 📁 para fazer upload de um arquivo
   - Preencha pelo menos **4 campos** (o contador mostra `4/11` em preto quando pronto)

3. **Gere as Chaves**
   - Clique no botão **"GERAR CHAVES"**
   - Aguarde o processamento (ocorre inteiramente no seu navegador)

4. **Copie Suas Saídas**
   - **Seed Phrase** (12 palavras): A chave mestra da sua carteira
   - **Endereço BIP84** (bc1q...): Endereço Native SegWit
   - **Endereço BIP49** (3...): Endereço Nested SegWit  
   - **Endereço BIP86** (bc1p...): Endereço Taproot
   - **Chave Privada (WIF)**: Formato de importação para software de carteira

5. **Armazene com Segurança**
   - Anote a seed phrase em papel (nunca digital!)
   - Se usando arquivos, **mantenha os originais inalterados**

---

### Entendendo Suas Saídas

#### Seed Phrase (12 Palavras)
A fundação da sua carteira. Derivada dos seus insumos usando:
1. Hashing BLAKE3 de cada insumo (com sufixos de índice para campos vazios)
2. Mapeamento de hashes para lista de palavras BIP39 (2048 palavras)
3. Cálculo da 12ª palavra como checksum

#### Endereços Bitcoin

| Tipo | Formato | Propósito |
|------|---------|---------|
| **BIP84** | `bc1q...` | Native SegWit (bech32) - recomendado |
| **BIP49** | `3...` | Nested SegWit (P2SH wrapped) - compatibilidade |
| **BIP86** | `bc1p...` | Taproot (bech32m) - padrão mais recente |

#### Chave Privada WIF
Wallet Import Format - permite importar sua chave privada na maioria das carteiras Bitcoin.

---

## 🔐 Modelo de Segurança

### Apenas Client-Side
- ✅ **Sem servidores**: Todo processamento ocorre no seu navegador
- ✅ **Sem rastreamento**: Sem cookies, sem analytics, sem coleta de dados
- ✅ **Open source**: Código completo disponível no [GitHub](https://github.com/vdsilveira/Deterministic.Online)

### Aviso Importante sobre Entropia Baseada em Arquivos

> ⚠️ **AVISO CRÍTICO**: Se você usar arquivos como fontes de entropia, você **DEVE** manter os arquivos originais salvos. Devido à natureza da criptografia de hash, **qualquer modificação** nos arquivos impactará diretamente na geração determinística das chaves. Além disso, a **ordem** em que os arquivos são passados nos até 11 campos deve ser **estritamente mantida**.

**Melhores Práticas:**
- Use arquivos que você já faz backup naturalmente (fotos, documentos)
- Armazene arquivos em múltiplos locais
- Nunca modifique os arquivos originais
- Teste a recuperação antes de mover fundos

### Operação Offline
1. Faça download do export estático em `/download`
2. Transfira para uma máquina air-gapped (USB)
3. Abra `index.html` em qualquer navegador
4. Gere chaves com zero exposição à internet

---

## 🏗️ Arquitetura Técnica

### Stack de Tecnologias

| Componente | Tecnologia | Versão |
|-----------|------------|---------|
| **Framework** | Next.js (App Router) | 14.2.3 |
| **Linguagem** | TypeScript | 5.4.5 |
| **UI** | React | 18.3.1 |
| **Hashing** | BLAKE3 (@noble/hashes) | ^1.4.0 |
| **BIP39** | @scure/bip39 | ^1.4.0 |
| **BIP32** | @scure/bip32 | ^1.3.0 |
| **Curva Elíptica** | @noble/secp256k1 | ^2.1.0 |

### Como Funciona (Fluxo Técnico)

```
INSUMOS DO USUÁRIO
───────────────────────────────────────────────────
Campo 1: "texto" │ Campo 2: "arquivo.jpg" │ ... │ Campo 11
        │
        ▼
HASHING BLAKE3 (64 bytes)
───────────────────────────────────────────────────
• Texto: UTF-8 encode → BLAKE3
• Arquivo: Base64 → decode → bytes → BLAKE3
• Campos vazios: derivar dos primeiros 4 + sufixo
        │
        ▼
MAPEAMENTO PARA PALAVRAS BIP39
───────────────────────────────────────────────────
hash % 2048 → índice da palavra → 11 palavras
+ Cálculo de checksum → 12ª palavra
        │
        ▼
GERAÇÃO DA SEED
───────────────────────────────────────────────────
PBKDF2 (2048 iterações) → seed de 64 bytes
        │
        ▼
DERIVAÇÃO DE CHAVES
───────────────────────────────────────────────────
BIP84: m/84'/0'/0'/0/0 → bc1q... (Native SegWit)
BIP49: m/49'/0'/0'/0/0 → 3... (Nested SegWit)
BIP86: m/86'/0'/0'/0/0 → bc1p... (Taproot)
```

### Arquivos Principais

#### `/src/lib/blake3.ts`
```typescript
export function generateBlake3Hash(
  input: string, 
  isBase64: boolean, 
  suffix?: string
): string {
  const fullInput = suffix ? input + suffix : input;
  
  const data = isBase64 
    ? Uint8Array.from(atob(base64), c => c.charCodeAt(0))
    : new TextEncoder().encode(fullInput);
    
  return blake3(data, { dkLen: 64 }); // 512-bit output
}
```

**Ponto Chave**: O `suffix` (número do campo) é concatenado **ANTES** do hashing para campos derivados.

#### `/src/lib/bip39.ts`
Gerencia:
- Processamento de 11 insumos
- Derivação de campos vazios usando mapeamento `getSourceInput()`
- Geração de 11 palavras a partir de hashes BLAKE3
- Cálculo da 12ª palavra (checksum) via busca de mnemônico válido

#### `/src/lib/bitcoin.ts`
Implementa:
- `mnemonicToSeed()`: PBKDF2 com 2048 iterações
- `deriveKeyPair()`: BIP32 → chaves privado/público → endereços
- Codificação customizada Base58Check, Bech32, Bech32m

### Estrutura do Projeto

```
site/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (hero + slideshow)
│   │   ├── generate/
│   │   │   └── page.tsx         # UI principal de geração (315 linhas)
│   │   ├── download/
│   │   │   └── page.tsx         # Download executável offline
│   │   ├── layout.tsx           # Root layout + LanguageProvider
│   │   ├── globals.css          # Stylesheet completo (977 linhas)
│   │   └── page.module.css     # Estilos da homepage
│   ├── lib/
│   │   ├── blake3.ts            # Hashing BLAKE3 (25 linhas)
│   │   ├── bip39.ts             # Geração mnemônica BIP39 (91 linhas)
│   │   └── bitcoin.ts           # Derivação de chaves (223 linhas)
│   ├── components/
│   │   └── Footer.tsx           # Footer com doações
│   └── context/
│       └── LanguageContext.tsx   # i18n (en/pt-BR)
├── public/
│   ├── images/                  # Logos, SVGs do carousel
│   └── favicon.ico
├── Deterministic.exec/          # Submódulo Git (executáveis offline)
├── hashTransform.js             # Implementação Node.js original
├── test-playwright.js           # Testes E2E
├── next.config.js               # Configuração export estático
├── package.json
└── tsconfig.json
```

---

## 🛠️ Guia do Desenvolvedor

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/vdsilveira/Deterministic.Online.git
cd Deterministic.Online

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
# Abre em http://localhost:3000
```

### Build para Produção

```bash
# Crie export estático
npm run build

# A saída está no diretório /out/
ls out/
# index.html  generate/  download/  _next/  images/
```

### Deploy
Como a saída é estática, você pode fazer deploy para:
- **Vercel**: `vercel --prod`
- **Netlify**: Arraste e solte a pasta `/out/`
- **GitPages**:Faça push da pasta `/out/` para o branch `gh-pages`
- **Qualquer servidor web**: Copie `/out/` para a raiz web

### Testes

```bash
# Inicie o servidor de desenvolvimento primeiro
npm run dev

# Em outro terminal, execute os testes Playwright
node test-playwright.js

# Testes cobrem:
# - Elementos da homepage
# - Navegação para /generate
# - Preenchimento de 11 campos
# - Geração de chaves
# - Verificação de saída
```

---

## 📚 Referência da API

### `src/lib/bip39.ts`

#### `processInputs(inputs: InputData[]): ProcessedInputs`
Processa até 11 insumos e gera uma seed phrase BIP39 de 12 palavras.

**Parâmetros:**
```typescript
interface InputData {
  content: string;      // Conteúdo de texto ou dados de arquivo base64
  isBase64: boolean;    // true se conteúdo for dados base64
}

interface ProcessedInputs {
  inputs: InputData[];
  words: string[];      // 12 palavras BIP39
  seedPhrase: string;   // Palavras separadas por espaço
```

**Comportamento:**
- Primeiros 4 insumos são obrigatórios (mínimo)
- Campos vazios 5-11 derivam dos primeiros 4 + sufixo de índice
- 12ª palavra é calculada como checksum

---

### `src/lib/blake3.ts`

#### `generateBlake3Hash(input: string, isBase64: boolean, suffix?: string): string`
Gera um hash BLAKE3 de 512 bits (64 bytes).

**Parâmetros:**
- `input`: String de texto ou dados de arquivo base64
- `isBase64`: Defina `true` para dados de arquivo (decodifica antes de fazer hash)
- `suffix`: String opcional anexada ANTES do hashing (usada para derivação de campos)

**Retorna:** String hex (128 caracteres = 64 bytes)

---

### `src/lib/bitcoin.ts`

#### `mnemonicToSeed(mnemonic: string): Promise<Uint8Array>`
Deriva uma seed de 64 bytes a partir do mnemônico BIP39 usando PBKDF2.

#### `deriveKeyPair(seed: Uint8Array, path: string): { address: string; wif: string }`
Deriva par de chaves Bitcoin para um caminho BIP32 específico.

**Caminhos suportados:**
- `"m/84'/0'/0'/0/0"` → BIP84 (Native SegWit)
- `"m/49'/0'/0'/0/0"` → BIP49 (Nested SegWit)
- `"m/86'/0'/0'/0/0"` → BIP86 (Taproot)

---

## ❓ Perguntas Frequentes

### Qual é o número mínimo de campos que preciso preencher?
**4 campos** (qualquer combinação de texto ou arquivos).

### Posso usar qualquer tipo de arquivo?
Sim! Imagens, documentos, PDFs, ZIPs, vídeos — qualquer arquivo funciona. O arquivo inteiro é convertido para base64 e.hasheado.

### O que acontece se eu perder um arquivo que usei?
Se você perder um arquivo, você **não poderá recuperar** sua carteira. Sempre mantenha backups dos arquivos usados como entropia.

### Posso modificar os arquivos depois de gerar as chaves?
**Não!** Qualquer modificação (até重新 salvar) muda o hash do arquivo, quebrando a recuperação. Mantenha os **exatos** arquivos originais.

### É seguro usar online?
Sim, mas para máxima segurança, baixe a versão offline e execute em uma máquina air-gapped.

### Isso envia meus dados para um servidor?
**Nunca.** Todo processamento ocorre client-side no seu navegador. Nenhuma requisição de rede é feita.

### Posso usar isso com carteiras de hardware?
Você pode importar a chave privada WIF em software de carteira compatível, mas esta ferramenta não se integra diretamente com carteiras de hardware.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie um branch de funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para o branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Guidelines de Desenvolvimento
- Mantenha apenas client-side
- Mantenha suporte bilingue (en/pt-BR)
- Teste completamente com `node test-playwright.js`
- Atualize a documentação ao adicionar funcionalidades

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 💰 Doações

Apoie o projeto:

**Bitcoin (On-chain):**
`1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`

**Lightning Network:**
`lightning:test@deterministic.online`

---

## 🔗 Links

- **Site Live**: [deterministic.online](https://deterministic.online)
- **GitHub**: [github.com/vdsilveira/Deterministic.Online](https://github.com/vdsilveyor/Deterministic.Online)
- **Executáveis Offline**: [Deterministic.exec](https://github.com/vdsilveira/Deterministic.exec)
- **Versão Node.js Original**: Veja `hashTransform.js` na raiz do repositório

---

## ⚡ Powered By

- [Next.js](https://nextjs.org/)
- [BLAKE3](https://github.com/BLAKE3-team/BLAKE3)
- [Noble Cryptography](https://paulmillr.com/n/)

---

### Feito com ❤️ para a comunidade Bitcoin
