"use client";

import { useEffect, useState } from "react";
import { Timer, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FlashSale = () => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
            >
                <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-xl shadow-2xl border border-red-400/30">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-white/20 rounded-lg animate-pulse">
                                <Timer className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-lg leading-tight">FLASH SALE!</p>
                                <p className="text-sm text-white/90">Diskon 50% untuk Pembelian Pertama</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 font-mono text-xl font-bold bg-black/20 rounded-lg py-2">
                            <div className="bg-white/20 px-3 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</div>
                            <span>:</span>
                            <div className="bg-white/20 px-3 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</div>
                            <span>:</span>
                            <div className="bg-white/20 px-3 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};


