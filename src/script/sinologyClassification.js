// 国学分类数据的爬取脚本

// 获取所有的 li 元素
const liElements = document.querySelectorAll(
  ".quote_bg.clear .zt_list .clear li",
);

// 初始化结果数组
const result = { items: [] };

// 遍历每个 li 元素
liElements.forEach((li) => {
  const h3 = li.querySelector("h3");

  // 检查 h3 是否存在并且不包含“更多”的链接
  if (h3 && !h3.querySelector("a")?.textContent.includes("更多")) {
    const title = h3.textContent.trim();
    const categories = [];

    // 先获取该 li 下的所有分类（h4）
    const h4Elements = li.querySelectorAll(".zt_cont_cont h4");

    // 如果有 h4 元素，处理分类和书籍
    if (h4Elements.length > 0) {
      h4Elements.forEach((h4) => {
        const categoryTitle = h4.textContent.trim();
        const books = [];

        // 获取每个 h4 下的书名
        const spans = h4.nextElementSibling.querySelectorAll("a");
        spans.forEach((span) => {
          books.push(span.textContent.trim());
        });

        // 将分类及其书籍加入到 categories 数组
        categories.push({ category: categoryTitle, books });
      });
    } else {
      // 如果没有 h4 元素，直接获取书籍
      const books = [];
      const spans = li.querySelectorAll(".zt_cont_cont a");
      spans.forEach((span) => {
        books.push(span.textContent.trim());
      });
      // 将书籍放在一个空分类下
      categories.push({ category: "无分类", books });
    }

    // 将结果加入到 items 数组
    result.items.push({ title, categories });
  }
});

// 输出结果为 JSON 格式
console.log(JSON.stringify(result, null, 2));
