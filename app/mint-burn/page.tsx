"use client";

import MintBurn from "../components/MintBurn";
import { RequireWallet } from "../components/RequireWallet";

export default function page() {
  return (
    <RequireWallet>
      <MintBurn />
    </RequireWallet>
  );
}
