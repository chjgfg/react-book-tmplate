// 全局购物车
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    count: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "count">, count: number) => void;
    removeFromCart: (id: number) => void;
    increaseCount: (id: number) => void;
    decreaseCount: (id: number) => void;
    clearCart: () => void;
    totalCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // ✅ 初始化：从 localStorage 恢复
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    // ✅ 持久化缓存
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    // ➕ 加入购物车
    const addToCart = (item: Omit<CartItem, "count">, count: number) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, count: i.count + count }
                        : i
                );
            }
            return [...prev, { ...item, count }];
        });
    };

    // ➕➖
    const increaseCount = (id: number) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, count: i.count + 1 } : i
            )
        );
    };

    const decreaseCount = (id: number) => {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.id === id ? { ...i, count: i.count - 1 } : i
                )
                .filter((i) => i.count > 0)
        );
    };

    // ❌ 删除单个
    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    // 🧹 清空
    const clearCart = () => setItems([]);

    const totalCount = items.reduce((sum, i) => sum + i.count, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                increaseCount,
                decreaseCount,
                clearCart,
                totalCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}


/**
| 能力              | 说明            |
| --------------- | ------------- |
| `createContext` | 全局共享状态        |
| `useEffect`     | 数据监听          |
| `localStorage`  | 数据缓存          |
| `reduce`        | 派生状态（总数 / 总价） |
| 条件合并            | 商品存在则叠加       |

 */