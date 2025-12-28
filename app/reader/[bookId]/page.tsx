import Link from "next/link";
import { volumes as volumeList } from "@/app/reader/[bookId]/chapters";


// 模拟之前为你生成的 120 卷数据结构
const generateVolumes = () => {
    const volumes = [];
    let globalChapterId = 1;
    const topics = ["核心基础", "进阶实战", "底层源码", "性能优化", "生态集成"];

    for (let v = 1; v <= 120; v++) {
        const chapterCount = Math.floor(Math.random() * (20)) + 15; // 演示用，每卷15-35章
        volumes.push({
            id: v,
            title: `第 ${v} 卷：${v <= 30 ? topics[0] : topics[v % 5]}`,
            chapters: Array.from({ length: chapterCount }, () => ({
                id: globalChapterId++,
                title: `第 ${globalChapterId - 1} 章：技术深度解析`
            }))
        });
    }
    return volumes;
};

export default async function BookReaderPage({ params }: { params: Promise<{ bookId: string }>; }) {
    const volumes = volumeList;
    console.log("volumes", volumes);
    const { bookId } = await params;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 顶部环境装饰 */}
            <div className="bg-slate-900 text-white pt-16 pb-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <Link href="/library" className="text-slate-400 hover:text-white text-sm transition-colors mb-4 inline-block">
                        ← 返回我的书架
                    </Link>
                    <h1 className="text-4xl font-black mb-4">React 从入门到精通全集</h1>
                    <div className="flex items-center justify-center gap-6 text-sm opacity-70 font-medium">
                        <span>📚 120 卷精装</span>
                        <span>📝 2,000+ 章节</span>
                        <span>⭐ 4.9 评分</span>
                    </div>
                </div>
            </div>

            {/* 目录主体 */}
            <div className="max-w-4xl mx-auto px-4 -mt-12">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden">

                    {/* 目录头部工具栏 */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                        <h2 className="text-xl font-black text-gray-900">详细目录</h2>
                        <div className="flex gap-2">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">逆序排列</span>
                        </div>
                    </div>

                    {/* 卷轴列表 */}
                    <div className="divide-y divide-gray-50 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {volumes.map((vol) => (
                            <details key={vol.id} className="group outline-none">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 font-black text-sm group-open:bg-blue-600 group-open:text-white transition-all">
                                            {vol.id}
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{vol.title}</h3>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{vol.chapters.length} 个章节</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-300 group-open:rotate-180 transition-transform duration-300">▼</span>
                                </summary>

                                <div className="bg-gray-50/50 px-5 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {vol.chapters.map((ch) => (
                                        <Link
                                            key={ch.id}
                                            href={`/reader/${bookId}/${ch.id}`}
                                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5 transition-all group/item"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-gray-200 group-hover/item:bg-blue-500 transition-colors"></span>
                                            <span className="text-sm text-gray-600 group-hover/item:text-blue-600 font-medium">
                                                {ch.title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* 底部版权信息 */}
                <div className="text-center mt-12 text-gray-300 text-xs">
                    <p>© 2025 Tech Store Library. 所有内容受版权保护。</p>
                </div>
            </div>
        </div>
    );
}