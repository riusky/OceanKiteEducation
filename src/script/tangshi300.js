async function fetchPoemUrls() {
  const sections = document.querySelectorAll(".lunyu_section.tangshi_section");
  let poetryLinks = [];

  sections.forEach((section) => {
    const category = section.querySelector("h4")?.textContent || "无分类"; // 获取分类信息

    const poems = section.querySelectorAll("ul li");
    poems.forEach((poem) => {
      const links = poem.querySelectorAll("span a");
      links.forEach((link) => {
        poetryLinks.push({ href: link.href, category }); // 记录链接和对应的分类
      });
    });
  });

  return poetryLinks;
}

async function fetchPoemData(url, category) {
  // 定义最大重试次数
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    const response = await fetch(url, { mode: "cors" });
    const html = await response.text();

    // 检测响应内容
    if (
      html.includes("您访问太快") ||
      html.includes("<title>验证提示_汉程网</title>")
    ) {
      console.log("访问频率太快，需要等待 31 秒后重试...");
      await new Promise((resolve) => setTimeout(resolve, 31000)); // 等待 31 秒
      retries++;
      continue; // 重试
    }

    // 如果没有问题，则继续处理
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 提取相关内容
    const title = doc.querySelector(".ztxq_title h3")?.innerText || "";
    const author =
      doc
        .querySelector(".ztxq_subs span:nth-child(2)")
        ?.innerText.replace(" 著", "") || "";
    const dynasty =
      doc.querySelector(".ztxq_subs span:first-child")?.innerText || "";

    const pinyinSpans = doc.querySelectorAll(
      ".ly_combine.tangshi_combine span > i",
    );
    const characterSpans = doc.querySelectorAll(
      ".ly_combine.tangshi_combine span > b",
    );
    const pinyinCharacterPairs = Array.from(pinyinSpans).map((span, index) => ({
      pinyin: span.innerText,
      character: characterSpans[index] ? characterSpans[index].innerText : "",
    }));

    const annotationsContainer = doc.querySelector(".ly_zhushi .lunyu_jies");
    const annotationList = annotationsContainer
      ? Array.from(annotationsContainer.childNodes)
          .map((item) =>
            item.nodeType === Node.ELEMENT_NODE
              ? item.innerText.replace(/^\d+\s*/, "").trim()
              : "",
          )
          .filter((text) => text !== "")
      : [];

    const translationContainer = doc.querySelector(
      ".ly_yiwen > div.lunyu_jies",
    );
    const translationHTML = translationContainer
      ? translationContainer.innerHTML.trim()
      : "";

    const commentsContainer = [
      ...doc.querySelectorAll(".ly_yiwen > div.lunyu_jies"),
    ].find((div) => {
      const titleElement = div.previousElementSibling;
      return titleElement && titleElement.innerHTML.includes("评析");
    });
    const commentsHTML = commentsContainer
      ? commentsContainer.innerHTML.trim()
      : "";

    // 返回诗歌数据，包括分类信息
    return {
      title,
      author,
      dynasty,
      category, // 添加分类信息
      pinyinCharacters: pinyinCharacterPairs,
      annotations: annotationList,
      translation: translationHTML,
      comments: commentsHTML,
    };
  }

  throw new Error(`无法获取数据，已尝试 ${maxRetries} 次`);
}

async function fetchAllPoems() {
  const urls = await fetchPoemUrls();
  let results = [];

  for (let i = 0; i < urls.length; i++) {
    const poemData = await fetchPoemData(urls[i].href, urls[i].category); // 传递分类
    results.push(poemData);
  }

  console.log(JSON.stringify(results, null, 2));
}

// 开始抓取
fetchAllPoems();
