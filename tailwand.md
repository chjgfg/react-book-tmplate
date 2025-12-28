tailwand

text-3xl     // 字体大小
font-bold    // 加粗
mt-4         // margin-top
p-6          // padding
text-blue-600


| 类型 | 例子                         |
| -- | -------------------------- |
| 间距 | `p-4` `m-2` `mt-6`         |
| 字体 | `text-xl` `font-semibold`  |
| 颜色 | `text-gray-600` `bg-white` |
| 布局 | `flex` `grid`              |

| 类名          | 含义              |
| ----------- | --------------- |
| `max-w-6xl` | 页面最大宽度（不会铺满大屏）  |
| `mx-auto`   | 左右自动 margin（居中） |
| `px-6`      | 左右 padding      |
| `py-4`      | 上下 padding      |


| 类名                | 含义      |
| ----------------- | ------- |
| `flex`            | 横向布局    |
| `items-center`    | 垂直居中    |
| `justify-between` | 左右分散    |
| `space-x-6`       | 子元素水平间距 |

| 类名                    | 含义   |
| --------------------- | ---- |
| `text-xl`             | 字体大小 |
| `font-bold`           | 加粗   |
| `text-gray-700`       | 灰色文本 |
| `hover:text-blue-600` | 悬浮变蓝 |

| 类名           | 含义   |
| ------------ | ---- |
| `bg-white`   | 白色背景 |
| `bg-gray-50` | 浅灰背景 |
| `shadow-sm`  | 轻微阴影 |

| 类名              | 含义    |
| --------------- | ----- |
| `animate-pulse` | 骨架屏动画 |
| `bg-gray-200`   | 灰色占位  |
| `rounded`       | 圆角    |
| `w-2/3`         | 宽度占比  |
| `h-8`           | 高度    |

| 类名                        | 作用            |
| ------------------------- | ------------- |
| `disabled:opacity-50`     | 条件样式（状态驱动 UI） |
| `flex items-center gap-4` | 水平排列          |
| `px-3 py-1`               | 按钮内边距         |
| `font-semibold`           | 半粗体           |

| 类名                    | 作用                      |
| --------------------- | ----------------------- |
| `relative / absolute` | 角标定位                    |
| `-top-2 -right-3`     | 负偏移                     |
| `rounded-full`        | 圆形                      |
| `text-xs`             | 小号文字                    |
| 条件渲染                  | `totalCount > 0 && ...` |

| 类名                  | 作用          |
| ------------------- | ----------- |
| `fixed / lg:static` | 移动端抽屉，桌面端常驻 |
| `translate-x-*`     | 抽屉滑入滑出      |
| `bg-black/40`       | 半透明遮罩       |
| `z-30 / z-40`       | 层级控制        |
| `hover:bg-gray-100` | 章节 hover    |
| `bg-blue-100`       | 当前章节高亮      |
