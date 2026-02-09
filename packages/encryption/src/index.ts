import crypto from 'crypto';
import {
  EncryptionKeys,
  KeyPair,
  PreKey,
  SignedPreKey,
  PreKeyBundle,
  EncryptedMessage,
  EncryptedMessageType,
  EncryptionMetadata,
} from '@talkon/types';
import { ENCRYPTION_ALGORITHM, PREKEY_BATCH_SIZE } from '@talkon/shared';

export class EncryptionService {
  private algorithm = ENCRYPTION_ALGORITHM;

  generateKeyPair(): KeyPair {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    return {
      publicKey,
      privateKey,
    };
  }

  generatePreKeys(count: number = PREKEY_BATCH_SIZE): PreKey[] {
    const preKeys: PreKey[] = [];
    for (let i = 0; i < count; i++) {
      preKeys.push({
        keyId: i,
        keyPair: this.generateKeyPair(),
      });
    }
    return preKeys;
  }

  generateSignedPreKey(identityKeyPair: KeyPair, keyId: number): SignedPreKey {
    const keyPair = this.generateKeyPair();
    const dataToSign = Buffer.from(keyPair.publicKey);
    const signature = crypto.sign('sha256', dataToSign, {
      key: identityKeyPair.privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    });

    return {
      keyId,
      keyPair,
      signature: signature.toString('base64'),
      timestamp: new Date(),
    };
  }

  generateRegistrationId(): number {
    return crypto.randomInt(1, 16384);
  }

  generateEncryptionKeys(): EncryptionKeys {
    const identityKeyPair = this.generateKeyPair();
    const signedPreKey = this.generateSignedPreKey(identityKeyPair, 0);
    const preKeys = this.generatePreKeys();
    const registrationId = this.generateRegistrationId();

    return {
      identityKeyPair,
      signedPreKey,
      preKeys,
      registrationId,
    };
  }

  createPreKeyBundle(
    userId: string,
    deviceId: string,
    encryptionKeys: EncryptionKeys
  ): PreKeyBundle {
    const preKey = encryptionKeys.preKeys[0];

    return {
      userId,
      deviceId,
      identityKey: encryptionKeys.identityKeyPair.publicKey,
      signedPreKey: {
        keyId: encryptionKeys.signedPreKey.keyId,
        publicKey: encryptionKeys.signedPreKey.keyPair.publicKey,
        signature: encryptionKeys.signedPreKey.signature,
      },
      preKey: preKey
        ? {
            keyId: preKey.keyId,
            publicKey: preKey.keyPair.publicKey,
          }
        : undefined,
      registrationId: encryptionKeys.registrationId,
    };
  }

  encryptMessage(
    message: string,
    recipientPublicKey: string,
    messageType: EncryptedMessageType = EncryptedMessageType.SIGNAL_MESSAGE
  ): EncryptedMessage {
    const symmetricKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
    let ciphertext = cipher.update(message, 'utf8', 'base64');
    ciphertext += cipher.final('base64');

    const encryptedSymmetricKey = crypto.publicEncrypt(
      {
        key: recipientPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      symmetricKey
    );

    const combinedCiphertext = Buffer.concat([
      iv,
      encryptedSymmetricKey,
      Buffer.from(ciphertext, 'base64'),
    ]).toString('base64');

    return {
      type: messageType,
      ciphertext: combinedCiphertext,
      registrationId: this.generateRegistrationId(),
    };
  }

  decryptMessage(encryptedMessage: EncryptedMessage, privateKey: string): string {
    const combined = Buffer.from(encryptedMessage.ciphertext, 'base64');

    const iv = combined.subarray(0, 16);
    const encryptedSymmetricKey = combined.subarray(16, 16 + 256);
    const ciphertext = combined.subarray(16 + 256);

    const symmetricKey = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      encryptedSymmetricKey
    );

    const decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKey, iv);
    let plaintext = decipher.update(ciphertext.toString('base64'), 'base64', 'utf8');
    plaintext += decipher.final('utf8');

    return plaintext;
  }

  encryptMedia(
    buffer: Buffer
  ): { encryptedBuffer: Buffer; key: string; iv: string; metadata: EncryptionMetadata } {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    const metadata: EncryptionMetadata = {
      version: 1,
      algorithm: 'AES-256-CBC',
      keyId: crypto.randomBytes(16).toString('hex'),
      iv: iv.toString('base64'),
    };

    return {
      encryptedBuffer: encrypted,
      key: key.toString('base64'),
      iv: iv.toString('base64'),
      metadata,
    };
  }

  decryptMedia(encryptedBuffer: Buffer, key: string, iv: string): Buffer {
    const keyBuffer = Buffer.from(key, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
  }

  verifySignature(publicKey: string, data: string, signature: string): boolean {
    try {
      return crypto.verify(
        'sha256',
        Buffer.from(data),
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        Buffer.from(signature, 'base64')
      );
    } catch {
      return false;
    }
  }

  hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

export const encryptionService = new EncryptionService();
