import { wordlist } from '@scure/bip39/wordlists/english';
import { generateBlake3Hash, hashToWordIndex } from './blake3';

export interface InputData {
  content: string;
  isBase64: boolean;
}

export interface ProcessedInputs {
  inputs: string[];
  words: string[];
  seedPhrase: string;
}

export function processInputs(inputs: InputData[]): ProcessedInputs {
  // Garantir exatamente 11 inputs
  const inputs11 = inputs.slice(0, 11);
  while (inputs11.length < 11) {
    inputs11.push({ content: '', isBase64: false });
  }

  const words: string[] = [];
  for (const input of inputs11) {
    const hash = generateBlake3Hash(input.content, input.isBase64);
    const index = hashToWordIndex(hash);
    words.push(wordlist[index]);
  }

  const seed11 = words.join(' ');
  const hashdos11 = generateBlake3Hash(seed11);
  const bigIntHash = BigInt('0x' + hashdos11);

  const validWords = wordlist.filter(word => {
    const testPhrase = `${seed11} ${word}`;
    return isValidMnemonic(testPhrase);
  });

  if (validWords.length === 0) {
    const index = hashToWordIndex(hashdos11);
    words.push(wordlist[index]);
  } else {
    const selectIndex = Number(bigIntHash % BigInt(validWords.length));
    words.push(validWords[selectIndex]);
  }

  return {
    inputs: inputs11.map(i => i.content),
    words,
    seedPhrase: words.join(' '),
  };
}

function isValidMnemonic(phrase: string): boolean {
  const words = phrase.split(' ');
  if (words.length !== 12) return false;
  
  const allValid = words.every(w => wordlist.includes(w));
  if (!allValid) return false;
  
  return true;
}

export function validateMnemonic(mnemonic: string): boolean {
  return isValidMnemonic(mnemonic);
}
