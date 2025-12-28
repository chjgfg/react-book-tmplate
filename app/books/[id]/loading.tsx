export default function Loading() {
    return (
        <div className="max-w-xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/4 mt-6" />
        </div>
    );
}

/**
 * Next.js 15 会：

先加载 loading.tsx

并行准备 page.tsx

page 准备好 → 自动替换 loading

这叫 Streaming Rendering（流式渲染）
 */

/**
| 类名                        | 作用            |
| ------------------------- | ------------- |
| `disabled:opacity-50`     | 条件样式（状态驱动 UI） |
| `flex items-center gap-4` | 水平排列          |
| `px-3 py-1`               | 按钮内边距         |
| `font-semibold`           | 半粗体           |
 */