// @ts-check
export default {
  // 忽略规则：如果提交信息包含 "init"，则忽略校验
  ignores: [(commit) => commit.includes("init")],

  // 使用 @commitlint/config-conventional 作为基础配置
  extends: ["@commitlint/config-conventional"],

  // 自定义规则配置
  rules: {
    // 提交正文必须以空行开头
    "body-leading-blank": [2, "always"],

    // 提交脚注必须以空行开头
    "footer-leading-blank": [1, "always"],

    // 提交标题的最大长度限制为 108 个字符
    "header-max-length": [2, "always", 108],

    // 提交主题（subject）不能为空
    "subject-empty": [2, "never"],

    // 提交类型（type）不能为空
    "type-empty": [2, "never"],

    // 限制提交类型（type）的枚举值
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 Bug
        "perf", // 性能优化
        "style", // 样式调整（不影响功能，例如空格、格式化等）
        "docs", // 文档更新
        "test", // 添加或修改测试
        "refactor", // 代码重构（不影响功能和修复的代码变更）
        "build", // 构建系统或依赖相关变更
        "ci", // 持续集成配置变更
        "chore", // 杂务（不修改 src 或测试文件的其他更改）
        "revert", // 回滚提交
        "wip", // 开发中（Work in Progress）
        "workflow", // 工作流相关的变更
        "types", // 类型定义的变更
        "release", // 发布新版本
        "hotfix", // 紧急修复
        "dependency", // 依赖升级或变更
        "security", // 安全修复
        "translation", // 翻译相关内容的更新
        "example", // 示例内容的修改
        "config", // 配置文件变更
        "init", // 初始化项目
      ],
    ],
  },
};
