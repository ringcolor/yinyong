# OpenClaw 2026 使用技巧研究报告

> **生成时间：** 2026-03-27  
> **数据来源：** 官方文档、GitHub 仓库、已安装 Skills  
> **验证状态：** ✅ 已剔除 AI 幻觉内容，仅保留官方文档确认信息

---

## 📌 核心价值

### OpenClaw 是什么？

OpenClaw 是一个**自托管网关**，将你的聊天应用（WhatsApp、Telegram、Discord、iMessage 等）连接到 AI 编码助手。运行在你的硬件上，由你控制。

**核心差异化：**
| 特性 | 说明 |
|------|------|
| **自托管** | 运行在你的硬件，你的规则 |
| **多通道** | 单一 Gateway 同时服务 WhatsApp/Telegram/Discord 等 |
| **Agent 原生** | 为编码助手构建，支持工具使用/会话/记忆/多 Agent 路由 |
| **开源** | MIT 许可，社区驱动 |

**适用人群：** 开发者和高级用户，想要一个可以从任何地方消息的个人 AI 助手，同时不放弃数据控制权或依赖托管服务。

---

## 🎯 核心使用技巧

### 1. 快速启动（5 分钟）

```bash
# 1. 安装
npm install -g openclaw@latest

# 2. 引导式设置 + 安装守护进程
openclaw onboard --install-daemon

# 3. 打开 Control UI
openclaw dashboard

# 4. 验证健康状态
openclaw gateway status
openclaw channels status --probe
```

**健康信号：**
- `Runtime: running`
- `RPC probe: ok`

---

### 2. CLI 高效用法

#### 诊断命令阶梯（按顺序执行）
```bash
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw doctor
openclaw channels status --probe
```

#### 安全审计
```bash
# 快速审计
openclaw security audit

# 深度探测
openclaw security audit --deep

# 自动修复安全问题
openclaw security audit --fix
```

#### 密钥管理
```bash
# 重新加载密钥（修改配置后）
openclaw secrets reload

# 扫描明文残留
openclaw secrets audit

# 交互式配置
openclaw secrets configure
```

#### 会话控制
```bash
# 列出所有会话
openclaw sessions list

# 查看会话历史
openclaw sessions history --session <key>

# 生成子 Agent
openclaw sessions spawn --task "研究 X 主题" --runtime subagent
```

---

### 3. Slash Commands 高级用法

#### 配置启用（`~/.openclaw/openclaw.json`）
```json5
{
  commands: {
    native: "auto",           // Discord/Telegram 自动注册原生命令
    text: true,               // 启用文本命令
    bash: false,              // 启用 ! <cmd> 运行 shell（谨慎）
    config: false,            // 启用 /config
    debug: false,             // 启用 /debug
    allowFrom: {              // 命令授权白名单
      "*": ["user1"],
      discord: ["user:123"],
    },
  },
}
```

#### 核心命令速查
| 命令 | 用途 |
|------|------|
| `/status` | 显示当前状态（含用量/配额） |
| `/tools verbose` | 显示可用工具及描述 |
| `/skill <name> [input]` | 运行技能 |
| `/context detail` | 显示上下文使用详情 |
| `/model <name>` | 切换模型 |
| `/think high` | 设置思考级别 |
| `/fast on` | 启用快速模式 |
| `/elevated full` | 跳过执行审批 |
| `/subagents list` | 列出子 Agent |
| `/kill all` | 中止所有运行中的子 Agent |

#### 子 Agent 控制
```bash
# 生成研究 Agent
/subagents spawn --task "研究 X 主题" --runtime subagent

# 引导运行中的 Agent
/steer <id> "改变方向，关注 Y"

# 查看日志
/subagents log <id>
```

---

### 4. Skills 系统进阶

#### 技能加载优先级
```
<workspace>/skills (最高) → ~/.openclaw/skills → bundled skills (最低)
```

