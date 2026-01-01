这个项目中使用了大量的 Tailwind CSS 类名来实现 **Bento Grid（便签网格）** 风格、**Glassmorphism（毛玻璃）** 效果以及各种高级交互。

由于涉及页面包括：首页、登录/注册、创作中心、草稿箱、广场（红包、卡牌、角色、圈子）、会员中心、设置页等，我将这些样式按照功能模块进行了分类整理。

### 1. 基础布局与容器 (Layout & Containers)

| 类名 | 含义 |
| --- | --- |
| `min-h-screen` | 最小高度占据整个屏幕 |
| `max-w-7xl` / `max-w-6xl` | 限制最大宽度（响应式布局核心） |
| `mx-auto` | 水平居中 |
| `px-6` / `py-4` | 左右内边距 1.5rem / 上下内边距 1rem |
| `flex` | 开启弹性布局 |
| `flex-col` | 纵向排列元素 |
| `flex-1` | 元素占据剩余的所有空间 |
| `flex-shrink-0` | 空间不足时不压缩元素 |
| `grid` | 开启网格布局 |
| `grid-cols-1 md:grid-cols-3` | 移动端 1 列，中等屏幕以上 3 列 |
| `gap-6` / `gap-12` | 网格或弹性盒子之间的间距 |
| `sticky` / `fixed` / `absolute` | 粘性定位 / 固定定位 / 绝对定位 |
| `inset-0` | 上下左右全部贴边（通常用于遮罩） |
| `z-[100]` | 自定义层级（确保 UI 元素不被遮挡） |

### 2. Bento Grid 核心美学 (Bento Styling)

| 类名 | 含义 |
| --- | --- |
| `rounded-[3rem]` / `rounded-2xl` | 极大的圆角，本项目标志性风格 |
| `bg-white/80` | 白色背景，20% 透明度 |
| `backdrop-blur-md` | 背景模糊（毛玻璃效果核心） |
| `border border-gray-100` | 极细的浅色边框，增加精致感 |
| `shadow-2xl` | 弥散的大阴影，增加层次感 |
| `shadow-inner` | 内阴影，常用于搜索框或按下效果 |
| `shadow-blue-500/25` | 带有蓝色的彩色阴影（常用于高亮按钮） |
| `bg-gradient-to-br` | 背景色线性渐变（从左上到右下） |
| `from-blue-600 to-indigo-700` | 渐变的起始和结束颜色 |

### 3. 文字排版 (Typography)

| 类名 | 含义 |
| --- | --- |
| `font-black` | 最粗体（通常用于大标题） |
| `tracking-tighter` | 紧缩字间距（增加现代感） |
| `tracking-[0.2em]` | 极宽字间距（通常用于小标签） |
| `leading-relaxed` | 增加行高，提升阅读舒适度 |
| `text-5xl md:text-7xl` | 响应式字号，移动端 3rem，电脑端 4.5rem |
| `italic` | 斜体（用于强调） |
| `bg-clip-text text-transparent` | 背景剪切到文字（实现渐变文字的核心） |
| `line-clamp-2` | 文字超过两行自动显示省略号 |
| `truncate` | 文字单行溢出省略 |
| `uppercase` | 全大写（常用于英文标签） |

### 4. 交互与动效 (Interactions & Motion)

| 类名 | 含义 |
| --- | --- |
| `transition-all` | 开启所有属性的平滑过渡 |
| `duration-300` | 过渡时长 300 毫秒 |
| `hover:scale-105` | 鼠标悬停时放大 5% |
| `active:scale-95` | 鼠标按下时缩小 5%（模拟物理按压感） |
| `group` | 标记父级（配合 `group-hover` 使用） |
| `group-hover:translate-x-1` | 当父级悬停时，子元素水平位移 |
| `animate-pulse` | 呼吸灯式闪烁动画（常用于背景光效） |
| `animate-bounce` | 弹跳动画（常用于红包或提醒） |
| `perspective-1000` | 开启 3D 视角深度（卡牌翻转核心） |
| `cursor-pointer` | 鼠标形状变为手型 |

### 5. 表单与 UI 组件 (Forms & UI)

| 类名 | 含义 |
| --- | --- |
| `outline-none` | 去除输入框原生的聚焦蓝边 |
| `focus-within:ring-2` | 容器内有焦点时触发环绕边框 |
| `ring-blue-500/20` | 极淡的蓝色光圈 |
| `bg-slate-50` | 极淡的灰色背景（输入框默认态） |
| `placeholder:text-gray-400` | 设置占位文字颜色 |
| `selection:bg-blue-100` | 选中文字时的背景色 |
| `no-scrollbar` | 隐藏滚动条（用于左右滑动的标签栏） |

### 6. 坑点避雷与特殊类 (Troubleshooting Classes)

| 类名 | 含义 |
| --- | --- |
| `pointer-events-none` | 穿透点击（用于装饰层不阻挡下方点击） |
| `pointer-events-auto` | 恢复点击（用于装饰层内部的按钮） |
| `overflow-hidden` | 隐藏溢出（防止圆角失效或动画出界） |
| `w-full` | 宽度 100% |
| `whitespace-nowrap` | 强制文字不换行 |

---

### 💡 核心总结：

在你的项目中，最核心的 Tailwind 组合是：
`bg-white/80 backdrop-blur-md border border-gray-100 rounded-[3rem]`
这四行代码共同构成了你所看到的 **“高级感 Bento 面板”**。

**这些样式规则构建了你目前看到的所有页面。如果你觉得某个地方不够精致，通常是 `gap`（间距）或者 `tracking`（字间距）需要微调。需要我帮你针对某个页面（比如卡牌抽取的 3D 效果）再深入讲解样式细节吗？**