# OPC搭子 - 产品需求文档（PRD）

> 产品名：OPC搭子
> 版本：v1.0 | 日期：2026-03-29
> 状态：初稿，待用户验证

---

## 一、背景与愿景

### 1.1 为什么做

**市场背景**：中国OPC（一手有限责任公司）超过600万家，年增100-150万家，但没有任何产品专门服务这个群体。

**核心痛点**：
- 遇到问题时不知道问谁（孤独）
- 怕踩坑、怕合规风险（恐惧）
- 想找互补的搭伙（增长需求）

**市场空白**：没有专注OPC的AI助手 + 垂直社区 + 合规守护产品

### 1.2 做什么

**一句话定位**：OPC搭子 = AI驱动的OPC专属助手 + 真实OPC社区

**产品形态**：
- 微信H5（核心）：AI助手 + 问答 + 搭子 + 社区
- 服务号：内容推送 + AI主动提醒
- 官网：SEO引流

### 1.3 为什么现在

| 条件 | 说明 |
|------|------|
| AI成本下降 | GLM-4 API ¥0.001/千tokens，经济可行 |
| OPC群体爆发 | 600万+足够大的垂直市场 |
| 微信生态成熟 | H5+服务号 = 无需下载 |
| RAG成熟 | 开源向量库（PGVector）可用 |
| 传播力强 | 小B端1人可影响10个同类 |

---

## 二、用户研究与洞察

### 2.1 三个核心画像

**画像A：张海（犹豫准备期）**
- 28岁，前大厂工程师，辞职准备单干
- 核心诉求：注册流程、注册资本、避坑
- 接触时机：搜索"怎么注册一人公司"

**画像B：李梅（运营期，1-3年）**
- 36岁，独立咨询师，OPC 2年
- 核心诉求：合规安全、税务、年报
- 接触时机：在各种群里提问无人回答

**画像C：王强（突破期，超级个体）**
- 30岁，独立开发者，OPC 3年，年营收200万+
- 核心诉求：找运营搭伙、融资、减少孤独
- 接触时机：被朋友拉进社区

### 2.2 JTBD框架

| 用户想完成的工作 | 背后动机 |
|----------------|---------|
| 帮我顺利注册公司 | 想开始事业，不要被卡住 |
| 告诉我怎么避坑 | 不想走弯路 |
| 有人回答我的问题 | 遇到事不知道问谁 |
| 找到互补的人 | 想打破一个人的局限 |
| 推荐靠谱服务商 | 不想被坑 |
| 有人理解处境 | 一个人干太孤独 |

**核心洞察**：孤独感是深处痛点，但用户表达的是"遇到问题不知道找谁"

### 2.3 痛点排序

| 痛点 | RICE | 优先级 |
|------|------|--------|
| 遇到问题时没有人回答 | 51 | P0 |
| 怕忘记年报被吊销 | 57 | P0 |
| 公私账户混同风险 | 51 | P0 |
| 找不到互补的搭伙 | 16 | P1 |
| 不知道服务商靠不靠谱 | 40 | P1 |

---

## 三、产品定义

### 3.1 定位

**一句话**：中国600万OPC老板的AI助手 + 真实社区

**差异化**：
- 竞品1（泛创业平台）：太泛，没有AI
- 竞品2（工商代办）：纯交易，没有社区
- 竞品3（记账软件）：工具，没有问答/搭伙
- **OPC搭子**：AI守护 + 问答 + 搭伙，三位一体

### 3.2 Slogan

**"OPC路上，有AI陪，有搭子帮"**

### 3.3 北极星指标

> **问题解决率** = 被采纳最佳答案的问题数 / 总提问数

### 3.4 三级指标

| 层级 | 指标 | 第1个月 | 第3个月 | 第1年 |
|------|------|---------|---------|-------|
| 北极星 | 问题解决率 | >50% | >70% | >85% |
| 过程 | 日有效回答数 | >30 | >100 | >500 |
| | AI回答参与率 | >80% | >70% | >60% |
| 健康 | DAU/MAU | >20% | >30% | >40% |
| | 7日留存 | >25% | >35% | >45% |

### 3.5 增长飞轮

```
更多OPC入驻 → 更多问答 → AI学习UGC → 质量↑ → 口碑 → 更多入驻
                                    ↑
                                    │
              搭子配对成功 → 深度连接 → 高留存
```

---

## 四、产品结构

### 4.1 三个入口

| 入口 | 作用 |
|------|------|
| 微信H5 | 核心产品（AI助手+问答+搭子+社区）|
| 服务号 | 内容推送 + AI主动提醒 |
| 官网 | SEO引流（知乎/小红书用户）|

