import { ObjectId } from "mongodb";

export interface Institution {
  _id?: ObjectId;
  participant: string; // wallet address
  delegetee: string; // wallet address
  name: string;
  institutionType: string;
  primaryJurisdiction: string;
  selectedAssets: string[];
  registrationTimestamp: number;
  contractRegistrationTimestamp: bigint;
  signature: string;
  isApproved: boolean;
  requestPhase: number; // 0: REQUESTED, 1: VERIFIED, 2: CANCELLED
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInstitutionData {
  participant: string;
  delegetee: string;
  name: string;
  institutionType: string;
  primaryJurisdiction: string;
  selectedAssets: string[];
  registrationTimestamp: number;
  contractRegistrationTimestamp: bigint;
  signature: string;
}

export interface UpdateInstitutionData {
  isApproved?: boolean;
  requestPhase?: number;
}
