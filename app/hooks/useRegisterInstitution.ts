import { useState, useEffect } from "react";
import { Address, Hex, parseAbi } from "viem";
import { writeContract, readContract } from "@wagmi/core";

import { config } from "../config/wagmiConfig";
import { submitAction } from "../lib/utils/submitAction";
import { Institution } from "../lib/models/Institution";
import { serializeBigInt } from "../lib/utils/serializeBigInt";

const abi = parseAbi([
  "function requestRegisterInstitution((address participant,address delegetee,string name,bytes signature,uint256 timestampOfRegistration)) returns (address)",
  "function s_institutionData(address participant) external view returns (address delegetee, uint256 registrationTimestamp, string name, bool isApproved)",
  "function s_requestData(bytes32 selector, address participant) external view returns (uint8 phase)",
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

type InstitutionStorage = {
  delegetee: Address;
  registrationTimestamp: bigint;
  name: string;
  isApproved: boolean;
};

enum Phase {
  REQUESTED = 0,
  VERIFIED = 1,
  CANCELLED = 2,
}

export const useRegisterInstitution = ({
  contractAddress,
  onPrompt,
  onSubmitted,
  onSuccess,
  onError,
}: UseRegisterInstitution__Args) => {
  const [loading, setLoading] = useState(false);
  const [institutionData, setInstitutionData] =
    useState<InstitutionStorage | null>(null);
  const [mongoInstitutionData, setMongoInstitutionData] =
    useState<Institution | null>(null);
  const [requestPhase, setRequestPhase] = useState<Phase | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const getInstitutionData = async (participant: Address) => {
    if (!contractAddress || !participant) return;

    setLoadingData(true);
    try {
      // Fetch from contract
      const contractData = await readContract(config, {
        address: contractAddress,
        abi,
        functionName: "s_institutionData",
        args: [participant],
      });

      const institutionStorage: InstitutionStorage = {
        delegetee: contractData[0],
        registrationTimestamp: contractData[1],
        name: contractData[2],
        isApproved: contractData[3],
      };

      setInstitutionData(institutionStorage);

      // Fetch from MongoDB via API
      try {
        const response = await fetch(`/api/institutions/${participant}`);
        if (response.ok) {
          const mongoData = await response.json();
          setMongoInstitutionData(mongoData);
        } else {
          setMongoInstitutionData(null);
        }
      } catch (mongoError) {
        console.error("Error fetching from MongoDB:", mongoError);
        setMongoInstitutionData(null);
      }
    } catch (error) {
      console.error("Error fetching institution data:", error);
      setInstitutionData(null);
      setRequestPhase(null);
      setMongoInstitutionData(null);
    } finally {
      setLoadingData(false);
    }
  };

  const requestRegisterInstitution = async (
    data: InstitutionOnboardingData,
    mongoData?: {
      institutionType: string;
      primaryJurisdiction: string;
      selectedAssets: string[];
    }
  ) => {
    if (!contractAddress) return;

    await submitAction(
      async () => {
        const result = await writeContract(config, {
          address: contractAddress,
          abi,
          functionName: "requestRegisterInstitution",
          args: [data],
        });

        // Save to MongoDB via API after successful contract call
        if (mongoData) {
          try {
            const response = await fetch("/api/institutions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                serializeBigInt({
                  participant: data.participant,
                  delegetee: data.delegetee,
                  name: data.name,
                  signature: data.signature,
                  registrationTimestamp: Math.floor(Date.now() / 1000),
                  contractRegistrationTimestamp: data.timestampOfRegistration,
                  ...mongoData,
                })
              ),
            });

            if (!response.ok) {
              console.error("Error saving to MongoDB:", await response.text());
            }
          } catch (mongoError) {
            console.error("Error saving to MongoDB:", mongoError);
            // Don't fail the transaction if MongoDB save fails
          }
        }

        return result;
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
    getInstitutionData,
    institutionData,
    mongoInstitutionData,
    requestPhase,
    loading,
    loadingData,
  };
};