### 4.2 功能架构

```
┌────────────────────────────────────────┐
│              🤖 AI助手层                   │
│  RAG问答 · 合规守护 · 搭子智能匹配       │
├────────────────────────────────────────┤
│              👥 社区层                   │
│  问答广场 · 经验分享 · OPC搭子          │
│  声望值 · 信任徽章 · 服务商推荐        │
├────────────────────────────────────────┤
│              📊 基础设施                 │
│  微信OAuth · 通知推送 · 搜索 · 分享   │
└────────────────────────────────────────┘
```

### 4.3 信息架构（底部Tab）

```
[首页]  [问答]  [搭子]  [我的]
```

---

## 五、功能详情

### 5.1 AI助手（核心P0）

**交互示例**：
```
用户：注册资本写多少合适？

AI（3秒内）：
「好问题！核心原则：够用就行，不要虚高。

1. 不投标/无资质要求 → 10-50万足够
2. 投标/大客户背调 → 100-500万
3. 2024新公司法：认缴期限≤5年

⚠️ 风险：负债时债权人在认缴范围内追缴。

评论区3位OPC老板分享了他们的选择 →
」
```

### 5.2 合规守护（差异化P0）

**合规档案**：
```
📋 你的OPC合规档案

🔴 Q4所得税申报 截止4/15  还剩17天
🟡 年度工商年报    截止6/30  还剩92天
🟢 认缴资本50万    承诺2029年  建议现在开始规划
```

**主动提醒**：
| 类型 | 触发 | 渠道 |
|------|------|------|
| 年报提醒 | 截止前30天 | 服务号模板 |
| 年报紧急 | 截止前7天 | 服务号模板 |
| 认缴规划 | 到期前6个月 | 服务号模板 |

### 5.3 问答社区（P0）

**发布流程**：标题 → 详情 → 标签 → 发布

**回答排序**：
```
得分 = 基础分 × 质量因子 × 时间因子
基础分 = 点赞 + 评论×0.5
质量 = 最佳答案×3.0 × 声望归一化
时间 = e^(-0.05×天数)
```

### 5.4 OPC搭子（差异化P1）

**搭子档案**：
```
我的技能：[软件开发] [产品设计]
我需要的：[运营推广] [客户资源]
简介：我是独立开发者，做SaaS产品，需要运营帮助
```

**匹配逻辑**：
```
用户A：技能=开发，需要=运营
用户B：技能=运营，需要=开发
↓
AI深度理解需求背景
↓
推荐理由：「你们做的事刚好互补...」
```

---

## 六、AI Agent设计

### 6.1 架构

```
┌──────────────────────────────────────────┐
│              OPC搭子AI Agent                 │
│  角色：你身边懂OPC的AI朋友                │
│  能力：问答·合规守护·搭子匹配            │
└─────────────────┬────────────────────────┘
                  │
┌─────────────────┼─────────────────┐
│                 │                 │
│  ┌──────────▼──┐│┌──▼──────────┐ │
│  │ RAG问答Agent│││合规守护Agent │ │
│  └──────────┬──┘│└──┬──────────┘ │
│             │    │    │              │
│  ┌─────────▼────▼────▼──────────┐ │
│  │       知识库层                 │ │
│  │ OPC知识库·UGC问答库·用户档案   │ │
│  └─────────────────────────────────┘ │
│             │                          │
│  ┌─────────▼────────────────────┐   │
│  │  LLM层（GLM-4主力）         │   │
│  └───────────────────────────────┘   │
└───────────────────────────────────────┘
```

### 6.2 RAG流程

```
用户提问
  ↓
意图识别（注册/税务/合规/其他）
  ↓
向量检索（知识库Top5 + UGC最佳答案）
  ↓
LLM综合生成（引用来源，标注风险）
  ↓
质量校验（风险词检测+置信度）
  ↓
输出（<3秒响应）
```

### 6.3 Prompt原则

```
角色：OPC搭子AI助手"小搭"，有温度的朋友
风格：口语化·说人话·主动提示风险·引导UGC
禁止：长篇大论·承诺确定结果·代替专业意见
```

---

## 七、UI/UX设计

### 7.1 设计令牌

