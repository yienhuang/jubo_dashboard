# 動態 Mock 資料模擬 — 實作計畫

## 目標

讓 Dashboard 和 Accommodation 頁面的趨勢圖粒度、KPI 卡數值跟著全域月份選擇器變動，模擬真實 API 行為。

---

## 粒度規則（更新 granularity.js）

| 選擇     | diff（月數）| 粒度   | 資料點數量    |
|----------|-------------|--------|--------------|
| 本月     | 0           | `day`  | ~28–31 筆    |
| 近3個月  | 2           | `week` | ~13 筆       |
| 近6個月  | 5           | `month`| 6 筆         |
| 近1年    | 11          | `month`| 12 筆        |

規則：`diff <= 0 → day`、`diff <= 2 → week`、`else → month`

---

## 架構

### 不改動的資料
靜態 mockData 保留不動，作為「基準月份資料」（代表 2026/05 這個月的基準值）。

### 新增 `src/utils/mockDataGenerator.js`
核心工具函式，所有動態計算集中在這一個檔案。

**提供的函式：**

#### `generateTimeLabels(from, to, granularity)`
根據 from/to/granularity 產生 X 軸標籤陣列：
- `day`：`["5/1", "5/2", ..., "5/31"]`（from 到 to 之間的每一天）
- `week`：`["4/W5", "5/W1", "5/W2", ...]`（每週第一天的 M/W 格式）
- `month`：`["25/05", "25/06", ...]`（每個月的 YY/MM 格式）

#### `generateSeriesData(baseValue, count, granularity, options)`
根據基準值產生指定數量的資料點：
- 使用 `Math.sin(i * 127.1 + seed * 311.7)` 產生確定性雜訊（不會每次 render 跳動）
- `granularity = 'day'`：日內波動較大（±8%）
- `granularity = 'week'`：週間波動中等（±5%）
- `granularity = 'month'`：月間波動較小（±3%），並加入輕微上升趨勢

#### `generateTrend(staticData, from, to, granularity)`
包裝函式，接收靜態趨勢資料（`{ months, series }`），回傳同格式的動態版本：
```js
// 輸入
{ months: [...13筆], series: [{ name, color, data: [...13筆] }] }

// 輸出（例如選本月）
{ months: ["5/1", ..., "5/31"], series: [{ name, color, data: [...31筆] }] }
```
以靜態資料最後一個月的值作為該系列的基準值（`data[data.length - 1]`）。

#### `generateKpiValue(baseValue, type, months)`
根據區間調整 KPI 數值：
- `type: 'total'`（總計型，如累計營收）：`baseValue × months`
- `type: 'average'`（平均型，如佔床率）：`baseValue ± 小波動`
- 回傳格式化後的字串（含千分位）

#### `generateKpiHint(from, to)`
根據選擇的區間產生 hint 文字：
- 1 個月：`"2026年5月"`
- 多個月：`"2026年3月 – 2026年5月"`

---

## 修改範圍

### `src/utils/granularity.js`
加入 `week`，更新規則。

### `src/pages/Dashboard.jsx`
- 引入 `useDateRange`、`generateTrend`、`generateKpiValue`、`generateKpiHint`
- 用 `useMemo` 計算動態版的：
  - `serviceTrend`、`staffTrend`、`turnoverTrend`、`revenueTrend`（趨勢圖）
  - `revenueKpis`、`peopleKpis`（KPI 卡的數值與 hint）

### `src/pages/Accommodation.jsx`
- 引入相同工具
- 動態化：
  - `occupancyTrend`、`revenueByBranch`（總覽趨勢圖）
  - `overviewKpis`（總覽 KPI）
  - 各分院的 `revenueTrend`、`staffCostTrend`（分院頁趨勢圖）

---

## 不在本次範圍

- 分院的 `residentMovement`（入退住瀑布圖，資料結構較特殊，另作討論）
- 圓餅圖（`serviceShareCurrent`、`branchServiceShare` 等）：維持「當月快照」語意，不隨區間變動
- `branchRanking`、`facilityList` 等表格：維持靜態

---

## 風險

- `generateSeriesData` 用 sin 函式產生雜訊，同樣的 from/to 每次結果一致，但「自訂」輸入不同月份時數值會有不可預期的高低，這是 mock 資料的正常現象
- KPI 卡的 delta 文字（如 `vs 上月 +2.8%`）本次先保持靜態，不做計算，後端串接時再更新
