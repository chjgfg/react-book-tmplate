"use client";

import { useState, useMemo } from "react";
import BookCard from "@/components/BookCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, FireExtinguisher as Fire } from "lucide-react";
import Link from "next/link";
import RequestBookModal from "@/components/RequestBookModal";

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
  
  // 激活过滤逻辑
  const filteredBooks = useMemo(() => {
    if (activeTab === "全部") return ALL_BOOKS;
    return ALL_BOOKS.filter(book => book.category === activeTab);
  }, [activeTab]);

  return (
    <div className="pb-20">
      {/* 1. Hero Section - 现在按钮可以点了 */}
      <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 mb-16 px-8 py-16 md:px-16 md:py-24 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" /> 2025 全新进阶系列
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter"
          >
            探索技术的边界，<br />
            <span className="text-blue-500 italic">从好书开始。</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg"
          >
            精选前沿技术书籍，助力开发者实现技术跨越。现在加入会员，立享全场 8 折。
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('book-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/25 flex items-center gap-2 active:scale-95"
            >
              立即开启阅读 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/rewards/membership">
              <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black transition-all active:scale-95">
                领取会员优惠
              </button>
            </Link>
          </div>
        </div>

        {/* 背景光效动画 */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      </section>

      {/* 2. Filter Section - 状态激活 */}
      <div id="book-grid" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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

      {/* 3. Book Grid - 增加动效 */}
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

      {/* 4. 增强的 Empty State */}
      {filteredBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center"
        >
          <div className="text-8xl mb-6 grayscale opacity-20">🔍</div>
          <h3 className="text-xl font-black text-gray-900 mb-2">未发现相关书籍</h3>
          <p className="text-gray-400 mb-8">尝试切换到其他分类看看？</p>
          <button
            onClick={() => setActiveTab("全部")}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
          >
            重置筛选
          </button>
        </motion.div>
      )}

      {/* 5. 底部功能区：现在按钮可以点击了 */}
      <section className="mt-32 p-12 rounded-[3rem] bg-blue-50 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
        <div className="max-w-md">
          <h3 className="text-2xl font-black text-blue-900 mb-2">没找到想要的？</h3>
          <p className="text-blue-600/60 text-sm">告诉我们你感兴趣的技术领域，我们将为你精准补货。</p>
        </div>
        <button
          onClick={() => setIsRequestOpen(true)} // 触发弹窗
          className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95"
        >
          提交购书需求
        </button>
      </section>

      {/* 购书需求弹窗组件 */}
      <RequestBookModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      />
    </div>
  );
}