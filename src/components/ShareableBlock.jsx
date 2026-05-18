import { useRef, useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Tooltip,
} from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { toBlob } from 'html-to-image'

const SAFE_FILENAME_RE = /[\\/:*?"<>|]/g

function buildFilename(base) {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const safe = (base || 'block').replace(SAFE_FILENAME_RE, '').trim() || 'block'
  return `${safe}-${yyyy}${mm}${dd}.png`
}

async function captureBlock(node) {
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      // 字體載入錯誤不阻斷截圖
    }
  }
  return toBlob(node, {
    pixelRatio: 2,
    backgroundColor: '#FFFFFF',
    cacheBust: true,
    filter: (el) => !(el instanceof HTMLElement && el.dataset?.htmlToImageIgnore),
  })
}

function canNativeShareFiles(file) {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  )
}

async function copyBlobToClipboard(blob) {
  if (!navigator.clipboard || typeof window.ClipboardItem !== 'function') {
    throw new Error('clipboard-unsupported')
  }
  await navigator.clipboard.write([
    new window.ClipboardItem({ [blob.type]: blob }),
  ])
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function ShareableBlock({ title, filename, children }) {
  const blockRef = useRef(null)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [snack, setSnack] = useState(null)
  const [busy, setBusy] = useState(false)

  const baseName = filename ?? title ?? '區塊'

  async function handleClick(e) {
    if (!blockRef.current || busy) return
    const anchor = e.currentTarget
    setBusy(true)
    try {
      const blob = await captureBlock(blockRef.current)
      if (!blob) throw new Error('capture-failed')

      const file = new File([blob], buildFilename(baseName), { type: 'image/png' })

      if (canNativeShareFiles(file)) {
        try {
          await navigator.share({
            files: [file],
            title: title ?? '',
            text: title ?? '',
          })
          setSnack({ msg: '已開啟分享面板', severity: 'success' })
        } catch (err) {
          if (err?.name !== 'AbortError') {
            setSnack({ msg: '分享失敗，請改用選單', severity: 'error' })
            setMenuAnchor(anchor)
          }
        }
      } else {
        setMenuAnchor(anchor)
      }
    } catch {
      setSnack({ msg: '截圖失敗', severity: 'error' })
    } finally {
      setBusy(false)
    }
  }

  async function withFreshBlob(action) {
    setMenuAnchor(null)
    if (!blockRef.current) return
    setBusy(true)
    try {
      const blob = await captureBlock(blockRef.current)
      if (!blob) throw new Error('capture-failed')
      await action(blob)
    } catch (err) {
      const msg =
        err?.message === 'clipboard-unsupported'
          ? '瀏覽器不支援複製圖片，請改用下載'
          : '操作失敗，請再試一次'
      setSnack({ msg, severity: 'error' })
    } finally {
      setBusy(false)
    }
  }

  function handleCopy() {
    withFreshBlob(async (blob) => {
      await copyBlobToClipboard(blob)
      setSnack({ msg: '已複製圖片到剪貼簿', severity: 'success' })
    })
  }

  function handleDownload() {
    withFreshBlob(async (blob) => {
      downloadBlob(blob, buildFilename(baseName))
      setSnack({ msg: '已下載 PNG', severity: 'success' })
    })
  }

  function handleLine() {
    withFreshBlob(async (blob) => {
      let copied = false
      try {
        await copyBlobToClipboard(blob)
        copied = true
      } catch {
        // 沒有剪貼簿權限就改下載
        downloadBlob(blob, buildFilename(baseName))
      }
      const shareText = `${title ?? ''}`.trim() || '分享內容'
      const url = `https://line.me/R/share?text=${encodeURIComponent(shareText)}`
      window.open(url, '_blank', 'noopener,noreferrer')
      setSnack({
        msg: copied
          ? '圖片已複製，請在 Line 對話框貼上'
          : '圖片已下載，請於 Line 對話框附加',
        severity: 'info',
      })
    })
  }

  return (
    <Box sx={{ position: 'relative', height: '100%' }} ref={blockRef}>
      {children}
      <Box
        data-html-to-image-ignore
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
        }}
      >
        <Tooltip title="分享" placement="left">
          <span>
            <IconButton
              size="small"
              onClick={handleClick}
              disabled={busy}
              aria-label="分享此區塊"
              sx={{
                width: 32,
                height: 32,
                color: '#78909C',
                bgcolor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(2px)',
                transition: 'background-color 120ms, color 120ms',
                '&:hover': {
                  color: '#546E7A',
                  bgcolor: 'rgba(84,110,122,0.08)',
                },
              }}
            >
              <IosShareIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              boxShadow:
                '0px 5px 5px -3px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.07), 0px 3px 14px 2px rgba(0,0,0,0.06)',
            },
          },
        }}
      >
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="複製圖片到剪貼簿" />
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="下載為 PNG" />
        </MenuItem>
        <MenuItem onClick={handleLine}>
          <ListItemIcon>
            <ChatBubbleOutlineIcon fontSize="small" sx={{ color: '#06C755' }} />
          </ListItemIcon>
          <ListItemText
            primary="分享到 Line"
            secondary="複製圖片並開啟 Line"
            slotProps={{
              secondary: { sx: { fontSize: 11 } },
            }}
          />
        </MenuItem>
      </Menu>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={2800}
        onClose={() => setSnack(null)}
        message={snack?.msg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
