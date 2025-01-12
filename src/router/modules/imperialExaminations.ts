import { $t } from "@/plugins/i18n";

export default {
  path: "/ancientCulture", // 主路由路径：古代文化
  redirect: "/ancientCulture/sanzijing", // 默认重定向到 "国学启蒙"
  meta: {
    title: $t("AncientCulture.index"), // 路由标题：古代文化
  },
  children: [
    {
      path: "/ancientCulture/sanzijing", // 路由路径：国学启蒙
      name: "sanzijing", // 路由名称
      component: () => import("@/views/ancientCulture/initiate/sanzijing.vue"),
      meta: {
        title: $t("AncientCulture.initiate"), // 路由标题：国学启蒙
      },
    },
    {
      path: "/ancientCulture/baijiaxing",
      name: "baijiaxing",
      component: () => import("@/views/ancientCulture/initiate/baijiaxing.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/baijiaxingcomplex",
      name: "baijiaxingcomplex",
      component: () =>
        import("@/views/ancientCulture/initiate/baijiaxing_complex.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/dizigui",
      name: "dizigui",
      component: () => import("@/views/ancientCulture/initiate/dizigui.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/qianziwen",
      name: "qianziwen",
      component: () => import("@/views/ancientCulture/initiate/qianziwen.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/lunyu",
      name: "lunyu",
      component: () => import("@/views/ancientCulture/initiate/lunyu.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/zhuzijiaxun",
      name: "zhuzijiaxun",
      component: () =>
        import("@/views/ancientCulture/initiate/zhuzijiaxun.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/tangshi300",
      name: "tangshi300",
      component: () => import("@/views/ancientCulture/initiate/tangshi300.vue"),
      meta: {
        title: $t("AncientCulture.temperament"),
      },
    },
    {
      path: "/ancientCulture/zhuZi", // 诸子
      name: "ZhuZi",
      component: () => import("@/views/ancientCulture/zhuZi.vue"),
      meta: {
        title: $t("AncientCulture.zhuZi"),
      },
    },
    {
      path: "/ancientCulture/baiJia", // 百家
      name: "BaiJia",
      component: () => import("@/views/ancientCulture/baiJia.vue"),
      meta: {
        title: $t("AncientCulture.baiJia"),
      },
    },
    {
      path: "/ancientCulture/fourBooks", // 四书
      name: "FourBooks",
      component: () => import("@/views/ancientCulture/fourBooks.vue"),
      meta: {
        title: $t("AncientCulture.fourBooks"),
      },
    },
    {
      path: "/ancientCulture/fiveClassics", // 五经
      name: "FiveClassics",
      component: () => import("@/views/ancientCulture/fiveClassics.vue"),
      meta: {
        title: $t("AncientCulture.fiveClassics"),
      },
    },
    {
      path: "/ancientCulture/redChamberDream", // 红楼梦
      name: "RedChamberDream",
      component: () => import("@/views/ancientCulture/redChamberDream.vue"),
      meta: {
        title: $t("AncientCulture.redChamberDream"),
      },
    },
    {
      path: "/ancientCulture/journeyToTheWest", // 西游记
      name: "JourneyToTheWest",
      component: () => import("@/views/ancientCulture/journeyToTheWest.vue"),
      meta: {
        title: $t("AncientCulture.journeyToTheWest"),
      },
    },
    {
      path: "/ancientCulture/waterMargin", // 水浒传
      name: "WaterMargin",
      component: () => import("@/views/ancientCulture/waterMargin.vue"),
      meta: {
        title: $t("AncientCulture.waterMargin"),
      },
    },
    {
      path: "/ancientCulture/romanceOfThreeKingdoms", // 三国演义
      name: "RomanceOfThreeKingdoms",
      component: () =>
        import("@/views/ancientCulture/romanceOfThreeKingdoms.vue"),
      meta: {
        title: $t("AncientCulture.romanceOfThreeKingdoms"),
      },
    },
    {
      path: "/ancientCulture/talesOfLiaozhai", // 聊斋志异
      name: "TalesOfLiaozhai",
      component: () => import("@/views/ancientCulture/talesOfLiaozhai.vue"),
      meta: {
        title: $t("AncientCulture.talesOfLiaozhai"),
      },
    },
    {
      path: "/ancientCulture/wordsOfWarning", // 喻世明言
      name: "WordsOfWarning",
      component: () => import("@/views/ancientCulture/wordsOfWarning.vue"),
      meta: {
        title: $t("AncientCulture.wordsOfWarning"),
      },
    },
    {
      path: "/ancientCulture/wordsOfCaution", // 警世通言
      name: "WordsOfCaution",
      component: () => import("@/views/ancientCulture/wordsOfCaution.vue"),
      meta: {
        title: $t("AncientCulture.wordsOfCaution"),
      },
    },
    {
      path: "/ancientCulture/constantWordsOfAwakening", // 醒世恒言
      name: "ConstantWordsOfAwakening",
      component: () =>
        import("@/views/ancientCulture/constantWordsOfAwakening.vue"),
      meta: {
        title: $t("AncientCulture.constantWordsOfAwakening"),
      },
    },
    {
      path: "/ancientCulture/firstCaseSurprise", // 初刻拍案惊奇
      name: "FirstCaseSurprise",
      component: () => import("@/views/ancientCulture/firstCaseSurprise.vue"),
      meta: {
        title: $t("AncientCulture.firstCaseSurprise"),
      },
    },
    {
      path: "/ancientCulture/secondCaseSurprise", // 二刻拍案惊奇
      name: "SecondCaseSurprise",
      component: () => import("@/views/ancientCulture/secondCaseSurprise.vue"),
      meta: {
        title: $t("AncientCulture.secondCaseSurprise"),
      },
    },
    {
      path: "/ancientCulture/recordsOfTheGrandHistorian", // 史记
      name: "RecordsOfTheGrandHistorian",
      component: () =>
        import("@/views/ancientCulture/recordsOfTheGrandHistorian.vue"),
      meta: {
        title: $t("AncientCulture.recordsOfTheGrandHistorian"),
      },
    },
    {
      path: "/ancientCulture/bookOfHan", // 汉书
      name: "BookOfHan",
      component: () => import("@/views/ancientCulture/bookOfHan.vue"),
      meta: {
        title: $t("AncientCulture.bookOfHan"),
      },
    },
    {
      path: "/ancientCulture/bookOfLaterHan", // 后汉书
      name: "BookOfLaterHan",
      component: () => import("@/views/ancientCulture/bookOfLaterHan.vue"),
      meta: {
        title: $t("AncientCulture.bookOfLaterHan"),
      },
    },
    {
      path: "/ancientCulture/recordsOfTheThreeKingdoms", // 三国志
      name: "RecordsOfTheThreeKingdoms",
      component: () =>
        import("@/views/ancientCulture/recordsOfTheThreeKingdoms.vue"),
      meta: {
        title: $t("AncientCulture.recordsOfTheThreeKingdoms"),
      },
    },
    {
      path: "/ancientCulture/bookOfJin", // 晋书
      name: "BookOfJin",
      component: () => import("@/views/ancientCulture/bookOfJin.vue"),
      meta: {
        title: $t("AncientCulture.bookOfJin"),
      },
    },
    {
      path: "/ancientCulture/bookOfSong", // 宋书
      name: "BookOfSong",
      component: () => import("@/views/ancientCulture/bookOfSong.vue"),
      meta: {
        title: $t("AncientCulture.bookOfSong"),
      },
    },
    {
      path: "/ancientCulture/bookOfSouthernQi", // 南齐书
      name: "BookOfSouthernQi",
      component: () => import("@/views/ancientCulture/bookOfSouthernQi.vue"),
      meta: {
        title: $t("AncientCulture.bookOfSouthernQi"),
      },
    },
    {
      path: "/ancientCulture/bookOfLiang", // 梁书
      name: "BookOfLiang",
      component: () => import("@/views/ancientCulture/bookOfLiang.vue"),
      meta: {
        title: $t("AncientCulture.bookOfLiang"),
      },
    },
    {
      path: "/ancientCulture/bookOfChen", // 陈书
      name: "BookOfChen",
      component: () => import("@/views/ancientCulture/bookOfChen.vue"),
      meta: {
        title: $t("AncientCulture.bookOfChen"),
      },
    },
    {
      path: "/ancientCulture/bookOfWei", // 魏书
      name: "BookOfWei",
      component: () => import("@/views/ancientCulture/bookOfWei.vue"),
      meta: {
        title: $t("AncientCulture.bookOfWei"),
      },
    },
    {
      path: "/ancientCulture/bookOfNorthernQi", // 北齐书
      name: "BookOfNorthernQi",
      component: () => import("@/views/ancientCulture/bookOfNorthernQi.vue"),
      meta: {
        title: $t("AncientCulture.bookOfNorthernQi"),
      },
    },
    {
      path: "/ancientCulture/bookOfZhou", // 周书
      name: "BookOfZhou",
      component: () => import("@/views/ancientCulture/bookOfZhou.vue"),
      meta: {
        title: $t("AncientCulture.bookOfZhou"),
      },
    },
    {
      path: "/ancientCulture/bookOfSui", // 隋书
      name: "BookOfSui",
      component: () => import("@/views/ancientCulture/bookOfSui.vue"),
      meta: {
        title: $t("AncientCulture.bookOfSui"),
      },
    },
    {
      path: "/ancientCulture/southernHistory", // 南史
      name: "SouthernHistory",
      component: () => import("@/views/ancientCulture/southernHistory.vue"),
      meta: {
        title: $t("AncientCulture.southernHistory"),
      },
    },
    {
      path: "/ancientCulture/northernHistory", // 北史
      name: "NorthernHistory",
      component: () => import("@/views/ancientCulture/northernHistory.vue"),
      meta: {
        title: $t("AncientCulture.northernHistory"),
      },
    },
    {
      path: "/ancientCulture/oldTangBook", // 旧唐书
      name: "OldTangBook",
      component: () => import("@/views/ancientCulture/oldTangBook.vue"),
      meta: {
        title: $t("AncientCulture.oldTangBook"),
      },
    },
    {
      path: "/ancientCulture/newTangBook", // 新唐书
      name: "NewTangBook",
      component: () => import("@/views/ancientCulture/newTangBook.vue"),
      meta: {
        title: $t("AncientCulture.newTangBook"),
      },
    },
    {
      path: "/ancientCulture/oldFiveDynastiesHistory", // 旧五代史
      name: "OldFiveDynastiesHistory",
      component: () =>
        import("@/views/ancientCulture/oldFiveDynastiesHistory.vue"),
      meta: {
        title: $t("AncientCulture.oldFiveDynastiesHistory"),
      },
    },
    {
      path: "/ancientCulture/newFiveDynastiesHistory", // 新五代史
      name: "NewFiveDynastiesHistory",
      component: () =>
        import("@/views/ancientCulture/newFiveDynastiesHistory.vue"),
      meta: {
        title: $t("AncientCulture.newFiveDynastiesHistory"),
      },
    },
    {
      path: "/ancientCulture/songHistory", // 宋史
      name: "SongHistory",
      component: () => import("@/views/ancientCulture/songHistory.vue"),
      meta: {
        title: $t("AncientCulture.songHistory"),
      },
    },
    {
      path: "/ancientCulture/liaoHistory", // 辽史
      name: "LiaoHistory",
      component: () => import("@/views/ancientCulture/liaoHistory.vue"),
      meta: {
        title: $t("AncientCulture.liaoHistory"),
      },
    },
    {
      path: "/ancientCulture/jinHistory", // 金史
      name: "JinHistory",
      component: () => import("@/views/ancientCulture/jinHistory.vue"),
      meta: {
        title: $t("AncientCulture.jinHistory"),
      },
    },
    {
      path: "/ancientCulture/yuanHistory", // 元史
      name: "YuanHistory",
      component: () => import("@/views/ancientCulture/yuanHistory.vue"),
      meta: {
        title: $t("AncientCulture.yuanHistory"),
      },
    },
    {
      path: "/ancientCulture/mingHistory", // 明史
      name: "MingHistory",
      component: () => import("@/views/ancientCulture/mingHistory.vue"),
      meta: {
        title: $t("AncientCulture.mingHistory"),
      },
    },
    {
      path: "/ancientCulture/talentAndBeauty", // 才子佳人
      name: "TalentAndBeauty",
      component: () => import("@/views/ancientCulture/talentAndBeauty.vue"),
      meta: {
        title: $t("AncientCulture.talentAndBeauty"),
      },
    },
    {
      path: "/ancientCulture/socialSatire", // 谴责讽世
      name: "SocialSatire",
      component: () => import("@/views/ancientCulture/socialSatire.vue"),
      meta: {
        title: $t("AncientCulture.socialSatire"),
      },
    },
    {
      path: "/ancientCulture/fantasyAndMagic", // 神魔志怪
      name: "FantasyAndMagic",
      component: () => import("@/views/ancientCulture/fantasyAndMagic.vue"),
      meta: {
        title: $t("AncientCulture.fantasyAndMagic"),
      },
    },
    {
      path: "/ancientCulture/classicChivalry", // 古典侠义
      name: "ClassicChivalry",
      component: () => import("@/views/ancientCulture/classicChivalry.vue"),
      meta: {
        title: $t("AncientCulture.classicChivalry"),
      },
    },
    {
      path: "/ancientCulture/historicalNovel", // 历史演义
      name: "HistoricalNovel",
      component: () => import("@/views/ancientCulture/historicalNovel.vue"),
      meta: {
        title: $t("AncientCulture.historicalNovel"),
      },
    },
    {
      path: "/ancientCulture/legalNovel", // 公案小说
      name: "LegalNovel",
      component: () => import("@/views/ancientCulture/legalNovel.vue"),
      meta: {
        title: $t("AncientCulture.legalNovel"),
      },
    },
    {
      path: "/ancientCulture/noteNovel", // 笔记小说
      name: "NoteNovel",
      component: () => import("@/views/ancientCulture/noteNovel.vue"),
      meta: {
        title: $t("AncientCulture.noteNovel"),
      },
    },
    {
      path: "/ancientCulture/classicsSection", // 经部
      name: "ClassicsSection",
      component: () => import("@/views/ancientCulture/classicsSection.vue"),
      meta: {
        title: $t("AncientCulture.classicsSection"),
      },
    },
    {
      path: "/ancientCulture/historySection", // 史部
      name: "HistorySection",
      component: () => import("@/views/ancientCulture/historySection.vue"),
      meta: {
        title: $t("AncientCulture.historySection"),
      },
    },
    {
      path: "/ancientCulture/ziSection", // 子部
      name: "ZiSection",
      component: () => import("@/views/ancientCulture/ziSection.vue"),
      meta: {
        title: $t("AncientCulture.ziSection"),
      },
    },
    {
      path: "/ancientCulture/collectionSection", // 集部
      name: "CollectionSection",
      component: () => import("@/views/ancientCulture/collectionSection.vue"),
      meta: {
        title: $t("AncientCulture.collectionSection"),
      },
    },
  ],
} satisfies RouteConfigsTable;
