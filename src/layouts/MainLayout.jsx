import { useState } from 'react'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HotelIcon from '@mui/icons-material/Hotel'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import Logo from '@/components/Logo'

const RAIL_WIDTH = 72
const DRAWER_WIDTH = 256
const APPBAR_HEIGHT = 64
const BOTTOM_NAV_HEIGHT = 64

const navGroups = [
  {
    label: '集團總部',
    items: [{ label: '總覽', to: '/', icon: <DashboardIcon /> }],
  },
  {
    label: '服務類型',
    items: [
      {
        label: '住宿',
        to: '/accommodation',
        icon: <HotelIcon />,
        children: [
          { label: '總覽', to: '/accommodation', exact: true },
          { label: '台北信義長照分院', to: '/accommodation/台北信義長照分院' },
          { label: '台中南屯長照分院', to: '/accommodation/台中南屯長照分院' },
          { label: '高雄左營長照分院', to: '/accommodation/高雄左營長照分院' },
        ],
      },
      {
        label: '日照',
        to: '/day-care',
        icon: <WbSunnyIcon />,
        children: [
          { label: '總覽', to: '/day-care', exact: true },
          { label: '高雄幸福', to: '/day-care/高雄幸福' },
          { label: '台中建德', to: '/day-care/台中建德' },
        ],
      },
      {
        label: '居服',
        to: '/home-care',
        icon: <HomeRepairServiceIcon />,
        children: [
          { label: '總覽', to: '/home-care', exact: true },
          { label: '新北板橋', to: '/home-care/新北板橋' },
          { label: '台南安康', to: '/home-care/台南安康' },
        ],
      },
    ],
  },
]

const allItems = navGroups.flatMap((g) => g.items)

function isItemSelected(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to)
}

function RailItem({ item, selected }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={item.to}
      sx={{
        width: RAIL_WIDTH,
        height: 72,
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        px: 0,
        py: 1,
        borderRadius: 0,
        '&:hover': { backgroundColor: 'transparent' },
        '&:hover .nav-icon-pill': {
          backgroundColor: selected ? '#C5F0F7' : 'rgba(0,151,167,0.08)',
        },
      }}
    >
      <Box
        className="nav-icon-pill"
        sx={{
          width: 56,
          height: 32,
          borderRadius: '16px',
          backgroundColor: selected ? '#C5F0F7' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#005F64',
          transition: 'background-color 160ms ease',
        }}
      >
        {item.icon}
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: '#005F64',
          fontWeight: selected ? 500 : 400,
          lineHeight: 1.2,
        }}
      >
        {item.label}
      </Typography>
    </ListItemButton>
  )
}

function BottomNavItem({ item, selected }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={item.to}
      sx={{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        px: 0,
        py: 1,
        borderRadius: 0,
        '&:hover': { backgroundColor: 'transparent' },
        '&:hover .nav-icon-pill': {
          backgroundColor: selected ? '#C5F0F7' : 'rgba(0,151,167,0.08)',
        },
      }}
    >
      <Box
        className="nav-icon-pill"
        sx={{
          width: 56,
          height: 32,
          borderRadius: '16px',
          backgroundColor: selected ? '#C5F0F7' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#005F64',
          transition: 'background-color 160ms ease',
        }}
      >
        {item.icon}
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: '#005F64',
          fontWeight: selected ? 500 : 400,
          lineHeight: 1.2,
        }}
      >
        {item.label}
      </Typography>
    </ListItemButton>
  )
}

function DrawerItem({ item, selected }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={item.to}
      sx={{
        height: 48,
        px: 2,
        borderRadius: '4px',
        backgroundColor: selected ? '#C5F0F7' : 'transparent',
        '&:hover': {
          backgroundColor: selected ? '#C5F0F7' : 'rgba(0,151,167,0.08)',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40, color: '#005F64' }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        slotProps={{
          primary: {
            variant: 'body1',
            sx: {
              color: '#005F64',
              fontWeight: selected ? 500 : 400,
              whiteSpace: 'nowrap',
            },
          },
        }}
      />
    </ListItemButton>
  )
}

function ChildDrawerItem({ item, selected }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={item.to}
      sx={{
        height: 48,
        pl: 7,
        pr: 2,
        borderRadius: '4px',
        backgroundColor: selected ? '#C5F0F7' : 'transparent',
        '&:hover': {
          backgroundColor: selected ? '#C5F0F7' : 'rgba(0,151,167,0.08)',
        },
      }}
    >
      <ListItemText
        primary={item.label}
        slotProps={{
          primary: {
            variant: 'body1',
            sx: {
              color: '#005F64',
              fontWeight: selected ? 500 : 400,
              whiteSpace: 'nowrap',
            },
          },
        }}
      />
    </ListItemButton>
  )
}

