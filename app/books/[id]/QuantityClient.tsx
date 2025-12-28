"use client";

import { useState } from "react";
import { useCart } from "@/app/providers/CartProvider";
import { useRouter } from "next/navigation";


export default function QuantityClient({ id, title, price, }: { id: number; title: string; price: number; }) {
    const [count, setCount] = useState(1);
    const { addToCart } = useCart();
    const router = useRouter();


    return (
        <div className="mt-6 space-y-4">
            {/* 数量选择 */}
            <div className="flex items-center gap-4">
                <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={count <= 1} onClick={() => setCount(count - 1)}>-</button>
                <span className="text-lg font-semibold">{count}</span>
                <button className="px-3 py-1 border rounded" onClick={() => setCount(count + 1)}>+</button>
            </div>

            {/* 总价 */}
            <p className="text-red-500 font-bold">
                总价：￥{count * price}
            </p>

            {/* 加入购物车 */}
            <button onClick={() => {
                    console.log("ADD TO CART CLICKED");
                    addToCart({ id, title, price,  }, count,);
                    router.push("/cart");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                加入购物车
            </button>
        </div>
    );
}


/**
| 类名                        | 作用            |
| ------------------------- | ------------- |
| `disabled:opacity-50`     | 条件样式（状态驱动 UI） |
| `flex items-center gap-4` | 水平排列          |
| `px-3 py-1`               | 按钮内边距         |
| `font-semibold`           | 半粗体           |

 */