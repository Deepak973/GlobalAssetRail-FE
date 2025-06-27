"use client";

import InstitutionOnboarding from "../components/InstitutionOnboarding";
import { RequireWallet } from "../components/RequireWallet";

export default function page() {
  return (
    <RequireWallet>
      <InstitutionOnboarding />
    </RequireWallet>
  );
}