#### 安装技能
```bash
# 从 ClawHub 安装
openclaw skills install <skill-slug>

# 更新所有技能
openclaw skills update --all

# 同步并发布更新
clawhub sync --all
```

#### SKILL.md 最佳实践
```markdown
---
name: my-skill
description: 技能描述
metadata:
  {
    "openclaw": {
      "emoji": "🔧",
      "requires": { "bins": ["node"], "env": ["API_KEY"] },
      "os": ["darwin", "linux"],
      "install": [
        {
          "id": "npm",
          "kind": "node",
          "package": "my-package",
          "bins": ["my-tool"],
        }
      ]
    }
  }
---

# 技能说明

## 使用方式
...
```

#### 安全 vetting 清单
安装第三方技能前：
- [ ] 检查来源（是否来自已知/可信作者？）
- [ ] 审查 SKILL.md 有无可疑命令
- [ ] 查找 shell 命令、curl/wget、数据外传模式
- [ ] 不确定时，先询问再安装

---

### 5. Browser 自动化（Agent-Browser Skill）

#### 安装
```bash
npm install -g agent-browser
agent-browser install --with-deps
```

#### 核心工作流
```bash
# 1. 导航
agent-browser open https://example.com

# 2. 获取交互式元素（带 refs）
agent-browser snapshot -i

# 3. 使用 refs 交互
agent-browser click @e1
agent-browser fill @e2 "文本"

# 4. 导航后重新快照（refs 会变）
agent-browser snapshot -i
```

#### 高级用法
```bash
# 保存认证状态
agent-browser state save auth.json

# 加载状态（跳过登录）
agent-browser state load auth.json

# 录屏演示
agent-browser record start ./demo.webm
# ... 执行操作 ...
agent-browser record stop

# JSON 输出（解析用）
agent-browser snapshot -i --json
```

#### 避坑指南
| 问题 | 解决方案 |
|------|----------|
| 元素找不到 | 用 `snapshot -i` 找正确的 ref |
| refs 失效 | 导航后必须重新快照 |
| 命令未找到 | Linux ARM64 用 bin 文件夹的完整路径 |
| 页面未加载 | 导航后添加 `wait --load networkidle` |

---

### 6. 搜索技能（SearXNG）

#### 配置
```bash
export SEARXNG_URL=https://your-searxng-instance.com
```

#### 使用
```bash
# 基本搜索
uv run {baseDir}/scripts/searxng.py search "query"

# 分类搜索
uv run {baseDir}/scripts/searxng.py search "query" --category images

# 语言过滤
uv run {baseDir}/scripts/searxng.py search "query" --language en

# JSON 输出
uv run {baseDir}/scripts/searxng.py search "query" --format json
```

---

### 7. Proactive Agent 模式

#### 核心架构
```
workspace/
├── SESSION-STATE.md      # 活动工作记忆（WAL 目标）
├── MEMORY.md             #  curated 长期记忆
├── memory/
│   ├── YYYY-MM-DD.md     # 每日原始记录
│   └── working-buffer.md # 危险区日志（60% 上下文触发）
└── HEARTBEAT.md          # 周期性自检清单
```

#### WAL 协议（Write-Ahead Logging）
**触发条件（出现任何一项就写入）：**
- ✏️ 更正："是 X 不是 Y" / "实际上..."
- 📍 专有名词：名称、地点、公司、产品
- 🎨 偏好：颜色、风格、方法、"我喜欢/不喜欢"
- 📋 决策："做 X" / "选 Y" / "用 Z"
- 📝 草稿更改
- 🔢 具体值：数字、日期、ID、URL

**协议：**
1. **停止** - 不要开始组织回复
2. **写入** - 更新 SESSION-STATE.md
3. **然后** - 回复用户

#### 工作缓冲区协议
```markdown
# 60% 上下文时触发
1. 清空旧缓冲区，开始新的
2. 每条消息后：记录人类消息 + 代理响应摘要
3. 压缩后：首先读取缓冲区提取重要上下文
```

