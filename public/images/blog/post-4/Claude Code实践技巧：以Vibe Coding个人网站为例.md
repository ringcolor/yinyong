> 案例选取：个人网站（设计+ 开发 + 部署）
>
> AI时代，人人都需要讲好自己的研究故事
>

# 感受
**1 本身开箱即用的体验**

本身开箱即用的使用效果就很好，基本不需要prompt技巧了。因为以前依靠人编写明确的planning，现在claude code会先协作讨论，规划一份planning确认。

**2 善用资源MCP + skills**

全流程几乎0人工，打通设计-开发AI工作流。人参与创作内容本身少（内容创作者），参与内容审核多（内容审核编辑）。

Claude Code支持Figma MCP，读取设计结构和规范，配置UI设计语言的skills可以节约口舌（不需要解释xx风格特征）。

## 实践
### 路径一：原生Claude Code
> 通用的设计语言，可选黑白简洁风格等
>

#### 协作planning制定
##### 要求数据+渲染分离的文件格式
<!-- 这是一张图片，ocr 内容为：我已经制定了实现计划.在开始之前,我想确认一个问题: FINISHED WITH 2 STEPS 馆所用工具:ASKUSERQUESTION 用户提供了更详细的需求: 1.数据和渲染分离-用JSON格式存储 2.JSON数据需要包含: 教育背景(学校,时间,荣誉,核心课程) AL项目经历(项目名,项目图片,项目简介,点击可跳转到详细介绍页) ,科研经历(论文名称,小标题发表时间期刊作者,论文简介,论文图片,点击可跳转到详细介绍页) BLOG  笔记 个人作品 3.左侧边导航栏,包括: ,CV页面(首页:展示教育背景,实习经历,项目经历简介,科研经历简介) 项目经历 科研经历 个人作品 这比之前的设计更复杂了,需要多页面路由.让我更新计划文件. 明白了!你需要一个更完整的个人网站,包含多页面导航,JSON数据分离,以及项目详情页.让我更新计划. -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773556082460-7c4fc7e6-d99a-406c-b97b-514be1f475c3.png)

<!-- 这是一张图片，ocr 内容为：JSON数据结构 EDUCATION.JSON "SCHOOLS": "NAME":"学校名称", "DEGREE":"学位", "MAJOR":"专业", "PERIOD":"时间", "HONORS":["荣誉1","荣誉2"], "COURSES":["核心课程1","核心课程2"] PROJECTS.JSON 子 "PROJECTS": "ID": "PROJECT-1", "项目名称", "NAME": "IMAGE": "图片路径", "SUMMARY":"项目简介", "DETAILS":"详细介绍内容", "TECH":["技术1","技术2"], "LINK":"项目链接" -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555802552-8b9d96d0-7f74-440c-84f9-deb9a3858246.png)

****

**协作讨论planning细节，执行前输出计划确认**

<!-- 这是一张图片，ocr 内容为：聊天 CODEX 帮我制作一个简历网站 帮我制作一个简历网站 CLAUDE CONSIDERED USER REQUIREMENTS FOR RESUME WEBSITE CREATION 我可以帮你制作一个简历网站.在开始之前,我需要了解一些信息: FINISHED WITH 2 STEPS 好的,你选择了REACT技术栈和简约现代风格.让我进入计划模式来设计实现方案. ENTERED PLAN MODE 我来探索当前目录结构,了解现有情况. SEARCHED FOR FILES MATCHING PATTERNS ' /*`JSON,JS,TS,TSX,HTML}` AND 当前目录是空的,这是一个全新的项目.让我设计REACT简历网站的实现方案. PLANNED USER QUESTIONS FOR RESUME CONTENT CONFIRMATION 我已经制定了实现计划.在开始之前,我想确认一个问题: FINISHEDWITH 2 STEPS 明白了!你需要一个更完整的个人网站,包含多页面导航,JSON数据分离,以及项目详情页.让我更 新计划. UPDATED PLAN AND PREPARED FOR USER APPROVAL -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555653265-6c534464-988a-4acd-92b4-ff5cbf89f08f.png)

