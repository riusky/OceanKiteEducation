// URL https://guoxue.httpcn.com/book/songci300/
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

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector(".ztxq_title h3")?.innerText || "";
    const author =
      doc
        .querySelector(".ztxq_subs span:nth-child(2)")
        ?.innerText.replace(" 著", "") || "";
    const dynasty =
      doc.querySelector(".ztxq_subs span:first-child")?.innerText || "";

    const pinyinCharacters = [];
    const pElements = doc.querySelectorAll(".ly_combine.songci_combine p"); // 选择所有<p>标签

    pElements.forEach((pElement) => {
      const pairs = [];
      const spans = pElement.querySelectorAll("span");

      spans.forEach((span) => {
        // 获取每个span中的拼音和汉字
        const pinyin = span.querySelector("i")?.innerText || "";
        const character = span.querySelector("b")?.innerText || "";
        pairs.push({ pinyin, character });
      });

      pinyinCharacters.push(pairs); // 将当前<p>标签的拼音和汉字对添加到数组中
    });

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

    // 返回诗歌数据，包括分类信息和修改后的拼音字符结构
    return {
      title,
      author,
      dynasty,
      category, // 添加分类信息
      pinyinCharacters, // 更新后的拼音字符结构
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
