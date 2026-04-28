import { blake3 } from '@noble/hashes/blake3';

export function generateBlake3Hash(input: string | Uint8Array): string {
  const data = typeof input === 'string'
    ? new TextEncoder().encode(input)
    : input;
  const hash = blake3(data, { dkLen: 64 });
  return Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function hashToWordIndex(hashHex: string): number {
  const bigInt = BigInt('0x' + hashHex);
  return Number(bigInt % 2048n);
}
