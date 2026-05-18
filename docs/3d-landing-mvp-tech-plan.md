# Allen / wowscly 3D Landing Page MVP 技術文件

> Branch: `feature/3d-landing-mvp`  
> Repo: `allen-0777/allen-0777.github.io`  
> MVP 目標工期：3–5 天  
> 目標：在現有 GitHub Pages 網站中新增一個高質感、一頁式、scroll-driven 3D landing page，作為 Allen / @wowscly 的 AI 工具與自動化個人品牌入口。

---

## 1. 產品目標

這不是單純 link-in-bio，也不是一般部落格首頁。

MVP 要做出一個類似 David Heckhoff portfolio 的「互動式個人品牌 landing page」，但主題改成 Allen 的定位：

- AI 工具研究
- Claude Code / AI coding 實戰
- Prompt system
- 自動化工作流
- Threads / @wowscly 內容社群

核心感受：

1. 一進站有記憶點。
2. 滑動滾輪時，3D 主視覺與文案同步推進。
3. 不是炫技而已，每一段都清楚傳達 Allen 能提供什麼價值。
4. 可以拿來當 Threads / IG / YouTube short 的展示素材。

---

## 2. MVP 範圍

### 2.1 先新增頁面，不破壞現有網站

現有 repo 是 Jekyll / GitHub Pages 結構，已經有：

- `/bio/`
- `/bio/index.html`
- `/bio/ai-basics.html`
- `/bio/claude-code.html`
- `/bio/prompts.html`

MVP 不直接覆蓋原本 `/bio/index.html`，先新增：

```txt
/bio/3d/
```

也就是最終可訪問：

```txt
https://allen-0777.github.io/bio/3d/
```

確認效果後，再決定是否把 `/bio/` 導向 `/bio/3d/`。

---

## 3. 技術選型

### 3.1 推薦技術棧

使用 Vite + React + Three.js，而不是直接沿用 Jekyll 寫法。

```txt
Vite
React
TypeScript
Three.js
@react-three/fiber
@react-three/drei
GSAP
GSAP ScrollTrigger
Lenis
Howler.js optional
CSS Modules / SCSS / plain CSS variables
```

### 3.2 為什麼不用 Vue 版照抄 David repo？

David 原站使用：

```txt
Vue 3 + TypeScript + Vite + Three.js + GSAP + Lenis + Howler + Sass + GLSL
```

但 Allen 目前網站是 GitHub Pages + 靜態頁，MVP 優先目標是快速完成可展示版本。React Three Fiber 的開發速度較快，也更適合後續用 AI coding 迭代。

---

## 4. 專案整合方案

### 4.1 Repo 中新增一個 Vite 子專案

建議新增：

```txt
landing-3d/
  package.json
  index.html
  src/
    main.tsx
    App.tsx
    styles.css
    components/
    webgl/
    data/
    assets/
```

build 後輸出到：

```txt
bio/3d/
```

### 4.2 Vite 設定

`landing-3d/vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bio/3d/',
  build: {
    outDir: '../bio/3d',
    emptyOutDir: true,
  },
})
```

### 4.3 GitHub Pages 相容性

因為 repo 是 `allen-0777.github.io`，GitHub Pages 會直接 serve root。只要 build output 在 `bio/3d/`，不需要額外 server。

---

## 5. 頁面敘事架構

MVP 做 6 個 scroll sections。

### Section 1 — Hero

**目的：** 讓人立刻知道 Allen 是誰。

文案方向：

```txt
Allen Chan
AI Tools / Claude Code / Automation
我把 AI 工具變成普通人也能用的工作流
```

3D 狀態：

- 中央 AI core / orb / cube
- 淡淡旋轉
- 背景乾淨、米色或深色科技風

---

### Section 2 — AI Tools Research

**目的：** 說明 Allen 做 AI 工具研究與拆解。

文案方向：

```txt
我研究 AI 工具，不只看功能，而是整理成實際工作場景。
```

3D 狀態：

- AI core 展開成多個 tool nodes
- 周圍出現 tool cards

---

### Section 3 — Claude Code / AI Coding

**目的：** 展示 AI coding 與 prototype 能力。

文案方向：

```txt
用 Claude Code / Codex 把想法快速變成可互動原型。
```

3D 狀態：

- core 轉成 terminal / code window
- 浮動 code snippets

---

### Section 4 — Prompt System

**目的：** 展示 prompt library / workflow 化。

文案方向：

