import { useState } from "react";
import { Address, Hex, parseAbi } from "viem";
import { writeContract } from "@wagmi/core";

import { config } from "../config/wagmiConfig";
import { submitAction } from "../lib/utils/submitAction";

const abi = parseAbi([
  "function requestRegisterInstitution((address participant,address delegetee,string name,bytes signature,uint256 timestampOfRegistration)) returns (address)",
]);

type UseRegisterInstitution__Args = {
  contractAddress: Address;
  onPrompt?: () => void;
  onSubmitted?: (hash: `0x${string}`) => void;
  onSuccess?: (receipt: any) => void;
  onError?: (err: unknown) => void;
};

type InstitutionOnboardingData = {
  participant: Address;
  delegetee: Address;
  name: string;
  signature: Hex;
  timestampOfRegistration: bigint;
};

export const useRegisterInstitution = ({
  contractAddress,
  onPrompt,
  onSubmitted,
  onSuccess,
  onError,
}: UseRegisterInstitution__Args) => {
  const [loading, setLoading] = useState(false);

  const requestRegisterInstitution = async (
    data: InstitutionOnboardingData
  ) => {
    if (!contractAddress) return;

    await submitAction(
      async () => {
        return await writeContract(config, {
          address: contractAddress,
          abi,
          functionName: "requestRegisterInstitution",
          args: [data],
        });
      },
      {
        onPrompt: () => {
          setLoading(true);
          onPrompt?.();
        },
        onSubmitted,
        onSuccess: (receipt) => {
          setLoading(false);
          onSuccess?.(receipt);
        },
        onError: (err) => {
          setLoading(false);
          onError?.(err);
        },
      }
    );
  };

  return {
    requestRegisterInstitution,
    loading,
  };
};
