// https://guoxue.httpcn.com/book/lunyu/

(async function () {
  const books = []; // 创建一个空的数组来存储所有书籍的章节信息
  const detailedChapters = []; // 用于存储所有章节详细数据的数组

  // 创建一个延迟函数
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 清除 Cookie 的辅助函数
  function clearCookies() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const equalSignIndex = cookie.indexOf("=");
      const cookieName =
        equalSignIndex > -1 ? cookie.substr(0, equalSignIndex) : cookie;
      document.cookie =
        cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  }

  // 选择所有的含有章节的 div 元素
  const sections = document.querySelectorAll(".lunyu_section");

  for (const section of sections) {
    // 创建一个对象来存储当前书的章节信息
    const book = {
      title: section.querySelector("h4").innerText, // 获取书名作为章节标题
      chapters: [], // 初始化章节数组
    };

    // 选择所有的 li 元素
    const listItems = section.querySelectorAll("li.clear");

    for (const li of listItems) {
      // 获取每一章的链接元素
      const leftChapter = li.querySelector(".bjx_bg.left a, .left a");
      const rightChapter = li.querySelector(".bjx_bg.right a, .right a");

      // 检查左侧章节
      if (leftChapter) {
        book.chapters.push({
          title: leftChapter.innerText, // 章节内容
          link: leftChapter.href, // 章节链接
        });
      }

      // 检查右侧章节，只在右侧有章节时添加
      if (rightChapter) {
        book.chapters.push({
          title: rightChapter.innerText, // 章节内容
          link: rightChapter.href, // 章节链接
        });
      }
    }

    // 将当前书的章节信息添加到书籍数组中
    books.push(book);
  }

  async function fetchChapterDetails(chapters, bookTitle) {
    for (const chapter of chapters) {
      const { title, link } = chapter; // 章节的具体内容和链接
      let retries = 3; // 设置重试次数

      while (retries > 0) {
        try {
          // 在请求之前清空 localStorage 和 Cookie
          localStorage.clear();
          clearCookies();

          const response = await fetch(link);
          if (!response.ok) throw new Error("Network response was not ok");

          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "text/html");

          // 创建一个对象来存储当前章节的详细信息
          const chapterData = {
            annotations: [],
            translation: "",
            commentary: "",
            content: [],
          };

          // 提取拼音
          const pinyinElements = doc.querySelectorAll(".ly_combine span");
          chapterData.content = Array.from(pinyinElements)
            .map((span) => {
              const pinyinChar = span.querySelector("i");
              const character = span.querySelector("b");

              const result = {
                pinyin: pinyinChar ? pinyinChar.innerText : "",
                character: character ? character.innerText : "",
              };

              // 只返回非空内容
              return result.pinyin || result.character ? result : null;
            })
            .filter(Boolean); // 过滤掉值为空的数据

          // 提取注释
          const annotationElements = doc.querySelectorAll(
            ".ly_zhushi .lunyu_jies p",
          );
          chapterData.annotations = Array.from(annotationElements).map((p) =>
            p.innerText.replace(/^\d+/, "").trim(),
          );

          // 提取译文
          const translationElement = doc.querySelector(".ly_yiwen .lunyu_jies");
          chapterData.translation = translationElement
            ? translationElement.innerText.trim()
            : "";

          // 提取评析
          const commentaryElements = doc.querySelectorAll(
            ".ly_yiwen + .ly_yiwen .lunyu_jies",
          );
          chapterData.commentary = Array.from(commentaryElements)
            .map((elem) => elem.innerText.trim())
            .join(" ");

          // 检查是否所有字段都为空
          if (
            chapterData.content.length === 0 &&
            chapterData.annotations.length === 0 &&
            chapterData.translation === "" &&
            chapterData.commentary === ""
          ) {
            throw new Error("All fields are empty");
          }

          // 添加当前章节数据到详细章节数组
          detailedChapters.push({
            chapter: bookTitle, // 使用书的标题作为 chapter
            title: title, // 章节标题
            details: chapterData,
          });

          break; // 成功获取数据，退出重试循环
        } catch (error) {
          console.error(
            `Error fetching details for chapter "${title}":`,
            error,
          );
          retries -= 1;

          if (retries > 0) {
            console.log(`Retrying... (${3 - retries} remaining)`);
            await delay(32000); // 等待后重试 32 秒
          } else {
            // 在最后一次失败时记录下该章节的信息，供后续审查
            detailedChapters.push({
              chapter: bookTitle, // 使用书的标题作为 chapter
              title: title, // 章节标题
              error: "Failed to fetch after multiple retries",
            });
          }
        }
      }
    }
  }

  // 调用函数以提取章节的详细数据
  for (const book of books) {
    await fetchChapterDetails(book.chapters, book.title);
  }

  // 将结果转换为 JSON 字符串格式
  const jsonResult = JSON.stringify(detailedChapters, null, 2);
  console.log(jsonResult);
})();
