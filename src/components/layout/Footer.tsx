import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">NusaPrima</h3>
                        <p className="text-sm text-gray-400">
                            Menyediakan produk berkualitas terbaik — mulai dari madu premium, kopi pilihan, hingga produk digital dan layanan jasa profesional. Terpercaya sejak 2024.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Beranda</Link></li>
                            <li><Link href="/#products" className="hover:text-blue-400 transition-colors">Produk</Link></li>
                            <li><Link href="/#about" className="hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/kontak" className="hover:text-blue-400 transition-colors">Kontak</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Bantuan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/cara-pemesanan" className="hover:text-blue-400 transition-colors">Cara Pemesanan</Link></li>
                            <li><Link href="/pengiriman" className="hover:text-blue-400 transition-colors">Pengiriman</Link></li>
                            <li><Link href="/kebijakan-privasi" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</Link></li>
                            <li><Link href="/syarat-ketentuan" className="hover:text-blue-400 transition-colors">Syarat & Ketentuan</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
                        <div className="flex gap-4">
                            <a href="https://facebook.com/NusaPrima" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="https://instagram.com/NusaPrima" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="https://twitter.com/NusaPrima" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                        </div>
                        <div className="mt-6">
                            <p className="text-xs text-gray-500">© 2025 NusaPrima. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