```txt
Prompt 不是一次性問答，而是可以累積、複用、優化的工作系統。
```

3D 狀態：

- prompt cards 堆疊 / 翻牌
- 卡片用 DOM 或 WebGL plane 都可

---

### Section 5 — Content Engine / Threads

**目的：** 對齊 @wowscly 社群成長與內容系統。

文案方向：

```txt
把 AI 工具研究轉成穩定內容輸出，經營 @wowscly Threads 社群。
```

3D 狀態：

- floating content cards
- 數據 / follower count / social icons

---

### Section 6 — CTA

**目的：** 引導追蹤或聯絡。

CTA：

```txt
Follow @wowscly
Message me on Telegram
Explore AI guides
```

3D 狀態：

- AI core 收束成 logo / contact object
- CTA card 出現

---

## 6. 素材需求清單

Allen 會處理素材。以下分為 MVP 必備與進階。

### 6.1 MVP 必備素材

#### Branding

```txt
logo.svg 或 wordmark.svg
favicon.svg
Allen avatar.webp
og-image.webp 1200x630
```

#### 社群圖示

```txt
threads.svg
telegram.svg
github.svg
instagram.svg optional
email.svg optional
external-link.svg
arrow.svg
```

#### 作品 / 內容素材

至少準備 5 張 WebP：

```txt
ai-tools-thumbnail.webp
claude-code-thumbnail.webp
prompt-library-thumbnail.webp
obsidian-workflow-thumbnail.webp
threads-community-thumbnail.webp
```

建議尺寸：

```txt
1600x1000 或 1920x1080
WebP
每張 < 300KB ideally
```

#### Demo 影片 optional，但很加分

```txt
claude-code-demo.mp4
prompt-system-demo.mp4
threads-workflow-demo.mp4
```

建議：

```txt
10–20 秒
muted loop
MP4 H.264
每支 < 3MB ideally
```

---

### 6.2 3D 素材方案

MVP 有兩種路線。

#### 路線 A：先不用外部 GLB，用程式生成

優點：最快、可控、無素材阻塞。

用 Three.js 生成：

```txt
AI core orb
floating cards
nodes
connection lines
particles
terminal plane
```

這是 MVP 推薦路線。

#### 路線 B：使用 GLB 模型

需要：

```txt
ai-core.glb
terminal.glb
prompt-card.glb
workflow-node.glb
```

建議模型規格：

```txt
低面數
已壓縮
材質簡單
單一 GLB < 1MB ideally
```

---

## 7. 視覺方向

### 7.1 不建議完全照 David

David 是 web developer portfolio，主視覺是 avatar / room / lab。Allen 應該更偏：

```txt
AI workflow
tool universe
terminal
prompt cards
content engine
```

### 7.2 推薦色系

方案 A：暖米色科技風

```txt
background: #f5efe6
text: #2d2a24
muted: #6f6659
accent: #ff8400
secondary: #3b82f6
```

方案 B：深色 AI 工具風

```txt
background: #050505
surface: #0f1117
text: #ffffff
muted: #a1a1aa
accent: #8b5cf6
secondary: #38bdf8
```

MVP 建議用 **暖米色 + 橘色 accent**，比較接近 David 參考站，也比較有區別於一般 AI 黑紫網站。

---

## 8. 互動規格

### 8.1 Scroll-driven scene

使用：

```txt
Lenis smooth scroll
GSAP ScrollTrigger
```

每個 section 有一個 progress：

```ts
0 → 1
```

控制：

- camera position
- object rotation
- object scale
- DOM copy opacity
- card position

### 8.2 3D 主物件狀態

MVP 可用一個 `SceneState`：

```ts
type SceneStage =
  | 'hero'
  | 'tools'
  | 'coding'
  | 'prompts'
  | 'content'
  | 'contact'
```

每段定義：

```ts
const stages = [
  {
    id: 'hero',
    camera: [0, 0, 7],
    objectPosition: [0, 0, 0],
    objectScale: 1,
    title: 'Allen Chan',
  },
]
```

### 8.3 Custom cursor optional

MVP 可做簡化版：

- hover link 時放大
- CTA hover 變色

不必第一版就做完整 cursor 系統。

### 8.4 Sound optional

可第二階段再做。

若做：

```txt
Howler.js
hover.mp3
click.mp3
ambient.mp3
```

---

## 9. 檔案結構建議

