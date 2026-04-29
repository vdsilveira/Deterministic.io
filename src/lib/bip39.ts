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
  // Validar: pelo menos 4 inputs preenchidos (índices 0-3)
  const filledInputs = inputs.filter(i => i.content.trim().length > 0);
  if (filledInputs.length < 4) {
    throw new Error('Mínimo de 4 inputs necessários');
  }

  const words: string[] = [];
  
  // Processar todos os 11 campos
  for (let i = 0; i < 11; i++) {
    const fieldNumber = i + 1; // 1-11
    const input = inputs[i];
    
    let hash: string;
    
    if (input && input.content.trim()) {
      // Campo preenchido pelo usuário - usar como está
      hash = generateBlake3Hash(input.content, input.isBase64);
    } else {
      // Campo vazio - derivar do primeiro input + índice
      const sourceInput = getSourceInput(i, inputs);
      const suffix = fieldNumber.toString();
      hash = generateBlake3Hash(sourceInput.content, sourceInput.isBase64, suffix);
    }
    
    const index = hashToWordIndex(hash);
    words.push(wordlist[index]);
  }

  // Manter lógica EXISTENTE da 12ª palavra checksum
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
    inputs: inputs.slice(0, 11).map(i => i?.content || ''),
    words,
    seedPhrase: words.join(' '),
  };
}

// Helper: Determinar qual dos primeiros 4 inputs usar para derivação
function getSourceInput(fieldIndex: number, inputs: InputData[]): InputData {
  // Mapeamento: campo 5→1, 6→2, 7→3, 8→4, 9→1, 10→2, 11→3
  // fieldIndex é 0-10, queremos os primeiros 4 (0-3)
  const mapping = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2]; // índices 0-10 mapeiam para primeiros 4
  const sourceIndex = mapping[fieldIndex]; // deve estar preenchido (validado acima)
  return inputs[sourceIndex];
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
