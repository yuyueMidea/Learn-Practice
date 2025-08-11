import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import {
  People,
  ShoppingCart,
  TrendingUp,
  AccountBalance
} from '@mui/icons-material'
import axios from 'axios'

interface Stats {
  totalUsers: number
  activeUsers: number
  totalOrders: number
  completedOrders: number
  totalRevenue: string
}

const StatCard = ({ title, value, icon, color }: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            p: 1,
            mr: 2,
            color: color
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
)

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats')
        setStats(response.data)
      } catch (err) {
        setError('获取统计数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">{error}</Alert>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        仪表板
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="总用户数"
            value={stats.totalUsers}
            icon={<People />}
            color="#1976d2"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="活跃用户"
            value={stats.activeUsers}
            icon={<TrendingUp />}
            color="#2e7d32"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="总订单数"
            value={stats.totalOrders}
            icon={<ShoppingCart />}
            color="#ed6c02"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="总收入"
            value={`¥${stats.totalRevenue}`}
            icon={<AccountBalance />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              系统概览
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" paragraph>
                • 已完成订单: {stats.completedOrders} / {stats.totalOrders}
              </Typography>
              <Typography variant="body1" paragraph>
                • 用户活跃率: {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body1" paragraph>
                • 订单完成率: {((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}%
              </Typography>
              <Typography variant="body1">
                • 平均订单金额: ¥{(parseFloat(stats.totalRevenue) / stats.completedOrders).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Dashboard