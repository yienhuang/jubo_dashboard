# 全域月份區間選擇器 — 實作計畫

## 目標

在各頁面的 page header 加上月份區間選擇器，讓使用者可以切換時間範圍，所有圖表與 KPI 卡對齊同一時間軸。

---

## 現況

| 頁面                | Page header 現況                                                |
| ------------------- | --------------------------------------------------------------- |
| `Dashboard.jsx`     | 本地 `PageHeader` function（line 373），顯示標題 + `reportDate` |
| `Accommodation.jsx` | 內嵌 header（line 1128），顯示分院名稱 + `reportDate`           |
| `DayCare.jsx`       | 空殼（return null）                                             |
| `HomeCare.jsx`      | 空殼（return null）                                             |

---

## 新增檔案

### 1. `src/hooks/useDateRange.js`

用 `useSearchParams` 把選擇的區間存在 URL（`?from=2025-01&to=2025-03`）。

- 提供 `{ from, to, setRange }`
- `from` / `to` 為 `"YYYY-MM"` 格式字串
- 預設值：近 3 個月（例如當月 = 2025-05，預設 from = 2025-03、to = 2025-05）
- `setRange(from, to)` 更新 URL query string

### 2. `src/utils/granularity.js`

```js
// 輸入兩個 "YYYY-MM" 字串，回傳建議的圖表資料粒度
getGranularity(from, to)
  → 相差 <= 1 個月 → 'day'
  → 相差 2–12 個月 → 'month'
```

暫不處理 `'week'` 粒度，避免跨月週的邊界問題。

### 3. `src/components/MonthRangePicker.jsx`

UI 選擇器元件，包含：

- **快速 Chip**（單選）：`本月` / `近 3 個月` / `近 6 個月` / `近 1 年`
- **自訂區間**：兩個 MUI `DatePicker`（`views={['year', 'month']}`，不需額外套件）
  - 選「自訂」Chip 後才展開
  - 限制：`to` 不能早於 `from`；`from` 不能晚於今天
- 內部呼叫 `useDateRange` 的 `setRange`

### 4. `src/components/PageHeader.jsx`

統一的 page header 元件，取代各頁面的本地實作。

```jsx
<PageHeader title="集團總覽" showDateRange />
<PageHeader title={branch ?? '住宿機構'} showDateRange />
```

Props：

- `title`（string）：頁面標題
- `showDateRange`（bool，預設 `true`）：是否顯示月份選擇器

結構：Paper → 左側標題 / 右側 `MonthRangePicker`

---

## 修改檔案

### `src/pages/Dashboard.jsx`

- 移除本地 `PageHeader` function（line 373–397）
- 引入 `src/components/PageHeader`，替換 line 558 的 `<PageHeader />`

### `src/pages/Accommodation.jsx`

- 替換 line 1128–1136 的 inline header，改用 `<PageHeader title={branch ?? '住宿機構'} />`

---

## 不在本次範圍內

- 圖表 / KPI 卡實際接入 `useDateRange` 的資料串接（mockData 階段先保持靜態）
- DayCare、HomeCare 頁面開發（空殼，之後實作時再加入 `PageHeader`）
- 後端 API 串接

---

## 風險與注意事項

- `Dashboard.jsx` 的本地 `PageHeader` 移除前，確認沒有其他地方引用
- MUI `DatePicker` 需確認專案已安裝 `@mui/x-date-pickers`；若未安裝需先告知
- Tailwind 與 MUI 並存規則：MonthRangePicker layout 用 Tailwind flex，元件層樣式用 MUI `sx`
