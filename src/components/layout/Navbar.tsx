"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
    const { toggleCart, totalItems } = useCartStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                    NusaPrima
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Produk
                    </Link>
                    <Link href="/#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Tentang Kami
                    </Link>
                    <Link href="/#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Testimoni
                    </Link>
                    <Link href="/kontak" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Kontak
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={toggleCart}
                    >
                        <ShoppingCart className="w-6 h-6 text-gray-700" />
                        {totalItems() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems()}
                            </span>
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-6 h-6 text-gray-700" />
                    </Button>
                </div>
            </div>
        </motion.header>
    );
};