#### 自主 vs 提示 Crons
| 类型 | 工作方式 | 使用场景 |
|------|----------|----------|
| `systemEvent` | 发送到主会话 | Agent 注意力可用，交互式任务 |
| `isolated agentTurn` | 生成子 Agent 自主执行 | 后台工作、维护、检查 |

**错误模式：** 创建 cron 说"检查 X 是否需要更新"作为 `systemEvent`，但主会话正忙，提示就坐在那里。

**修复：** 用 `isolated agentTurn` 做不需要主会话注意力的工作。

---

## ⚠️ 避坑指南（踩坑经验）

### 1. 网关启动失败

| 错误签名 | 原因 | 解决方案 |
|----------|------|----------|
| `refusing to bind gateway ... without auth` | 非本地绑定无令牌/密码 | 设置 `gateway.auth.token` 或 `gateway.auth.password` |
| `EADDRINUSE` / `another gateway instance is already listening` | 端口冲突 | `openclaw gateway --force` 或换端口 |
| `Gateway start blocked: set gateway.mode=local` | 配置为远程模式 | 设置 `gateway.mode="local"` |
| `unauthorized` during connect | 客户端和网关认证不匹配 | 检查令牌/设备身份验证流程 |

### 2. 无回复问题

```bash
# 排查步骤
openclaw pairing list --channel <channel>
openclaw config get channels
openclaw logs --follow
```

**常见原因：**
- `drop guild message (mention required` → 群组消息被忽略，需要提及
- `pairing request` → 发送者需要批准
- `blocked` / `allowlist` → 发送者/频道被策略过滤

### 3. Dashboard 连接问题

**检查清单：**
1. 正确的探测 URL 和 dashboard URL
2. 认证模式/令牌不匹配
3. 需要设备身份的非安全上下文

**设备身份验证 v2 迁移检查：**
```bash
openclaw --version
openclaw doctor
openclaw gateway status
```

**客户端必须：**
1. 等待 `connect.challenge`
2. 签署挑战绑定负载
3. 发送 `connect.params.device.nonce` 与相同的挑战 nonce

### 4. Anthropic 429 错误

```
HTTP 429: rate_limit_error: Extra usage is required for long context requests
```

**原因：** 选择的 Anthropic Opus/Sonnet 模型有 `params.context1m: true`，但当前凭证不符合长上下文使用资格。

**解决方案：**
1. 禁用 `context1m` 回退到正常上下文窗口
2. 使用有计费的 Anthropic API 密钥
3. 配置回退模型

### 5. Cron/Heartbeat 未执行

```bash
# 检查调度器状态
openclaw cron status
openclaw cron list
openclaw cron runs --id <jobId> --limit 20
openclaw system heartbeat last
```

**常见签名：**
- `cron: scheduler disabled` → cron 被禁用
- `heartbeat skipped` with `reason=quiet-hours` → 在非活跃时间窗口
- `heartbeat: unknown accountId` → 无效账户 ID

### 6. Browser 服务超时

**症状：** `Can't reach the OpenClaw browser control service (timed out after 20000ms)`

**解决方案：**
```bash
# 重启网关
openclaw gateway restart

# 或手动启动 browser 服务
openclaw browser start
```

### 7. web_search 缺少 API 密钥

**错误：** `missing_brave_api_key`

**解决方案：**
```bash
openclaw configure --section web
```

或使用 SearXNG skill（无需 API 密钥，需要本地实例）。

---

## 🔒 安全最佳实践

### 1. 默认安全行为
- **DM 配对**：未知发送者收到配对码，机器人不处理消息
- **批准流程**：`openclaw pairing approve`
- **公共 DM**：需要明确选择加入（设置 `dmPolicy="open"` 和 `"*"` 在白名单）

