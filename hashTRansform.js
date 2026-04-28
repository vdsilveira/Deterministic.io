(async () => {
    const { blake3 } = await import('@noble/hashes/blake3.js');
    const bip39 = require('bip39');
    const wordlist = bip39.wordlists.english;
   const ecc = require('tiny-secp256k1');
    const { BIP32Factory } = require('bip32');
    const bip32 = BIP32Factory(ecc);
    const bitcoin = require('bitcoinjs-lib');
    


    /**
     * Gera um hash BLAKE3
     * Para resistência pós-quântica total, usamos 64 bytes (512 bits)
     */
    function generateBlake3(data) {
        // Converte string para Uint8Array (necessário para esta lib)
        const msg = Buffer.from(data);
        
        // Calcula o hash com saída de 64 bytes (512 bits)
        const hashBytes = blake3(msg, { dkLen: 64 });
        
        // Converte o resultado de volta para Hexadecimal
        return Buffer.from(hashBytes).toString('hex');
    }

    // Receber 11 dados via argumentos de linha de comando
    const dados = process.argv.slice(2);
    if (dados.length !== 11) {
        console.error("Erro: Forneça exatamente 11 dados como argumentos.");
        console.error("Exemplo: node hashTRansform.js dado1 dado2 ... dado11");
        process.exit(1);
    }

    // Gerar 11 palavras: uma para cada dado
    const palavras = [];
    const indices11 = [];
    for (let i = 0; i < 11; i++) {
        const hash = generateBlake3(dados[i]);
        const bigIntHash = BigInt('0x' + hash);
        const index = Number(bigIntHash % 2048n);
        indices11.push(index);
        const palavra = wordlist[index];
        palavras.push(palavra);
    }



    // Seed é as 11 palavras geradas a partir dos dados
    const seed11 = palavras.join(' ');

    // Calcula todas as palavras possíveis para a 12ª posição
    const possiveis12 = wordlist.filter((word) => {
        const fraseTeste = `${seed11} ${word}`;
        return bip39.validateMnemonic(fraseTeste);
    });

    const hashdos11 = generateBlake3(seed11);
    // console.log(`Hash BLAKE3 dos 11 dados: ${hashdos11}`);
    const hashtonumber = BigInt('0x' + hashdos11);
    // console.log(`Hash convertido para número: ${hashtonumber}`);


     const select12 = hashtonumber % BigInt(possiveis12.length);
     const index = Math.max(0, Number(select12) - 1);
     const findedWord = possiveis12[index];
    // console.log(`Palavra selecionada para a 12ª posição: ${findedWord}`);

    const SeedFrase= palavras.concat(findedWord).join(' ');
    console.log(`Frase completa de 12 palavras: ${SeedFrase}`);


  
       if (!bip39.validateMnemonic(SeedFrase)) {
           console.error("Mnemônico inválido! Verifique as palavras.");
           return;
       }
   
       // 1. Converter mnemônico para uma Seed Binária
       const seed = await bip39.mnemonicToSeed(SeedFrase);
   
       // 2. Criar a raiz da árvore hierárquica (Master Node)
       const root = bip32.fromSeed(seed);
   
       // 3. Definir o Derivation Path (Caminho de Derivação)
       // m/84'/0'/0'/0/0 -> Padrão Native SegWit (bc1...)
       // 84' = BIP84, 0' = Bitcoin, 0' = Conta 0, 0 = Sequência de recebimento, 0 = Primeiro endereço
       const path = "m/84'/0'/0'/0/0";
       const child = root.derivePath(path);
   
       // 4. Gerar o Endereço Público (Native SegWit)
       const { address } = bitcoin.payments.p2wpkh({
           pubkey: child.publicKey,
           network: bitcoin.networks.bitcoin,
       });
   
       // 5. Gerar a Chave Privada no formato WIF (Wallet Import Format)
       const privateKeyWIF = child.toWIF();
   
       console.log("--- RESULTADOS DA DERIVAÇÃO (BIP84) ---");
       console.log(`Caminho:    ${path}`);
       console.log(`Endereço:   ${address}`);
       console.log(`Chave Privada (WIF): ${privateKeyWIF}`);
       console.log("---------------------------------------");
    

   


})();