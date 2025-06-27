import { headers } from "next/headers";
import "./globals.css";
import WalletProvider from "./providers/WalletProvider";
import { NavBar } from "./components/Nav";
import Footer from "./components/Footer";

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
          <NavBar />
          <main className="">{children}</main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
