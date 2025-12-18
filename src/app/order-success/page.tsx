"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        const id = searchParams.get("orderId");
        if (id) {
            setOrderId(id);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Pembayaran Berhasil! 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                    Terima kasih atas pesanan Anda. Kami telah menerima pembayaran dan akan segera memproses pesanan Anda.
                </p>

                {orderId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">Nomor Pesanan</p>
                        <p className="text-lg font-mono font-bold text-gray-900">{orderId}</p>
                    </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="font-medium text-blue-900 mb-1">Langkah Selanjutnya:</p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Konfirmasi pesanan telah dikirim ke email Anda</li>
                                <li>• Pesanan akan diproses dalam 1-2 hari kerja</li>
                                <li>• Anda akan menerima nomor resi pengiriman</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Button
                        onClick={() => router.push("/")}
                        className="w-full bg-green-600 hover:bg-green-700 h-12"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Kembali ke Beranda
                    </Button>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    Ada pertanyaan? Hubungi customer service kami
                </p>
            </motion.div>
        </div>
    );
}
