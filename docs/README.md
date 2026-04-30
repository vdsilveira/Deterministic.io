# Deterministic.Online

> Generate Bitcoin wallets from customizable entropy sources. Unlike standard BIP39, **YOU** choose your inputs.

[![GitHub stars](https://img.shields.io/github/stars/vdsilveira/Deterministic.Online?style=social)](https://github.com/vdsilveira/Deterministic.Online)
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://deterministic.online)
[![License](https://img.shields.io/github/license/vdsilveira/Deterministic.Online)](LICENSE)

---

## 🎯 What is Deterministic.Online?

Deterministic.Online is a **client-side Bitcoin key generator** that creates deterministic wallets from up to 11 customizable inputs (text or files). Built with Next.js and powered by BLAKE3 hashing, it gives you full control over your entropy sources.

### Key Features

- ✅ **Deterministic**: Same inputs always produce the same Bitcoin keys
- ✅ **Flexible Inputs**: 4-11 fields (text or files)
- ✅ **Client-Side Only**: No data ever leaves your browser
- ✅ **Multi-Address Support**: BIP84 (Native SegWit), BIP49 (Nested SegWit), BIP86 (Taproot)
- ✅ **Offline Capable**: Full static export for air-gapped machines
- ✅ **Bilingual**: English & Português (pt-BR)
- ✅ **BLAKE3 Powered**: Modern, fast cryptographic hashing

---

## 🚀 Quick Start

### Online (Recommended)
1. Visit **[deterministic.online](https://deterministic.online)**
2. Click **"Get Started"** or **"Começar"**
3. Fill at least **4 fields** (text or file uploads)
4. Click **"GENERATE KEYS"**
5. Copy your seed phrase, addresses, and WIF key

### Offline (Maximum Security)
1. Download the offline executable from **[/download](https://deterministic.online/download)**
2. Run on an air-gapped machine
3. Generate keys without internet exposure

---

## 📖 User Guide

### Understanding the Input System

Deterministic.Online uses **up to 11 input fields** to create your Bitcoin seed phrase.

#### Minimum Requirements
- **At least 4 fields** must be filled
- Fields 1-4 are the primary entropy sources
- Fields 5-11 are optional but increase security

#### Input Types

| Type | Description | Example |
|------|-------------|---------|
| **Text** | Any string you type | `"My secret phrase 123"` |
| **File** | Any file (images, documents, ZIPs) | `photo.jpg`, `backup.txt` |

#### How Empty Fields Are Derived

If you fill only 4 fields, fields 5-11 are **automatically derived** from the first 4:

| Empty Field | Derives From | Index Suffix |
|-------------|--------------|--------------|
| Field 5 | Input 1 | `+ "5"` |
| Field 6 | Input 2 | `+ "6"` |
| Field 7 | Input 3 | `+ "7"` |
| Field 8 | Input 4 | `+ "8"` |
| Field 9 | Input 1 | `+ "9"` |
| Field 10 | Input 2 | `+ "10"` |
| Field 11 | Input 3 | `+ "11"` |

> 💡 **Tip**: The more unique fields you fill, the more secure your seed will be!

---

### Step-by-Step: Generating Your Keys

1. **Access the Generate Page**
   - Click "Get Started" from the homepage
   - Or navigate directly to `/generate`

2. **Fill the Input Fields**
   - Type text in any field, OR
   - Click 📁 to upload a file
   - Fill at least **4 fields** (counter shows `4/11` in black when ready)

3. **Generate Keys**
   - Click the **"GENERATE KEYS"** button
   - Wait for processing (happens entirely in your browser)

4. **Copy Your Outputs**
   - **Seed Phrase** (12 words): The master key for your wallet
   - **BIP84 Address** (bc1q...): Native SegWit address
   - **BIP49 Address** (3...): Nested SegWit address  
   - **BIP86 Address** (bc1p...): Taproot address
   - **Private Key (WIF)**: Import format for wallet software

5. **Store Safely**
   - Write down seed phrase on paper (never digital!)
   - If using files, **keep originals unchanged**

---

### Understanding Your Outputs

#### Seed Phrase (12 Words)
The foundation of your wallet. Derived from your inputs using:
1. BLAKE3 hashing of each input (with index suffixes for empty fields)
2. Mapping hashes to BIP39 wordlist (2048 words)
3. Calculating 12th word as checksum

#### Bitcoin Addresses

| Type | Format | Purpose |
|------|--------|---------|
| **BIP84** | `bc1q...` | Native SegWit (bech32) - recommended |
| **BIP49** | `3...` | Nested SegWit (P2SH wrapped) - compatibility |
| **BIP86** | `bc1p...` | Taproot (bech32m) - newest standard |

#### WIF Private Key
Wallet Import Format - lets you import your private key into most Bitcoin wallets.

---

## 🔐 Security Model

### Client-Side Only
- ✅ **No servers**: All processing happens in your browser
- ✅ **No tracking**: No cookies, no analytics, no data collection
- ✅ **Open source**: Full code available on [GitHub](https://github.com/vdsilveira/Deterministic.Online)

### File-Based Entropy Warning

> ⚠️ **CRITICAL WARNING**: If you use files as entropy sources, you **MUST** keep the original files saved. Due to the nature of hash cryptography, **any modification** to the files will directly impact the deterministic key generation. Additionally, the **order** in which files are passed in the up to 11 fields must be **strictly maintained**.

**Best Practices:**
- Use files you already backup naturally (photos, documents)
- Store files in multiple locations
- Never modify the original files
- Test recovery before moving funds

### Offline Operation
1. Download the static export from `/download`
2. Transfer to an air-gapped machine (USB)
3. Open `index.html` in any browser
4. Generate keys with zero internet exposure

---

## 🏗️ Technical Architecture

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | Next.js (App Router) | 14.2.3 |
| **Language** | TypeScript | 5.4.5 |
| **UI** | React | 18.3.1 |
| **Hashing** | BLAKE3 (@noble/hashes) | ^1.4.0 |
| **BIP39** | @scure/bip39 | ^1.4.0 |
| **BIP32** | @scure/bip32 | ^1.3.0 |
| **Elliptic Curve** | @noble/secp256k1 | ^2.1.0 |

### How It Works (Technical Flow)

```
USER INPUTS
───────────────────────────────────────────────────
Field 1: "text" │ Field 2: "file.jpg" │ ... │ Field 11
        │
        ▼
BLAKE3 HASHING (64 bytes)
───────────────────────────────────────────────────
• Text: UTF-8 encode → BLAKE3
• File: Base64 → decode → bytes → BLAKE3
• Empty fields: derive from first 4 + index suffix
        │
        ▼
BIP39 WORD MAPPING
───────────────────────────────────────────────────
hash % 2048 → word index → 11 words
+ Checksum calculation → 12th word
        │
        ▼
SEED GENERATION
───────────────────────────────────────────────────
PBKDF2 (2048 iterations) → 64-byte seed
        │
        ▼
KEY DERIVATION
───────────────────────────────────────────────────
BIP84: m/84'/0'/0'/0/0 → bc1q... (Native SegWit)
BIP49: m/49'/0'/0'/0/0 → 3... (Nested SegWit)
BIP86: m/86'/0'/0'/0/0 → bc1p... (Taproot)
```

### Key Files

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

**Key Point**: The `suffix` (field number) is concatenated **BEFORE** hashing for derived fields.

#### `/src/lib/bip39.ts`
Handles:
- Processing 11 inputs
- Deriving empty fields using `getSourceInput()` mapping
- Generating 11 words from BLAKE3 hashes
- Calculating 12th word (checksum) via valid mnemonic search

#### `/src/lib/bitcoin.ts`
Implements:
- `mnemonicToSeed()`: PBKDF2 with 2048 iterations
- `deriveKeyPair()`: BIP32 → private/public keys → addresses
- Custom Base58Check, Bech32, Bech32m encoding

### Project Structure

```
site/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (hero + slideshow)
│   │   ├── generate/
│   │   │   └── page.tsx         # Main key generation UI (315 lines)
│   │   ├── download/
│   │   │   └── page.tsx         # Offline executable download
│   │   ├── layout.tsx           # Root layout + LanguageProvider
│   │   ├── globals.css          # Complete stylesheet (977 lines)
│   │   └── page.module.css     # Homepage styles
│   ├── lib/
│   │   ├── blake3.ts            # BLAKE3 hashing (25 lines)
│   │   ├── bip39.ts             # BIP39 mnemonic generation (91 lines)
│   │   └── bitcoin.ts           # Key derivation (223 lines)
│   ├── components/
│   │   └── Footer.tsx           # Footer with donations
│   └── context/
│       └── LanguageContext.tsx   # i18n (en/pt-BR)
├── public/
│   ├── images/                  # Logos, carousel SVGs
│   └── favicon.ico
├── Deterministic.exec/          # Git submodule (offline executables)
├── hashTransform.js             # Original Node.js implementation
├── test-playwright.js           # E2E tests
├── next.config.js               # Static export config
├── package.json
└── tsconfig.json
```

---

## 🛠️ Developer Guide

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vdsilveira/Deterministic.Online.git
cd Deterministic.Online

# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:3000
```

### Build for Production

```bash
# Create static export
npm run build

# Output is in /out/ directory
ls out/
# index.html  generate/  download/  _next/  images/
```

### Deploy
Since the output is static, you can deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `/out/` folder
- **GitHub Pages**: Push `/out/` to `gh-pages` branch
- **Any web server**: Copy `/out/` to web root

### Testing

```bash
# Start dev server first
npm run dev

# In another terminal, run Playwright tests
node test-playwright.js

# Tests cover:
# - Homepage elements
# - Navigation to /generate
# - Filling 11 fields
# - Key generation
# - Output verification
```

---

## 📚 API Reference

### `src/lib/bip39.ts`

#### `processInputs(inputs: InputData[]): ProcessedInputs`
Processes up to 11 inputs and generates a 12-word BIP39 seed phrase.

**Parameters:**
```typescript
interface InputData {
  content: string;      // Text content or base64 file data
  isBase64: boolean;    // true if content is base64 file data
}

interface ProcessedInputs {
  inputs: InputData[];
  words: string[];      // 12 BIP39 words
  seedPhrase: string;   // Space-separated words
}
```

**Behavior:**
- First 4 inputs are required (minimum)
- Empty fields 5-11 derive from first 4 + index suffix
- 12th word is calculated as checksum

---

### `src/lib/blake3.ts`

#### `generateBlake3Hash(input: string, isBase64: boolean, suffix?: string): string`
Generates a 512-bit (64-byte) BLAKE3 hash.

**Parameters:**
- `input`: Text string or base64 file data
- `isBase64`: Set `true` for file data (decodes before hashing)
- `suffix`: Optional string appended BEFORE hashing (used for field derivation)

**Returns:** Hex string (128 characters = 64 bytes)

---

### `src/lib/bitcoin.ts`

#### `mnemonicToSeed(mnemonic: string): Promise<Uint8Array>`
Derives a 64-byte seed from BIP39 mnemonic using PBKDF2.

#### `deriveKeyPair(seed: Uint8Array, path: string): { address: string; wif: string }`
Derives Bitcoin key pair for a given BIP32 path.

**Supported paths:**
- `"m/84'/0'/0'/0/0"` → BIP84 (Native SegWit)
- `"m/49'/0'/0'/0/0"` → BIP49 (Nested SegWit)
- `"m/86'/0'/0'/0/0"` → BIP86 (Taproot)

---

## ❓ FAQ

### What is the minimum number of fields I need to fill?
**4 fields** (any combination of text or files).

### Can I use any type of file?
Yes! Images, documents, PDFs, ZIPs, videos — any file works. The entire file is converted to base64 and hashed.

### What happens if I lose a file I used?
If you lose a file, you **cannot recover** your wallet. Always keep backups of files used as entropy.

### Can I modify the files after generating keys?
**No!** Any modification (even re-saving) changes the file hash, breaking recovery. Keep the **exact** original files.

### Is this safe to use online?
Yes, but for maximum security, download the offline version and run on an air-gapped machine.

### Does this send my data to a server?
**Never.** All processing happens client-side in your browser. No network requests are made.

### Can I use this with hardware wallets?
You can import the WIF private key into compatible wallet software, but this tool doesn't directly integrate with hardware wallets.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Keep it client-side only
- Maintain bilingual support (en/pt-BR)
- Test thoroughly with `node test-playwright.js`
- Update documentation when adding features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💰 Donations

Support the project:

**Bitcoin (On-chain):**
`1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`

**Lightning Network:**
`lightning:test@deterministic.online`

---

## 🔗 Links

- **Live Site**: [deterministic.online](https://deterministic.online)
- **GitHub**: [github.com/vdsilveira/Deterministic.Online](https://github.com/vdsilveira/Deterministic.Online)
- **Offline Executables**: [Deterministic.exec](https://github.com/vdsilveira/Deterministic.exec)
- **Original Node.js Version**: See `hashTransform.js` in repo root

---

## ⚡ Powered By

- [Next.js](https://nextjs.org/)
- [BLAKE3](https://github.com/BLAKE3-team/BLAKE3)
- [Noble Cryptography](https://paulmillr.com/noble/)
- [GitBook](https://gitbook.com/) (for documentation)

---
### Built with ❤️ for the Bitcoin community

