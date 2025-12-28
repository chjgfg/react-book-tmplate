// "use client";

// import { useState, useMemo } from "react";
// import BookCard from "@/components/BookCard";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sparkles, ArrowRight, BookOpen, FireExtinguisher as Fire } from "lucide-react";
// import Link from "next/link";
// import RequestBookModal from "@/components/RequestBookModal";

// const ALL_BOOKS = [
//   { id: 1, title: "深入理解 JavaScript", author: "张三", price: 88, category: "编程语言", hot: true },
//   { id: 2, title: "React 从入门到实战", author: "李四", price: 99, category: "前端开发", hot: false },
//   { id: 3, title: "Next.js 实战指南", author: "王五", price: 109, category: "全栈技术", hot: true },
//   { id: 4, title: "Node.js 架构艺术", author: "赵六", price: 129, category: "后端架构", hot: true },
//   { id: 5, title: "TypeScript 高级编程", author: "钱七", price: 78, category: "编程语言", hot: false },
//   { id: 6, title: "Tailwind CSS 魔法", author: "孙八", price: 66, category: "前端开发", hot: true },
// ];

// const CATEGORIES = ["全部", "编程语言", "前端开发", "全栈技术", "后端架构"];

// export default function Home() {
//   const [activeTab, setActiveTab] = useState("全部");
//   const [isRequestOpen, setIsRequestOpen] = useState(false);

//   // 激活过滤逻辑
//   const filteredBooks = useMemo(() => {
//     if (activeTab === "全部") return ALL_BOOKS;
//     return ALL_BOOKS.filter(book => book.category === activeTab);
//   }, [activeTab]);

//   return (
//     <div className="pb-20">
//       {/* 1. Hero Section - 现在按钮可以点了 */}
//       <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 mb-16 px-8 py-16 md:px-16 md:py-24 text-white shadow-2xl">
//         <div className="relative z-10 max-w-2xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6"
//           >
//             <Sparkles className="w-3 h-3" /> 2025 全新进阶系列
//           </motion.div>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter"
//           >
//             探索技术的边界，<br />
//             <span className="text-blue-500 italic">从好书开始。</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg"
//           >
//             精选前沿技术书籍，助力开发者实现技术跨越。现在加入会员，立享全场 8 折。
//           </motion.p>
//           <div className="flex flex-wrap gap-4">
//             <button
//               onClick={() => document.getElementById('book-grid')?.scrollIntoView({ behavior: 'smooth' })}
//               className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/25 flex items-center gap-2 active:scale-95"
//             >
//               立即开启阅读 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <Link href="/rewards/membership">
//               <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black transition-all active:scale-95">
//                 领取会员优惠
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* 背景光效动画 */}
//         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse"></div>
//         <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
//       </section>

//       {/* 2. Filter Section - 状态激活 */}
//       <div id="book-grid" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <BookOpen className="w-5 h-5 text-blue-600" />
//             <h2 className="text-3xl font-black text-gray-900 tracking-tight">精选图书</h2>
//           </div>
//           <p className="text-gray-400 text-sm font-medium">共发现 {filteredBooks.length} 本适合你的技术佳作</p>
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveTab(cat)}
//               className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all active:scale-90 ${activeTab === cat
//                 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
//                 : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
//                 }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 3. Book Grid - 增加动效 */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         <AnimatePresence mode="popLayout">
//           {filteredBooks.map((book, index) => (
//             <motion.div
//               key={book.id}
//               layout
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ duration: 0.4, delay: index * 0.05 }}
//               className="relative group"
//             >
//               {book.hot && (
//                 <div className="absolute -top-3 -right-3 z-20 bg-orange-500 text-white p-2 rounded-xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
//                   <Fire className="w-4 h-4" />
//                 </div>
//               )}
//               <BookCard book={book} />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* 4. 增强的 Empty State */}
//       {filteredBooks.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="py-32 text-center"
//         >
//           <div className="text-8xl mb-6 grayscale opacity-20">🔍</div>
//           <h3 className="text-xl font-black text-gray-900 mb-2">未发现相关书籍</h3>
//           <p className="text-gray-400 mb-8">尝试切换到其他分类看看？</p>
//           <button
//             onClick={() => setActiveTab("全部")}
//             className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
//           >
//             重置筛选
//           </button>
//         </motion.div>
//       )}

//       {/* 5. 底部功能区：现在按钮可以点击了 */}
//       <section className="mt-32 p-12 rounded-[3rem] bg-blue-50 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
//         <div className="max-w-md">
//           <h3 className="text-2xl font-black text-blue-900 mb-2">没找到想要的？</h3>
//           <p className="text-blue-600/60 text-sm">告诉我们你感兴趣的技术领域，我们将为你精准补货。</p>
//         </div>
//         <button
//           onClick={() => setIsRequestOpen(true)} // 触发弹窗
//           className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95"
//         >
//           提交购书需求
//         </button>
//       </section>

//       {/* 购书需求弹窗组件 */}
//       <RequestBookModal
//         isOpen={isRequestOpen}
//         onClose={() => setIsRequestOpen(false)}
//       />
//     </div>
//   );
// }


"use client";

import { useState, useMemo, useEffect } from "react";
import BookCard from "@/components/BookCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, FireExtinguisher as Fire, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import RequestBookModal from "@/components/RequestBookModal";

