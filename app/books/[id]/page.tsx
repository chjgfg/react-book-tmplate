// 要把书加进购物车
import { notFound } from "next/navigation";
import QuantityClient from "./QuantityClient";
import { ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";


const books = [
    { id: 1, title: "深入理解 JavaScript", author: "张三", price: 88, category: "编程语言", desc: "这是一本深度剖析 JS 底层运行机制的书籍，涵盖闭包、原型链及异步并发。" },
    { id: 2, title: "React 从入门到实战", author: "李四", price: 99, category: "前端开发", desc: "从零开始构建高质量 React 应用，掌握 Hooks、Fiber 架构与状态管理方案。" },
    { id: 3, title: "Next.js 实战指南", author: "王五", price: 109, desc: "全面解析 App Router 模式，带你实现服务端渲染与极致的 SEO 优化。" },
    { id: 4, title: "Node.js 架构艺术", author: "赵六", price: 129, category: "后端架构", desc: "true" },
    { id: 5, title: "TypeScript 高级编程", author: "钱七", price: 78, category: "编程语言", desc: "false" },
    { id: 6, title: "Tailwind CSS 魔法", author: "孙八", price: 66, category: "前端开发", desc: "true" },
];


export default async function BookDetail({ params, }: { params: Promise<{ id: string }>; }) {
    await new Promise((r) => setTimeout(r, 800));

    const { id } = await params;
    console.log("id", id);
    const bookId = Number(id);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-24">
            {/* 顶部导航返回 */}
            <div className="max-w-4xl mx-auto p-4">
                <BackButton /> {/* 引入客户端按钮 */}
            </div>

            <main className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

                    {/* 左侧：书籍封面模拟 */}
                    <div className="w-full md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 aspect-[3/4] flex items-center justify-center p-8 text-white shadow-inner">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📖</div>
                            <h2 className="text-xl font-bold leading-tight">{book.title}</h2>
                            <div className="mt-4 w-12 h-1 bg-white/30 mx-auto rounded-full"></div>
                            <p className="mt-4 text-sm opacity-80">{book.author} 著</p>
                        </div>
                    </div>

                    {/* 右侧：书籍信息 */}
                    <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                                    {book.title}
                                </h1>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
                                    有现货
                                </span>
                            </div>

                            <p className="mt-2 text-gray-500 flex items-center gap-2">
                                <span>作者：</span>
                                <span className="text-gray-900 font-medium">{book.author}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500 italic text-sm">精品教程系列</span>
                            </p>

                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">内容简介</h3>
                                <p className="mt-2 text-gray-600 leading-relaxed">
                                    {book.desc || "暂无详细描述，这是一本值得深度阅读的技术好书。"}
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-50 pt-6">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">出版时间</p>
                                    <p className="text-sm font-medium text-gray-700">2024年10月</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">语言</p>
                                    <p className="text-sm font-medium text-gray-700">中文简体</p>
                                </div>
                            </div>
                        </div>

                        {/* 价格与操作区 */}
                        <div className="mt-10 flex items-end justify-between">
                            <div>
                                <p className="text-sm text-gray-400">单价</p>
                                <p className="text-3xl font-black text-red-500">
                                    <span className="text-xl">￥</span>{book.price}
                                </p>
                            </div>

                            {/* 客户端交互组件 */}
                            <div className="bg-gray-50 p-2 rounded-xl">
                                <QuantityClient id={book.id} title={book.title} price={book.price} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部额外信息 */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                        <span className="text-xl">🚚</span>
                        <div className="text-xs">
                            <p className="font-bold">极速物流</p>
                            <p className="text-gray-400">预计 24 小时内发货</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                        <span className="text-xl">🛡️</span>
                        <div className="text-xs">
                            <p className="font-bold">正版保证</p>
                            <p className="text-gray-400">出版社官方授权直接采购</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                        <span className="text-xl">✨</span>
                        <div className="text-xs">
                            <p className="font-bold">无忧售后</p>
                            <p className="text-gray-400">7天无理由退换货</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}