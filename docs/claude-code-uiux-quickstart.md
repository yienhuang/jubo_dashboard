# Claude Code UI/UX 快速上手指南

> 本指南專為 UI/UX 設計師撰寫，帶你從零開始用 VSCode + Claude Code 協作開發前端介面。

---

## 目錄

1. [前置作業](#前置作業)
2. [開始一個專案](#開始一個專案)
3. [修改 MUI 主題](#修改-mui-主題)
4. [設定 Skill](#設定-skill)
5. [開始製作頁面](#開始製作頁面)

---

## 前置作業

### 1. 安裝 VSCode

前往 [code.visualstudio.com](https://code.visualstudio.com/) 下載安裝。

### 2. 安裝 VSCode Claude Extension

**Extension 與 Terminal 的差異：**

| 項目 | VSCode Extension | Terminal（CLI） |
|------|-----------------|----------------|
| 介面 | 整合在 IDE 側欄，可直接點選檔案、看 diff | 純文字命令列 |
| 看程式碼 | 可直接框選程式碼，右鍵傳給 Claude | 需手動貼上或指定路徑 |
| 適合對象 | 設計師、不熟 CLI 的協作者 | 工程師、習慣 Terminal |
| 功能差異 | 完整 Claude Code 功能 | 完整 Claude Code 功能 |

**安裝步驟：**

1. 打開 VSCode，點左側 Extensions 圖示（或 `Cmd+Shift+X`）
2. 搜尋 **Claude Code**
3. 點 Install
4. 安裝完成後，左側欄會出現 Claude 圖示
5. 登入 Anthropic 帳號（需有 Claude Code 訂閱）

### 3. 安裝 Node.js

前往 [nodejs.org](https://nodejs.org/) 下載 **LTS 版本**安裝。

確認安裝成功：
```bash
node -v   # 應顯示 v20.x.x 以上
npm -v    # 應顯示版本號
```

### 4. 安裝 Figma MCP

MCP（Model Context Protocol）讓 Claude 能直接讀取 Figma 設計稿。

**步驟：**

1. 打開 VSCode，按 `Cmd+Shift+P`，輸入 **Open User Settings (JSON)**
2. 加入以下設定（若已有 `mcp` 欄位則在其中新增）：

```json
{
  "mcp": {
    "servers": {
      "figma": {
        "command": "npx",
        "args": ["-y", "@figma/mcp-server"]
      }
    }
  }
}
```

3. 儲存後重新啟動 VSCode
4. 在 Claude 對話框中輸入 `/figma-use` 確認 MCP 連線正常
5. 第一次使用會要求輸入 Figma Access Token（從 Figma → Account Settings → Access Tokens 取得）

---

## 開始一個專案

### 1. 開啟 VSCode

`File > Open Folder`，選擇你想放專案的目錄。

### 2. 設定專案環境：React + Vite + MUI

開啟 Claude 側欄，貼上以下 prompt：

```
幫我建立一個 React + Vite 專案，需求如下：
- 使用 React 19（JavaScript，非 TypeScript）
- 安裝 MUI v9（@mui/material、@emotion/react、@emotion/styled、@mui/icons-material）
- 安裝 Tailwind CSS v3，與 MUI 並用
- Tailwind 關閉 preflight（避免與 MUI 衝突），改由 MUI CssBaseline 負責 reset
- Tailwind 加上 important: '#root'
- 設定路徑別名 @ 指向 src/
- 完成後啟動 dev server 確認正常
```

---

## 修改 MUI 主題

### 1. 匯入顏色 Token

我們的設計系統有自訂顏色（與 MUI 預設不同），需要把 Figma 中的 Color Token 對應到 MUI Theme。

**步驟：**

1. 在 Figma 中找到 Color Styles，或從設計稿截圖中整理出色票
2. 在 VSCode 開啟 Claude 側欄，貼上類似訊息：

```
幫我建立 MUI Theme，請用以下顏色 Token：

Primary: #0066CC
Secondary: #00A870
Warning: #F5A623
Error: #D0021B
Success: #7ED321

另外我們有幾個特殊色：
Brand Dark: #003D7A
Surface Alt: #F4F7FB
```

3. Claude 會生成 `src/theme/index.js`，內容類似：

```js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#0066CC', dark: '#003D7A' },
    secondary: { main: '#00A870' },
    warning: { main: '#F5A623' },
    error: { main: '#D0021B' },
    success: { main: '#7ED321' },
    background: { default: '#F4F7FB' },
  },
})

export default theme
```

4. 在 `src/main.jsx` 套用 Theme：

```jsx
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)
```

### 2. 套用 Typography Style

我們有針對 MUI Typography 做客製化（字體、字重、行高）。

對 Claude 說：
```
請幫我修改 MUI Theme 的 typography，加入以下設定：

- 字體：Noto Sans TC, Inter, sans-serif
- h1: 32px, weight 700
- h2: 24px, weight 700
- h3: 20px, weight 600
- body1: 16px, weight 400, lineHeight 1.6
- body2: 14px, weight 400, lineHeight 1.5
- caption: 12px, weight 400, color #6B7280
```

Claude 會幫你把 `typography` 設定合併進 `src/theme/index.js`。

---

## 設定 Skill

Skill 是預先定義好的指令集，讓 Claude 每次都用一致的風格協助你。

### 1. 製作設計風格 Skill

Skill 檔案放在 `.claude/skills/` 資料夾中（副檔名 `.md`）。

建立 `.claude/skills/my-brand-ui.md`，內容範例：

```markdown
# Brand UI Skill

當使用者請我建立 UI 元件時：

## 色彩規則
- 主色：primary.main (#0066CC)
- 強調色：secondary.main (#00A870)
- 警示色：warning.main (#F5A623)
- 文字：text.primary (#1A1A2E)、text.secondary (#6B7280)

## 元件規範
- 按鈕：使用 MUI Button，rounded 8px
- 卡片：使用 MUI Card，elevation 0，border 1px solid #E5E7EB
- 表格：使用 MUI DataGrid，斑馬紋配色

## 排版規則
- 頁面標題：h1 或 Typography variant="h4"
- Section 間距：mb: 3（24px）
- 卡片內距：p: 3（24px）
```

### 2. 讓 Claude 讀 Figma MCP

當你需要 Claude 參考設計稿時：

1. 在 Figma 複製你要參考的頁面或 Frame 連結
2. 在 Claude 對話中貼上連結，例如：

```
請參考這個 Figma 設計稿幫我實作：
https://www.figma.com/design/xxxxxx/My-Design?node-id=1:23
```

Claude 會透過 Figma MCP 自動讀取設計稿的視覺內容、顏色、尺寸，並生成對應的程式碼。

### 3. 在 CLAUDE.md 寫入 Skill 使用規則

`CLAUDE.md` 是放在專案根目錄的說明文件，告訴 Claude 這個專案的規則。

在 `CLAUDE.md` 中加入：

```markdown
## UI 開發規則

只要任務涉及建立或修改 UI 元件、頁面、版面，動工前一律先載入以下 skill：

1. **`my-brand-ui`**：確保色彩、字體、間距符合品牌設計系統
2. 使用 MUI 元件 + sx prop 處理樣式，Tailwind 僅用於版面排版
3. 顏色一律使用 theme token（如 `color: 'primary.main'`），禁止 hardcode 色碼
```

---

## 開始製作頁面

### 1. Plan 模式

複雜的頁面或多檔案修改，先讓 Claude 列出計畫，確認後再動工。

在 VSCode Claude 側欄輸入：
```
/plan 幫我建立一個住民列表頁面，包含搜尋欄、篩選器和表格，使用 MUI DataGrid
```

Claude 會列出：
- 預計建立的檔案
- 實作步驟
- 可能的風險

**確認沒問題後**，再說「開始動工」或「請繼續」。

### 2. 在 localhost 即時預覽

保持 `npm run dev` 在背景執行，Claude 每次修改檔案後，瀏覽器會自動熱更新。

```bash
npm run dev
# 開啟 http://localhost:5173 即時看結果
```

### 3. Fork（分支開發）

需要同時試驗多個版本，或不想弄壞主版本時使用分支。

```bash
# 建立新分支
git checkout -b feature/new-dashboard-page

# 完成後合併回主分支
git checkout main
git merge feature/new-dashboard-page
```

若不熟悉 Git，可以對 Claude 說：
```
幫我建立一個叫 feature/login-page 的分支，並切換過去
```

### 4. Figma Code to Canvas（設計稿轉程式碼）

從 Figma 設計稿直接生成 React 元件：

1. 在 Figma 選取你要轉換的 Frame 或 Component
2. 複製其連結（右鍵 → Copy link to selection）
3. 在 Claude 輸入：

```
請根據這個 Figma 元件生成 React + MUI 的程式碼：
https://www.figma.com/design/xxxxxx/...?node-id=1:23

注意：
- 使用 MUI 元件
- 顏色改用 theme token
- 符合我們的 brand-ui skill 規範
```

Claude 讀取設計稿後，會自動對應到 MUI 元件並產出可直接使用的程式碼。

---

## 常見問題

**Q: Claude 生成的程式碼放在哪裡？**  
A: Claude 會直接幫你建立或修改 `src/` 底下的檔案，你可以在 VSCode 的 Explorer 看到變更，並在瀏覽器即時預覽。

**Q: 設計稿顏色和 theme token 不一樣怎麼辦？**  
A: 告訴 Claude「請把顏色對應到 theme token，不要 hardcode 色碼」，它會自動對應最接近的 token。

**Q: 元件跑版怎麼辦？**  
A: 截圖丟給 Claude，說「這個元件跑版了，請修正」，它會根據截圖調整樣式。

**Q: Figma MCP 連不到？**  
A: 確認 VSCode settings.json 設定正確，並重新啟動 VSCode。若還是不行，檢查 Figma Access Token 是否過期。

---

> 有任何問題，歡迎直接在 Claude 側欄提問，或聯繫前端工程師協助。
