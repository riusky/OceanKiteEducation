// 创建一个空的数组来存储所有书籍的章节信息
const books = []; // 存储书籍章节信息
const detailedChapters = []; // 存储详细章节信息

(async function () {
  // 选择所有的含有章节的 div 元素
  const sections = document.querySelectorAll(".lunyu_section");

  for (const section of sections) {
    // 创建一个对象来存储当前书的章节信息
    const book = {
      title: section.querySelector("h4").innerText, // 获取书名作为章节标题
      chapters: [], // 初始化章节数组
    };

    // 获取当前章节的信息
    const headers = section.querySelectorAll("h5");
    const lists = section.querySelectorAll("ul");

    headers.forEach((header, index) => {
      const chapterItems = lists[index].querySelectorAll("li.clear");
      const currentCategory = header.innerText; // 获取分类名称

      chapterItems.forEach((li) => {
        // 获取每一章的链接元素
        const aTags = li.querySelectorAll("a");
        aTags.forEach((aTag) => {
          book.chapters.push({
            category: currentCategory, // 添加分类信息
            title: aTag.innerText, // 章节内容
            link: aTag.href, // 章节链接
          });
        });
      });
    });

    // 将当前书的章节信息添加到书籍数组中
    books.push(book);
  }

  // 调用函数以提取章节的详细数据
  for (const book of books) {
    await fetchChapterDetails(book.chapters, book.title);
  }

  // 输出结果
  const jsonResult = JSON.stringify(detailedChapters, null, 2);
  console.log(jsonResult);
})();

// 获取章节详细数据
async function fetchChapterDetails(chapters, bookTitle) {
  for (const chapter of chapters) {
    const { title, link, category } = chapter; // 章节的具体内容、链接和分类

    const maxRetries = 3; // 最大重试次数

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // 发送请求并获取章节页面的 HTML
        const response = await fetch(link);
        if (!response.ok) throw new Error("Network response was not ok");

        const text = await response.text();
        // 检查是否加载失败（例如访问频率过快）
        if (
          text.includes("您访问太快") ||
          text.includes("<title>验证提示_汉程网</title>")
        ) {
          console.log("访问频率太快，需要等待 31 秒后重试...");
          await new Promise((resolve) => setTimeout(resolve, 31000)); // 等待 31 秒
          continue; // 继续重试
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // 创建一个对象来存储当前章节的详细信息
        const chapterData = {
          book: bookTitle, // 使用书的标题
          title: title, // 章节标题
          category: category, // 添加分类信息
          annotations: [], // 注释
          translationHtml: "", // 译文的 HTML 内容
          commentaryHtml: "", // 评析的 HTML 内容
          content: [], //章节内容
        };

        // 提取拼音和字符结构为每个 li 内部一个数组
        const liElements = doc.querySelectorAll(".ly_combine ul li");
        const contentArray = []; // 用于存储每个 li 的内容结构

        liElements.forEach((li) => {
          let currentLiContent = []; // 当前 li 的结构
          const spans = li.querySelectorAll("span");

          spans.forEach((span) => {
            const pinyinChar = span.querySelector("i");
            const character = span.querySelector("b");

            const pinyinText = pinyinChar ? pinyinChar.innerText : "";
            const characterText = character ? character.innerText : "";

            // 仅当拼音和字符都存在时才添加到当前 li 内容中
            if (pinyinText && characterText) {
              currentLiContent.push({
                pinyin: pinyinText,
                character: characterText,
              });
            }
          });

          // 只有在当前 li 内容不为空的情况下才将其添加到内容数组中
          if (currentLiContent.length > 0) {
            contentArray.push(currentLiContent);
          }
        });

        chapterData.content = contentArray;

        // 提取注释
        const annotationElements = doc.querySelectorAll(
          ".ly_zhushi .lunyu_jies p",
        );
        chapterData.annotations = Array.from(annotationElements).map((p) =>
          p.innerText.trim(),
        );

        // 提取译文的 HTML
        const translationElement = doc.querySelector(".ly_yiwen .lunyu_jies");
        chapterData.translationHtml = translationElement
          ? translationElement.innerHTML.trim()
          : "";

        // 提取评析的 HTML
        const commentaryElements = doc.querySelectorAll(
          ".ly_yiwen + .ly_yiwen .lunyu_jies",
        );
        chapterData.commentaryHtml = Array.from(commentaryElements)
          .map((elem) => elem.innerHTML.trim())
          .join(" ");

        // 添加当前章节数据到详细章节数组
        detailedChapters.push(chapterData);
        break; // 如果成功请求到数据，跳出重试循环
      } catch (error) {
        console.error(`获取 ${title} 的内容失败:`, error);
        if (attempt < maxRetries - 1) {
          console.log(`重试 ${attempt + 1}/${maxRetries}...`);
          await new Promise((resolve) => setTimeout(resolve, 31000)); // 等待 31 秒重试
        } else {
          console.error(`无法获取章节 ${title} 的数据，已超过最大重试次数。`);
          detailedChapters.push({
            book: bookTitle,
            title: title,
            category: category, // 确保分类信息也被记录
            error: "获取内容失败，已超过最大重试次数",
          });
        }
      }
    }
  }
}
