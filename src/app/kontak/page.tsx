"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function KontakPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

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

            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Hubungi Kami</h1>
                    <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                        Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
                        Silakan hubungi kami melalui salah satu cara di bawah ini.
                    </p>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informasi Kontak</h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <p className="text-gray-600">support@NusaPrima.id</p>
                                            <p className="text-gray-600">info@NusaPrima.id</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Telepon / WhatsApp</h3>
                                            <p className="text-gray-600">+62 812-XXXX-XXXX</p>
                                            <p className="text-sm text-gray-500">Klik untuk chat langsung</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Alamat</h3>
                                            <p className="text-gray-600">
                                                Jl. Contoh Alamat No. 123<br />
                                                Jakarta Selatan, DKI Jakarta 12345
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Jam Operasional</h3>
                                            <p className="text-gray-600">Senin - Jumat: 09:00 - 17:00 WIB</p>
                                            <p className="text-gray-600">Sabtu: 09:00 - 14:00 WIB</p>
                                            <p className="text-gray-500 text-sm">Minggu & Hari Libur: Tutup</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Chat Langsung
                                </h3>
                                <p className="opacity-90 text-sm mb-4">
                                    Butuh respons cepat? Hubungi kami langsung via WhatsApp untuk layanan yang lebih responsif.
                                </p>
                                <a
                                    href="https://wa.me/62812XXXXXXXX?text=Halo%20NusaPrima,%20saya%20ingin%20bertanya%20tentang..."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    Chat WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Kirim Pesan</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Masukkan nama Anda"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="contoh@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                                    <Input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="Subjek pesan Anda"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tulis pesan Anda di sini..."
                                        rows={5}
                                        required
                                        className="w-full px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Mengirim..."
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Kirim Pesan
                                        </>
                                    )}
                                </Button>
                            </form>
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
