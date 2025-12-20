"use client";

import { motion } from "framer-motion";
import { Shield, Truck, HeartHandshake, Award } from "lucide-react";

export const AboutUs = () => {
    const features = [
        {
            icon: Shield,
            title: "Produk Berkualitas",
            description: "Semua produk melalui proses seleksi ketat untuk memastikan kualitas terbaik"
        },
        {
            icon: Truck,
            title: "Pengiriman Cepat",
            description: "Pengiriman ke seluruh Indonesia dengan mitra kurir terpercaya"
        },
        {
            icon: HeartHandshake,
            title: "Layanan Prima",
            description: "Customer service siap membantu Anda setiap hari kerja"
        },
        {
            icon: Award,
            title: "Garansi Resmi",
            description: "Jaminan produk asli dan garansi pengembalian dana"
        }
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tentang NusaPrima</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            NusaPrima adalah platform e-commerce terpercaya yang menyediakan berbagai produk berkualitas
                            mulai dari madu premium, kopi pilihan, hingga produk digital dan layanan jasa profesional.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
                    <p className="max-w-3xl mx-auto opacity-90">
                        Menjadi platform e-commerce terdepan di Indonesia yang menghubungkan produsen lokal berkualitas
                        dengan konsumen cerdas, serta menyediakan solusi digital inovatif untuk kebutuhan gaya hidup modern.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
