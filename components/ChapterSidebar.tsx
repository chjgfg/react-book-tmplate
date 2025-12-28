// 章节列表
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { volumes } from "@/app/reader/[bookId]/chapters";

export default function ChapterSidebar({
    bookId,
    chapterId,
}: {
    bookId: string;
    chapterId: string;
}) {
    const [keyword, setKeyword] = useState("");
    const activeRef = useRef<HTMLAnchorElement | null>(null);
    const [openVolumes, setOpenVolumes] = useState<Record<number, boolean>>({});

    // 默认全部展开
    // useEffect(() => {
    //     const allOpen: Record<number, boolean> = {};
    //     volumes.forEach((_, i) => (allOpen[i] = true));
    //     setOpenVolumes(allOpen);
    // }, []);

    // 默认只打开当前卷
    useEffect(() => {
        const state: Record<number, boolean> = {};
        volumes.forEach((v, i) => {
            state[i] = v.chapters.some((c) => c.id === chapterId);
        });
        setOpenVolumes(state);
    }, [chapterId]);


    // 当前章节自动滚到中间
    useEffect(() => {
        activeRef.current?.scrollIntoView({ block: "center" });
    }, []);

    return (
        <aside
            className="
        w-64
        border-r
        bg-white
        h-[calc(100vh-64px)]
        overflow-y-auto
        sticky
        top-16
        p-4
      "
        >
            <h2 className="font-bold mb-3">📑 章节目录</h2>

            {/* 搜索 */}
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索章节"
                className="w-full mb-3 px-2 py-1 border rounded text-sm"
            />

            {/* 分卷 */}
            <div className="space-y-3">
                {volumes.map((volume, vi) => {
                    // 判断当前卷是否包含当前章节
                    const isCurrentVolume = volume.chapters.some(
                        (c) => c.id === chapterId
                    );

                    return (
                        <div key={vi}>
                            <button
                                onClick={() =>
                                    setOpenVolumes((prev) => ({
                                        ...prev,
                                        [vi]: !prev[vi],
                                    }))
                                }
                                className="font-semibold text-sm mb-1"
                            >
                                {openVolumes[vi] || isCurrentVolume ? "▼" : "▶"} {volume.title}
                            </button>

                            {(openVolumes[vi] || isCurrentVolume) && (
                                <div className="ml-3 space-y-1">
                                    {volume.chapters
                                        .filter((c) =>
                                            c.title.toLowerCase().includes(keyword.toLowerCase())
                                        )
                                        .map((chapter) => {
                                            const isActive = chapter.id === chapterId;
                                            return (
                                                <Link
                                                    key={chapter.id}
                                                    href={`/reader/${bookId}/${chapter.id}`}
                                                    ref={isActive ? activeRef : null}
                                                    className={`
                            block px-2 py-1 rounded text-sm
                            ${isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "hover:bg-gray-100"
                                                        }
                          `}
                                                >
                                                    第 {chapter.id} 章 · {chapter.title}
                                                </Link>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
