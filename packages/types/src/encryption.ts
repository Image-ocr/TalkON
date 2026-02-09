export interface EncryptionKeys {
  identityKeyPair: KeyPair;
  signedPreKey: SignedPreKey;
  preKeys: PreKey[];
  registrationId: number;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export interface SignedPreKey {
  keyId: number;
  keyPair: KeyPair;
  signature: string;
  timestamp: Date;
}

export interface PreKey {
  keyId: number;
  keyPair: KeyPair;
}

export interface PreKeyBundle {
  userId: string;
  deviceId: string;
  identityKey: string;
  signedPreKey: {
    keyId: number;
    publicKey: string;
    signature: string;
  };
  preKey?: {
    keyId: number;
    publicKey: string;
  };
  registrationId: number;
}

export interface EncryptedMessage {
  type: EncryptedMessageType;
  ciphertext: string;
  registrationId: number;
  preKeyId?: number;
}

export enum EncryptedMessageType {
  PREKEY_MESSAGE = 1,
  SIGNAL_MESSAGE = 2,
}

export interface SessionRecord {
  userId: string;
  deviceId: string;
  remoteUserId: string;
  remoteDeviceId: string;
  sessionState: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdentityKey {
  userId: string;
  deviceId: string;
  identityKey: string;
  isTrusted: boolean;
  verifiedAt?: Date;
  createdAt: Date;
}

export interface EncryptionMetadata {
  version: number;
  algorithm: string;
  keyId: string;
  iv?: string;
}
