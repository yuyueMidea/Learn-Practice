import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material'
import {
  ArrowBack,
  Edit,
  Delete,
  Receipt,
  Person,
  CalendarToday,
  AttachMoney,
  Description
} from '@mui/icons-material'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
  phone: string
}

interface OrderDetail {
  id: number
  orderNo: string
  amount: number
  status: string
  createTime: string
  description: string
  userId: number
  user: User | null
}

function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`)
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

  const handleBack = () => {
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
      case 'pending': return '待处理'
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
    return <Alert severity="error">{error}</Alert>
  }

  if (!order) {
    return <Alert severity="info">订单不存在</Alert>
  }

  return (
    <Box>
      {/* 页面头部 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          返回订单列表
        </Button>
        <Typography variant="h4" component="h1">
          订单详情
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 订单信息 */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Receipt sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">订单信息</Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      订单号
                    </Typography>
                    <Typography variant="h6">
                      {order.orderNo}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      订单状态
                    </Typography>
                    <Chip
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status) as any}
                      size="medium"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoney sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        订单金额
                      </Typography>
                    </Box>
                    <Typography variant="h5" color="primary">
                      ¥{order.amount}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        创建时间
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {order.createTime}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Description sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        订单描述
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {order.description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => {/* 编辑订单逻辑 */}}
                >
                  编辑订单
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => {/* 删除订单逻辑 */}}
                >
                  删除订单
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 用户信息 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">用户信息</Typography>
              </Box>

              {order.user ? (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      用户姓名
                    </Typography>
                    <Typography variant="body1">
                      {order.user.name}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      邮箱地址
                    </Typography>
                    <Typography variant="body1">
                      {order.user.email}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      联系电话
                    </Typography>
                    <Typography variant="body1">
                      {order.user.phone}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleViewUser}
                  >
                    查看用户详情
                  </Button>
                </>
              ) : (
                <Typography color="text.secondary">
                  用户信息不可用
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderDetail