"use server";

import { calculateShippingCost, getProvinces, getCities } from "@/lib/rajaongkir";
import { formatPrice } from "@/lib/utils";

export async function getProvincesAction() {
    return await getProvinces();
}

export async function getCitiesAction(provinceId: string) {
    return await getCities(provinceId);
}


export async function getShippingCost(destination: string, weight: number, courier: "jne" | "pos" | "tiki" = "jne") {
    const origin = "501"; // Yogyakarta (Mock Origin)
    const costs = await calculateShippingCost({ origin, destination, weight, courier });

    // Transform for Frontend
    return (costs || []).map((c: any) => ({
        service: c.service,
        description: c.description,
        cost: c.cost?.[0]?.value || 0,
        etd: c.cost?.[0]?.etd || "N/A",
        formattedCost: formatPrice(c.cost?.[0]?.value || 0)
    }));
}
