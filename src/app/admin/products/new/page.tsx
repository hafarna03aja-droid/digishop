"use client";

import { createProduct } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const router = useRouter();

    async function clientAction(formData: FormData) {
        await createProduct(formData);
        router.push("/admin/products");
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Form Produk</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={clientAction} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nama Produk</label>
                            <Input name="name" required placeholder="Contoh: Madu Hutan Liar" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Harga (Rp)</label>
                                <Input name="price" type="number" required placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Stok</label>
                                <Input name="stock" type="number" required placeholder="0" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Berat (gram)</label>
                            <Input name="weight" type="number" required placeholder="500" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL Gambar</label>
                            <Input name="image" placeholder="https://..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Deskripsi</label>
                            <textarea
                                name="description"
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                placeholder="Deskripsi produk..."
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan Produk</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