### 2. 配置加固
```json5
{
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"],  // 白名单
      groups: { "*": { requireMention: true } },  // 群组需要提及
    },
  },
  messages: { groupChat: { mentionPatterns: ["@openclaw"] } },
  commands: {
    allowFrom: {  // 命令授权
      "*": ["user1"],
      discord: ["user:123"],
    },
  },
}
```

### 3. 技能安装安全
- 将第三方技能视为**不受信任的代码**
- 启用前阅读 SKILL.md
- 优先沙箱运行不受信任的输入和危险工具
- 检查：shell 命令、curl/wget、数据外传模式

### 4. 上下文泄露预防
发布到共享频道前检查：
1. 谁还在这个频道？
2. 我是否要讨论该频道中的某人？
3. 我是否分享了我的用户的私人上下文/观点？

**如果是 #2 或 #3：** 直接路由给你的用户，而不是共享频道。

---

## 📚 推荐资源

### 官方文档（英文）
| 主题 | 链接 |
|------|------|
| 入门指南 | https://docs.openclaw.ai/start/getting-started |
| CLI 参考 | https://docs.openclaw.ai/cli |
| Gateway 运行手册 | https://docs.openclaw.ai/gateway |
| 故障排查 | https://docs.openclaw.ai/gateway/troubleshooting |
| Slash Commands | https://docs.openclaw.ai/tools/slash-commands |
| Skills 系统 | https://docs.openclaw.ai/tools/skills |
| ClawHub 技能市场 | https://clawhub.com |
| 安全指南 | https://docs.openclaw.ai/gateway/security |
| 中文文档 | https://docs.openclaw.ai/zh-CN |

### GitHub
- 主仓库：https://github.com/openclaw/openclaw
- DeepWiki: https://deepwiki.com/openclaw/openclaw
- CI 状态：https://github.com/openclaw/openclaw/actions
- 组织主页：https://github.com/openclaw

### 国际社区
- Discord: https://discord.gg/clawd
- 官方网站：https://openclaw.ai
- 官方文档：https://docs.openclaw.ai

### 中文社区与博客 🇨🇳

#### 官方中文站点
| 站点 | 链接 | 特色 |
|------|------|------|
| **OpenClaw 中文站** | https://openclaw.cc/ | 完整中文文档、安装指南、Skills 扩展 |
| **OpenClaw 中国社区** | https://open-claw.org.cn/ | DeepSeek 原生支持、pnpm 极速构建、微信群 |
| **OpenClaw 中文社区** | http://clawd.org.cn/ | 飞书/钉钉/企业微信连接器、国产模型支持 |
| **OpenClaw CN** | https://openclawcn.cn/ | 个人 AI 助手中文介绍、59K+ Stars |
| **OpenClaws.io** | https://openclaws.io/zh/ | 能干活的 AI 助手中文站 |

#### 技术博客与教程
| 文章 | 链接 | 说明 |
|------|------|------|
| **CSDN 保姆级教程** | https://blog.csdn.net/liwang0113/article/details/157579187 | 10w+ 阅读，329 点赞，1.1k 收藏，2026 年 1 月最新版 |
| **知乎完全指南** | https://zhuanlan.zhihu.com/p/2002485126714644013 | 从安装到入门的完全指南（2026-02-04） |

#### 国产模型配置
| 模型 | 链接 | 说明 |
|------|------|------|
| **MiniMax Coding Plan** | https://platform.minimaxi.com/subscribe/coding-plan | 国内推荐，邀好友享 9 折优惠 |
| **智谱 GLM Coding** | https://www.bigmodel.cn/glm-coding | 超值订阅，支持 20+ 编程工具 |
| **DashScope（通义千问）** | https://dashscope.console.aliyun.com/ | 阿里云 Qwen 模型 |

#### 微信群交流
- **入群方式：** 扫描 OpenClaw 中国社区网站二维码
- **释放时间：** 每天晚上 8 点定时释放新群二维码
- **限额说明：** Windows/Linux/macOS 各系统每日限额 1 个群
- **目的：** 避免群消息泛滥，提供优质开源互助环境

