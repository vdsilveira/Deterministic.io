# Deterministic.Online - Documentação em Português

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
1. Faça download do executável offline em **[Deterministic.exec Releases](https://github.com/vdsilveira/Deterministic.exec/releases)**
2. Execute em uma máquina air-gapped
3. Gere chaves sem exposição à internet

---

## 🔒 Guia de Operação Air-Gapped

### O que é uma Máquina Air-Gapped?
Uma máquina air-gapped é um computador que **nunca foi conectado à internet** (sem WiFi, sem Ethernet, sem Bluetooth). Isso fornece máxima segurança para geração de chaves.

### Guia Passo a Passo

#### 1. Prepare a Máquina Offline
- Use um laptop antigo ou dispositivo dedicado
- **Formate o disco** e instale um sistema operacional fresco (Ubuntu, Windows, macOS)
- **Nunca conecte à internet** após a configuração
- Considere usar um [Tails OS](https://tails.net) live USB para máxima segurança

#### 2. Transfira o Executável
Na sua máquina online:
1. Baixe o executável apropriado da **[Deterministic.exec Releases](https://github.com/vdsilveira/Deterministic.exec/releases)**
2. Verifique o checksum SHA256 (fornecido nas notas da release)
3. Transfira via **pen drive** para a máquina air-gapped

#### 3. Execute na Máquina Air-Gapped

**Linux:**
```bash
# Debian/Ubuntu
sudo dpkg -i Deterministic.exec_1.0.0_amd64.deb

# Fedora/RHEL
sudo rpm -ivh Deterministic.exec-1.0.0-1.x86_64.rpm

# AppImage (qualquer Linux)
chmod +x Deterministic.exec_1.0.0_amd64.AppImage
./Deterministic.exec_1.0.0_amd64.AppImage
```

**Windows:**
```bash
# Execute o instalador
Deterministic.exec_1.0.0_x64-setup.exe

# Ou use o .msi standalone
msiexec /i Deterministic.exec_1.0.0_x64_en-US.msi
```

**macOS:**
```bash
# Monte e arraste para Aplicativos
open Deterministic.exec_1.0.0_aarch64.dmg

# Ou extraia o tarball
tar -xzf Deterministic.exec.app.tar.gz
```

#### 4. Gere Chaves Offline
1. Desconecte todas as conexões de rede (WiFi/Ethernet)
2. Abra o aplicativo Deterministic.exec
3. Preencha seus insumos de entropia (texto ou arquivos)
4. Clique em "GERAR CHAVES"
5. **Seus arquivos de entrada SÃO sua semente** - mantenha-os seguros e inalterados!
6. Copie endereços se necessário (para um USB, não via rede)

#### 5. Verifique na Máquina Online (Opcional)
- Você pode verificar endereços no [mempool.space](https://mempool.space) ou [blockchain.info](https://blockchain.info)
- **Nunca** digite sua seed phrase ou chave privada em qualquer dispositivo online!

### Checklist de Segurança
- ✅ Máquina nunca conectada à internet
- ✅ Checksum do executável verificado
- ✅ Arquivos de entrada originais com backup em múltiplos locais seguros
- ✅ Arquivos originais nunca modificados (até re-salvar muda o hash)
- ✅ Recuperação testada regenerando com os mesmos arquivos
- ✅ Lembre-se: seus arquivos SÃO a semente!

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

5. **Armazene Seus Arquivos de Entrada com Segurança**
   - **Seus arquivos de entrada SÃO sua semente** - mantenha-os seguros e inalterados!
   - Faça múltiplos backups em locais diferentes
   - Nunca modifique os arquivos originais (até re-salvar muda o hash)
   - Teste a recuperação regenerando as chaves com os mesmos insumos

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
1. Faça download dos executáveis offline na **[página de releases](https://github.com/vdsilveira/Deterministic.exec/releases)**
2. Transfira para uma máquina air-gapped (USB)
3. Execute o arquivo para sua plataforma
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
- **GitHub**: [github.com/vdsilveira/Deterministic.Online](https://github.com/vdsilveira/Deterministic.Online)
- **Executáveis Offline**: [Deterministic.exec Releases](https://github.com/vdsilveira/Deterministic.exec/releases)

---

## ⚡ Powered By

- [Next.js](https://nextjs.org/)
- [BLAKE3](https://github.com/BLAKE3-team/BLAKE3)
- [Noble Cryptography](https://paulmillr.com/noble/)

---

### Feito com ❤️ para a comunidade Bitcoin
