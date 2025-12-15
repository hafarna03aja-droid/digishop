"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const weight = Number(formData.get("weight"));
    // Image handling would typically involve upload to S3/Supabase Storage. 
    // For now we use a placeholder or text input URL.
    const image = formData.get("image") as string;

    await prisma.product.create({
        data: {
            name,
            price,
            stock,
            description,
            weight,
            image,
        }
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id }
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
}
