

// "use client";

// import Link from "next/link";

// type Book = {
//   id: number;
//   title: string;
//   author: string;
//   price: number;
//   category?: string; // 可选：增加分类显示
// };

// export default function BookCard({ book }: { book: Book }) {
//   // 定义一组高级的渐变背景，对应不同的书籍
//   const gradients = [
//     "from-slate-700 to-slate-900",
//     "from-indigo-600 to-blue-700",
//     "from-emerald-600 to-teal-800",
//     "from-rose-600 to-orange-700",
//   ];
//   const bgGradient = gradients[book.id % gradients.length];
//   console.log("book", book);
//   return (
//     <Link href={`/books/${book.id}`} className="group block">
//       <div className="relative flex flex-col h-full transition-all duration-300">

//         {/* 1. 书籍封面区域 (视觉核心) */}
//         <div className="relative aspect-[3/4] w-full mb-4 overflow-hidden rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">

//           {/* 模拟书本背景 */}
//           <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} transform group-hover:scale-105 transition-transform duration-500`}></div>

//           {/* 装饰：模拟书脊阴影，增加厚度感 */}
//           <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 blur-[1px]"></div>
//           <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/10"></div>

//           {/* 封面文字内容 */}
//           <div className="relative h-full p-6 flex flex-col justify-between text-white/90">
//             <div>
//               <div className="h-0.5 w-6 bg-white/30 rounded-full mb-3"></div>
//               <h3 className="text-xl font-black leading-tight tracking-tight line-clamp-3">
//                 {book.title}
//               </h3>
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
//                 Official Edition
//               </span>
//               <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
//                 <span className="text-xs">📖</span>
//               </div>
//             </div>
//           </div>

//           {/* 悬浮时的亮光掠过效果 */}
//           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//         </div>

//         {/* 2. 书籍详情区域 */}
//         <div className="flex flex-col flex-grow px-1">
//           <div className="flex items-start justify-between gap-2">
//             <h2 className="text-gray-900 font-bold leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
//               {book.title}
//             </h2>
//             {/* 这里的 Hot 标签可以根据逻辑添加 */}
//             {book.price > 100 && (
//               <span className="shrink-0 bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded font-bold">精选</span>
//             )}
//           </div>

//           <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1">
//             <span className="w-4 h-[1px] bg-gray-200"></span>
//             {book.author}
//           </p>

//           <div className="mt-3 flex items-center justify-between">
//             <div className="flex items-baseline">
//               <span className="text-red-500 text-xs font-bold">￥</span>
//               <span className="text-xl font-black text-red-500 tracking-tighter">
//                 {book.price}
//               </span>
//             </div>

//             {/* 模拟按钮，增强点击暗示 */}
//             <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
//               <span className="text-blue-600 text-xs font-bold flex items-center">
//                 详情 <span className="ml-1">→</span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// 主页书
"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // 导入 motion

export default function BookCard({ book }: { book: any }) {
  const gradients = [
    "from-slate-700 to-slate-900",
    "from-indigo-600 to-blue-700",
    "from-emerald-600 to-teal-800",
    "from-rose-600 to-orange-700",
  ];
  const bgGradient = gradients[book.id % gradients.length];

  return (
    <Link href={`/books/${book.id}`} className="block">
      {/* 将 div 换成 motion.div */}
      <motion.div
        // 悬停动画：轻微放大，并向上移动
        whileHover={{
          y: -10,
          scale: 1.02,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        // 点击动画：轻微缩小反馈
        whileTap={{ scale: 0.95 }}
        className="relative flex flex-col h-full"
      >
        {/* 书籍封面 */}
        <div className="relative aspect-[3/4] w-full mb-4 overflow-hidden rounded-2xl shadow-lg shadow-black/10 transition-shadow group-hover:shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />

          {/* 扫光动画 */}
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
          />

          <div className="relative h-full p-6 flex flex-col justify-between text-white/90">
            <h3 className="text-xl font-black leading-tight line-clamp-3">{book.title}</h3>
            <div className="flex justify-between items-center text-[10px] font-bold opacity-60">
              <span>{book.author}</span>
              <span>📖 READ</span>
            </div>
          </div>
        </div>

        {/* 文字信息 */}
        <h2 className="text-gray-900 font-bold truncate">{book.title}</h2>
        <p className="text-red-500 font-black mt-1">¥{book.price}</p>
      </motion.div>
    </Link>
  );
}