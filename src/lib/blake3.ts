import { blake3 } from '@noble/hashes/blake3';

export function generateBlake3Hash(input: string, isBase64: boolean = false, suffix?: string): string {
  let data: Uint8Array;

  // Concatenate input + suffix BEFORE hashing
  const fullInput = suffix ? input + suffix : input;

  if (isBase64) {
    // Handle both raw base64 and data URL formats
    const base64Clean = input.includes(',') ? input.split(',')[1] : input;
    // Decode base64 to original bytes
    data = Uint8Array.from(atob(base64Clean), c => c.charCodeAt(0));
  } else {
    data = new TextEncoder().encode(fullInput);
  }

  const hash = blake3(data, { dkLen: 64 });
  return Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function hashToWordIndex(hashHex: string): number {
  const bigInt = BigInt('0x' + hashHex);
  return Number(bigInt % 2048n);
}
