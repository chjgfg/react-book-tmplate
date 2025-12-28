// 知识脑图与学习路径 (Knowledge Graph & Paths)
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// 定义路径节点数据
const SKILL_TREE = [
    { id: "html", title: "HTML5/CSS3", level: 1, x: 50, y: 50, status: "completed" },
    { id: "js-basic", title: "JS 基础", level: 1, x: 50, y: 150, status: "completed" },
    { id: "react-core", title: "React 核心", level: 2, x: 200, y: 100, status: "in-progress" },
    { id: "nextjs", title: "Next.js 实战", level: 3, x: 350, y: 50, status: "locked" },
    { id: "performance", title: "性能优化", level: 3, x: 350, y: 150, status: "locked" },
    { id: "architect", title: "架构师之道", level: 4, x: 500, y: 100, status: "locked" },
];

// 定义节点间的连线
const CONNECTIONS = [
    { from: "html", to: "react-core" },
    { from: "js-basic", to: "react-core" },
    { from: "react-core", to: "nextjs" },
    { from: "react-core", to: "performance" },
    { from: "nextjs", to: "architect" },
    { from: "performance", to: "architect" },
];

export default function KnowledgeGraph() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-black text-gray-900">学习图谱</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Growth Path & Mastery</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-green-500">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> 已掌握
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> 进行中
                    </div>
                </div>
            </div>

            <div className="relative h-[300px] w-full bg-slate-50/50 rounded-3xl overflow-auto custom-scrollbar">
                <svg className="absolute inset-0 w-[600px] h-[300px] pointer-events-none">
                    {CONNECTIONS.map((line, idx) => {
                        const fromNode = SKILL_TREE.find(n => n.id === line.from)!;
                        const toNode = SKILL_TREE.find(n => n.id === line.to)!;
                        const isCompleted = fromNode.status === "completed" && toNode.status !== "locked";

                        return (
                            <motion.line
                                key={idx}
                                x1={fromNode.x + 40} y1={fromNode.y}
                                x2={toNode.x - 40} y2={toNode.y}
                                stroke={isCompleted ? "#3B82F6" : "#E2E8F0"}
                                strokeWidth="2"
                                strokeDasharray={isCompleted ? "0" : "4 4"}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: idx * 0.2 }}
                            />
                        );
                    })}
                </svg>

                <div className="absolute inset-0 w-[600px] h-[300px]">
                    {SKILL_TREE.map((node) => (
                        <motion.div
                            key={node.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            onMouseEnter={() => setActiveNode(node.id)}
                            onMouseLeave={() => setActiveNode(null)}
                            style={{ left: node.x, top: node.y }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer
                                w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-center p-2 transition-all shadow-lg
                                ${node.status === 'completed' ? 'bg-green-500 text-white shadow-green-200' :
                                    node.status === 'in-progress' ? 'bg-blue-600 text-white shadow-blue-200' :
                                        'bg-white text-gray-400 border border-gray-100 opacity-50'}
                            `}
                        >
                            <span className="text-xs font-black leading-tight">{node.title}</span>
                            {activeNode === node.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full mt-2 w-32 bg-slate-900 text-white text-[10px] p-2 rounded-lg z-50 pointer-events-none"
                                >
                                    {node.status === 'locked' ? '需完成前置任务解锁' : '点击查看相关书籍'}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}