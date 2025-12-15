import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/app/actions/product";
import Link from "next/link";

// Force dynamic rendering to avoid build-time database calls
export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
    let products: any[] = [];

    try {
        products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
                <Link href="/admin/products/new">
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" /> Tambah Produk
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-gray-700 uppercase">
                        <tr>
                            <th className="px-6 py-3">Nama Produk</th>
                            <th className="px-6 py-3">Harga</th>
                            <th className="px-6 py-3">Stok</th>
                            <th className="px-6 py-3">Rating</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                    Belum ada produk. Silakan tambah produk baru.
                                </td>
                            </tr>
                        ) : (
                            products.map((product: any) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden">
                                                {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                                            </div>
                                            {product.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4">{product.rating}</td>
                                    <td className="px-6 py-4">
                                        <form action={async () => {
                                            "use server";
                                            await deleteProduct(product.id);
                                        }}>
                                            <button className="text-red-600 hover:text-red-800 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
