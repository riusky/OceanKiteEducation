// 选择包含 <ul> 的父元素
const ulElement = document.querySelector(".yxql_combine.zgxw_combine ul");

// 如果存在该 <ul>，则获取所有 <li> 元素
if (ulElement) {
  const liElements = ulElement.querySelectorAll("li");

  let results = [];

  // 遍历每个 <li> 元素
  liElements.forEach((li) => {
    const spans = li.querySelectorAll("span");
    const explanationElement = li.querySelector(".qzw_yiwen p");
    const explanation = explanationElement
      ? explanationElement.textContent.trim()
      : "";

    // 提取汉字和拼音
    const terms = Array.from(spans).map((span) => {
      const pinyinElement = span.querySelector("i");
      const characterElement = span.querySelector("b");

      return {
        pinyin: pinyinElement ? pinyinElement.textContent.trim() : "",
        character: characterElement ? characterElement.textContent.trim() : "",
      };
    });

    // 将当前 <li> 的结果添加到结果数组中
    results.push({
      terms: terms,
      explanation: explanation,
    });
  });

  // 输出获取的所有数据
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log("未找到指定的 <ul> 元素。");
}
