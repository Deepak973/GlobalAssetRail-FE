import { headers } from "next/headers";
import "./globals.css";
import WalletProvider from "./providers/WalletProvider";
import { NavBar } from "./components/Nav";
import Footer from "./components/Footer";
import { AlertsProvider } from "./providers/AllertProvider";
import { Notifier } from "./hooks/Notifier";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en">
      <body className="">
        {/* <Toaster position="bottom-right" /> */}

        <WalletProvider cookies={cookies}>
          <AlertsProvider>
            <Notifier />
            <NavBar />
            <main className="">{children}</main>
            <Footer />
          </AlertsProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
