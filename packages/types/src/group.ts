export interface Group {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  creatorId: string;
  members: GroupMember[];
  settings: GroupSettings;
  inviteLink?: string;
  inviteLinkEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMember {
  userId: string;
  role: GroupRole;
  joinedAt: Date;
  addedBy?: string;
}

export enum GroupRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface GroupSettings {
  onlyAdminsCanSend: boolean;
  onlyAdminsCanEditInfo: boolean;
  approveNewMembers: boolean;
  maxMembers: number;
}

export interface GroupInviteLink {
  groupId: string;
  code: string;
  createdBy: string;
  expiresAt?: Date;
  maxUses?: number;
  uses: number;
  isActive: boolean;
  createdAt: Date;
}

export interface GroupJoinRequest {
  id: string;
  groupId: string;
  userId: string;
  status: JoinRequestStatus;
  requestedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export enum JoinRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
