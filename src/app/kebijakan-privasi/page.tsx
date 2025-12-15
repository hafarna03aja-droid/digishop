"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KebijakanPrivasiPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        DigiShop
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
                    <p className="text-gray-600 mb-2">Terakhir diperbarui: 15 Desember 2025</p>
                    <p className="text-gray-600 mb-8">
                        Kebijakan Privasi ini menjelaskan bagaimana DigiShop mengumpulkan, menggunakan, dan melindungi data pribadi Anda
                        sesuai dengan Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) dan
                        Undang-Undang No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik (UU ITE).
                    </p>

                    {/* Intro Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-6 h-6 text-blue-600" />
                            <h2 className="text-lg font-semibold text-blue-900">Komitmen Kami</h2>
                        </div>
                        <p className="text-blue-800">
                            DigiShop berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kami hanya mengumpulkan
                            data yang diperlukan untuk memberikan layanan terbaik dan tidak akan menjual data Anda kepada pihak ketiga.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Database className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">1. Data yang Kami Kumpulkan</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-3">1.1 Data yang Anda Berikan:</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Nama lengkap dan alamat email</li>
                                <li>Nomor telepon/WhatsApp</li>
                                <li>Alamat pengiriman lengkap</li>
                                <li>Informasi pembayaran (diproses oleh payment gateway, tidak disimpan oleh kami)</li>
                                <li>Riwayat pesanan dan transaksi</li>
                            </ul>

                            <h3 className="font-semibold text-gray-900 mb-3">1.2 Data yang Dikumpulkan Otomatis:</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Alamat IP dan informasi perangkat</li>
                                <li>Data cookies dan aktivitas browsing</li>
                                <li>Lokasi geografis (berdasarkan IP)</li>
                                <li>Waktu akses dan halaman yang dikunjungi</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Eye className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">2. Penggunaan Data</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">Data pribadi Anda digunakan untuk:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                                    <span className="text-gray-600">Memproses dan mengirimkan pesanan Anda</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                                    <span className="text-gray-600">Mengirimkan notifikasi terkait pesanan (konfirmasi, pengiriman, dll)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                                    <span className="text-gray-600">Memberikan dukungan pelanggan dan merespons pertanyaan</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                                    <span className="text-gray-600">Meningkatkan layanan dan pengalaman pengguna</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                                    <span className="text-gray-600">Mengirimkan informasi promosi (dengan persetujuan Anda)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                                    <span className="text-gray-600">Memenuhi kewajiban hukum dan regulasi yang berlaku</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Lock className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">3. Keamanan Data</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">🔐 Enkripsi SSL/TLS</h4>
                                    <p className="text-sm text-gray-600">Semua transfer data dienkripsi menggunakan protokol SSL/TLS 256-bit</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">🛡️ PCI-DSS Compliant</h4>
                                    <p className="text-sm text-gray-600">Pembayaran diproses melalui Midtrans yang tersertifikasi PCI-DSS</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">🔒 Akses Terbatas</h4>
                                    <p className="text-sm text-gray-600">Hanya personel berwenang yang dapat mengakses data pribadi</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">📋 Audit Berkala</h4>
                                    <p className="text-sm text-gray-600">Sistem keamanan diaudit secara berkala untuk memastikan keamanan</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">4. Hak Subjek Data</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">
                                Sesuai dengan UU PDP, Anda memiliki hak-hak berikut atas data pribadi Anda:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">1.</span>
                                    <div>
                                        <span className="font-medium text-gray-900">Hak Akses</span>
                                        <p className="text-sm text-gray-600">Meminta salinan data pribadi yang kami simpan tentang Anda</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">2.</span>
                                    <div>
                                        <span className="font-medium text-gray-900">Hak Koreksi</span>
                                        <p className="text-sm text-gray-600">Memperbarui atau memperbaiki data yang tidak akurat</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">3.</span>
                                    <div>
                                        <span className="font-medium text-gray-900">Hak Penghapusan</span>
                                        <p className="text-sm text-gray-600">Meminta penghapusan data pribadi Anda (dengan batasan tertentu)</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">4.</span>
                                    <div>
                                        <span className="font-medium text-gray-900">Hak Pembatasan</span>
                                        <p className="text-sm text-gray-600">Membatasi pemrosesan data pribadi Anda</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">5.</span>
                                    <div>
                                        <span className="font-medium text-gray-900">Hak Portabilitas</span>
                                        <p className="text-sm text-gray-600">Menerima data dalam format yang dapat dibaca mesin</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">6.</span>
                                    <div>
                                        <span className="font-medium text-gray-900">Hak Keberatan</span>
                                        <p className="text-sm text-gray-600">Menolak pemrosesan data untuk keperluan pemasaran langsung</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <Bell className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">5. Cookies</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">
                                Kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Jenis cookies yang kami gunakan:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li><strong>Cookies Esensial:</strong> Diperlukan untuk fungsi dasar website</li>
                                <li><strong>Cookies Analitik:</strong> Membantu kami memahami bagaimana pengguna menggunakan website</li>
                                <li><strong>Cookies Preferensi:</strong> Menyimpan preferensi pengguna seperti bahasa dan lokasi</li>
                            </ul>
                            <p className="text-gray-600 mt-4">
                                Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">6. Hubungi Kami</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">
                                Untuk pertanyaan tentang Kebijakan Privasi ini atau untuk menggunakan hak-hak Anda,
                                silakan hubungi Petugas Perlindungan Data kami:
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="font-medium text-gray-900">DigiShop - Data Protection Officer</p>
                                <p className="text-gray-600">📧 Email: privacy@digishop.id</p>
                                <p className="text-gray-600">📱 WhatsApp: +62 812-XXXX-XXXX</p>
                                <p className="text-gray-600">📍 Alamat: [Alamat Kantor DigiShop]</p>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Kami akan merespons permintaan Anda dalam waktu maksimal 30 hari kerja sesuai ketentuan UU PDP.
                            </p>
                        </div>
                    </section>

                    {/* Legal Notice */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h2 className="text-xl font-bold mb-4">⚖️ Dasar Hukum</h2>
                        <p className="opacity-90 mb-4">Kebijakan Privasi ini disusun berdasarkan:</p>
                        <ul className="space-y-2 opacity-90 text-sm">
                            <li>• UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi</li>
                            <li>• UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik</li>
                            <li>• PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik</li>
                            <li>• Permenkominfo No. 20 Tahun 2016 tentang Perlindungan Data Pribadi dalam Sistem Elektronik</li>
                        </ul>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">© 2025 DigiShop. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
