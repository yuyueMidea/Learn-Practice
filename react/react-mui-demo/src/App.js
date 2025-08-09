import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Box, Divider
} from '@mui/material';
import menuList from './menuList';

const drawerWidth = 200;

export default function App() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* 顶部状态条 */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            React + MUI 后台管理
          </Typography>
          <Typography variant="body1">欢迎你，管理员</Typography>
        </Toolbar>
      </AppBar>

      {/* 左侧菜单栏 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {menuList.map((menu) => (
            <ListItemButton
              key={menu.path}
              component={Link}
              to={menu.path}
              selected={location.pathname === menu.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>          
          ))}
        </List>
      </Drawer>

      {/* 右侧内容区 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9'
        }}
      >
        <Routes>
          {menuList.map((menu) => (
            <Route key={menu.path} path={menu.path} element={menu.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}