```txt
landing-3d/
  package.json
  vite.config.ts
  index.html
  tsconfig.json
  src/
    main.tsx
    App.tsx
    styles.css

    data/
      stages.ts
      links.ts
      projects.ts

    components/
      Header.tsx
      ScrollSection.tsx
      StageCopy.tsx
      ProjectCard.tsx
      CTA.tsx
      CustomCursor.tsx

    webgl/
      Scene.tsx
      AICore.tsx
      FloatingCards.tsx
      Particles.tsx
      ScrollRig.tsx
      materials.ts

    assets/
      images/
      videos/
      icons/
      models/
```

---

## 10. 3–5 天執行計畫

### Day 1 — 架構與靜態版

目標：頁面可打開，6 sections 可滑動。

任務：

- 建立 `landing-3d/`
- 安裝 Vite + React + Three.js
- 建立 `/bio/3d/` build pipeline
- 做 header / hero / section copy
- 做 CSS variables / responsive layout

完成標準：

```txt
npm run build 成功
/bio/3d/index.html 可開
手機與桌面不爆版
```

---

### Day 2 — WebGL 主視覺

目標：有一個可看的 3D AI core。

任務：

- 建立 R3F Canvas
- 做 AI orb / cube / nodes
- 加 lighting
- 加 particles
- 用 scroll progress 控制位置 / 旋轉 / scale

完成標準：

```txt
滾動時 3D 物件會跟著場景變化
FPS 可接受
```

---

### Day 3 — Scroll 敘事與素材整合

目標：每段文案 + 3D 狀態同步。

任務：

- GSAP ScrollTrigger
- Lenis smooth scroll
- section reveal animation
- 加 project thumbnails / cards
- 加 CTA

完成標準：

```txt
每一段都有明確敘事
scroll 不卡
核心 CTA 明顯
```

---

### Day 4 — Polish

目標：有高級感。

任務：

- custom cursor
- hover micro-interactions
- preloader optional
- OG image / SEO
- mobile optimization
- image compression

完成標準：

```txt
可錄影發 Threads
手機可看
Lighthouse 無明顯大問題
```

---

### Day 5 — 上線與收尾

目標：合併或保留 branch demo。

任務：

- GitHub Pages 驗證
- README 更新
- 加 link from `/bio/`
- 最後 QA
- 寫 Threads 發文文案

完成標準：

```txt
https://allen-0777.github.io/bio/3d/ 可訪問
可公開分享
```

---

## 11. 驗收標準

### 桌面版

- 首屏 3 秒內可互動
- scroll smooth
- 3D 物件不遮住主要文字
- CTA 清楚
- 沒有 console error

### 手機版

- 不強制重 3D 效果
- Canvas 可降低 DPR
- section 文案可讀
- CTA 不被遮住

### 效能

- initial JS 目標 < 800KB gzip（MVP 可放寬）
- 圖片用 WebP
- 影片 lazy load
- 3D 模型 < 1MB ideally

---

## 12. 風險與取捨

### 風險 1：3D 模型素材不夠

解法：MVP 先 procedural geometry，不依賴 GLB。

### 風險 2：手機效能差

解法：

- `dpr={[1, 1.5]}`
- 減少 particles
- 手機少一點反射與 shader

### 風險 3：太像 David

解法：主題、文案、3D 物件全部改成 Allen / AI 工具宇宙，不做房間 avatar。

### 風險 4：GitHub Pages build 流程複雜

解法：先將 Vite build output commit 到 `bio/3d/`，MVP 不急著做 CI。

---

## 13. 第一版內容草稿

### Hero

```txt
Allen Chan
AI Tools & Automation
我把 AI 工具、Claude Code 與自動化流程，整理成一般人也能上手的工作系統。
```

### AI Tools

```txt
不只介紹工具，而是拆解它在真實工作裡能解決什麼問題。
```

### Claude Code

```txt
用 AI coding 把想法快速變成原型，從 landing page、bot 到自動化工具。
```

### Prompt System

```txt
把 Prompt 從一次性問答，變成可重複使用、可迭代的工作流程。
```

### Content Engine

```txt
把每天研究 AI 的過程，轉成 Threads、教學與可累積的內容資產。
```

### CTA

```txt
Follow @wowscly
Message me on Telegram
Explore AI guides
```

---

## 14. 下一步

1. Allen 準備 MVP 素材：logo、avatar、5 張 project thumbnails。
2. 先完成 procedural 3D 版本，不等 GLB。
3. 在 `/bio/3d/` 做出可分享版本。
4. 驗收後再決定是否取代 `/bio/` 首頁。
