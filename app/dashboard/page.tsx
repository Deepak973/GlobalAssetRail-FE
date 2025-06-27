"use client";

import Dashboard from "../components/Dashboard";
import { RequireWallet } from "../components/RequireWallet";

export default function page() {
  return (
    <RequireWallet>
      <Dashboard />
    </RequireWallet>
  );
}
