"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CreditCard, Truck, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaraPemesananPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        NusaPrima
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Cara Pemesanan</h1>
                    <p className="text-gray-600 mb-8">Panduan lengkap untuk melakukan pemesanan di NusaPrima</p>

                    {/* Steps */}
                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Pilih Produk</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Telusuri katalog produk kami dan pilih produk yang Anda inginkan. Anda dapat melihat detail produk,
                                        harga, dan ketersediaan stok. Klik tombol <strong>"Beli"</strong> untuk menambahkan produk ke keranjang belanja.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">📝</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Isi Data Pemesan</h2>
                                    <p className="text-gray-600 leading-relaxed mb-3">
                                        Lengkapi informasi pemesan dengan data yang valid:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>Nama lengkap sesuai identitas</li>
                                        <li>Alamat email aktif (untuk konfirmasi pesanan)</li>
                                        <li>Nomor WhatsApp aktif (untuk notifikasi pengiriman)</li>
                                        <li>Alamat pengiriman lengkap</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Pilih Metode Pengiriman</h2>
                                    <p className="text-gray-600 leading-relaxed mb-3">
                                        Pilih provinsi dan kota/kabupaten tujuan pengiriman, lalu pilih kurir yang tersedia:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li><strong>JNE</strong> - Jalur Nugraha Ekakurir</li>
                                        <li><strong>POS Indonesia</strong> - Layanan pos nasional</li>
                                        <li><strong>TIKI</strong> - Titipan Kilat</li>
                                    </ul>
                                    <p className="text-gray-600 mt-3">
                                        Ongkos kirim akan dihitung otomatis berdasarkan berat produk dan lokasi tujuan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Lakukan Pembayaran</h2>
                                    <p className="text-gray-600 leading-relaxed mb-3">
                                        Klik tombol <strong>"Checkout Sekarang"</strong> dan pilih metode pembayaran yang tersedia:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>Transfer Bank (BCA, BNI, BRI, Mandiri, Permata)</li>
                                        <li>E-Wallet (GoPay, OVO, DANA, ShopeePay)</li>
                                        <li>Kartu Kredit/Debit (Visa, Mastercard)</li>
                                        <li>QRIS (Scan QR dari aplikasi bank manapun)</li>
                                        <li>Gerai Retail (Alfamart, Indomaret)</li>
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-3">
                                        Pembayaran diproses melalui Midtrans yang telah tersertifikasi PCI-DSS untuk keamanan transaksi Anda.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Konfirmasi & Pengiriman</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Setelah pembayaran berhasil, Anda akan menerima:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1 mt-3">
                                        <li>Email konfirmasi pembayaran</li>
                                        <li>Notifikasi WhatsApp dengan detail pesanan</li>
                                        <li>Nomor resi pengiriman (dalam 1x24 jam kerja)</li>
                                    </ul>
                                    <p className="text-gray-600 mt-3">
                                        Anda dapat melacak status pengiriman menggunakan nomor resi yang diberikan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <HelpCircle className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Butuh Bantuan?</h2>
                        </div>
                        <p className="mb-4 opacity-90">
                            Jika Anda mengalami kendala dalam proses pemesanan, silakan hubungi tim customer service kami:
                        </p>
                        <ul className="space-y-2 opacity-90">
                            <li>📧 Email: support@NusaPrima.id</li>
                            <li>📱 WhatsApp: +62 812-XXXX-XXXX</li>
                            <li>🕐 Jam Operasional: Senin - Sabtu, 09:00 - 17:00 WIB</li>
                        </ul>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">© 2025 NusaPrima. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
