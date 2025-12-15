"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
    {
        name: "Siti Nurhaliza",
        role: "Ibu Rumah Tangga",
        content: "Sejak rutin konsumsi Madu Hutan dari sini, anak-anak jadi jarang sakit. Kualitasnya top, pengiriman cepat!",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
        name: "Budi Santoso",
        role: "Karyawan Swasta",
        content: "Teh Hijau Detox-nya ampuh banget buat nurunin berat badan. Badan terasa lebih ringan dan segar tiap pagi.",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        name: "Rina Wijaya",
        role: "Mahasiswi",
        content: "Suka banget sama pelayanan dan kemasannya yang rapi. Minyak Zaitunnya asli, bagus buat kulit wajahku.",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Mereka?</h2>
                    <p className="text-gray-600">Ribuan pelanggan telah merasakan manfaat alami produk kami.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testi, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card className="h-full border-green-100 bg-green-50/30 hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-8">
                                    <Quote className="w-10 h-10 text-green-200 mb-4" />
                                    <p className="text-gray-700 italic mb-6">"{testi.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-200">
                                            <img src={testi.avatar} alt={testi.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testi.name}</h4>
                                            <p className="text-xs text-gray-500">{testi.role}</p>
                                        </div>
                                        <div className="ml-auto flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
