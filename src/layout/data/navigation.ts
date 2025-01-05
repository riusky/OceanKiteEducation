import { BookOpen } from "lucide-vue-next";

export const navigation = {
  initiate: [
    {
      title: "国学启蒙",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "蒙学",
          isActive: true,
          url: "/ancientCulture/initiate",
        },
        {
          title: "声律",
          url: "/ancientCulture/temperament",
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
      ],
    },
    // 新增组
    {
      title: "教育技术",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "在线学习",
          isActive: true,
          url: "/modernEducation/online-learning",
        },
        {
          title: "教育软件",
          url: "/modernEducation/education-software",
        },
      ],
    },
  ],
  university: [
    {
      title: "大学教育",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "本科生",
          isActive: true,
          url: "/university/undergraduate",
        },
        {
          title: "研究生",
          url: "/university/postgraduate",
        },
      ],
    },
    // 新增组
    {
      title: "国际交流",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "交换生项目",
          isActive: true,
          url: "/university/exchange",
        },
        {
          title: "海外学习",
          url: "/university/study-abroad",
        },
      ],
    },
  ],
  career: [
    {
      title: "职业发展",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "职业规划",
          isActive: true,
          url: "/career/planning",
        },
        {
          title: "面试技巧",
          url: "/career/interview-tips",
        },
      ],
    },
    // 新增组
    {
      title: "职业技能",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "简历撰写",
          isActive: true,
          url: "/career/resume-writing",
        },
        {
          title: "职场沟通",
          url: "/career/communication-skills",
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
          title: "学习资源",
          url: "/tools/resources",
        },
      ],
    },
    // 新增组
    {
      title: "研究工具",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "数据分析",
          isActive: true,
          url: "/tools/data-analysis",
        },
        {
          title: "文献管理",
          url: "/tools/literature-management",
        },
      ],
    },
  ],
  news: [
    {
      title: "最新资讯",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "教育新闻",
          isActive: true,
          url: "/news/education",
        },
        {
          title: "行业动态",
          url: "/news/industry",
        },
      ],
    },
    // 新增组
    {
      title: "政策动态",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "教育政策",
          isActive: true,
          url: "/news/education-policy",
        },
        {
          title: "市场趋势",
          url: "/news/market-trends",
        },
      ],
    },
  ],
  dojo: [
    {
      title: "道场学习",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "道德修养",
          isActive: true,
          url: "/dojo/ethics",
        },
        {
          title: "心灵成长",
          url: "/dojo/spiritual-growth",
        },
      ],
    },
    // 新增组
    {
      title: "禅修课程",
      icon: BookOpen,
      isActive: false,
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
      ],
    },
  ],
};
