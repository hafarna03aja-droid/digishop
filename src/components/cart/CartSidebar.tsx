"use client";

// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, User, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Minimal Sheet implementation for this specific use case if shadcn/ui sheet is not fully installed
// Or assuming we build a custom sidebar if we don't want to rely on potential shadcn bloat for now.
// Let's build a custom accessible sidebar to be safe and dependency-free (except framer-motion).

export const CartSidebar = () => {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Shipping State
    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCourier, setSelectedCourier] = useState<"jne" | "pos" | "tiki">("jne");
    const [shippingCost, setShippingCost] = useState<number>(0);
    const [isCalculating, setIsCalculating] = useState(false);

    // Customer Form State
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load Provinces
        import("@/app/actions/shipping").then(({ getProvincesAction }) => {
            getProvincesAction().then(setProvinces);
        });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            import("@/app/actions/shipping").then(({ getCitiesAction }) => {
                getCitiesAction(selectedProvince).then(setCities);
            });
            setSelectedCity("");
            setShippingCost(0);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCity && selectedCourier && items.length > 0) {
            setIsCalculating(true);
            const totalWeight = items.reduce((acc, item) => acc + (item.weight || 200) * item.quantity, 0); // Default 200g
            import("@/app/actions/shipping").then(({ getShippingCost }) => {
                getShippingCost(selectedCity, totalWeight, selectedCourier)
                    .then(costs => {
                        if (costs.length > 0) {
                            setShippingCost(costs[0].cost);
                        } else {
                            setShippingCost(0);
                        }
                    })
                    .finally(() => setIsCalculating(false));
            });
        }
    }, [selectedCity, selectedCourier, items]);

    const finalTotal = totalPrice() + shippingCost;

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-green-600" />
                                <h2 className="text-xl font-bold text-gray-900">Keranjang Belanja</h2>
                            </div>
                            <Button variant="ghost" size="sm" onClick={toggleCart}>Tutup</Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Keranjang Anda kosong</p>
                                        <p className="text-sm text-gray-400">Yuk, mulai belanja produk pilihan Anda!</p>
                                    </div>
                                    <Button variant="outline" onClick={toggleCart}>Mulai Belanja</Button>
                                </div>
                            ) : (
                                <>
                                    {(items || []).map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            className="flex gap-4 border-b pb-4 last:border-b-0"
                                        >
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                                <p className="text-green-600 font-bold text-sm mb-2">{formatPrice(item.price)}</p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3 text-gray-600" />
                                                        </button>
                                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all"
                                                        >
                                                            <Plus className="w-3 h-3 text-gray-600" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-400 hover:text-red-600 p-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Customer Info Section */}
                                    <div className="pt-4 border-t space-y-4">
                                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                            <User className="w-4 h-4 text-green-600" />
                                            Data Pemesan
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    placeholder="Nama Lengkap"
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                    className="pl-10 placeholder:text-gray-500"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={customerEmail}
                                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                                    className="pl-10 placeholder:text-gray-500"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    type="tel"
                                                    placeholder="No. WhatsApp (08xxx)"
                                                    value={customerPhone}
                                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                                    className="pl-10 placeholder:text-gray-500"
                                                />
                                            </div>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <textarea
                                                    placeholder="Alamat Lengkap"
                                                    value={customerAddress}
                                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                                    rows={2}
                                                    className="w-full pl-10 pr-3 py-2 text-base border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Section */}
                                    <div className="pt-4 border-t space-y-4">
                                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-green-600" />
                                            Pengiriman
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-600">Provinsi</label>
                                                    <select
                                                        className="w-full p-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                        value={selectedProvince}
                                                        onChange={(e) => setSelectedProvince(e.target.value)}
                                                    >
                                                        <option value="">Pilih Provinsi</option>
                                                        {(provinces || []).map(p => (
                                                            <option key={p.province_id} value={p.province_id}>{p.province}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-600">Kota/Kabupaten</label>
                                                    <select
                                                        className="w-full p-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.target.value)}
                                                        disabled={!selectedProvince}
                                                    >
                                                        <option value="">Pilih Kota</option>
                                                        {(cities || []).map(c => (
                                                            <option key={c.city_id} value={c.city_id}>{c.type} {c.city_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-600">Kurir</label>
                                                <select
                                                    className="w-full p-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    value={selectedCourier}
                                                    onChange={(e) => setSelectedCourier(e.target.value as any)}
                                                >
                                                    <option value="jne">JNE</option>
                                                    <option value="pos">POS Indonesia</option>
                                                    <option value="tiki">TIKI</option>
                                                </select>
                                            </div>
                                            {isCalculating ? (
                                                <p className="text-xs text-gray-500 italic">Menghitung ongkir...</p>
                                            ) : shippingCost > 0 && (
                                                <div className="flex justify-between text-sm font-medium text-green-700 bg-green-50 p-2 rounded">
                                                    <span>Ongkir ({selectedCourier.toUpperCase()})</span>
                                                    <span>{formatPrice(shippingCost)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t bg-gray-50 space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <span>Subtotal ({items.length} item)</span>
                                        <span className="font-medium">{formatPrice(totalPrice())}</span>
                                    </div>
                                </div>
                                <Link href="/checkout" className="block">
                                    <Button
                                        className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200"
                                        onClick={() => toggleCart()}
                                    >
                                        Checkout Sekarang
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <p className="text-xs text-center text-gray-500">
                                    * Data pengiriman akan diisi di halaman checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
