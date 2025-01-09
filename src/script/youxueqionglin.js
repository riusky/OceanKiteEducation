// URL https://guoxue.httpcn.com/book/yxql/
// 获取所有章节的列表
const sections = document.querySelectorAll(
  ".lunyu_section h4, .lunyu_section ul li",
);

let chapters = [];

// 遍历每个章节部分
sections.forEach((section) => {
  if (section.tagName === "H4") {
    // 获取卷的名称
    const volumeTitle = section.textContent.trim();
    chapters.push({ volume: volumeTitle, chapters: [] });
  } else {
    // 获取每一章节的标题和链接
    const items = section.querySelectorAll("span a");
    items.forEach((item) => {
      // 获取章节号和标题
      const chapterNumber = item.querySelector("i").textContent.trim(); // 从 <i> 标签中提取章节号
      const chapterName = item.textContent.replace(chapterNumber, "").trim(); // 剩余部分为章节名称

      const chapterLink = item.href;

      // 将信息添加到结构中
      chapters[chapters.length - 1].chapters.push({
        number: chapterNumber,
        title: chapterName,
        link: chapterLink,
      });
    });
  }
});

// 使用 fetch 获取章节内容并解析
async function fetchChapterData(chapters) {
  const results = [];

  // 遍历每个章节信息
  for (let volume of chapters) {
    const volumeData = {
      volume: volume.volume,
      chapters: [],
    };

    for (let chapter of volume.chapters) {
      const chapterNumber = chapter.number;
      const chapterTitle = chapter.title;

      const maxRetries = 3; // 最大重试次数
      let retries = 0;

      while (retries < maxRetries) {
        try {
          // Fetch 获取章节的 HTML 内容
          const response = await fetch(chapter.link);
          const html = await response.text();

          // 检查是否加载失败（例如访问频率过快）
          if (
            html.includes("您访问太快") ||
            html.includes("<title>验证提示_汉程网</title>")
          ) {
            console.log("访问频率太快，需要等待 31 秒后重试...");
            await new Promise((resolve) => setTimeout(resolve, 31000)); // 等待 31 秒
            retries++;
            continue; // 重试
          }

          // 创建一个 DOMParser 实例并解析 HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          // 查找需要的内容
          const contentElement = doc.querySelector(".yxql_combine");

          if (contentElement) {
            const liElements = contentElement.querySelectorAll("li");

            // 初始化章节内容
            const contentArray = [];

            // 遍历每个 li，提取释文和行间字词
            liElements.forEach((li) => {
              const explanationElement = li.querySelector(".qzw_yiwen p");
              const explanation = explanationElement
                ? explanationElement.textContent.trim()
                : "";

              // 提取行间字词
              const terms = Array.from(li.querySelectorAll("span"))
                .map((span) => {
                  const pinyinElement = span.querySelector("i");
                  const characterElement = span.querySelector("b");

                  return {
                    pinyin: pinyinElement
                      ? pinyinElement.textContent.trim()
                      : "",
                    character: characterElement
                      ? characterElement.textContent.trim()
                      : "",
                  };
                })
                .filter((term) => term.character); // 过滤掉没有汉字的项

              // 将释文和对应的行间字词作为对象放入 content 数组
              if (explanation) {
                contentArray.push({
                  explanation: explanation,
                  verses: terms, // 包含所有行间字词
                });
              }
            });

            // 添加章节内容到章节数据中
            volumeData.chapters.push({
              number: chapterNumber,
              title: chapterTitle,
              content: contentArray, // 将整个内容数组加入到章节对象中
            });
          }
          break; // 如果成功请求到数据，跳出重试循环
        } catch (error) {
          console.error(`无法获取 ${chapterTitle} 的内容:`, error);
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 31000)); // 等待 31 秒后重试
        }
      }
    }
    results.push(volumeData);
  }

  // 输出最终的章节信息
  console.log(results);
}

// 执行函数并传入章节数据
fetchChapterData(chapters);
