"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { motion } from "framer-motion";

// Mock data (replace with API call later)
const PRODUCTS = [
    {
        id: "1",
        name: "Madu Hutan Liar Sumbawa",
        description: "Madu murni dari hutan Sumbawa, kaya antioksidan.",
        price: 150000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e8913d179?q=80&w=2000&auto=format&fit=crop",
        stock: 50,
        weight: 500
    },
    {
        id: "2",
        name: "Teh Hijau Detox",
        description: "Melancarkan pencernaan dan membuang racun tubuh.",
        price: 75000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2000&auto=format&fit=crop",
        stock: 100,
        weight: 200
    },
    {
        id: "3",
        name: "Minyak Zaitun Extra Virgin",
        description: "Kualitas terbaik untuk kesehatan jantung dan kulit.",
        price: 120000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1474979266404-7caddbcd1bef?q=80&w=2000&auto=format&fit=crop",
        stock: 30,
        weight: 500
    },
    {
        id: "4",
        name: "Jahe Merah Instan",
        description: "Hangatkan tubuh dan tingkatkan imunitas.",
        price: 45000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1632367803606-2b4751da5c00?q=80&w=2000&auto=format&fit=crop",
        stock: 200,
        weight: 250
    }
];

export const ProductShowcase = () => {
    const { addItem, toggleCart } = useCartStore();

    const handleAddToCart = (product: any) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            weight: product.weight
        });
        toggleCart(); // Open cart after adding
    };

    return (
        <section id="products" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Pilihan Kami</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Kami hanya menyediakan produk terbaik yang telah teruji kualitas dan memberikan nilai terbaik untuk Anda.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-none group">
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        {product.rating}
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-700 font-bold text-lg">{formatPrice(product.price)}</span>
                                        <span className="text-xs text-gray-400">{product.stock} Tersedia</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-5 pt-0">
                                    <Button className="w-full text-white bg-green-600 hover:bg-green-700 font-medium" onClick={() => handleAddToCart(product)}>
                                        <ShoppingCart className="w-4 h-4 mr-2" /> Beli
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
