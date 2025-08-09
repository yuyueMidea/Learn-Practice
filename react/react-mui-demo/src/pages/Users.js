import React, { useState } from 'react';
import {
  Typography, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' }
  ]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleOpen = (user = null) => {
    setEditUser(user);
    setForm(user ? { name: user.name, email: user.email } : { name: '', email: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;

    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...form }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>用户管理</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        添加用户
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 弹窗表单 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editUser ? '编辑用户' : '添加用户'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="姓名"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
