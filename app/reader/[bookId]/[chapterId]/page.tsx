import ChapterSidebar from "@/components/ChapterSidebar";
import HighlightTextWithNotes from "@/components/HighlightTextWithNotes";
import Link from "next/link";
import ReadingConfig from "@/components/ReadingConfig";
import SubscriptionWall from "@/components/SubscriptionWall"; // 新组件
import CommentSection from "@/components/CommentSection"; // 新组件
import ReadingGamification from "@/components/ReadingGamification"; // 新组件

export default async function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
    const { bookId, chapterId } = await params;

    // 模拟权限检查：假设前 5 章免费，之后需要付费
    const isFree = Number(chapterId) <= 50;
    const isSubscribed = false; // 实际开发中通过 API 或 Session 获取

    if (!isFree && !isSubscribed) {
        return <SubscriptionWall bookId={bookId} />;
    }

    const chapterText = `<p>React 是一个 <b>用于构建</b> 用户界面的 JavaScript library...</p><p>通过状态管理实现极致的响应式体验。</p>`;

    return (
        <div className="flex min-h-screen">
            <aside className="hidden xl:block w-80 h-screen sticky top-0 bg-white/5 border-r border-gray-100/10 transition-all z-20">
                <ChapterSidebar bookId={bookId} chapterId={chapterId} />
            </aside>

            <main className="flex-1 relative">
                <nav className="absolute top-8 left-12 z-20">
                    <Link href={`/reader/${bookId}`} className="text-gray-400 hover:text-blue-500 text-[10px] font-black uppercase tracking-widest">
                        ← 目录
                    </Link>
                </nav>

                <ReadingConfig>
                    <ReadingGamification /> {/* 加上这一行 */}
                    <article className="max-w-3xl mx-auto px-6 pt-32 pb-40">
                        <header className="mb-20">
                            <h4 className="text-blue-500 font-bold text-xs tracking-widest uppercase mb-4">Chapter {chapterId}</h4>
                            <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-8 text-current">
                                React 组件化设计<br /><span className="text-blue-600">深度解析</span>
                            </h1>
                            <div className="h-1 w-20 bg-blue-600 rounded-full" />
                        </header>

                        <HighlightTextWithNotes chapterText={chapterText} />

                        <footer className="mt-32 grid grid-cols-2 gap-8">
                            <Link href={`/reader/${bookId}/${Number(chapterId) - 1}`} className="p-8 rounded-[2rem] border border-gray-100/20 bg-white/5 hover:border-blue-200 transition-all">
                                <span className="text-[10px] font-black opacity-30 uppercase block mb-2">上一个章节</span>
                                <span className="font-bold text-current">React 环境搭建</span>
                            </Link>
                            <Link href={`/reader/${bookId}/${Number(chapterId) + 1}`} className="p-8 rounded-[2rem] border border-gray-100/20 bg-white/5 hover:border-blue-200 transition-all text-right">
                                <span className="text-[10px] font-black opacity-30 uppercase block mb-2">下一个章节</span>
                                <span className="font-bold text-current">JSX 核心语法</span>
                            </Link>
                        </footer>
                        {/* 插入评论区 */}
                        <CommentSection />
                    </article>
                </ReadingConfig>
            </main>
        </div>
    );
}