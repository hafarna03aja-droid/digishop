"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck, AlertTriangle, Scale, Ban, RefreshCw, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SyaratKetentuanPage() {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Syarat dan Ketentuan</h1>
                    <p className="text-gray-600 mb-2">Terakhir diperbarui: 15 Desember 2025</p>
                    <p className="text-gray-600 mb-8">
                        Syarat dan Ketentuan ini mengatur penggunaan layanan NusaPrima. Dengan mengakses dan menggunakan
                        layanan kami, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini.
                    </p>

                    {/* Important Notice */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-10">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                            <h2 className="text-lg font-semibold text-yellow-900">Penting untuk Dibaca</h2>
                        </div>
                        <p className="text-yellow-800">
                            Dengan melakukan pembelian di NusaPrima, Anda dianggap telah membaca, memahami, dan menyetujui
                            seluruh Syarat dan Ketentuan yang berlaku. Harap baca dengan seksama sebelum melakukan transaksi.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">1. Definisi</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <ul className="space-y-3 text-gray-600">
                                <li><strong>"NusaPrima"</strong> atau <strong>"Kami"</strong> mengacu pada platform e-commerce yang dikelola oleh [Nama PT/CV], dengan alamat terdaftar di [Alamat Lengkap].</li>
                                <li><strong>"Pengguna"</strong> atau <strong>"Anda"</strong> mengacu pada individu atau badan hukum yang mengakses, mendaftar, atau melakukan transaksi di NusaPrima.</li>
                                <li><strong>"Produk"</strong> mencakup barang fisik (madu, kopi, dll) dan produk digital (e-book, software, voucher, jasa layanan) yang dijual melalui NusaPrima.</li>
                                <li><strong>"Layanan"</strong> mencakup seluruh fitur, fungsi, dan fasilitas yang disediakan oleh NusaPrima.</li>
                                <li><strong>"Transaksi"</strong> mengacu pada proses pembelian produk dan/atau layanan melalui NusaPrima.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">2. Ketentuan Umum</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">2.1 Kelayakan Pengguna</h3>
                                <p className="text-gray-600">
                                    Anda harus berusia minimal 18 tahun atau memiliki persetujuan dari orang tua/wali untuk menggunakan
                                    layanan NusaPrima. Dengan melakukan transaksi, Anda menyatakan bahwa Anda memenuhi syarat ini.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">2.2 Akurasi Informasi</h3>
                                <p className="text-gray-600">
                                    Anda bertanggung jawab untuk memberikan informasi yang akurat dan lengkap saat melakukan pemesanan.
                                    NusaPrima tidak bertanggung jawab atas kesalahan pengiriman akibat informasi yang tidak akurat.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">2.3 Akun Pengguna</h3>
                                <p className="text-gray-600">
                                    Jika Anda membuat akun, Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda.
                                    Segala aktivitas yang terjadi melalui akun Anda menjadi tanggung jawab Anda.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Scale className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">3. Transaksi dan Pembayaran</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">3.1 Harga Produk</h3>
                                <p className="text-gray-600">
                                    Harga yang tercantum sudah termasuk PPN (jika berlaku). NusaPrima berhak mengubah harga tanpa
                                    pemberitahuan terlebih dahulu, namun perubahan harga tidak berlaku untuk pesanan yang sudah dikonfirmasi.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">3.2 Metode Pembayaran</h3>
                                <p className="text-gray-600">
                                    Pembayaran diproses melalui Midtrans yang tersertifikasi PCI-DSS. Metode pembayaran yang tersedia
                                    meliputi transfer bank, e-wallet, kartu kredit/debit, QRIS, dan gerai retail.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">3.3 Konfirmasi Pesanan</h3>
                                <p className="text-gray-600">
                                    Pesanan dianggap sah setelah pembayaran terverifikasi. Anda akan menerima email konfirmasi yang
                                    berfungsi sebagai bukti transaksi elektronik sesuai UU ITE.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">3.4 Batas Waktu Pembayaran</h3>
                                <p className="text-gray-600">
                                    Pesanan yang tidak dibayar dalam waktu 24 jam akan otomatis dibatalkan. Untuk metode pembayaran
                                    tertentu (seperti transfer bank), batas waktu mungkin berbeda.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <RefreshCw className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">4. Pengembalian dan Penukaran</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">4.1 Ketentuan Pengembalian Produk Fisik</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>Pengembalian dapat dilakukan dalam waktu <strong>7 hari</strong> setelah produk diterima</li>
                                    <li>Produk harus dalam kondisi asli, belum dibuka/digunakan, dan dengan kemasan utuh</li>
                                    <li>Sertakan bukti pembelian (email konfirmasi atau invoice)</li>
                                    <li>Biaya pengiriman pengembalian ditanggung oleh pembeli, kecuali kesalahan dari pihak kami</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">4.2 Produk yang Tidak Dapat Dikembalikan</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>Produk digital yang sudah diunduh atau kode yang sudah diaktivasi</li>
                                    <li>Produk makanan/minuman yang sudah dibuka</li>
                                    <li>Produk dengan label "Final Sale" atau diskon khusus</li>
                                    <li>Voucher dan kartu hadiah yang sudah digunakan</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">4.3 Proses Refund</h3>
                                <p className="text-gray-600">
                                    Pengembalian dana akan diproses dalam waktu 7-14 hari kerja setelah produk diterima dan diverifikasi.
                                    Refund akan dikembalikan melalui metode pembayaran yang sama dengan saat pembelian.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <Ban className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">5. Larangan</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">Pengguna dilarang untuk:</p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500">✕</span>
                                    Menggunakan layanan untuk tujuan ilegal atau melanggar hukum yang berlaku di Indonesia
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500">✕</span>
                                    Memberikan informasi palsu atau menyesatkan
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500">✕</span>
                                    Melakukan tindakan yang dapat merusak, menonaktifkan, atau membebani server kami
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500">✕</span>
                                    Menyebarkan virus, malware, atau kode berbahaya lainnya
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500">✕</span>
                                    Menggunakan bot, scraper, atau alat otomatis tanpa izin tertulis
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500">✕</span>
                                    Menjual kembali produk digital tanpa izin (melanggar hak cipta)
                                </li>
                            </ul>
                            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                                <p className="text-sm text-red-800">
                                    <strong>Peringatan:</strong> Pelanggaran terhadap ketentuan ini dapat mengakibatkan penangguhan akun,
                                    pembatalan pesanan, dan tindakan hukum sesuai peraturan yang berlaku.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">6. Batasan Tanggung Jawab</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">6.1 Ketersediaan Layanan</h3>
                                <p className="text-gray-600">
                                    NusaPrima berupaya menyediakan layanan 24/7, namun tidak menjamin ketersediaan layanan tanpa gangguan.
                                    Kami tidak bertanggung jawab atas kerugian akibat gangguan teknis atau pemeliharaan sistem.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">6.2 Force Majeure</h3>
                                <p className="text-gray-600">
                                    NusaPrima tidak bertanggung jawab atas keterlambatan atau kegagalan dalam memenuhi kewajiban akibat
                                    keadaan di luar kendali kami, termasuk namun tidak terbatas pada: bencana alam, pandemi, perang,
                                    kerusuhan, gangguan internet, atau kebijakan pemerintah.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">6.3 Produk Pihak Ketiga</h3>
                                <p className="text-gray-600">
                                    Untuk produk yang berasal dari penjual/supplier pihak ketiga, NusaPrima bertindak sebagai perantara.
                                    Garansi dan klaim produk mengikuti ketentuan dari produsen/supplier masing-masing.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">7. Hak Kekayaan Intelektual</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">
                                Seluruh konten di NusaPrima, termasuk namun tidak terbatas pada:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                                <li>Logo, nama merek, dan identitas visual NusaPrima</li>
                                <li>Desain website, tata letak, dan antarmuka pengguna</li>
                                <li>Teks, gambar, grafik, dan konten multimedia</li>
                                <li>Kode sumber dan perangkat lunak</li>
                            </ul>
                            <p className="text-gray-600">
                                adalah milik NusaPrima atau pemberi lisensinya dan dilindungi oleh UU No. 28 Tahun 2014 tentang Hak Cipta
                                dan peraturan perundang-undangan terkait. Penggunaan tanpa izin tertulis merupakan pelanggaran hukum.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <Gavel className="w-5 h-5 text-teal-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">8. Penyelesaian Sengketa</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">8.1 Hukum yang Berlaku</h3>
                                <p className="text-gray-600">
                                    Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">8.2 Penyelesaian Musyawarah</h3>
                                <p className="text-gray-600">
                                    Setiap perselisihan akan diselesaikan terlebih dahulu melalui musyawarah untuk mufakat antara
                                    Pengguna dan NusaPrima dalam jangka waktu 30 hari kalender.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">8.3 Arbitrase</h3>
                                <p className="text-gray-600">
                                    Jika musyawarah tidak mencapai kesepakatan, sengketa akan diselesaikan melalui Badan Arbitrase
                                    Nasional Indonesia (BANI) sesuai dengan prosedur yang berlaku.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">8.4 Yurisdiksi</h3>
                                <p className="text-gray-600">
                                    Para pihak sepakat untuk tunduk pada yurisdiksi eksklusif Pengadilan Negeri Jakarta Selatan
                                    untuk setiap sengketa yang tidak dapat diselesaikan melalui arbitrase.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                <RefreshCw className="w-5 h-5 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">9. Perubahan Syarat dan Ketentuan</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600">
                                NusaPrima berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan efektif
                                segera setelah dipublikasikan di website. Penggunaan layanan secara berkelanjutan setelah perubahan
                                dianggap sebagai persetujuan Anda terhadap syarat dan ketentuan yang diperbarui.
                            </p>
                            <p className="text-gray-600 mt-4">
                                Untuk perubahan material, kami akan memberikan pemberitahuan melalui email atau notifikasi di website
                                setidaknya 7 hari sebelum perubahan berlaku.
                            </p>
                        </div>
                    </section>

                    {/* Legal Notice */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h2 className="text-xl font-bold mb-4">⚖️ Dasar Hukum</h2>
                        <p className="opacity-90 mb-4">Syarat dan Ketentuan ini disusun berdasarkan:</p>
                        <ul className="space-y-2 opacity-90 text-sm">
                            <li>• Kitab Undang-Undang Hukum Perdata (KUHPerdata)</li>
                            <li>• UU No. 8 Tahun 1999 tentang Perlindungan Konsumen</li>
                            <li>• UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik</li>
                            <li>• UU No. 7 Tahun 2014 tentang Perdagangan</li>
                            <li>• PP No. 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik</li>
                            <li>• UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="mt-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Hubungi Kami</h3>
                        <p className="text-gray-600 mb-4">
                            Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="font-medium text-gray-900">NusaPrima Customer Service</p>
                            <p className="text-gray-600">📧 Email: legal@NusaPrima.id</p>
                            <p className="text-gray-600">📱 WhatsApp: +62 812-XXXX-XXXX</p>
                            <p className="text-gray-600">🕐 Jam Operasional: Senin - Jumat, 09:00 - 17:00 WIB</p>
                        </div>
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
