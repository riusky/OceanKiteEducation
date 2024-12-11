// 获取类别链接
const categoryLinks = Array.from(
  document.querySelectorAll(".heritage-top-bg dd a"),
)
  .filter((a) => a.textContent !== "全部") // 过滤掉 “全部”
  .map((a) => {
    return "https:" + a.getAttribute("href"); // 拼接完整URL，使用 "https:"
  });

// 函数获取书籍数据
async function fetchBooksFromCategory(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const books = Array.from(
      doc.querySelectorAll(".lishi_ershi_list ul li"),
    ).map((li) => {
      const bookLink = li.querySelector("a").getAttribute("href");
      const title = li.querySelector("h4").textContent.trim();
      // 封装成对象
      return {
        title: title,
        link: "https:" + bookLink, // 书籍链接
      };
    });

    return books;
  } catch (error) {
    console.error(`Error fetching books from ${url}:`, error);
    return [];
  }
}

// 主函数
async function main() {
  const allBooks = [];

  for (const link of categoryLinks) {
    const books = await fetchBooksFromCategory(link);
    // 使用 a.textContent 作为类别名
    const categoryName = document.querySelector(
      `.heritage-top-bg dd a[href="${link.replace("https:", "")}"]`,
    ).textContent;

    allBooks.push({
      category: categoryName, // 使用 a.textContent 作为分类
      books: books,
    });
  }

  let formatResult = {
    title: "古典小说",
    categories: allBooks,
  };

  // 输出 JSON 格式数据
  console.log(JSON.stringify(formatResult, null, 2));
}

// 执行主函数
main();
