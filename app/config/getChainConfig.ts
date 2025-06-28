import { Address } from "viem";
import { BaseSepolia } from "./addresses";

export type ChainConfig = {
  KYC_Registry: Address;
};

export const ChainConfig: Record<number, ChainConfig> = {
  84532: {
    KYC_Registry: BaseSepolia.KYC_Registry as Address,
  },
};
