import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  TablePagination,
  CircularProgress,
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  Visibility,
  Search,
  Add,
  FilterList
} from '@mui/icons-material'
import axios from 'axios'

interface Order {
  id: number
  orderNo: string
  userId: number
  userName: string
  amount: number
  status: string
  createTime: string
  description: string
}

interface OrdersResponse {
  data: Order[]
  total: number
  page: number
  pageSize: number
}

function OrderList() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get<OrdersResponse>('/api/orders', {
        params: {
          page: page + 1,
          pageSize: rowsPerPage
        }
      })
      setOrders(response.data.data)
      setTotal(response.data.total)
    } catch (err) {
      setError('获取订单列表失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page, rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleViewOrder = (orderId: number) => {
    navigate(`/orders/${orderId}`)
  }

  const handleViewUser = (userId: number) => {
    navigate(`/users/${userId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'pending': return '进行中'
      case 'cancelled': return '已取消'
      default: return status
    }
  }

  const filteredOrders = statusFilter 
    ? orders.filter(order => order.status === statusFilter)
    : orders

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          订单管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {/* 添加订单逻辑 */}}
        >
          创建订单
        </Button>
      </Box>

      {/* 筛选器 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>订单状态</InputLabel>
          <Select
            value={statusFilter}
            label="订单状态"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">全部</MenuItem>
            <MenuItem value="pending">进行中</MenuItem>
            <MenuItem value="completed">已完成</MenuItem>
            <MenuItem value="cancelled">已取消</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 订单表格 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>订单号</TableCell>
              <TableCell>客户</TableCell>
              <TableCell>金额</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>描述</TableCell>
              <TableCell>创建时间</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ fontFamily: 'monospace', color: 'primary.main' }}
                    >
                      {order.orderNo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewUser(order.userId)}
                      sx={{ textTransform: 'none' }}
                    >
                      {order.userName}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      ¥{order.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: 200, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                      title={order.description}
                    >
                      {order.description}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.createTime}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewOrder(order.id)}
                      title="查看详情"
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 分页 */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="每页行数："
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count} 条`}
      />
    </Box>
  )
}

export default OrderList