<!-- 这是一张图片，ocr 内容为：计划已更新完成.主要特点: 1.数据分离-所有数据存储在JSON文件中,方便后续替换 2.左侧导航-固定侧边栏,包含CV,项目经历,科研经历,个人作品 3.详情页-项目和科研支持点击跳转到详细介绍页 4.简约现代风格-黑白灰配色,清晰的信息层级 以下是CLAUDE的计划: REACT个人简历/作品集网站实现计划 CONTEXT 用户希望创建一个个人简历作品集网站,使用REACT技术栈和简约现代风格.需要数据和渲染分离(JSON 格式存储),支持多页面导航,包含项目/科研详情页. 技术方案 框架:REACT18+VITE 路由:REACT ROUTER (多页面导航) 样式:CSS MODULES (简约现代风格) 数据:JSON文件存储,与渲染分离 -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555678180-edb14b36-31c4-407c-80c9-6cad3caca66b.png)

<!-- 这是一张图片，ocr 内容为：页面结构 左侧导航栏(固定) -教育背景,实习经历,项目经历简介,科研经历简介 1.CV(首页) 2.项目经历-AI项目列表,点击跳转详情页 3.科研经历-论文列表,点击跳转详情页 4.个人作品-作品展示 详情页 项目详情页:项目名,图片,详细介绍 科研详情页:论文标题,作者,期刊,摘要,图片等 文件结构 /USERS/ZHUYUTENG/DESKTOP/CLAUDE/ PACKAGE.JSON VITE.CONFIG.JS INDEX.HTML SRC/ MAIN.JSX APP JSX APP.CSS DATA/ 教育背景 EDUCATION.JSON 项目经历 PROJECTS. JSON #科研经历 RESEARCH.JSON BLOG.JSON # BLOG  笔记 井 个人作品 WORKS.JSON PROFILE.JSON #个人基本信息 COMPONENTS/ -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555691277-dab45367-4b84-40d9-9831-b83e888ba123.png)

<!-- 这是一张图片，ocr 内容为：文件结构 /USERS/ZHUYUTENG/DESKTOP/CLAUDE/ PACKAGE.JSON VITE.CONFIG.JS INDEX.HTML SRC/ MAIN JSX APP JSX APP.CSS DATA/ L #教育背景 EDUCATION JSON #项目经历 PROJECTS JSON #科研经历 RESEARCH JSON #BLOG  笔记 BLOG.JSON #个人作品 WORKSJSON PROFILE.JSON #个人基本信息 COMPONENTS/ #布局组件(含侧边栏) LAYOUT.JSX #侧边导航栏 SIDEBAR.JSX #教育背景卡片 EDUCATIONCARD.JSX PROJECTCARD.JSX #项目卡片 #科研卡片 RESEARCHCARD.JSX #作品卡片 WORKCARD.JSX PAGES/ #CV首页 L CV.JSX PROJECTS.JSX #项目列表页 PROJECTDETAIL.JSX #项目详情页 #科研列表页 RESEARCH.JSX #科研详情页 RESEARCHDETAIL.JSX #个人作品页 WORKS.JSX STYLES/ #CSS变量(主题色等) VARIABLES.CSS -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555700981-b833cf72-d3cf-40c1-a513-661dc63dff37.png)

<!-- 这是一张图片，ocr 内容为：实现步骤 1.项目初始化 创建PACKAGE.JSON (含 REACT,REACT-ROUTER-DOM 依赖) 创建VITE.CONFIG.JS 创建INDEX.HTML 2.创建全局样式和CSS变量 定义简约现代风格的颜色变量(黑白灰主色) 响应式布局样式 3.创建JSON数据文件 PROFILE.JSON(个人信息) EDUCATION.JSON PROJECTS.JSON RESEARCH.JSON WORKS.JSON BLOG.JSON 4.创建布局和导航组件 (页面布局) LAYOUT.JSX SIDEBAR.JSX  (左侧固定导航栏) 5.创建页面组件 CV.JSX(首页) -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555884571-d76bf6f0-e2f7-484a-82d6-b457c6edef13.png)

