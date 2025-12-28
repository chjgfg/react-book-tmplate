// 章节划线评论
"use client";

import { useState, useEffect } from "react";

export default function HighlightTextWithNotes({ chapterText }: { chapterText: string }) {
    const [mounted, setMounted] = useState(false);
    const [highlightedText, setHighlightedText] = useState<string[]>([]);
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
    const [currentSelected, setCurrentSelected] = useState("");
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [noteText, setNoteText] = useState("");

    useEffect(() => {
        setMounted(true);
        const savedText = localStorage.getItem("highlightedText");
        const savedNotes = localStorage.getItem("notes");
        if (savedText) setHighlightedText(JSON.parse(savedText));
        if (savedNotes) setNotes(JSON.parse(savedNotes));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("highlightedText", JSON.stringify(highlightedText));
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }, [highlightedText, notes, mounted]);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        if (text && text.length > 1) {
            const range = selection?.getRangeAt(0);
            const rect = range?.getBoundingClientRect();
            if (rect) {
                setMenuPos({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY - 10 });
                setCurrentSelected(text);
            }
        } else if (!showNoteInput) {
            setMenuPos(null);
        }
    };

    const addHighlight = () => {
        if (!highlightedText.includes(currentSelected)) {
            setHighlightedText(prev => [...prev, currentSelected]);
        }
        setShowNoteInput(true);
    };

    const saveNote = () => {
        setNotes(prev => ({ ...prev, [currentSelected]: noteText }));
        setNoteText("");
        setMenuPos(null);
        setShowNoteInput(false);
    };

    const renderContent = () => {
        if (!mounted) return chapterText;
        let result = chapterText;
        highlightedText.forEach((h) => {
            const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            result = result.replace(
                new RegExp(`(${escaped})`, "g"),
                `<mark class="bg-blue-400/30 text-inherit border-b-2 border-blue-500 cursor-help transition-all hover:bg-blue-400/50 px-1 rounded-sm">$1</mark>`
            );
        });
        return result;
    };

    return (
        <div className="relative">
            <div
                className="prose prose-slate max-w-none transition-all duration-300
                [&_p]:!text-[length:var(--reader-font-size)] 
                [&_p]:!line-height-[var(--reader-line-height)]
                [&_span]:!text-[length:var(--reader-font-size)]
                [&_b]:!text-[length:var(--reader-font-size)]
                [&_mark]:!text-[length:var(--reader-font-size)]"
                onMouseUp={handleMouseUp}
                dangerouslySetInnerHTML={{ __html: renderContent() }}
            />

            {mounted && menuPos && (
                <div className="absolute z-[70] -translate-x-1/2 -translate-y-full pb-4 animate-in zoom-in" style={{ left: menuPos.x, top: menuPos.y }}>
                    <div className="bg-slate-900 text-white rounded-xl shadow-2xl p-2 min-w-[180px]">
                        {!showNoteInput ? (
                            <button onClick={addHighlight} className="w-full py-2 px-4 hover:bg-slate-800 rounded-lg text-xs font-bold transition-colors">🖋️ 高亮并记笔记</button>
                        ) : (
                            <div className="p-2 space-y-2">
                                <textarea autoFocus className="w-full bg-slate-800 border-none rounded-lg p-2 text-[10px] text-white" placeholder="写下想法..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                                <button onClick={saveNote} className="w-full bg-blue-600 py-1.5 rounded-lg text-[10px] font-black">保存</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {mounted && Object.keys(notes).length > 0 && (
                <div className="mt-20 border-t border-gray-100/20 pt-10">
                    <h3 className="text-xs font-black opacity-30 uppercase tracking-widest mb-6 text-current">Notes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(notes).map(([text, note], idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
                                <p className="text-[10px] font-bold text-blue-500 mb-1">"{text}"</p>
                                <p className="text-xs opacity-70 leading-normal text-current">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}