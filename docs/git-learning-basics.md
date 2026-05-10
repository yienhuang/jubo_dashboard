# Git 入門學習筆記（給 Fork 使用者）

這份文件假設你平常用 [Fork](https://git-fork.com/) 這類圖形化工具操作 Git，但想搞懂背後發生什麼事。每個段落會先講「為什麼」、再講「怎麼做」，並把 Fork 操作與 CLI 指令並列，讓你看 GUI 時也知道對應的 Git 術語。

---

## 1. Git 是什麼？核心心智模型

### 1.1 Git 在做什麼

Git 是一個**版本控制系統**：它幫你記錄專案每次的修改，讓你可以：

- 隨時回到過去任一個版本
- 多人同時改同一個專案而不會互相覆蓋
- 看到「誰、何時、為什麼」改了某一行

可以把它想像成**遊戲的存檔系統**：每次存檔（commit）都是一個可以回到的時間點。

### 1.2 四個關鍵名詞

| 名詞 | 中文 | 是什麼 |
|---|---|---|
| Repository (repo) | 儲存庫 | 整個專案的版本紀錄資料庫，存在 `.git/` 資料夾裡 |
| Commit | 提交 / 存檔點 | 一次「儲存」的動作，記錄你這次改了什麼 |
| Branch | 分支 | 一條獨立的開發路線，可以同時存在很多條 |
| Remote | 遠端 | 放在雲端（GitHub/GitLab）的 repo，多人協作的共同來源 |

### 1.3 三個區域（最重要的觀念）

當你修改一個檔案，Git 把它放在三個不同的「地方」：

```
┌────────────────┐  git add   ┌────────────────┐  git commit  ┌────────────────┐
│ Working        │ ─────────> │ Staging Area   │ ───────────> │ Repository     │
│ Directory      │            │ (Index)        │              │ (.git)         │
│ 工作目錄        │            │ 暫存區          │              │ 版本庫          │
│ 你正在編輯的檔案 │            │ 準備要 commit   │              │ 已經存檔的版本   │
└────────────────┘            └────────────────┘              └────────────────┘
```

- **Working Directory**：你看到的、正在編輯的檔案。
- **Staging Area**：你勾選「這次要存檔的修改」放這裡。可以一次只存部份檔案。
- **Repository**：commit 之後就永久記錄在這。

> 💡 **為什麼要有 Staging Area？** 因為你可能改了 5 個檔案，但只想把其中 2 個包成一個 commit。Staging 讓你挑選要包進這次存檔的內容。

**對應到 Fork**：
- 左下角「Changes」分頁就是 Working Directory 的修改
- 中間「Staged」區塊就是 Staging Area
- 點 commit 後就進入 Repository

---

## 2. 基本工作流程

最常見的循環是這 5 步：

```
Clone → 修改檔案 → Stage → Commit → Push
```

### 2.1 Clone：把遠端 repo 抓下來

第一次拿到一個專案時，你要把它「複製一份到本機」。

**Fork 操作**：`File → Clone`，貼上 GitHub URL。

**CLI**：
```bash
git clone https://github.com/jubo/dashboard.git
```

這個指令會：
1. 下載整個專案
2. 自動把這個遠端記為 `origin`
3. 切到預設分支（通常是 `main`）

### 2.2 修改檔案

正常用編輯器改檔案就好，Git 會自動偵測變動。

**查看現在改了什麼**：

**Fork**：左側 Changes 分頁直接看到。

**CLI**：
```bash
git status        # 看哪些檔案改了
git diff          # 看具體改了哪幾行
```

### 2.3 Stage：挑選要存檔的修改

把想 commit 的檔案放進暫存區。

**Fork**：在 Changes 分頁點檔案旁邊的 `+` 號，或點 `Stage All`。

**CLI**：
```bash
git add src/pages/Login.jsx     # stage 單一檔案
git add .                       # stage 全部修改
```

### 2.4 Commit：建立存檔點

把暫存區的內容打包成一個 commit，並寫一條訊息描述「這次改了什麼」。

**Fork**：底部填 commit message → 按 `Commit`。

**CLI**：
```bash
git commit -m "fix: 修正登入頁驗證錯誤"
```

> 💡 **Commit message 寫法**：第一行寫一句話總結（50 字內），動詞開頭、現在式。例如 `add login page`、`fix typo in README`。多人專案常用 [Conventional Commits](https://www.conventionalcommits.org/) 格式（`feat:`、`fix:`、`docs:` 等前綴）。

### 2.5 Push：推上遠端

Commit 只存在你電腦上，要 push 才會上傳到 GitHub 讓別人看到。

**Fork**：上方工具列點 `Push`。

**CLI**：
```bash
git push
```

第一次推一個新分支時要加 `-u`：
```bash
git push -u origin feature/login
```

---

## 3. Branch 分支操作

### 3.1 為什麼要用 branch？

你正在做新功能 A，但同事突然回報線上 bug 要修。如果大家都在 `main` 上面改，很容易互相干擾。

**解法**：每個功能/修復都開一條 branch，做完才合併回 main。

```
main:     ●───●───●─────────────●  (合併後)
                   \           /
feature:            ●───●───●
```

### 3.2 建立並切換 branch

**Fork**：左側 Branches 區塊右鍵 → `New Branch`，輸入名字。

**CLI**：
```bash
git switch -c feature/login-page    # 建立並切換到新 branch
git switch main                     # 切回 main
git branch                          # 看所有本機 branch
```

> 💡 老教學會看到 `git checkout -b`，那是舊指令。新版 Git 推薦用 `git switch`（切換）和 `git restore`（還原），語意更清楚。

### 3.3 合併 branch

功能做完後，要把 feature branch 的 commits 合併回 main。

**Fork**：切到 main → 右鍵目標 branch → `Merge into main`。

**CLI**：
```bash
git switch main
git merge feature/login-page
```

> 💡 **實務上的做法**：團隊協作時通常**不在本機 merge**，而是 push 上去後**開 Pull Request（PR）**，讓同事 review 後再合併。本機 merge 比較常用在自己的個人專案。

---

## 4. Remote 與同步

### 4.1 origin 是什麼？

當你 clone 一個 repo 時，Git 會自動把那個遠端取名為 `origin`。它只是一個別名，等於「我這份 code 的雲端版本在哪裡」。

**看你有哪些 remote**：
```bash
git remote -v
```

### 4.2 Fetch vs Pull（很常搞混）

| 動作 | 做什麼 | 比喻 |
|---|---|---|
| `git fetch` | 從遠端**下載**最新資訊到本機，但不改你的工作目錄 | 收信件但不打開 |
| `git pull` | = `fetch` + `merge`，下載並直接合併到你目前的 branch | 收信件並馬上看內容覆蓋筆記 |

**安全做法**：先 `fetch` 看看別人改了什麼，再決定要不要 `merge` 或 `pull`。

**Fork**：工具列有 `Fetch` 和 `Pull` 兩個按鈕。

### 4.3 Push 推送

把本機 commit 推到遠端：

```bash
git push                            # 推目前 branch
git push -u origin feature/xxx      # 第一次推新 branch
```

> ⚠️ **絕對不要做的事**：`git push --force` 會強制覆蓋遠端歷史，可能讓同事的 commit 消失。除非你完全清楚自己在做什麼，否則不要用。

---

## 5. 常見情境與救援

### 5.1 我改錯了，想丟掉還沒 commit 的修改

**Fork**：在檔案上右鍵 → `Discard Changes`。

**CLI**：
```bash
git restore src/pages/Login.jsx     # 還原單一檔案
git restore .                       # 還原全部未 commit 的修改
```

⚠️ 這個動作**不可復原**，沒 commit 的東西會消失。

### 5.2 我 stage 錯檔案了，想取消 stage

**Fork**：在 Staged 區塊點檔案旁邊的 `−`。

**CLI**：
```bash
git restore --staged src/pages/Login.jsx
```

（檔案會回到 Working Directory，修改不會消失。）

### 5.3 剛 commit 完發現 message 寫錯

**Fork**：右鍵最後一個 commit → `Amend Commit`。

**CLI**：
```bash
git commit --amend -m "新的 commit 訊息"
```

⚠️ **只能改還沒 push 的 commit**。已經 push 上去的不要改，會搞亂歷史。

### 5.4 解決 merge conflict（衝突）

當你和同事改了同一行，merge 時 Git 不知道要保留哪個版本，就會跳出 conflict。

檔案裡會出現這樣的標記：
```
<<<<<<< HEAD
你的版本
=======
同事的版本
>>>>>>> feature/xxx
```

**處理步驟**：
1. 打開有衝突的檔案，手動編輯成你想要的最終樣子（把 `<<<`、`===`、`>>>` 那些標記都刪掉）
2. Stage 這個檔案
3. Commit（Git 會自動產生一個 merge commit）

**Fork**：點 conflict 檔案會有左右對照介面，可以勾選要保留哪邊。

### 5.5 看歷史紀錄

**Fork**：左側 `All Commits` 直接看。

**CLI**：
```bash
git log                             # 看 commit 歷史
git log --oneline                   # 一行一個 commit，比較精簡
git blame src/pages/Login.jsx       # 看每一行是誰、何時改的
```

---

## 6. GUI 與 CLI 名詞對照表

下次看 Fork 介面時，你會知道每個按鈕對應到什麼 Git 概念：

| Fork 介面 | Git 術語 | CLI 指令 |
|---|---|---|
| Clone | Clone repository | `git clone <url>` |
| Changes 分頁 | Working Directory 的修改 | `git status` / `git diff` |
| Stage / Unstage | 加入 / 移出暫存區 | `git add` / `git restore --staged` |
| Commit 按鈕 | 建立 commit | `git commit -m "..."` |
| Push 按鈕 | 推送到遠端 | `git push` |
| Fetch 按鈕 | 從遠端取得資訊 | `git fetch` |
| Pull 按鈕 | Fetch + Merge | `git pull` |
| New Branch | 建立分支 | `git switch -c <name>` |
| Checkout（雙擊 branch） | 切換分支 | `git switch <name>` |
| Merge into ... | 合併分支 | `git merge <name>` |
| Discard Changes | 丟棄未 commit 的修改 | `git restore <file>` |
| Amend Commit | 修改最後一個 commit | `git commit --amend` |
| All Commits | 歷史紀錄 | `git log` |
| origin | 預設遠端名稱 | `git remote -v` |

---

## 7. 接下來可以學什麼？

當你熟練上面這些後，可以再學：

- **Pull Request（PR）流程**：團隊協作的標準方式
- **`.gitignore`**：哪些檔案不要被 Git 追蹤（例如 `node_modules`、`.env`）
- **Rebase vs Merge**：兩種整合分支的方式，各有優缺點
- **Stash**：暫時收起未 commit 的修改，先去做別的事
- **Tag**：給特定 commit 標記版本號（例如 `v1.0.0`）

---

## 速查：最常用的 10 個指令

```bash
git clone <url>              # 複製遠端 repo
git status                   # 看現在的狀態
git diff                     # 看修改內容
git add <file>               # stage 檔案
git commit -m "訊息"          # 建立 commit
git push                     # 推到遠端
git pull                     # 從遠端拉最新
git switch -c <branch>       # 建立並切換 branch
git switch <branch>          # 切換 branch
git log --oneline            # 看歷史
```

把這 10 個記住，配合 Fork 的 GUI，就能應付 90% 的日常工作了。