<!-- 这是一张图片，ocr 内容为：5.创建页面组件 CV.JSX(首页) PROJECTS.JSX+PROJECTDETAIL.JSX RESEARCH.JSX +RESEARCHDETAIL.JSX WORKS.JSX 6.创建卡片组件 EDUCATIONCARD.JSX PROJECTCARD.JSX RESEARCHCARD.JSX WORKCARD.JSX 验证方式 1.NPM INSTALL 安装依赖 启动开发服务器 2. NPM RUN DEV 3.测试各页面导航 4.测试项目/科研详情页跳转 5.验证响应式布局 预期效果 左侧固定导航栏,右侧内容区 点击导航可切换页面 点击项目/科研卡片跳转详情页 数据与渲染分离,易于维护 简约现代风格 -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555895283-cbf5fed1-e543-42b1-88a4-50f012c84401.png)

#### step2: 交付验证
<!-- 这是一张图片，ocr 内容为：端口 串行监视器 调试控制台 问题 终端 输出 MN7HI COLOR:VAR(--TEXT-PRIMARY); MARGIN-BOTTOM: VAR(--SPACING-SM); 小 75 -,LIST { 6H77 LIST-STYLE: NONE; PADDING:0; MARGIN: 78 -} 81 -.ITEM { FONT-SIZE: VAR(--TEXT-SM); 82- FONT COLOR: VAR(--TEXT-SECONDARY); 83 PADDING: VAR(--SPACING-XS) 0; 84 PADDING-LEFT:VAR(--SPACING-MD); 85 - 86 - POSITION:RELATIVE; 87 -} 88 - ITEM::::: 89 90 CONTENT: 91 POSITION:ABSOLUTE; LEFT:0; 92 77 COLOR: VAR(--TEXT-MUTED); 78 + FLEX-SHRINK:0; LINE-HEIGHT: 1.8; 79 + 了 80 81 TAGS{ 82 88 .TAG{ DISPLAY: INLINE-BLOCK; 89 FONT-SIZE: VAR(--TEXT-XS); 06 PADDING:VAR(--SPACING-XS) VAR(--SPACING-SM); 105 91 + PADDING: 2PX VAR(--SPACING-SM); BACKGROUND-COLOR: VAR(--BG-TERTIARY); 92 BORDER-RADIUS: VAR(--RADIUS-FULL); 93 COLOR: VAR(--TEXT-SECONDARY); 94 已修改完成.现在教育经历卡片更紧凑了: -第一行:大学名+英文名+就读时间 -第二行:学历专业GPA 第三行:荣誉:标签形式 第四行:课程:标签形式 刷新页面 HTTP://LOCALHOST:3000/查看效果. -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555614815-55d67b11-4c8e-45a5-9620-ef2fcd518656.png)

<!-- 这是一张图片，ocr 内容为：教育背景 北京大学 202209-2025.06 PEKINGUNIVERSITY 硕士研究生  计算机科学与技术 GPA:3.85/4.0 荣誉:国家奖学金优秀研究生 学业一等奖学金 计算机视觉 课程:机器学习深度学习自然语言处理 清华大学 2018.09-2022.06 TSINGHUA UNIVERSITY 本科.计算机科学与技术 GPA:3.90/4.0 ACM程序设计竞赛银牌 荣誉:优秀毕业生国家奖学金 计算机网络人工智能导论 操作系统 课程:数据结构与算法 -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773561436374-4d10865a-0b96-4572-8109-c96afaf78b30.png)

##### *善用skills
:::warning
##### UI UX Pro Max
[https://github.com/nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

<!-- 这是一张图片，ocr 内容为：HTTPS://GITHUB.COM/NEXTLEVELBUILDER/UI-UX-PRO-MAX-SKILL我想装这个SKILLS FETCH(HTTPS://GITHUB.COM/NEXTLEVELBUILDER/UI-UX-PRO-MAX-SKILL) RECEIVED 422.6KB (200 0K) 个配色方案等. 用 CLI 方式安装(推荐): -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773632175914-68ef7ae4-71cb-47a6-883c-3a3ecd7273f4.png)

:::





### 路径二：Stitch + Figma MCP + Claude Code
> 更遵循；
>
> 设计规范明确，需要高保真还原；
>

<!-- 这是一张图片，ocr 内容为：UI设计 前端代码生成 或者直接让CLAUDE CODE生成前端代 码 FIGMA AI STUDIO STITCH 后端代码生成+前后端联调 SUPABASE VERCEL ANTIGRAVITY CURSOR CLAUDE CODE 数据存储,用户 函数,部署,数 认证,EDGE 据分析 FUNCTION LIIILLIIIILL 版本控制,CI GITHUB -->
![](https://cdn.nlark.com/yuque/0/2026/jpeg/26058316/1773631501607-b0474866-5c8e-4d55-9520-151294ff8690.jpeg)

#### 前期设计（传统的模式）
[https://stitch.withgoogle.com/projects/15338690318030162277](https://stitch.withgoogle.com/projects/15338690318030162277)

强推Stitch->Figma的工作模式：

+ 输入参考来源->对话式沟通获取整体的排版、内容构成->获取规范化的figma组件命名文件->UI细节修改

| Stitch：基于参考图对话式迭代UI设计 | Stitch->Figma：规范输出+细节调整 |
| --- | --- |
| <!-- 这是一张图片，ocr 内容为：山导出 共享 新建项目 朱瑞 HOW DOES THIS LOOK TO YOU?ARE THERE ANY SPECIFIC PROFILE DETAILS OR SECTIONS YOU'D LIKE ME TO ADJUST? 滕朱瑜 左边侧边栏位置高一点,置顶,CV页放置为第一页 FROE THET FWEN DERSULERSTOMPERS KOUMS SOENS SOEMS SOEMERS SOERS SOEMS SOEN THE STITCH 3 FLASH X 好的,我明白了.我会调整侧边栏的位置,使其置顶 显示,并确保CV页面作为首屏呈现.正在为您更新 设计... CERTIFICATIONS 正在模拟..... ESTIMATED TIME,40 SECONDS SKILLS 描述设计内容 3X 3.0 FLASH 33% TIP:TRY THE TOP RIGHT [SHARE]BUTTON TO SHARE YOUR PROJECT -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555558146-02d15b5e-7d89-4530-9eab-2a5ff17d5678.png) | <!-- 这是一张图片，ocr 内容为：1600 PAGE THEME G PROFILE LAYERS LOREM IPSUM DOLOR SIT AMET,CONSECTETUR ADIPISCING ALIT,,SED DO EIUSMOD TEMPORE BODY CONSEQUAT. DUIS AUTE IRURE DALOR IN REPREHENDERIT IN VOLUPTATE VEFIT ESSE CLLUM DOLORE EU FUGIATURIAT HOME EXCEPTEUR SINT OCCAECAT CUPLDATATAT NON PROLDENT, SUNT IN CULPA QUL OFFICLA DESORUNT ANIM ID EST LABO MAIN CONTENT PROJECTS TOP RIGHT THEME SWITCHER M EDUCATION SERVICES STORE SECTION:PROFILE TITLE NAME BLOG [START YEAR] TO [END YEAR]AT [STUDY CENTER NAME]][CITYL.[COUNTRY] 1200 SECTION:EDUCATION CV ETITLE NAME HEADING 2 CONTACT [START YEAR] TO[END YEAR] AT [STUDY CENTER NAME],[CITY].[COUNTRY] CONTAINER EXPERIENCE VERTICAL DIVIDER 1000 JOB TITLE AT PROJECT OR COMPANY NAME FREM [START DATE] TO [END DATE]AT [COMPANY].[CITYL.[COUNTRY] EDUCATION ENTRY 1 LOREM IPSUM DOLOR SIT AMET,CONSECTETUR ADIPISCING ELIT,SED DO ELUSMOD TEMPOR INCIDUNT LABORE ET DOTO 006- MAGNA LIQUA.UT ENIM AD MINIM VENIAM,QUIS NOSTRUD EA CHEADING 3 COMMNODO CONSEQUAT DUIS AUTE FRURE DOLOR IN REPREHENDERIT IN VOLUPTAT NUTE VELIT ESSE CLORE EU UGIAT  PARIATUR.EXCEPTEUR SINT OCCAECAT CUPLDATAT NON PROIDENT. CONTAINER -800 JOB TITLE AT PROJECT OR COMPANY NAME BACKGROUND FROM [START DATE] TO [END DATE]AT [COMPANYL.[CITYL.[COUNTRYL EDUCATION ENTRY 2 -700 LOREM LPSUM DOLOR SIT AMEL,CONSECTETUR ADIPLSCING EIL, SED DO EFUSMOD TEMPORE MAGNA ALLQUA. UT ENIM AD MINIM VENIAM,QULS NOSTRUD EXERCTATION ULAMCO LAMCO LABONISI UT ALLQULP EA COMMODO CONSEQUAT, DULS AUTE VEIT ESSE DOLOR IN REPREHENDERIT IN VOLUPTAT ESSE CLIUM DOLORE EU FULLA 00 HEADING 3 PARIATUR.EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT. 009- CONTAINER JOB TITLE AT PROJECT OR COMPANY NAME FRCM [START DATE] TO(END DATE] AT [COMPANYL.[CITY].[COUNTRY] BACKGROUND LOREM INSUM DOLOR SIT AMET-CONSECTETUR ADIOISCIND EFT. SED DO ELUSMAD TEMNOR INCLDIDIDUNT LABORE SECTION:EXPERIENCE 小鼠小 8 # -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773561599226-8b23aa46-321d-43d5-b7b4-7e614827a1da.png) |






##### *善用FIgma MCP
[https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)

[https://code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)

组件、命名规范

<!-- 这是一张图片，ocr 内容为：通过MCP连接FIGMA 让我检查一下当前环境中是否有FIGMA MCP 工具可用. SEARCHED FOR 3 PATTERNS, READ 2 FILES (CTRL+O TO EXPAND) 目前你的环境中没有配置 FIGMA MCP.要连接 FIGMA,需要进行以下设置: 配置FIGMA MCP 的步骤 1.获取 FIGMA API TOKEN 1,登录 FIGMA 2.点击右上角头像 SETTINGS 部分 3,滚动到PERSONAL TOKENS ACCESS 4.点击 CREATE NEW TOKEN 5.设置名称(如"CLAUDE MCP"),选择权限(至少需要FILE READ) 6.复制生成的TOKEN (只显示一次) 2安装 FIGMA MCP SERVER 常用的 FIGMA MCP  服务器有几个选择: 安装 使用 NPM NPM INSTALL -G @MODELCONTEXTPROTOCOL/SERVER-FIGMA NPX直接运行(无需安装) #或使用 3.配置 CLAUDE CODE 的 MCP 你需要在配置文件中添加MCP服务器设置.你想让我帮你创建这个配置吗? 请告诉我: 1.你是否已经有 FIGMA  API TOKEN? ?(可以提供文件链接或ID) FIGMA文件?(I 2.你想用哪个 的FIGMA设计文件. 我可以帮你完成 MCP 配置,然后访问你的 -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773555598711-2b36743c-4eb0-4241-8842-6a51ecffe430.png)



#### 复盘
<!-- 这是一张图片，ocr 内容为：##路径二使用心得:STITCH CLAUDE CODE MCP .GMA 一,过程中的关键操作 ### 4 5 步骤|操作|结果I 9 LIIIIIILIIIIIIIIIII 7 L1 尝试'WEBFETCH"直接读取FIGMA 链接 IX失败,FIGMA 需要认证 MCP  服务器添加成功,但显示"需要认 8 I 2 | 执行'CLAUDE MCP ADD --TRANSPORT HTTP FIGMA-REMOTE-MCP HTTPS://MCP,FIGMA.COM/MCP 证" 6 X失 3  尝试`CLAUDE MCP AUTH 命令 失败,命令不存在 10 4  搜索 FIGMA MCP 认证方式,发现需要 PERSONAL ACCESS TOKEN 获取解决方案 5  用户在 FIGMA 设置中创建 TOKEN  用户操作完成 11 | 6 | 尝试'AUTHORIZATION: BEARER {TOKEN}'格式 | APT返回 INVALID TOKEN 12 | 7 | 改用 X-FIGMA-TOKEN:{TOKEN}' 格式 | 认证成功,获取用户信息 13 8  用`CURL`调用FIGMA  API 获取文件数据 成功获取设计JSON 14 获取颜色,字体,布局等完整设计信息 9  用 PYTHON 解析 JSON 提取设计结构 15 生成完整网站代码 10                                                                                                    16 17 ###二,关键输出 18 19 20 FIGMA MCP 配置命令 T** 水水 21 BASH --TRANSPORT HTTP FIGMA-MCP HTTPS://MCP.FIGMA.COM/MCP 22 CLAUDE MCP ADD --HEADER "X-FIGMA-TOKEN:{YOUR_TOKEN]" 23 24 25 26 **2,设计结构解析结果** 27 28 BODY [FRAME] BG: RGB(249,250,251) | 1280X1836 | LAYOUT: VERTICAL [FRAME] BG: |RGB(255,255,255) | 1000X1836 29 MAIN CONTENT SECTION:PROFILE 30 31 SECTION:EDUCATION (TIMELINE) ITTT SECTION:EXPERIENCE (TIMELINE) 32 SECTION:CERTIFICATIONS 33 - SECTION: SKILLS (GRID) 34 FOOTER 35 - ASIDE - SIDEBAR [FRAME] BG: RGB(243,244,246) | 240X1836 36 PROFILE PICTURE+NAVIGATION 37 38 SOCIAL ICONS -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773554434030-004d21d7-fd49-4d3e-b6d6-4cbc8bfcf15f.png)

<!-- 这是一张图片，ocr 内容为：**3,设计规格提取** #F3F4F6,标题 #111827,正文 #374151 #F9FAFB,侧边栏 配色方案:背景 字体:INTER(400/500/600/700) 布局:左侧边栏240PX+右侧主内容 1000PX 组件:TIMELINE 时间线,GRID 技能网格,导航菜单 **4,生成代码文件** INDEX.HTML`-语义化 HTML 结构 'STYLES.CSS'-响应式样式+亮暗主题 MAIN.JS'-主题切换+平滑滚动 ##三,沟通使用的技巧 **1,遇阻即搜索** 当,WEBFETCH`失败时,立即搜索替代方案 当`AUTH 命令不存在时,搜索正确的认证方式 当 API返回错误时,搜索正确的 HEADER 格式 **2,分步验证** 先测试 TOKEN 有效性:`CURL.../V1/ME 再获取设计数据:'CURL ..../V1/FILES/{FILE_ID}' 最后解析并开发 多方案尝试** **3 WEBFETCH 直接API调用 AUTHORIZATION:BEARER X-FIGMA-TOKEN 不在一个方案上死磕,灵活切换 **4,透明沟通** 告知用户每步操作的目的和结果 遇到问题时说明原因和替代方案 让用户参与关键决策(如提供TOKEN) -->
![](https://cdn.nlark.com/yuque/0/2026/png/26058316/1773554700624-ec87cf14-58c9-4841-92f0-91064904a195.png)

:::warning
**总结coding过程**：

1. 关键执行步骤、执行动作、结果成功/失败原因
2. 关键输入输出：
    1. Figma MCP配置
    2. 设计结构解析结果
    3. 设计规格提取-配色、字体、布局、组件
    4. 代码文件规划
3. 沟通使用技巧
    1. 遇到阻碍搜索替代方案（Figma MCP命令不存在）
    2. 分步骤验证

:::



## 讨论
AI时代的设计流程转变

旧的设计工作流：“调研-发散-收敛”，截止到「交付设计」；协作planning 设计内容（视觉、排版、逻辑）

vibe coding能力逐渐强大：从「交付设计」到「执行设计」，关注设计验证；协作planning 内容+执行

