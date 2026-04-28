import { HDKey } from '@scure/bip32';
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';
import { ripemd160 } from '@noble/hashes/ripemd160';
import { bytesToHex } from '@noble/hashes/utils';

const BITCOIN_NETWORK = {
  wif: 0x80,
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
};

function pbkdf2(password: Uint8Array, salt: Uint8Array, iterations: number, keylen: number): Uint8Array {
  let result = password;
  const saltWithMagic = new Uint8Array(salt.length + 4);
  saltWithMagic.set(salt, 0);
  saltWithMagic[salt.length] = 0x00;
  saltWithMagic[salt.length + 1] = 0x00;
  saltWithMagic[salt.length + 2] = 0x00;
  saltWithMagic[salt.length + 3] = 0x00;
  
  for (let i = 0; i < iterations; i++) {
    const h1 = sha512(new Uint8Array([...result, ...saltWithMagic]));
    result = new Uint8Array(keylen);
    for (let j = 0; j < keylen && j < h1.length; j++) {
      result[j] = h1[j];
    }
    if (i === iterations - 1) break;
    const prev = result;
    const h2 = sha512(new Uint8Array([...prev, ...salt]));
    result = h2.slice(0, keylen);
  }
  
  return result.slice(0, keylen);
}

function base58Encode(buffer: Uint8Array): string {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  let leadingZeros = 0;
  
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] === 0) leadingZeros++;
    else break;
  }
  
  let num = BigInt(0);
  for (let i = 0; i < buffer.length; i++) {
    num = num * 256n + BigInt(buffer[i]);
  }
  
  while (num > 0n) {
    const idx = Number(num % 58n);
    result = alphabet[idx] + result;
    num = num / 58n;
  }
  
  while (leadingZeros-- > 0) {
    result = '1' + result;
  }
  
  return result;
}

function base58CheckEncode(payload: Uint8Array, version: number): string {
  const versionBuffer = new Uint8Array(payload.length + 1);
  versionBuffer[0] = version;
  versionBuffer.set(payload, 1);
  
  const hash1 = sha256(versionBuffer);
  const hash2 = sha256(hash1);
  const checksum = hash2.slice(0, 4);
  
  const toEncode = new Uint8Array(versionBuffer.length + 4);
  toEncode.set(versionBuffer);
  toEncode.set(checksum, versionBuffer.length);
  
  return base58Encode(toEncode);
}

export interface KeyPair {
  privateKey: string;
  publicKey: string;
  address: string;
  wif: string;
}

export async function mnemonicToSeed(mnemonic: string): Promise<Uint8Array> {
  const salt = new TextEncoder().encode('mnemonic');
  const entropy = new TextEncoder().encode(mnemonic);
  return pbkdf2(entropy, salt, 2048, 64);
}

export function deriveKeyPair(seed: Uint8Array, path: string): KeyPair {
  const masterKey = HDKey.fromMasterSeed(seed);
  const child = masterKey.derive(path);
  
  if (!child.privateKey) throw new Error('No private key');
  
  const privateKeyHex = bytesToHex(child.privateKey);
  const publicKeyHex = child.publicKey ? bytesToHex(child.publicKey) : '';
  
  let wif = '';
  let address = '';
  
  if (path.startsWith('m/84')) {
    address = deriveBIP84Address(child.publicKey!);
    wif = deriveWIF(child.privateKey, false);
  } else if (path.startsWith('m/49')) {
    address = deriveBIP49Address(child.publicKey!);
    wif = deriveWIF(child.privateKey, false);
  } else if (path.startsWith('m/86')) {
    address = deriveBIP86Address(child.publicKey!);
    wif = deriveWIF(child.privateKey, false);
  }
  
  return {
    privateKey: privateKeyHex,
    publicKey: publicKeyHex,
    address,
    wif,
  };
}

function deriveWIF(privateKey: Uint8Array, compressed: boolean = true): string {
  const payload = compressed 
    ? new Uint8Array([...privateKey, 0x01])
    : privateKey;
  return base58CheckEncode(payload, BITCOIN_NETWORK.wif);
}

function hash160(data: Uint8Array): Uint8Array {
  const sha = sha256(data);
  return ripemd160(sha);
}

function deriveBIP84Address(publicKey: Uint8Array): string {
  const keyHash = hash160(publicKey);
  return bech32Encode('bc', 0, keyHash);
}

function deriveBIP49Address(publicKey: Uint8Array): string {
  const keyHash = hash160(publicKey);
  const script = new Uint8Array([0x00, 0x14, ...keyHash]);
  const scriptHash = hash160(script);
  return base58CheckEncode(scriptHash, 0x05);
}

function deriveBIP86Address(publicKey: Uint8Array): string {
  const xOnly = publicKey.slice(1, 33);
  return bech32Encode('bc', 1, xOnly);
}

const BECH32_CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

function bech32Encode(prefix: string, version: number, data: Uint8Array): string {
  const converted = convertBits(data, 8, 5, true);
  const checksum = bech32Checksum(prefix, [...converted, ...Array(6).fill(0)]);
  const result = [...converted, ...checksum];
  
  let resultStr = prefix + '1';
  for (const b of result) {
    resultStr += BECH32_CHARSET[b];
  }
  return resultStr;
}

function bech32Checksum(prefix: string, data: number[]): number[] {
  const values = [...polyMod([...expandPrefix(prefix), ...data])];
  return values.slice(0, 6);
}

function expandPrefix(prefix: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < prefix.length; i++) {
    result.push(prefix.charCodeAt(i) & 31);
  }
  return result;
}

function polyMod(values: number[]): number[] {
  const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  
  for (const v of values) {
    const top = chk >> 25;
    chk = (chk & 0x1ffffff) << 5 ^ v;
    
    for (let i = 0; i < 5; i++) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i];
      }
    }
  }
  
  return [chk ^ 1, (chk >> 25) & 31, (chk >> 20) & 31, (chk >> 15) & 31, (chk >> 10) & 31, (chk >> 5) & 31];
}

function convertBits(data: Uint8Array, fromBits: number, toBits: number, pad: boolean): number[] {
  let acc = 0;
  let bits = 0;
  const result: number[] = [];
  const maxv = (1 << toBits) - 1;
  
  for (const value of data) {
    acc = (acc << fromBits) | value;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      result.push((acc >> bits) & maxv);
    }
  }
  
  if (pad) {
    if (bits > 0) {
      result.push((acc << (toBits - bits)) & maxv);
    }
  }
  
  return result;
}
