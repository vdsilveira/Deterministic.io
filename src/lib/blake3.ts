import { blake3 } from '@noble/hashes/blake3';

export function generateBlake3Hash(input: string, isBase64: boolean = false): string {
  let data: Uint8Array;

  if (isBase64) {
    // Decode base64 to original bytes
    data = Uint8Array.from(atob(input), c => c.charCodeAt(0));
  } else {
    // Text input - encode string as UTF-8
    data = new TextEncoder().encode(input);
  }

  const hash = blake3(data, { dkLen: 64 });
  return Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function hashToWordIndex(hashHex: string): number {
  const bigInt = BigInt('0x' + hashHex);
  return Number(bigInt % 2048n);
}
