"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { getProvincesAction, getCitiesAction, getShippingCost } from "@/app/actions/shipping";
import { createTransaction } from "@/app/actions/payment";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MapPin, Truck, CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Province {
    province_id: string;
    province: string;
}

interface City {
    city_id: string;
    city_name: string;
    type: string;
    postal_code: string;
}

interface ShippingOption {
    service: string;
    description: string;
    cost: number;
    etd: string;
    formattedCost: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCartStore();

    // Customer Info
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [address, setAddress] = useState("");

    // Shipping
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCourier, setSelectedCourier] = useState<"jne" | "pos" | "tiki">("jne");
    const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

    // UI States
    const [step, setStep] = useState(1);
    const [loadingShipping, setLoadingShipping] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    // Load provinces on mount
    useEffect(() => {
        async function loadProvinces() {
            const data = await getProvincesAction();
            setProvinces(data);
        }
        loadProvinces();
    }, []);

    // Load cities when province changes
    useEffect(() => {
        if (selectedProvince) {
            async function loadCities() {
                setCities([]);
                setSelectedCity("");
                setShippingOptions([]);
                setSelectedShipping(null);
                const data = await getCitiesAction(selectedProvince);
                setCities(data);
            }
            loadCities();
        }
    }, [selectedProvince]);

    // Calculate shipping when city and courier selected
    const calculateShipping = async () => {
        if (!selectedCity || !selectedCourier) {
            setError("Pilih kota dan kurir terlebih dahulu");
            return;
        }

        setLoadingShipping(true);
        setError("");
        try {
            const totalWeight = items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
            const options = await getShippingCost(selectedCity, totalWeight, selectedCourier);
            setShippingOptions(options);
            if (options.length > 0) {
                setSelectedShipping(options[0]); // Auto-select first option
            }
        } catch (err) {
            setError("Gagal menghitung ongkir. Silakan coba lagi.");
        } finally {
            setLoadingShipping(false);
        }
    };

    const handleCheckout = async () => {
        if (!customerName || !customerEmail || !customerPhone || !address) {
            setError("Harap lengkapi semua data pelanggan");
            setStep(1);
            return;
        }

        if (!selectedShipping) {
            setError("Harap pilih metode pengiriman");
            setStep(2);
            return;
        }

        setProcessing(true);
        setError("");

        try {
            const total = totalPrice() + selectedShipping.cost;
            const result = await createTransaction(
                items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total,
                selectedShipping.cost,
                {
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    address: `${address}, ${cities.find(c => c.city_id === selectedCity)?.city_name || ""}, ${provinces.find(p => p.province_id === selectedProvince)?.province || ""}`
                }
            );

            // Load Midtrans Snap
            if (typeof window !== "undefined" && (window as any).snap) {
                (window as any).snap.pay(result.token, {
                    onSuccess: function () {
                        clearCart();
                        router.push(`/order-success?orderId=${result.orderId}`);
                    },
                    onPending: function () {
                        clearCart();
                        router.push(`/order-pending?orderId=${result.orderId}`);
                    },
                    onError: function () {
                        setError("Pembayaran gagal. Silakan coba lagi.");
                        setProcessing(false);
                    },
                    onClose: function () {
                        setProcessing(false);
                    }
                });
            } else {
                setError("Midtrans tidak tersedia. Silakan refresh halaman.");
                setProcessing(false);
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
            setProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
                    <p className="text-gray-600 mb-6">Tambahkan produk ke keranjang terlebih dahulu</p>
                    <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700">
                        Belanja Sekarang
                    </Button>
                </div>
            </div>
        );
    }

    const subtotal = totalPrice();
    const shippingCost = selectedShipping?.cost || 0;
    const grandTotal = subtotal + shippingCost;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            {/* Midtrans Snap Script */}
            <script
                src={process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
                    ? "https://app.midtrans.com/snap/snap.js"
                    : "https://app.sandbox.midtrans.com/snap/snap.js"}
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || process.env.MIDTRANS_CLIENT_KEY}
            />

            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step Indicator */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`flex items-center ${step >= 1 ? "text-green-600" : "text-gray-400"}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}>1</div>
                                    <span className="ml-2 font-medium">Data Diri</span>
                                </div>
                                <div className="flex-1 h-1 mx-4 bg-gray-200">
                                    <div className={`h-full ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`} style={{ width: step >= 2 ? "100%" : "0%" }} />
                                </div>
                                <div className={`flex items-center ${step >= 2 ? "text-green-600" : "text-gray-400"}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-green-600 text-white" : "bg-gray-200"}`}>2</div>
                                    <span className="ml-2 font-medium">Pengiriman</span>
                                </div>
                                <div className="flex-1 h-1 mx-4 bg-gray-200">
                                    <div className={`h-full ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`} style={{ width: step >= 3 ? "100%" : "0%" }} />
                                </div>
                                <div className={`flex items-center ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-green-600 text-white" : "bg-gray-200"}`}>3</div>
                                    <span className="ml-2 font-medium">Pembayaran</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Customer Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center mb-6">
                                <MapPin className="w-6 h-6 text-green-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Data Pelanggan</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="08123456789"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                                    />
                                </div>
                                <Button
                                    onClick={() => {
                                        if (customerName && customerEmail && customerPhone && address) {
                                            setStep(2);
                                            setError("");
                                        } else {
                                            setError("Harap lengkapi semua data pelanggan");
                                        }
                                    }}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    Lanjut ke Pengiriman
                                </Button>
                            </div>
                        </div>

                        {/* Step 2: Shipping */}
                        {step >= 2 && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center mb-6">
                                    <Truck className="w-6 h-6 text-green-600 mr-2" />
                                    <h2 className="text-xl font-bold text-gray-900">Metode Pengiriman</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label>
                                            <select
                                                value={selectedProvince}
                                                onChange={(e) => setSelectedProvince(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="">Pilih Provinsi</option>
                                                {provinces.map((prov) => (
                                                    <option key={prov.province_id} value={prov.province_id}>
                                                        {prov.province}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten *</label>
                                            <select
                                                value={selectedCity}
                                                onChange={(e) => setSelectedCity(e.target.value)}
                                                disabled={!selectedProvince}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                                            >
                                                <option value="">Pilih Kota</option>
                                                {cities.map((city) => (
                                                    <option key={city.city_id} value={city.city_id}>
                                                        {city.type} {city.city_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Kurir *</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {(["jne", "pos", "tiki"] as const).map((courier) => (
                                                <button
                                                    key={courier}
                                                    onClick={() => {
                                                        setSelectedCourier(courier);
                                                        setShippingOptions([]);
                                                        setSelectedShipping(null);
                                                    }}
                                                    className={`px-4 py-3 border-2 rounded-lg font-medium uppercase transition-colors ${selectedCourier === courier
                                                            ? "border-green-600 bg-green-50 text-green-700"
                                                            : "border-gray-300 hover:border-gray-400"
                                                        }`}
                                                >
                                                    {courier}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={calculateShipping}
                                        disabled={!selectedCity || !selectedCourier || loadingShipping}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        {loadingShipping ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Menghitung Ongkir...
                                            </>
                                        ) : (
                                            "Hitung Ongkir"
                                        )}
                                    </Button>

                                    {shippingOptions.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Layanan</label>
                                            {shippingOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedShipping(option)}
                                                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${selectedShipping?.service === option.service
                                                            ? "border-green-600 bg-green-50"
                                                            : "border-gray-300 hover:border-gray-400"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="font-medium text-gray-900">{option.service}</div>
                                                            <div className="text-sm text-gray-600">{option.description}</div>
                                                            <div className="text-sm text-gray-500">Estimasi: {option.etd} hari</div>
                                                        </div>
                                                        <div className="text-lg font-bold text-green-600">{option.formattedCost}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {selectedShipping && (
                                        <Button
                                            onClick={() => setStep(3)}
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            Lanjut ke Pembayaran
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {step >= 3 && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center mb-6">
                                    <CreditCard className="w-6 h-6 text-green-600 mr-2" />
                                    <h2 className="text-xl font-bold text-gray-900">Pembayaran</h2>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Anda akan diarahkan ke halaman pembayaran Midtrans yang aman.
                                        Berbagai metode pembayaran tersedia: Transfer Bank, E-Wallet, Kartu Kredit, dan lainnya.
                                    </p>
                                </div>
                                <Button
                                    onClick={handleCheckout}
                                    disabled={processing}
                                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>Bayar Sekarang - {formatPrice(grandTotal)}</>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        {item.image && (
                                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-600">{item.quantity}x {formatPrice(item.price)}</p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Ongkir</span>
                                    <span className="font-medium">
                                        {selectedShipping ? formatPrice(shippingCost) : "-"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                                    <span>Total</span>
                                    <span className="text-green-600">{formatPrice(grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
