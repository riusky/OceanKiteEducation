import { BookOpen } from "lucide-vue-next";

export const navigation = {
  initiate: [
    {
      title: "国学启蒙",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "三字经",
          isActive: true,
          url: "/ancientCulture/sanzijing",
        },
        {
          title: "百家姓",
          url: "/ancientCulture/baijiaxing",
        },
        {
          title: "百家姓 · 复姓",
          url: "/ancientCulture/baijiaxingcomplex",
        },
        {
          title: "千字文",
          url: "/ancientCulture/qianziwen",
        },
        {
          title: "弟子规",
          url: "/ancientCulture/dizigui",
        },
        {
          title: "论语",
          url: "/ancientCulture/lunyu",
        },
        {
          title: "朱子家训",
          url: "/ancientCulture/zhuzijiaxun",
        },
        {
          title: "唐诗三百首",
          url: "/ancientCulture/tangshi300",
        },
        {
          title: "宋词三百首",
          url: "/ancientCulture/songci300",
        },
      ],
    },
    {
      title: "诸子百家",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "诸子",
          isActive: true,
          url: "/ancientCulture/zhuZi",
        },
        {
          title: "百家",
          url: "/ancientCulture/baiJia",
        },
      ],
    },
    {
      title: "四书五经",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "四书",
          isActive: true,
          url: "/ancientCulture/fourBooks",
        },
        {
          title: "五经",
          url: "/ancientCulture/fiveClassics",
        },
      ],
    },
    {
      title: "文学名著",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "红楼梦",
          isActive: true,
          url: "/ancientCulture/redChamberDream",
        },
        {
          title: "西游记",
          url: "/ancientCulture/journeyToTheWest",
        },
        {
          title: "水浒传",
          url: "/ancientCulture/waterMargin",
        },
        {
          title: "三国演义",
          url: "/ancientCulture/romanceOfThreeKingdoms",
        },
        {
          title: "聊斋志异",
          url: "/ancientCulture/talesOfLiaozhai",
        },
        {
          title: "喻世明言",
          url: "/ancientCulture/wordsOfWarning",
        },
        {
          title: "警世通言",
          url: "/ancientCulture/wordsOfCaution",
        },
        {
          title: "醒世恒言",
          url: "/ancientCulture/constantWordsOfAwakening",
        },
        {
          title: "初刻拍案惊奇",
          url: "/ancientCulture/firstCaseSurprise",
        },
        {
          title: "二刻拍案惊奇",
          url: "/ancientCulture/secondCaseSurprise",
        },
      ],
    },
    {
      title: "二十四史",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "史记",
          isActive: true,
          url: "/ancientCulture/recordsOfTheGrandHistorian",
        },
        {
          title: "汉书",
          url: "/ancientCulture/bookOfHan",
        },
        {
          title: "后汉书",
          url: "/ancientCulture/bookOfLaterHan",
        },
        {
          title: "三国志",
          url: "/ancientCulture/recordsOfTheThreeKingdoms",
        },
        {
          title: "晋书",
          url: "/ancientCulture/bookOfJin",
        },
        {
          title: "宋书",
          url: "/ancientCulture/bookOfSong",
        },
        {
          title: "南齐书",
          url: "/ancientCulture/bookOfSouthernQi",
        },
        {
          title: "梁书",
          url: "/ancientCulture/bookOfLiang",
        },
        {
          title: "陈书",
          url: "/ancientCulture/bookOfChen",
        },
        {
          title: "魏书",
          url: "/ancientCulture/bookOfWei",
        },
        {
          title: "北齐书",
          url: "/ancientCulture/bookOfNorthernQi",
        },
        {
          title: "周书",
          url: "/ancientCulture/bookOfZhou",
        },
        {
          title: "隋书",
          url: "/ancientCulture/bookOfSui",
        },
        {
          title: "南史",
          url: "/ancientCulture/southernHistory",
        },
        {
          title: "北史",
          url: "/ancientCulture/northernHistory",
        },
        {
          title: "旧唐书",
          url: "/ancientCulture/oldTangBook",
        },
        {
          title: "新唐书",
          url: "/ancientCulture/newTangBook",
        },
        {
          title: "旧五代史",
          url: "/ancientCulture/oldFiveDynastiesHistory",
        },
        {
          title: "新五代史",
          url: "/ancientCulture/newFiveDynastiesHistory",
        },
        {
          title: "宋史",
          url: "/ancientCulture/songHistory",
        },
        {
          title: "辽史",
          url: "/ancientCulture/liaoHistory",
        },
        {
          title: "金史",
          url: "/ancientCulture/jinHistory",
        },
        {
          title: "元史",
          url: "/ancientCulture/yuanHistory",
        },
        {
          title: "明史",
          url: "/ancientCulture/mingHistory",
        },
      ],
    },
    {
      title: "古典小说",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "才子佳人",
          isActive: true,
          url: "/ancientCulture/talentAndBeauty",
        },
        {
          title: "谴责讽世",
          url: "/ancientCulture/socialSatire",
        },
        {
          title: "神魔志怪",
          url: "/ancientCulture/fantasyAndMagic",
        },
        {
          title: "古典侠义",
          url: "/ancientCulture/classicChivalry",
        },
        {
          title: "历史演义",
          url: "/ancientCulture/historicalNovel",
        },
        {
          title: "公案小说",
          url: "/ancientCulture/legalNovel",
        },
        {
          title: "笔记小说",
          url: "/ancientCulture/noteNovel",
        },
      ],
    },
    {
      title: "四库全书",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "经部",
          isActive: true,
          url: "/ancientCulture/classicsSection",
        },
        {
          title: "史部",
          url: "/ancientCulture/historySection",
        },
        {
          title: "子部",
          url: "/ancientCulture/ziSection",
        },
        {
          title: "集部",
          url: "/ancientCulture/collectionSection",
        },
      ],
    },
  ],
  modernEducation: [
    {
      title: "现代教育",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "小学",
          isActive: true,
          url: "/modernEducation/primary",
        },
        {
          title: "初中",
          url: "/modernEducation/middle",
        },
        {
          title: "高中",
          url: "/modernEducation/high",
        },
        {
          title: "弟子规",
          url: "/modernEducation/dizigui",
        },
        {
          title: "百家姓复姓",
          url: "/modernEducation/baijiaxing_complex",
        },
      ],
    },
  ],
  university: [
    {
      title: "高等数学",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "微积分",
          isActive: true,
          url: "/university/calculus",
        },
        {
          title: "线性代数",
          url: "/university/linear-algebra",
        },
        {
          title: "常微分方程",
          url: "/university/ordinary-differential-equations",
        },
        {
          title: "统计学",
          url: "/university/statistics",
        },
        {
          title: "立体几何",
          url: "/university/solid-geometry",
        },
        {
          title: "复变函数",
          url: "/university/complex-functions",
        },
      ],
    },
    {
      title: "软件工程",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "软件开发基础",
          isActive: true,
          url: "/university/software-development-basics",
        },
        {
          title: "软件测试与维护",
          url: "/university/software-testing-and-maintenance",
        },
        {
          title: "敏捷开发",
          url: "/university/agile-development",
        },
        {
          title: "数据库系统",
          url: "/university/database-systems",
        },
        {
          title: "云计算",
          url: "/university/cloud-computing",
        },
      ],
    },
    {
      title: "高等物理",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "经典力学",
          isActive: true,
          url: "/university/classical-mechanics",
        },
        {
          title: "热力学",
          url: "/university/thermodynamics",
        },
        {
          title: "量子力学",
          url: "/university/quantum-mechanics",
        },
        {
          title: "电磁学",
          url: "/university/electromagnetism",
        },
        {
          title: "相对论",
          url: "/university/relativity",
        },
      ],
    },
    {
      title: "高等化学",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "有机化学",
          isActive: true,
          url: "/university/organic-chemistry",
        },
        {
          title: "无机化学",
          url: "/university/inorganic-chemistry",
        },
        {
          title: "物理化学",
          url: "/university/physical-chemistry",
        },
        {
          title: "分析化学",
          url: "/university/analytical-chemistry",
        },
        {
          title: "材料化学",
          url: "/university/materials-chemistry",
        },
      ],
    },
  ],
  career: [
    {
      title: "金融",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "金融分析",
          isActive: true,
          url: "/career/finance-analysis",
        },
        {
          title: "投资管理",
          url: "/career/investment-management",
        },
        {
          title: "风险管理",
          url: "/career/risk-management",
        },
        {
          title: "财务报表分析",
          url: "/career/financial-statement-analysis",
        },
      ],
    },
    {
      title: "IT",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "编程基础",
          isActive: true,
          url: "/career/programming-basics",
        },
        {
          title: "数据库管理",
          url: "/career/database-management",
        },
        {
          title: "网络安全",
          url: "/career/cyber-security",
        },
        {
          title: "软件开发",
          url: "/career/software-development",
        },
        {
          title: "数据分析",
          url: "/career/data-analysis",
        },
      ],
    },
    {
      title: "医疗",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "基础护理",
          isActive: true,
          url: "/career/basic-nursing",
        },
        {
          title: "临床技能",
          url: "/career/clinical-skills",
        },
        {
          title: "医学影像",
          url: "/career/medical-imaging",
        },
        {
          title: "公共卫生",
          url: "/career/public-health",
        },
      ],
    },
    {
      title: "教师",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "课程设计",
          isActive: true,
          url: "/career/course-design",
        },
        {
          title: "课堂管理",
          url: "/career/classroom-management",
        },
        {
          title: "教育心理学",
          url: "/career/educational-psychology",
        },
        {
          title: "教学方法与技巧",
          url: "/career/teaching-methods",
        },
      ],
    },
    {
      title: "市场营销",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "市场研究",
          isActive: true,
          url: "/career/market-research",
        },
        {
          title: "品牌管理",
          url: "/career/brand-management",
        },
        {
          title: "数字营销",
          url: "/career/digital-marketing",
        },
        {
          title: "销售技巧",
          url: "/career/sales-skills",
        },
      ],
    },
  ],
  tools: [
    {
      title: "学习工具",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "在线课程",
          isActive: true,
          url: "/tools/online-courses",
        },
        {
          title: "学习计划管理",
          url: "/tools/study-plan-management",
        },
        {
          title: "笔记工具",
          url: "/tools/note-taking",
        },
        {
          title: "知识地图",
          url: "/tools/knowledge-map",
        },
      ],
    },
    {
      title: "办公工具",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "文档处理",
          isActive: true,
          url: "/tools/document-processing",
        },
        {
          title: "电子表格",
          url: "/tools/spreadsheets",
        },
        {
          title: "演示软件",
          url: "/tools/presentation-software",
        },
        {
          title: "项目管理工具",
          url: "/tools/project-management",
        },
      ],
    },
    {
      title: "设计工具",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "图像编辑",
          isActive: true,
          url: "/tools/image-editing",
        },
        {
          title: "矢量图设计",
          url: "/tools/vector-design",
        },
        {
          title: "用户体验设计",
          url: "/tools/ux-design",
        },
        {
          title: "原型制作",
          url: "/tools/prototyping",
        },
      ],
    },
    {
      title: "开发工具",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "代码编辑器",
          isActive: true,
          url: "/tools/code-editor",
        },
        {
          title: "版本控制",
          url: "/tools/version-control",
        },
        {
          title: "调试工具",
          url: "/tools/debugging-tools",
        },
        {
          title: "API测试工具",
          url: "/tools/api-testing",
        },
      ],
    },
    {
      title: "数据分析工具",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "数据可视化",
          isActive: true,
          url: "/tools/data-visualization",
        },
        {
          title: "统计分析",
          url: "/tools/statistical-analysis",
        },
        {
          title: "机器学习工具",
          url: "/tools/machine-learning",
        },
        {
          title: "数据库管理",
          url: "/tools/database-management",
        },
      ],
    },
  ],
  dojo: [
    {
      title: "儒家学习",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "儒家经典",
          isActive: true,
          url: "/dojo/confucian-classics",
        },
        {
          title: "伦理道德",
          url: "/dojo/ethics-morality",
        },
        {
          title: "礼仪文化",
          url: "/dojo/ritual-culture",
        },
        {
          title: "修身齐家",
          url: "/dojo/self-cultivation",
        },
      ],
    },
    {
      title: "佛教禅修",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "基础禅修",
          isActive: true,
          url: "/dojo/basic-meditation",
        },
        {
          title: "深度禅修",
          url: "/dojo/advanced-meditation",
        },
        {
          title: "正念修习",
          url: "/dojo/mindfulness-practice",
        },
        {
          title: "佛教哲学",
          url: "/dojo/buddhist-philosophy",
        },
      ],
    },
    {
      title: "道教修炼",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "太极与气功",
          isActive: true,
          url: "/dojo/taichi-qigong",
        },
        {
          title: "道家经典",
          url: "/dojo/taoist-classics",
        },
        {
          title: "内丹修炼",
          url: "/dojo/neidan-practice",
        },
        {
          title: "自然哲学",
          url: "/dojo/natural-philosophy",
        },
      ],
    },
  ],
};
