"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export const Hero = () => {
    const scrollToProducts = () => {
        const element = document.getElementById("products");
        if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-left z-10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Produk Berkualitas & Terpercaya
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Temukan Produk Terbaik untuk <span className="text-blue-600">Gaya Hidup Modern</span> Anda
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Dari madu premium, kopi pilihan, hingga produk digital dan layanan jasa profesional. Semua dalam satu tempat dengan kualitas terjamin.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200" onClick={scrollToProducts}>
                                Jelajahi Produk <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-blue-200 text-blue-700 hover:bg-blue-50">
                                Hubungi Kami
                            </Button>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-500" /> Produk Original
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-500" /> Pengiriman Cepat
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-500" /> Garansi Resmi
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual/Image */}
                    <motion.div
                        className="flex-1 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-gradient-to-tr from-green-200 to-yellow-100 rounded-full blur-3xl opacity-30 absolute inset-0 animate-pulse"></div>
                        {/* Placeholder for Product Image - User should update this */}
                        <div className="relative z-10 w-full max-w-[500px] mx-auto aspect-[4/3] bg-gray-100 rounded-2xl shadow-2xl border border-white/50 backdrop-blur-sm flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-yellow-500/10 mix-blend-overlay"></div>
                            <span className="text-gray-400 font-medium">Product Hero Image Placeholder</span>
                            {/*  Use generate_image later if requested */}
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px]"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                                    ⭐
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">4.9/5</p>
                                    <p className="text-xs text-gray-500">Dari 10k+ Ulasan</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
