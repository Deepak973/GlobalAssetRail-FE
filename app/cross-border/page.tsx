"use client";

import CrossBorder from "../components/CrossBorder";
import { RequireWallet } from "../components/RequireWallet";

export default function page() {
  return (
    <RequireWallet>
      <CrossBorder />
    </RequireWallet>
  );
}
