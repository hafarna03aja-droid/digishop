import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Percent, Settings } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-green-600">AdminPanel</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                        <Package className="w-5 h-5" /> Produk
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                        <ShoppingCart className="w-5 h-5" /> Pesanan
                    </Link>
                    <Link href="/admin/marketing" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                        <Percent className="w-5 h-5" /> Marketing
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" /> Pengaturan
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
