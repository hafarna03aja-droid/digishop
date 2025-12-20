"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, MapPin, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PengirimanPage() {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan Pengiriman</h1>
                    <p className="text-gray-600 mb-8">Informasi lengkap tentang proses pengiriman produk NusaPrima</p>

                    {/* Courier Partners */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Truck className="w-6 h-6 text-blue-600" />
                            Mitra Pengiriman
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-red-600">JNE</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">JNE Express</h3>
                                <p className="text-sm text-gray-500">REG, YES, OKE</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-orange-600">POS</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">POS Indonesia</h3>
                                <p className="text-sm text-gray-500">Paket Kilat, Reguler</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-blue-600">TIKI</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">TIKI</h3>
                                <p className="text-sm text-gray-500">ONS, REG, ECO</p>
                            </div>
                        </div>
                    </section>

                    {/* Shipping Time */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-blue-600" />
                            Estimasi Waktu Pengiriman
                        </h2>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Wilayah Tujuan</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estimasi Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-6 py-4 text-gray-600">Jabodetabek</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">1-2 hari kerja</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-gray-600">Pulau Jawa (lainnya)</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">2-3 hari kerja</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-gray-600">Sumatera, Bali, Kalimantan</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">3-5 hari kerja</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-gray-600">Sulawesi, NTB, NTT</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">4-7 hari kerja</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-gray-600">Papua, Maluku</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">7-14 hari kerja</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                            * Estimasi waktu pengiriman dihitung setelah paket diserahkan ke kurir dan dapat bervariasi tergantung kondisi.
                        </p>
                    </section>

                    {/* Processing Time */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="w-6 h-6 text-blue-600" />
                            Proses Pengemasan
                        </h2>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 font-bold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Verifikasi Pembayaran</h4>
                                        <p className="text-gray-600 text-sm">Pesanan diproses setelah pembayaran terverifikasi (maks. 1x24 jam kerja)</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 font-bold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Pengemasan Aman</h4>
                                        <p className="text-gray-600 text-sm">Produk dikemas dengan bubble wrap dan kardus untuk keamanan selama pengiriman</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 font-bold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Penyerahan ke Kurir</h4>
                                        <p className="text-gray-600 text-sm">Paket diserahkan ke kurir pada hari yang sama (cut-off jam 14:00 WIB)</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 font-bold text-sm">4</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Nomor Resi</h4>
                                        <p className="text-gray-600 text-sm">Nomor resi dikirimkan via WhatsApp dan email untuk pelacakan</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Shipping Area */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-blue-600" />
                            Cakupan Pengiriman
                        </h2>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">
                                NusaPrima melayani pengiriman ke <strong>seluruh wilayah Indonesia</strong>, termasuk:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>34 Provinsi di Indonesia</li>
                                    <li>500+ Kota dan Kabupaten</li>
                                    <li>7.000+ Kecamatan</li>
                                </ul>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>Pulau-pulau terpencil</li>
                                    <li>Daerah perbatasan</li>
                                    <li>Wilayah 3T (Terdepan, Terluar, Tertinggal)</li>
                                </ul>
                            </div>
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <p className="text-sm text-yellow-800">
                                    <strong>Catatan:</strong> Untuk wilayah terpencil, waktu pengiriman mungkin lebih lama dan biaya kirim dapat lebih tinggi.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Important Notes */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-blue-600" />
                            Ketentuan Penting
                        </h2>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    Pastikan alamat pengiriman lengkap dan nomor telepon aktif untuk memudahkan kurir menghubungi Anda.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    Ongkos kirim dihitung berdasarkan berat volumetrik atau berat aktual, mana yang lebih besar.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    NusaPrima tidak bertanggung jawab atas keterlambatan yang disebabkan oleh force majeure (bencana alam, pandemi, dll).
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    Jika paket tidak diterima dalam waktu 14 hari, segera hubungi customer service kami.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    Kerusakan paket selama pengiriman ditanggung oleh asuransi pengiriman (jika menggunakan layanan dengan asuransi).
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Product Digital */}
                    <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">📱 Produk Digital</h2>
                        <p className="opacity-90 mb-4">
                            Untuk produk digital (e-book, software, voucher, dll), pengiriman dilakukan secara elektronik:
                        </p>
                        <ul className="space-y-2 opacity-90">
                            <li>✅ Dikirim via email dalam waktu 1x24 jam setelah pembayaran</li>
                            <li>✅ Link download atau kode aktivasi tersedia di akun Anda</li>
                            <li>✅ Tidak dikenakan biaya pengiriman</li>
                        </ul>
                    </section>
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
