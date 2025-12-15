import axios from "axios";

// Base URL for RajaOngkir Starter/Pro API
const RAJAONGKIR_BASE_URL = "https://api.rajaongkir.com/starter"; // Change to 'pro' if needed
const API_KEY = process.env.RAJAONGKIR_API_KEY;

interface ShippingCostParams {
    origin: string;
    destination: string;
    weight: number;
    courier: "jne" | "pos" | "tiki";
}

export async function getProvinces() {
    if (!API_KEY) {
        // Mock Response
        return [
            { province_id: "1", province: "Bali" },
            { province_id: "6", province: "DKI Jakarta" },
            { province_id: "10", province: "Jawa Tengah" },
        ];
    }

    try {
        const response = await axios.get(`${RAJAONGKIR_BASE_URL}/province`, {
            headers: { key: API_KEY }
        });
        return response.data.rajaongkir.results;
    } catch (error) {
        console.error("RajaOngkir Error:", error);
        return [];
    }
}

export async function getCities(provinceId: string) {
    if (!API_KEY) {
        // Mock Response
        return [
            { city_id: "17", city_name: "Jakarta Barat", type: "Kota", postal_code: "11220" },
            { city_id: "444", city_name: "Surabaya", type: "Kota", postal_code: "60119" },
            { city_id: "501", city_name: "Yogyakarta", type: "Kota", postal_code: "55000" },
        ];
    }

    try {
        const response = await axios.get(`${RAJAONGKIR_BASE_URL}/city?province=${provinceId}`, {
            headers: { key: API_KEY }
        });
        return response.data.rajaongkir.results;
    } catch (error) {
        console.error("RajaOngkir Error:", error);
        return [];
    }
}

export async function calculateShippingCost({ origin, destination, weight, courier }: ShippingCostParams) {
    if (!API_KEY) {
        // Mock Response based on courier
        const basePrice = courier === 'jne' ? 10000 : (courier === 'pos' ? 8000 : 12000);
        return [
            {
                service: "REG",
                description: "Layanan Reguler",
                cost: [{ value: basePrice + (weight / 1000 * 5000), etd: "2-3" }]
            },
            {
                service: "YES",
                description: "Yakin Esok Sampai",
                cost: [{ value: basePrice * 2 + (weight / 1000 * 5000), etd: "1-1" }]
            }
        ];
    }

    try {
        const response = await axios.post(`${RAJAONGKIR_BASE_URL}/cost`, {
            origin,
            destination,
            weight,
            courier
        }, {
            headers: { key: API_KEY }
        });
        return response.data.rajaongkir.results[0].costs;
    } catch (error) {
        console.error("RajaOngkir Error:", error);
        return [];
    }
}
