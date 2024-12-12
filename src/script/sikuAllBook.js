// https://guoxue.httpcn.com/zt/skqs/
// 准备结果结构
const result = {
  title: "四库全书",
  categories: [],
};

// 获取所有分类名称与 ID
const categoryNames = Array.from(document.querySelectorAll("#mmd li")).map(
  (li) => {
    return {
      category: li.textContent.trim(),
      dataSh: li.getAttribute("data-sh"),
    };
  },
);

// 遍历每个分类名称
categoryNames.forEach((categoryInfo) => {
  const categoryId = categoryInfo.dataSh; // 获取分类的 ID
  const section = document.querySelector(categoryId); // 获取对应的书籍部分

  // 确保类别部分存在
  if (section) {
    // 初始化 books 数组
    const books = [];

    // 查找该分类后所有的 .fol_list 直到下一个分类的标题
    let nextElement = section.nextElementSibling;

    while (nextElement) {
      // 检查当前元素是否为下一个分类的标题
      if (nextElement.classList.contains("guoxue_sswj_title")) {
        break; // 遇到下一个分类标题，停止查找
      }

      // 如果是 .fol_list，则提取书籍信息
      if (nextElement.classList.contains("fol_list")) {
        const chapterTitleElement = nextElement.querySelector(".folk_book_for");
        const bookLinks = Array.from(
          nextElement.querySelectorAll(".folk_book_is a"),
        ).map((a) => {
          return {
            title: a.textContent.trim(),
            link: "https:" + a.getAttribute("href"),
          };
        });

        if (chapterTitleElement && bookLinks.length > 0) {
          const chapterTitle = chapterTitleElement.textContent.trim();

          // 将章节信息添加到 books 数组中
          books.push({
            chapter: chapterTitle,
            books: bookLinks,
          });
        }
      }

      nextElement = nextElement.nextElementSibling; // 移动到下一个兄弟元素
    }

    // 将分类和书籍添加到结果中
    result.categories.push({
      category: categoryInfo.category,
      items: books,
    });
  } else {
    console.warn(`No section found for category ID: ${categoryId}`);
  }
});
console.log(result);
// 输出为 JSON 格式
console.log(JSON.stringify(result, null, 2));