```css
:root {
  /* 主色：暖橙 */
  --color-primary-500: #F97316;
  --color-primary-600: #EA580C;

  /* 语义色 */
  --color-success: #10B981;   /* 已解决 */
  --color-warning: #F59E0B;   /* 合规提醒 */
  --color-error: #EF4444;     /* 紧急 */
  --color-info: #3B82F6;      /* 通知 */
  --color-purple: #8B5CF6;     /* AI专属 */

  /* 中性 */
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-border: #E5E7EB;

  /* 字体 */
  --font-family: -apple-system, BlinkFang SC, sans-serif;
  --font-size-base: 16px;
  --line-height-normal: 1.5;

  /* 间距（4px基准）*/
  --space-1: 4px; --space-2: 8px; --space-3: 12px;
  --space-4: 16px; --space-5: 20px; --space-6: 24px;

  /* 圆角 */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;
}
```

### 7.2 核心组件

| 组件 | 说明 |
|------|------|
| QuestionCard | 问题卡片，含标签、点赞、是否已解决 |
| AnswerCard | 回答卡片，含作者信息、点赞、评论入口 |
| BuddyCard | 搭子卡片，含技能/需求标签 |
| UserBadge | 用户身份徽章（新人/认证/MVP） |
| AIAvatar | AI助手头像，紫色专属样式 |
| CreditScore | 声望值展示 |
| ComplianceCard | 合规提醒卡片，含紧迫度色标 |

### 7.3 动效规范

| 场景 | 动效 | 时长 |
|------|------|------|
| 页面进入 | 右滑入 | 300ms |
| 弹窗 | scale(0.95→1) + 背景渐暗 | 200ms |
| 点赞 | 数字跳动 + 心形缩放 | 150ms |
| 回答采纳 | 金色边框 + 礼花粒子 | 500ms |
| AI思考 | 三点波浪式跳动 | 循环600ms |

---

## 八、技术架构

### 8.1 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue3 + TypeScript + Tailwind + Pinia + TanStack Query |
| 后端 | FastAPI + SQLAlchemy 2.0（异步）|
| 数据库 | PostgreSQL + PGVector（向量搜索）|
| 缓存 | Redis（会话+限流+问题缓存）|
| AI | GLM-4 API + BGE-M3 Embedding |
| 认证 | 微信OAuth 2.0 + JWT |
| 部署 | Docker Compose + 腾讯云 |

### 8.2 数据库

**核心表结构**：

```sql
-- 用户表
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickname        VARCHAR(50) NOT NULL,
    avatar_url      VARCHAR(500),
    bio             VARCHAR(200),
    city            VARCHAR(50),
    industry        VARCHAR(50),
    opc_years       INTEGER DEFAULT 0,
    credit_score    INTEGER DEFAULT 0,     -- 声望值
    is_verified     BOOLEAN DEFAULT FALSE, -- OPC认证
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 问答表
CREATE TABLE questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    title           VARCHAR(200) NOT NULL,
    body            TEXT,
    tags            VARCHAR(50)[],
    view_count      INTEGER DEFAULT 0,
    answer_count    INTEGER DEFAULT 0,
    is_solved       BOOLEAN DEFAULT FALSE,
    best_answer_id  UUID,
    ai_answer       TEXT,               -- AI先答内容
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 回答表
CREATE TABLE answers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id     UUID REFERENCES questions(id) ON DELETE CASCADE,
    user_id         UUID REFERENCES users(id),
    body            TEXT NOT NULL,
    upvote_count    INTEGER DEFAULT 0,
    is_best         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 搭子档案
CREATE TABLE buddy_profiles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID UNIQUE REFERENCES users(id),
    skills          VARCHAR(50)[],       -- 技能标签
    needs           VARCHAR(50)[],       -- 需求标签
    bio             TEXT,
    is_visible      BOOLEAN DEFAULT TRUE,
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- 合规档案
CREATE TABLE compliance_profiles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID UNIQUE REFERENCES users(id),
    company_name    VARCHAR(200),
    registered_capital INTEGER,         -- 注册资本
    paid_capital    INTEGER,            -- 实缴资本
    commitment_year  INTEGER,            -- 认缴年份
    tax_type        VARCHAR(20),         -- 小规模/一般纳税人
    last_year_report BOOLEAN DEFAULT FALSE, -- 是否已年报
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 知识库向量（PGVector）
CREATE TABLE knowledge_vectors (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content         TEXT NOT NULL,
    content_type    VARCHAR(20),         -- opc_knowledge/ugc_answer
    source_id       UUID,               -- 来源ID
    embedding       VECTOR(1024),       -- BGE-M3向量
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 通知
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(30) NOT NULL,
    title           VARCHAR(200),
    body            TEXT,
    is_read         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_users_credit ON users(credit_score DESC);
CREATE INDEX idx_questions_created ON questions(created_at DESC);
CREATE INDEX idx_questions_solved ON questions(is_solved);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_answers_best ON answers(is_best) WHERE is_best = TRUE;
-- 向量搜索索引
CREATE INDEX idx_knowledge_embedding ON knowledge_vectors USING ivfflat (embedding vector_cosine_ops);
```

