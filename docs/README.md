# Deterministic.Online - Documentation

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
1. Download the offline executable from **[Deterministic.exec Releases](https://github.com/vdsilveira/Deterministic.exec/releases)**
2. Run on an air-gapped machine
3. Generate keys without internet exposure

---

## 🔒 Air-Gapped Operation Guide

### What is an Air-Gapped Machine?
An air-gapped machine is a computer that has **never been connected to the internet** (no WiFi, no Ethernet, no Bluetooth). This provides maximum security for key generation.

### Step-by-Step Guide

#### 1. Prepare the Offline Machine
- Use an old laptop or dedicated device
- **Format the disk** and install a fresh OS (Ubuntu, Windows, macOS)
- **Never connect it to the internet** after setup
- Consider using a [Tails OS](https://tails.net) live USB for maximum security

#### 2. Transfer the Executable
On your online machine:
1. Download the appropriate executable from **[Deterministic.exec Releases](https://github.com/vdsilveira/Deterministic.exec/releases)**
2. Verify the SHA256 checksum (provided in the release notes)
3. Transfer via **USB drive** to the air-gapped machine

#### 3. Run on Air-Gapped Machine

**Linux:**
```bash
# Debian/Ubuntu
sudo dpkg -i Deterministic.exec_1.0.0_amd64.deb

# Fedora/RHEL
sudo rpm -ivh Deterministic.exec-1.0.0-1.x86_64.rpm

# AppImage (any Linux)
chmod +x Deterministic.exec_1.0.0_amd64.AppImage
./Deterministic.exec_1.0.0_amd64.AppImage
```

**Windows:**
```bash
# Run the installer
Deterministic.exec_1.0.0_x64-setup.exe

# Or use the standalone .msi
msiexec /i Deterministic.exec_1.0.0_x64_en-US.msi
```

**macOS:**
```bash
# Mount and drag to Applications
open Deterministic.exec_1.0.0_aarch64.dmg

# Or extract the tarball
tar -xzf Deterministic.exec.app.tar.gz
```

#### 4. Generate Keys Offline
1. Disconnect all network connections (WiFi/Ethernet)
2. Launch the Deterministic.exec application
3. Fill in your entropy inputs (text or files)
4. Click "GENERATE KEYS"
5. **Your input files ARE your seed** - keep them safe and unmodified!
6. Copy addresses if needed (to a USB, not over network)

#### 5. Verify on Online Machine (Optional)
- You can verify addresses on [mempool.space](https://mempool.space) or [blockchain.info](https://blockchain.info)
- **Never** enter your seed phrase or private key on any online device!

### Security Checklist
- ✅ Machine never connected to internet
- ✅ Executable checksum verified
- ✅ Original input files backed up in multiple secure locations
- ✅ Original files never modified (even re-saving changes the hash)
- ✅ Recovery tested by regenerating with same files
- ✅ Remember: your files ARE the seed!

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

5. **Store Your Input Files Safely**
   - **Your input files ARE your seed** - keep them safe and unmodified!
   - Make multiple backups in different secure locations
   - Never modify the original files (even re-saving changes the hash)
   - Test recovery by regenerating keys with the same files

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
1. Download the offline executables from the **[releases page](https://github.com/vdsilveira/Deterministic.exec/releases)**
2. Transfer to an air-gapped machine (USB)
3. Run the executable for your platform
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
- **Offline Executables**: [Deterministic.exec Releases](https://github.com/vdsilveira/Deterministic.exec/releases)

---

## ⚡ Powered By

- [Next.js](https://nextjs.org/)
- [BLAKE3](https://github.com/BLAKE3-team/BLAKE3)
- [Noble Cryptography](https://paulmillr.com/noble/)

---

### Built with ❤️ for the Bitcoin community
