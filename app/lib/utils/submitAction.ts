import { WaitForTransactionReceiptReturnType } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/app/config/wagmiConfig";

type Callbacks__Type = {
  onPrompt?: () => void;
  onSubmitted?: (hash: `0x${string}`) => void;
  onSuccess?: (receipt: WaitForTransactionReceiptReturnType) => void;
  onError?: (err: unknown) => void;
};

/**
 * Submits a blockchain transaction with Safe multisig support
 * @param action Function that returns a transaction hash
 * @param callbacks Callback functions for different transaction states
 */
export const submitAction = async (
  action: () => Promise<`0x${string}`>,
  callbacks: Callbacks__Type
) => {
  const { onPrompt, onSubmitted, onSuccess, onError } = callbacks;

  if (onPrompt) onPrompt();

  try {
    const hash = await action();
    console.log("hash >", hash);
    if (onSubmitted) onSubmitted(hash);

    console.log("Getting receipt...");
    const receipt = await waitForTransactionReceipt(config, {
      hash,
    });

    if (onSuccess) onSuccess(receipt);
  } catch (err: any) {
    if (onError) {
      onError(err);
    }
    if ("message" in err) {
      console.log(err.message);
    }
    console.log(err);
  }
};
