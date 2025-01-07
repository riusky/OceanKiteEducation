// guoxue.httpcn.com/book/baijiaxing/zhuyin/
// 百家姓单字
// 创建一个空数组用于存储结果
let surnamesData = [];

// 使用 querySelectorAll 获取所有的 <li> 元素
const surnameElements = document.querySelectorAll(".bjx_danxing li");

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

// 创建一个异步函数用于处理数据抓取
async function fetchData() {
  for (const liTag of surnameElements) {
    const links = liTag.querySelectorAll("a");

    for (const link of links) {
      const surname = link.querySelector("b").innerText;
      const url = link.href;
      const pinyin = link.querySelector("i").innerText;

      try {
        // 在请求之前清空 localStorage 和 Cookie
        localStorage.clear();
        clearCookies();

        while (true) {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Network response was not ok");

          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "text/html");

          const historyElement = doc.querySelector(".ly_zhushi .lunyu_jies");
          const famousNamesSection = doc.querySelectorAll(".ly_yiwen");
          const distributionSection =
            famousNamesSection.length > 0
              ? famousNamesSection[famousNamesSection.length - 1]
              : null;

          // 获取历史来源
          const historyHTML = historyElement ? historyElement.innerHTML : "";

          // 获取名人信息并合并为一个 HTML 字符串
          let famousNames = "";
          for (let i = 0; i < famousNamesSection.length - 1; i++) {
            famousNames += famousNamesSection[i].innerHTML; // 合并 HTML 内容
          }

          // 获取地望分布
          const distributionHTML = distributionSection
            ? distributionSection.querySelector(".lunyu_jies").innerHTML
            : "";

          // 检查数据是否为空
          if (historyHTML || famousNames || distributionHTML) {
            surnamesData.push({
              surname: surname,
              pinyin: pinyin,
              history: historyHTML,
              famousNames: famousNames, // 保存 HTML 内容
              distribution: distributionHTML,
            });
            break;
          } else {
            console.log(`Data still not found for URL: ${url}, retrying...`);
            await delay(31000);
          }
        }
      } catch (error) {
        console.error(`Error fetching data for ${surname}:`, error);
        surnamesData.push({ surname: surname, url: url, pinyin: pinyin });
        await delay(3000);
      }
    }
  }

  console.log(JSON.stringify(surnamesData, null, 2));
}

// 调用函数执行抓取
fetchData().catch((error) => console.error("Error in fetchData:", error));
