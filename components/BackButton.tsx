"use client"; // 只有这个小按钮是客户端组件

// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";

// export default function BackButton() {
//     const router = useRouter();
//     return (
//         <button
//             onClick={() => router.back()}
//             className="text-gray-500 hover:text-blue-600 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest group"
//         >
//             <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600">
//                 <ArrowLeft className="w-3.5 h-3.5" />
//             </div>
//             返回上级
//         </button>
//     );
// }
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

// 定义 Props 类型，使其支持可选的 className
interface BackButtonProps {
    className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
    const router = useRouter();

    return (
        <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            // 关键：将传入的 className 与默认样式合并
            // 默认提供基础样式，传入的样式可以覆盖它
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all ${className ? className : "bg-white text-slate-900 shadow-sm border border-slate-100 hover:bg-slate-50"
                }`}
        >
            <ChevronLeft className="w-4 h-4" /> 返回
        </motion.button>
    );
}