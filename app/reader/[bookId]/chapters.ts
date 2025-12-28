/**
 * 生成 120 卷，每卷 30-50 个章节，ID 全局连续
 */
const generateVolumes = () => {
    const volumes = [];
    let globalChapterId = 1; // 全局计数器，确保 ID 连续

    // 定义一些随机的章节标题后缀，增加数据真实感
    const topicPool = ["核心原理", "实践技巧", "避坑指南", "源码解析", "性能优化", "生态集成"];

    for (let v = 1; v <= 10; v++) {
        // 随机生成当前卷的章节数量 (30 到 50 之间)
        const chapterCount = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        const currentChapters = [];

        for (let c = 1; c <= chapterCount; c++) {
            const topic = topicPool[globalChapterId % topicPool.length];

            currentChapters.push({
                id: globalChapterId.toString(), // 转为字符串，符合你代码中的格式
                title: `第 ${globalChapterId} 章：${topic}`
            });

            globalChapterId++; // ID 递增
        }

        volumes.push({
            id: v,
            title: `第 ${v} 卷：${v <= 60 ? '基础进阶' : '深度实战'} (${v})`,
            chapters: currentChapters,
        });
    }

    return volumes;
};

// 执行生成
export const volumes = generateVolumes();

console.log(`生成完毕！总卷数: ${volumes.length}，总章节数: ${volumes.reduce((acc, v) => acc + v.chapters.length, 0)}`);