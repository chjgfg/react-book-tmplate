// // 顶部购物车图标
// "use client";

// import Link from "next/link";
// import { useCart } from "@/app/providers/CartProvider";

// export default function CartIcon() {
//     const { totalCount } = useCart();

//     return (
//         <Link href="/cart" className="relative">
//             🛒
//             {totalCount > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
//                     {totalCount}
//                 </span>
//             )}
//         </Link>
//     );
// }


// /**
// | 类名                    | 作用                      |
// | --------------------- | ----------------------- |
// | `relative / absolute` | 角标定位                    |
// | `-top-2 -right-3`     | 负偏移                     |
// | `rounded-full`        | 圆形                      |
// | `text-xs`             | 小号文字                    |
// | 条件渲染                  | `totalCount > 0 && ...` |

//  */