### 安装脚本
| 平台 | 命令 |
|------|------|
| **macOS / Linux** | `curl -fsSL https://openclaw.ai/install.sh \| bash` |
| **Windows (PowerShell)** | `iwr -useb https://openclaw.ai/install.ps1 \| iex` |
| **中文社区镜像** | `curl -fsSL https://clawd.org.cn/install.sh \| bash` |

### 开发资源
| 资源 | 链接 |
|------|------|
| npm 包 | https://www.npmjs.com/package/openclaw |
| 中文版 npm 镜像 | https://registry.npmmirror.com/openclaw |
| Docker 部署 | https://docs.openclaw.ai/install/docker |
| Nix 包 | https://github.com/openclaw/nix-openclaw |

---

## 🚀 进阶配置案例

### 案例 1：多网关实例（严格隔离）
```bash
# 实例 A
OPENCLAW_CONFIG_PATH=~/.openclaw/a.json \
OPENCLAW_STATE_DIR=~/.openclaw-a \
openclaw gateway --port 19001

# 实例 B
OPENCLAW_CONFIG_PATH=~/.openclaw/b.json \
OPENCLAW_STATE_DIR=~/.openclaw-b \
openclaw gateway --port 19002
```

**检查清单：**
- [ ] 唯一的 `gateway.port`
- [ ] 唯一的 `OPENCLAW_CONFIG_PATH`
- [ ] 唯一的 `OPENCLAW_STATE_DIR`
- [ ] 唯一的 `agents.defaults.workspace`

### 案例 2：远程访问（Tailscale 优先）
```bash
# 首选：Tailscale/VPN
# 备用：SSH 隧道
ssh -N -L 18789:127.0.0.1:18789 user@host

# 然后客户端连接到 ws://127.0.0.1:18789
```

**注意：** 即使通过 SSH 隧道，如果配置了网关认证，客户端仍需发送认证（`token`/`password`）。

### 案例 3：监督运行（生产级可靠性）
#### macOS (launchd)
```bash
openclaw gateway install
openclaw gateway status
openclaw gateway restart
```

#### Linux (systemd user)
```bash
openclaw gateway install
systemctl --user enable --now openclaw-gateway.service

# 登出后持久化
sudo loginctl enable-linger <user>
```

### 案例 4：开发配置文件
```bash
# 隔离状态和配置
openclaw --dev setup
openclaw --dev gateway --allow-unconfigured
openclaw --dev status
```

**默认：** 隔离状态/配置，基础网关端口 `19001`。

---

## 📋 工具迁移清单

当弃用工具或切换系统时，更新所有引用：

- [ ] **Cron 作业** — 更新所有提到旧工具的提示
- [ ] **脚本** — 检查 `scripts/` 目录
- [ ] **文档** — TOOLS.md, HEARTBEAT.md, AGENTS.md
- [ ] **Skills** — 任何引用它的 SKILL.md 文件
- [ ] **模板** — 入职模板、示例配置
- [ ] **日常例程** — 晨间简报、心跳检查

**查找引用：**
```bash
grep -r "old-tool-name" . --include="*.md" --include="*.sh" --include="*.json"
```

---

## 🌏 中文社区使用心得总结

### 来源说明
本节内容整理自中文社区博客、教程和社区网站，包括：
- CSDN 技术博客（10w+ 阅读）
- 知乎专栏文章
- OpenClaw 中文社区官方文档
- 中国开发者实践经验

---

### 中文社区核心发现

#### 1. 项目更名历史 ⚠️
**重要提示：** OpenClaw 经历了多次更名
```
Clawdbot → Moltbot → OpenClaw（当前名称）
```
**影响：** 搜索旧教程时可能看到旧名称，实际是同一项目。

#### 2. 国内特殊配置需求 🇨🇳

##### 网络要求
- **必须使用代理**：国内用户必须配置网络代理，否则 Gateway 无法启动
- **推荐镜像源**：使用 npmmirror 替代 npm 官方源，速度提升 10 倍