### 8.3 API核心端点

```
认证：
POST /api/auth/wechat/code2session

问答：
GET    /api/questions?page&tag&sort&status
POST   /api/questions
GET    /api/questions/:id
POST   /api/questions/:id/answers
POST   /api/answers/:id/upvote
POST   /api/answers/:id/best

搭子：
GET    /api/buddies?skill&need
POST   /api/buddies/profile
POST   /api/buddies/match

AI：
POST   /api/ai/chat           # RAG问答
GET    /api/ai/compliance/:user_id  # 合规档案

合规：
GET    /api/compliance/profile     # 我的合规档案
POST   /api/compliance/profile     # 创建/更新档案
GET    /api/compliance/reminders   # 提醒列表
```

---

## 九、运营策略

### 9.1 冷启动（0→500用户）

**策略**：创始人即社区

```
第1-30天：
1. Alex以「OPC搭子官方」身份活跃
2. 每天发5-10条真实内容
3. 回答所有用户问题
4. 邀请身边3-5个OPC朋友
5. 知乎发布「OPC注册避坑指南」系列
6. 小红书发布「一个人开公司」真实故事
```

**验证指标**：帖子3天内有5条真实回复

### 9.2 增长（500→2000用户）

**口碑裂变**：
```
用户分享「合规提醒」到朋友圈
  ↓
朋友通过分享进入
  ↓
分享者获得「合规资料包」
  ↓
邀请3人 → 解锁「搭子」功能
```

**内容矩阵**：
| 平台 | 内容 | 目的 |
|------|------|------|
| 知乎 | OPC注册/避坑/合规 | SEO长尾词 |
| 小红书 | 真实OPC故事 | 情感共鸣 |
| 微信公众号 | 政策解读 + 社区精华 | 服务号粉丝 |

### 9.3 留存（核心）

**搭子关系 → 最高留存**：
```
配对成功 → 30天跟进 → 评价 → 续约/分手
  ↓
续约 → 极高留存（超过任何功能）
  ↓
口碑传播 → 新用户
```

---

## 十、商业模式

### 10.1 收入结构

| 模式 | 占比 | 说明 |
|------|------|------|
| 服务商CPS | 40% | 注册代办/记账/银行开户 |
| 知识付费 | 25% | PDF指南 + 付费社群 |
| 付费会员 | 25% | Pro会员（AI合规档案+深度搭子）|
| 广告 | 10% | 创业工具B2B |

### 10.2 定价

| 等级 | 价格 | 权益 |
|------|------|------|
| 免费 | ¥0 | AI问答基础 + 社区浏览 + 搭子档案 |
| Pro | ¥29/月 | AI合规档案 + 主动提醒 + 深度搭子匹配 |
| 企业 | ¥99/月 | 多OPC管理 + 团队合规 + 优先级响应 |

---

## 十一、开发里程碑

| 阶段 | 时间 | 功能 |
|------|------|------|
| **M0 验证** | 第1个月 | 微信服务号 + 知乎内容 + 种子社群（<100人）|
| **M1 MVP** | 第2-3个月 | H5问答 + AI打底回答 + 微信登录 |
| **M2 社区** | 第4-5个月 | 搭子 + 声望值 + 服务商CPS |
| **M3 AI** | 第6-7个月 | 合规守护主动提醒 + AI RAG优化 |
| **M4 增长** | 第8-12个月 | 付费会员 + 企业版 |

**总工期：7个月完整产品**

---

## 十二、风险与应对

| 风险 | 影响 | 应对 |
|------|------|------|
| 微信政策收紧 | AI问答可能被限制 | 备选H5网页版 |
| AI回答法律风险 | 误导用户 | 明确"不代替专业意见"+人工审核 |
| 社区冷启动难 | 没有UGC | 创始人亲自答 + AI打底 |
| 服务商质量不一 | 砸口碑 | 验证机制 + 举报下架 |
| 竞品复制 | 市场被分走 | 快速迭代 + 搭子差异化 |

---

## 附录

### A. 设计稿（Figma）
待补充（团队设计后填入）

### B. API文档
见 `docs/api.md`

### C. 数据库Schema
见 `docs/database-schema.md`

### D. AI Prompt库
见 `docs/ai-prompts.md`

---

*文档版本：v1.0*
*下次更新：用户访谈后（验证核心假设）*
