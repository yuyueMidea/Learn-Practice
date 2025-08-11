import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Avatar,
  Stack
} from '@mui/material'
import {
  ArrowBack,
  ShoppingCart,
  Person,
  CalendarToday,
  AttachMoney,
  Description,
  AccountCircle
} from '@mui/icons-material'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
  phone: string
  status: string
  createTime: string
}

interface OrderDetail {
  id: number
  orderNo: string
  userId: number
  amount: number
  status: string
  createTime: string
  description: string
  user: User | null
}

export default function OrderDetailpage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get<OrderDetail>(`/api/orders/${id}`)
        setOrder(response.data)
      } catch (err) {
        setError('获取订单详情失败')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  const handleGoBack = () => {
    navigate('/orders')
  }

  const handleViewUser = () => {
    if (order?.user) {
      navigate(`/users/${order.user.id}`)
    }
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
          返回订单列表
        </Button>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!order) {
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
          订单详情
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 订单基本信息 */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">订单信息</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      订单号
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ fontFamily: 'monospace', color: 'primary.main' }}
                    >
                      {order.orderNo}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      订单状态
                    </Typography>
                    <Chip 
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status) as any}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <AttachMoney sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        订单金额
                      </Typography>
                      <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>
                        ¥{order.amount.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        创建时间
                      </Typography>
                      <Typography variant="body1">
                        {order.createTime}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Description sx={{ mr: 1, color: 'text.secondary', fontSize: 20, mt: 0.5 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        订单描述
                      </Typography>
                      <Typography variant="body1">
                        {order.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 客户信息 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">客户信息</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {order.user ? (
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      <AccountCircle />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {order.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: #{order.user.id}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      邮箱
                    </Typography>
                    <Typography variant="body2">
                      {order.user.email}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      电话
                    </Typography>
                    <Typography variant="body2">
                      {order.user.phone}
                    </Typography>
                  </Box>
                </Stack>) : <h2 style={{color:'red'}}>nodata</h2>}

            </CardContent>
        </Card>
    </Grid>
    </Grid>
    </Box>
    )
}