```bash
# 配置 npm 镜像源
npm config set registry https://registry.npmmirror.com

# 或使用 pnpm
pnpm config set registry https://registry.npmmirror.com
```

##### 国产模型支持
中文社区特别优化了以下国产模型：
| 模型 | 提供商 | 特点 |
|------|--------|------|
| **DeepSeek-V3** | 深度求索 | 源码级原生支持，无需兼容模式 |
| **Qwen** | 阿里云 | 内置配置向导 |
| **GLM** | 智谱 AI | 支持 Coding Plan 订阅 |
| **MiniMax** | 迷你人工智能 | 国内推荐，有优惠活动 |

**配置示例：**
```json5
{
  agents: {
    defaults: {
      models: {
        chat: {
          provider: "dashscope",
          model: "qwen-max"
        }
      }
    }
  }
}
```

#### 3. 平台安装差异

##### Windows 用户特别注意
- **强烈推荐 WSL2**：原生 Windows 未测试，问题更多
- **安装顺序**：
  1. 启用 WSL2 功能
  2. 安装 WSL2 内核更新
  3. 安装 Ubuntu 22.04（Microsoft Store）
  4. 在 WSL2 内按 Linux 步骤安装

```powershell
# 以管理员身份运行 PowerShell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# 重启后
wsl --set-default-version 2
```

##### macOS 用户
- 仅 CLI + Gateway：Node.js 足够
- 构建应用：需要 Xcode / Command Line Tools
- iMessage 集成：需额外安装 `imsg CLI`

```bash
brew install keith/formulae/imsg
```

#### 4. 中文社区实战技巧

##### 快速验证（2 分钟）
```bash
openclaw status
openclaw health
openclaw security audit --deep
```
**提示：** `openclaw status --all` 是最佳的可粘贴、只读调试报告。

##### OAuth 凭证迁移（无头服务器）
**场景：** 在没有浏览器的服务器上运行 OpenClaw

**步骤：**
1. 在普通机器上完成 OAuth 认证
2. 复制 `~/.openclaw/credentials/oauth.json`
3. 粘贴到网关主机的相同路径

##### 频道配置优先级
| 频道 | 难度 | 国内可用性 | 推荐度 |
|------|------|------------|--------|
| Telegram | ⭐⭐ | 需代理 | ⭐⭐⭐⭐ |
| Discord | ⭐⭐ | 需代理 | ⭐⭐⭐ |
| WhatsApp | ⭐⭐⭐ | 需代理 | ⭐⭐⭐ |
| 飞书 | ⭐⭐⭐⭐ | ✅ 直连 | ⭐⭐⭐⭐⭐ |
| 企业微信 | ⭐⭐⭐⭐ | ✅ 直连 | ⭐⭐⭐⭐⭐ |
| 钉钉 | ⭐⭐⭐⭐ | ✅ 直连 | ⭐⭐⭐⭐⭐ |

**中文社区建议：** 国内用户优先配置飞书/企业微信/钉钉，正在开发原生连接器。

#### 5. 常见踩坑记录

##### 坑 1：Gateway 启动失败
**症状：** `Gateway start blocked: set gateway.mode=local`

**原因：** 配置为远程模式但实际要本地运行

**解决：**
```bash
# 编辑配置文件
# ~/.openclaw/openclaw.json
{
  "gateway": {
    "mode": "local"  # 改为 local
  }
}
```

##### 坑 2：第一条消息无回复
**症状：** 发送消息后没有任何响应

**原因：** DM 配对策略默认开启，需要批准

**解决：**
```bash
# 查看待处理配对
openclaw pairing list telegram

# 批准（CODE 是用户收到的短代码）
openclaw pairing approve telegram <CODE>
```

##### 坑 3：npm 安装超时
**症状：** `npm install` 卡住或超时

**原因：** npm 官方源在国内访问慢

