import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    weight: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.id === item.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                        isOpen: true,
                    });
                } else {
                    set({ items: [...currentItems, item], isOpen: true });
                }
            },
            removeItem: (id) => {
                const newItems = get().items.filter((i) => i.id !== id);
                // Auto-close cart if empty
                set({ items: newItems, isOpen: newItems.length > 0 ? get().isOpen : false });
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    const newItems = get().items.filter((i) => i.id !== id);
                    // Auto-close cart if empty
                    set({ items: newItems, isOpen: newItems.length > 0 ? get().isOpen : false });
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'herbal-cart-storage',
        }
    )
);
