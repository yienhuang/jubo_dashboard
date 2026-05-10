# 長照集團 Dashboard

長照集團內部管理 Dashboard。

## 快速開始

```bash
npm install
cp .env.example .env.local
npm run dev
```

開發伺服器預設啟動於 http://localhost:5173。

## 技術棧

React 19 (JS) + Vite + Tailwind CSS + MUI + React Router + TanStack Query + React Hook Form + Zod + Recharts + Axios。

詳細約定與專案結構請見 [CLAUDE.md](./CLAUDE.md)。

## 指令

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置生產版本 |
| `npm run preview` | 預覽建置結果 |
| `npm run lint` | ESLint 檢查 |
| `npm run format` | Prettier 格式化 |
