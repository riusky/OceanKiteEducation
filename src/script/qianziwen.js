// 千字文译文版本
// url https://guoxue.httpcn.com/book/qianziwen/yiwen/
// 创建一个空对象保存结果
const results = [];

// 获取所有的列表项
const listItems = document.querySelectorAll(".bjx_main ul li"); // 选择<ul>内的<li>项

// 遍历每个列表项
listItems.forEach((item) => {
  const result = {
    content: [],
    explanation: "",
  };

  // 获取当前列表项中的所有相关元素
  const items = item.querySelectorAll("span.qzw");

  // 遍历每个元素并提取文本和拼音
  items.forEach((span) => {
    const textElement = span.querySelector("b");
    const pinyinElement = span.querySelector("i");
    if (textElement && pinyinElement) {
      result.content.push({
        pinyin: pinyinElement.textContent.trim(),
        character: textElement.textContent.trim(),
      });
    }
  });

  // 获取解释文本
  const explanationElement = item.querySelector(".qzw_yiwen p");
  if (explanationElement) {
    result.explanation = explanationElement.textContent.trim();
  }

  // 将当前列表项的结果添加到总结果中
  results.push(result);
});

// 将所有结果转换为 JSON 字符串
const jsonResult = JSON.stringify(results, null, 2);

// 输出在控制台
console.log(jsonResult);

// 你可以复制这里的 jsonResult 并使用它
