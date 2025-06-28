import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Address, Hex, keccak256, toBytes } from "viem";

import { encodePacked } from "viem";

type UseSignature__Args = {
  onSuccess?: (signature: Hex, timestamp: bigint) => void;
  onError?: (err: unknown) => void;
  onPrompt?: () => void;
};

// helper to get 4-byte selector
const getFunctionSelector = (sig: string) =>
  keccak256(toBytes(sig)).slice(0, 10);

export const useSignature = ({
  onSuccess,
  onError,
  onPrompt,
}: UseSignature__Args) => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const signInstitutionAttestation = async (
    institutionName: string,
    delegetee: Address,
    contractAddress: Address,
    timestamp: bigint
  ): Promise<{ signature: Hex; timestamp: bigint } | null> => {
    if (!address) {
      onError?.("No wallet connected");
      return null;
    }
    setLoading(true);
    onPrompt?.();
    try {
      const selector = getFunctionSelector(
        "requestRegisterInstitution((address,address,string,bytes,uint256))"
      );

      const packed = encodePacked(
        ["bytes4", "address", "address", "string", "address", "uint256"],
        [
          selector as `0x${string}`,
          address,
          delegetee,
          institutionName,
          contractAddress,
          timestamp,
        ]
      );

      const messageHash = keccak256(packed);

      const signature = await signMessageAsync({
        message: { raw: toBytes(messageHash) },
      });

      onSuccess?.(signature, timestamp);
      return { signature, timestamp };
    } catch (err) {
      onError?.(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInstitutionAttestation,
    loading,
  };
};
