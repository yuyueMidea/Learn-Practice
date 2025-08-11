import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Button,
  Divider
} from '@mui/material'
import {
  ArrowBack,
  Email,
  Phone,
  CalendarToday,
  AccountCircle,
  Visibility
} from '@mui/icons-material'
import axios from 'axios'

interface Order {
  id: number
  orderNo: string
  amount: number
  status: string
  createTime: string
  description: string
}

interface UserDetail {
  id: number
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  createTime: string
  orders: Order[]
}

function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserDetail>(`/api/users/${id}`)
        setUser(response.data)
      } catch (err) {
        setError('获取用户详情失败')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUser()
    }
  }, [id])

  const handleGoBack = () => {
    navigate('/users')
  }

  const handleViewOrder = (orderId: number) => {
    navigate(`/orders/${orderId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活跃'
      case 'inactive': return '非活跃'
      case 'completed': return '已完成'
      case 'pending': return '进行中'
      case 'cancelled': return '已取消'
      default: return status
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          返回用户列表
        </Button>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Box>
      {/* 返回按钮和标题 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={{ mr: 2 }}
        >
          返回
        </Button>
        <Typography variant="h4" component="h1">
          用户详情
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 用户基本信息 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountCircle sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">基本信息</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  用户ID
                </Typography>
                <Typography variant="body1">#{user.id}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  姓名
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Box>

              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    邮箱
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    电话
                  </Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  状态
                </Typography>
                <Chip 
                  label={getStatusText(user.status)}
                  color={getStatusColor(user.status) as any}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    注册时间
                  </Typography>
                  <Typography variant="body1">{user.createTime}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 统计信息 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                统计信息
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary.main">
                      {user.orders.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      总订单数
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="success.main">
                      {user.orders.filter(o => o.status === 'completed').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      已完成订单
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="warning.main">
                      ¥{user.orders
                        .filter(o => o.status === 'completed')
                        .reduce((sum, order) => sum + order.amount, 0)
                        .toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      总消费金额
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 订单列表 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                订单历史 ({user.orders.length})
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {user.orders.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                  暂无订单记录
                </Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>订单号</TableCell>
                        <TableCell>金额</TableCell>
                        <TableCell>状态</TableCell>
                        <TableCell>描述</TableCell>
                        <TableCell>创建时间</TableCell>
                        <TableCell>操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user.orders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>{order.orderNo}</TableCell>
                          <TableCell>¥{order.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={getStatusText(order.status)}
                              color={getStatusColor(order.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{order.description}</TableCell>
                          <TableCell>{order.createTime}</TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleViewOrder(order.id)}
                              title="查看订单详情"
                              size="small"
                            >
                              <Visibility />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserDetail