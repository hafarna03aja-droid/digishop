import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NusaPrima - Produk Berkualitas untuk Gaya Hidup Modern",
    description: "Menyediakan madu premium, kopi pilihan, produk digital, dan layanan jasa profesional dengan kualitas terbaik",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-TEST'}
                ></script>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