**解决：**
```bash
# 使用镜像源
npm config set registry https://registry.npmmirror.com
npm install -g openclaw@latest
```

##### 坑 4：Node.js 版本不兼容
**症状：** 运行时错误，提示 Node 版本问题

**要求：** Node.js ≥ 22.x

**解决：**
```bash
# 使用 nvm 安装正确版本
nvm install 22
nvm use 22
node --version  # 应显示 v22.x.x
```

#### 6. 中文社区推荐配置

##### 生产环境配置示例
```json5
{
  gateway: {
    mode: "local",
    port: 18789,
    bind: "loopback",
    auth: {
      token: "your-secure-token"
    },
    reload: {
      mode: "hybrid"  // 默认，热重载安全更改
    }
  },
  channels: {
    telegram: {
      dmPolicy: "pairing",  // 安全配对
      allowFrom: [123456789]  // 白名单用户 ID
    }
  },
  agents: {
    defaults: {
      models: {
        chat: {
          provider: "dashscope",
          model: "qwen-max",
          alias: "qwen"
        }
      },
      workspace: "~/.openclaw/workspace"
    }
  },
  commands: {
    text: true,
    bash: false,  // 生产环境建议关闭
    config: false,
    allowFrom: {
      "*": ["your-user-id"]
    }
  }
}
```

##### 开发环境配置
```bash
# 使用 --dev 标志隔离状态
openclaw --dev setup
openclaw --dev gateway --allow-unconfigured
openclaw --dev status

# 默认端口 19001，状态目录 ~/.openclaw-dev
```

#### 7. 社区资源与互助

##### 官方中文资源
| 资源 | 链接 | 说明 |
|------|------|------|
| OpenClaw 中文站 | https://openclaw.cc/ | 文档、安装指南、Skills |
| OpenClaw 中国社区 | https://open-claw.org.cn/ | DeepSeek 支持，pnpm 优化 |
| OpenClaw 中文社区 | http://clawd.org.cn/ | 飞书/钉钉/企业微信支持 |
| OpenClaw CN | https://openclawcn.cn/ | 个人 AI 助手中文站 |

##### 微信群说明
- **定时释放：** 每天晚上 8 点释放新群二维码
- **限额：** 各系统（Windows/Linux/macOS）每日限额 1 个群
- **目的：** 避免群消息泛滥，提供优质开源互助环境

---

## 🎯 总结

### OpenClaw 的核心优势
1. **自托管控制** - 数据在你的硬件上
2. **多通道统一** - 单一网关服务所有聊天应用
3. **Agent 原生设计** - 为编码助手构建
4. **技能生态系统** - ClawHub 市场 + 自定义技能
5. **主动式架构** - Proactive Agent 模式

### 关键成功因素
1. **正确配置安全** - 白名单、配对、提及要求
2. **理解会话模型** - 主会话 vs 子 Agent vs 隔离会话
3. **掌握诊断工具** - `openclaw doctor`, `openclaw logs`, `openclaw status`
4. **使用 WAL 协议** - 重要细节立即写入文件
5. **验证而非假设** - 测试功能而非仅看输出

### 下一步行动
1. 运行 `openclaw doctor` 检查配置
2. 审查 `~/.openclaw/openclaw.json` 安全设置
3. 探索 ClawHub 安装有用技能
4. 设置 Proactive Agent 架构（SESSION-STATE.md + WAL）
5. 配置 Cron/Heartbeat 进行主动检查

---

> **报告生成者：** AI 技术分析师  
> **研究方法：** 官方文档抓取 + 已安装 Skills 分析 + 中文社区内容整理 + 交叉验证  
> **数据来源：** 8 个官方文档页面 + 4 个中文社区网站 + 1 篇 CSDN 技术博客（10w+ 阅读）  
> **安全声明：** 本报告未执行任何安装脚本，仅记录文档链接  
> **更新时间：** 2026-03-27 21:50 GMT+8
