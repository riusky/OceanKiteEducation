// URL https://guoxue.httpcn.com/book/zhuzijiaxun/yiwen/
// 获取所有章节的容器
const chapters = document.querySelectorAll(".yxql_combine.zhuzijiaxun_combine");

// 创建一个空数组来存储结果
let chapterData = [];

// 遍历每个章节
chapters.forEach((chapter) => {
  // 获取章节标题
  const title = chapter.querySelector("h4").innerText;

  // 获取所有条目
  const items = chapter.querySelectorAll("li");

  // 存储当前章节的内容
  let content = [];

  // 遍历条目
  items.forEach((item) => {
    // 获取拼音和汉字部分
    const pinyinSpans = item.querySelectorAll("span > i"); // 拼音部分
    const chineseSpans = item.querySelectorAll("span > b"); // 汉字部分

    // 创建条目对象
    let entry = {
      // 将拼音与汉字分开存储为对象数组
      characters: Array.from(pinyinSpans).map((span, index) => ({
        pinyin: span.innerText,
        character: chineseSpans[index] ? chineseSpans[index].innerText : "",
      })),
      explanation: item.querySelector(".qzw_yiwen p").innerText,
    };

    // 添加条目到当前章节的内容
    content.push(entry);
  });

  // 添加章节数据到总结果中
  chapterData.push({
    title: title,
    content: content,
  });
});

// 打印结果
console.log(JSON.stringify(chapterData, null, 2));