function ExpandableDrawerItem({ item, pathname }) {
  const isActive = pathname === item.to || pathname.startsWith(item.to + '/')
  const [expanded, setExpanded] = useState(true)

  return (
    <>
      <ListItemButton
        onClick={() => setExpanded((v) => !v)}
        sx={{
          height: 48,
          px: 2,
          borderRadius: '4px',
          '&:hover': { backgroundColor: 'rgba(0,151,167,0.08)' },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: '#005F64' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          slotProps={{
            primary: {
              variant: 'body1',
              sx: {
                color: '#005F64',
                fontWeight: isActive ? 500 : 400,
                whiteSpace: 'nowrap',
              },
            },
          }}
        />
        {expanded ? (
          <ArrowDropUpIcon sx={{ color: '#78909C', fontSize: 20 }} />
        ) : (
          <ArrowDropDownIcon sx={{ color: '#78909C', fontSize: 20 }} />
        )}
      </ListItemButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding sx={{ pb: 0.5 }}>
          {item.children.map((child) => {
            const selected = child.exact
              ? pathname === child.to
              : pathname === child.to || pathname.startsWith(child.to + '/')
            return <ChildDrawerItem key={child.to} item={child} selected={selected} />
          })}
        </List>
      </Collapse>
    </>
  )
}

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(true)
  const location = useLocation()
  const pathname = decodeURIComponent(location.pathname)

  const navWidth = drawerOpen ? DRAWER_WIDTH : RAIL_WIDTH

  return (
    <Box className="flex min-h-screen" sx={{ backgroundColor: '#EAF3F5' }}>
      <AppBar
        position="fixed"
        sx={{ height: APPBAR_HEIGHT, justifyContent: 'center', zIndex: 1200 }}
      >
        <Toolbar sx={{ minHeight: APPBAR_HEIGHT }}>
          <IconButton
            onClick={() => setDrawerOpen((open) => !open)}
            sx={{
              color: '#37474F',
              display: { xs: 'none', sm: 'inline-flex' },
            }}
            aria-label="toggle navigation"
            aria-expanded={drawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <Box
            className="flex items-center gap-3"
            sx={{ ml: { xs: 0, sm: 2 } }}
          >
            <Logo />
            <Typography
              variant="h6"
              sx={{ color: '#37474F', fontWeight: 500 }}
              component="div"
            >
              智齡照護集團
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Box className="flex items-center gap-2">
            <Typography
              variant="body1"
              sx={{ color: '#546E7A', display: { xs: 'none', sm: 'block' } }}
            >
              總部管理員
            </Typography>
            <IconButton aria-label="account" sx={{ mr: -1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#005F64',
                  fontSize: 14,
                }}
              >
                管
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { xs: 0, sm: navWidth },
          flexShrink: 0,
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shorter,
            }),
        }}
        aria-label="primary navigation"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: navWidth,
            '& .MuiDrawer-paper': {
              width: navWidth,
              boxSizing: 'border-box',
              top: APPBAR_HEIGHT,
              height: `calc(100% - ${APPBAR_HEIGHT}px)`,
              overflowX: 'hidden',
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.shorter,
                }),
            },
          }}
          open
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Rail (collapsed) */}
            <Box
              aria-hidden={drawerOpen}
              sx={{
                position: 'absolute',
                inset: 0,
                width: RAIL_WIDTH,
                opacity: drawerOpen ? 0 : 1,
                pointerEvents: drawerOpen ? 'none' : 'auto',
                transition: (theme) =>
                  theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
            >
              <List sx={{ p: 0 }}>
                {allItems.map((item) => (
                  <RailItem
                    key={item.to}
                    item={item}
                    selected={isItemSelected(pathname, item.to)}
                  />
                ))}
              </List>
            </Box>

            {/* Drawer (expanded) */}
            <Box
              aria-hidden={!drawerOpen}
              sx={{
                position: 'absolute',
                inset: 0,
                width: DRAWER_WIDTH,
                pt: 1,
                px: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                opacity: drawerOpen ? 1 : 0,
                pointerEvents: drawerOpen ? 'auto' : 'none',
                transition: (theme) =>
                  theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
            >
              {navGroups.map((group) => (
                <Box key={group.label} sx={{ pb: 1 }}>
                  <List sx={{ p: 0 }}>
                    {group.items.map((item) =>
                      item.children ? (
                        <ExpandableDrawerItem
                          key={item.to}
                          item={item}
                          pathname={pathname}
                        />
                      ) : (
                        <DrawerItem
                          key={item.to}
                          item={item}
                          selected={isItemSelected(pathname, item.to)}
                        />
                      )
                    )}
                  </List>
                </Box>
              ))}
            </Box>
          </Box>
        </Drawer>
      </Box>

      <Box
        component="main"
        className="flex-1"
        sx={{
          pt: `${APPBAR_HEIGHT}px`,
          px: { xs: 2, sm: 0 },
          pr: { sm: 2 },
          pb: { xs: '80px', sm: 2 },
          minHeight: '100vh',
          width: { xs: '100%', sm: `calc(100% - ${navWidth}px)` },
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shorter,
            }),
        }}
      >
        <Outlet />
      </Box>

      <Box
        component="nav"
        aria-label="bottom navigation"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: BOTTOM_NAV_HEIGHT,
          backgroundColor: '#EAF3F5',
          borderTop: '1px solid rgba(84,110,122,0.12)',
          zIndex: 1200,
        }}
      >
        {allItems.map((item) => (
          <BottomNavItem
            key={item.to}
            item={item}
            selected={isItemSelected(pathname, item.to)}
          />
        ))}
      </Box>
    </Box>
  )
}
