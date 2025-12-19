"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Eye, Truck, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product?: {
        name: string;
        image: string | null;
    };
}

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    totalAmount: number;
    shippingCost: number;
    status: "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";
    paymentStatus: string;
    createdAt: string;
    items?: OrderItem[];
}

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800"
} as const;

const statusIcons = {
    PENDING: Package,
    PAID: CheckCircle,
    SHIPPED: Truck,
    COMPLETED: CheckCircle,
    CANCELLED: XCircle
} as const;

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('Order')
                .select(`
                    *,
                    items:OrderItem(
                        id,
                        productId,
                        quantity,
                        price,
                        product:Product(name, image)
                    )
                `)
                .order('createdAt', { ascending: false });

            if (error) throw error;
            setOrders((data as any[]) || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
        setUpdating(true);
        try {
            const { error } = await supabase
                .from('Order')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            // Update local state
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
            alert(`Order status updated to ${newStatus}`);
        } catch (error) {
            console.error("Failed to update order:", error);
            alert("Failed to update order status");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Manajemen Pesanan</h1>
                <Button
                    onClick={fetchOrders}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {(['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'] as const).map(status => {
                    const count = (orders || []).filter(o => o.status === status).length;
                    const Icon = statusIcons[status];
                    return (
                        <div key={status} className="bg-white rounded-lg shadow-sm border p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{status}</p>
                                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                                </div>
                                <Icon className={`w-8 h-8 ${statusColors[status].split(' ')[1]}`} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Pelanggan</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Pembayaran</th>
                                <th className="px-6 py-3">Tanggal</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        Belum ada pesanan masuk
                                    </td>
                                </tr>
                            ) : (
                                (orders || []).map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-xs text-gray-500">{order.customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{formatPrice(order.totalAmount)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                onClick={() => setSelectedOrder(order)}
                                                variant="ghost"
                                                size="sm"
                                                className="gap-1"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Detail Pesanan</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Informasi Pesanan</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order ID:</span>
                                        <span className="font-mono font-medium">{selectedOrder.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tanggal:</span>
                                        <span className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status Pembayaran:</span>
                                        <span className={`font-medium ${selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {selectedOrder.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Informasi Pelanggan</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                    <div>
                                        <p className="text-gray-600">Nama:</p>
                                        <p className="font-medium">{selectedOrder.customerName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Email:</p>
                                        <p className="font-medium">{selectedOrder.customerEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Telepon:</p>
                                        <p className="font-medium">{selectedOrder.customerPhone}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Alamat:</p>
                                        <p className="font-medium">{selectedOrder.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Produk</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item) => (
                                        <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                                            {item.product?.image && (
                                                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{item.product?.name || `Product ${item.productId}`}</p>
                                                <p className="text-sm text-gray-600">{item.quantity}x {formatPrice(item.price)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="border-t pt-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">{formatPrice(selectedOrder.totalAmount - selectedOrder.shippingCost)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ongkir:</span>
                                        <span className="font-medium">{formatPrice(selectedOrder.shippingCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                                        <span>Total:</span>
                                        <span className="text-green-600">{formatPrice(selectedOrder.totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Update Status */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(['PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'] as const).map((status) => (
                                        <Button
                                            key={status}
                                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                            disabled={updating || selectedOrder.status === status}
                                            size="sm"
                                            variant={selectedOrder.status === status ? "default" : "outline"}
                                            className={selectedOrder.status === status ? statusColors[status] : ""}
                                        >
                                            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : status}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