// 1. 定义轮播图数据
const HERO_SLIDES = [
  {
    id: 1,
    tag: "2025 全新进阶系列",
    title: "探索技术的边界， 从好书开始。",
    desc: "精选前沿技术书籍，助力开发者实现技术跨越。现在加入会员，立享全场 8 折。",
    buttonText: "立即开启阅读",
    color: "bg-slate-900",
    accent: "text-blue-500",
    btnColor: "bg-blue-600"
  },
  {
    id: 2,
    tag: "限时活动",
    title: "沉浸式学习体验， 构筑知识体系。",
    desc: "不仅仅是阅读，更是成长。参与社区打卡任务，赢取极客限量周边卡牌。",
    buttonText: "去广场看看",
    color: "bg-indigo-950",
    accent: "text-indigo-400",
    btnColor: "bg-indigo-600"
  },
  {
    id: 3,
    tag: "作者入驻",
    title: "对话技术大牛， 掌握一手实战。",
    desc: "热门角色专栏更新，深入拆解分布式系统与现代前端架构。投资新书赢分红。",
    buttonText: "查看热门角色",
    color: "bg-slate-900",
    accent: "text-emerald-400",
    btnColor: "bg-emerald-600"
  }
];

// ... ALL_BOOKS 和 CATEGORIES 保持不变 ...
const ALL_BOOKS = [
  { id: 1, title: "深入理解 JavaScript", author: "张三", price: 88, category: "编程语言", hot: true },
  { id: 2, title: "React 从入门到实战", author: "李四", price: 99, category: "前端开发", hot: false },
  { id: 3, title: "Next.js 实战指南", author: "王五", price: 109, category: "全栈技术", hot: true },
  { id: 4, title: "Node.js 架构艺术", author: "赵六", price: 129, category: "后端架构", hot: true },
  { id: 5, title: "TypeScript 高级编程", author: "钱七", price: 78, category: "编程语言", hot: false },
  { id: 6, title: "Tailwind CSS 魔法", author: "孙八", price: 66, category: "前端开发", hot: true },
];
const CATEGORIES = ["全部", "编程语言", "前端开发", "全栈技术", "后端架构"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("全部");
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  // 2. 轮播图状态逻辑
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 为左, 1 为右

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const filteredBooks = useMemo(() => {
    if (activeTab === "全部") return ALL_BOOKS;
    return ALL_BOOKS.filter(book => book.category === activeTab);
  }, [activeTab]);

  return (
    <div className="pb-20">
      {/* 1. 左右滑动的 Hero Section */}
      <section className="relative h-[550px] md:h-[650px] mb-16 overflow-hidden rounded-[3rem] shadow-2xl group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute inset-0 ${HERO_SLIDES[currentSlide].color} px-8 py-16 md:px-16 md:py-24 text-white flex flex-col justify-center`}
          >
            <div className="relative z-10 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10 backdrop-blur-md"
              >
                <Sparkles className="w-3 h-3 text-yellow-400" /> {HERO_SLIDES[currentSlide].tag}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter"
              >
                {HERO_SLIDES[currentSlide].title.split(',')[0]},<br />
                <span className={`${HERO_SLIDES[currentSlide].accent} italic`}>
                  {HERO_SLIDES[currentSlide].title.split(',')[1]}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg"
              >
                {HERO_SLIDES[currentSlide].desc}
              </motion.p>

              <div className="flex flex-wrap gap-4">
                {/* 1. 每个页面都显示的通用按钮 */}
                <button
                  onClick={() => document.getElementById('book-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group px-8 py-4 ${HERO_SLIDES[currentSlide].btnColor} rounded-2xl font-black transition-all shadow-xl flex items-center gap-2 active:scale-95`}
                >
                  {HERO_SLIDES[currentSlide].buttonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. 只有在第一张幻灯片 (index 为 0) 时才显示会员按钮 */}
                <AnimatePresence>
                  {currentSlide === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <Link href="/rewards/membership">
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-black transition-all border border-white/10 active:scale-95 text-white">
                          领取会员优惠
                        </button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* 背景光效动画 */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px]"></div>
          </motion.div>
        </AnimatePresence>

        {/* 左右切换按钮 - 仅在悬停时显现 */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 z-20">
          <button
            onClick={() => paginate(-1)}
            className="pointer-events-auto p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="pointer-events-auto p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* 底部指示器 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={`h-1.5 transition-all rounded-full ${currentSlide === i ? "w-10 bg-white" : "w-2 bg-white/30"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ... 其余部分 (Filter Section, Book Grid 等) 保持不变 ... */}
      <div id="book-grid" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        {/* 此处代码同原版 */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">精选图书</h2>
          </div>
          <p className="text-gray-400 text-sm font-medium">共发现 {filteredBooks.length} 本适合你的技术佳作</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all active:scale-90 ${activeTab === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid 部分同原版 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group"
            >
              {book.hot && (
                <div className="absolute -top-3 -right-3 z-20 bg-orange-500 text-white p-2 rounded-xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                  <Fire className="w-4 h-4" />
                </div>
              )}
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Section 部分同原版 */}
      <section className="mt-32 p-12 rounded-[3rem] bg-blue-50 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
        <div className="max-w-md">
          <h3 className="text-2xl font-black text-blue-900 mb-2">没找到想要的？</h3>
          <p className="text-blue-600/60 text-sm">告诉我们你感兴趣的技术领域，我们将为你精准补货。</p>
        </div>
        <button
          onClick={() => setIsRequestOpen(true)}
          className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95"
        >
          提交购书需求
        </button>
      </section>

      <RequestBookModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      />
    </div>
  );
}