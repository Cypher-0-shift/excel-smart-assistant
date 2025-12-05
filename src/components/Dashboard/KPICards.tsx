import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  Inventory,
  Analytics,
} from '@mui/icons-material';
import { KPIData } from '../../api/placeholder';

interface KPICardsProps {
  data: KPIData[];
}

const iconMap: Record<string, React.ReactNode> = {
  revenue: <AttachMoney />,
  sales: <ShoppingCart />,
  products: <Inventory />,
  average: <Analytics />,
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  revenue: { bg: '#ecfdf5', icon: '#10b981' },
  sales: { bg: '#eff6ff', icon: '#3b82f6' },
  products: { bg: '#fef3c7', icon: '#f59e0b' },
  average: { bg: '#fce7f3', icon: '#ec4899' },
};

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {data.map((kpi, index) => (
        <Card
          key={index}
          sx={{
            height: '100%',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                  gutterBottom
                >
                  {kpi.title}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {kpi.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {kpi.changeType === 'increase' ? (
                    <TrendingUp sx={{ fontSize: 18, color: 'success.main' }} />
                  ) : (
                    <TrendingDown sx={{ fontSize: 18, color: 'error.main' }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: kpi.changeType === 'increase' ? 'success.main' : 'error.main',
                      fontWeight: 600,
                    }}
                  >
                    {kpi.change}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    vs last month
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: colorMap[kpi.icon]?.bg || '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& svg': {
                    color: colorMap[kpi.icon]?.icon || '#64748b',
                    fontSize: 28,
                  },
                }}
              >
                {iconMap[kpi.icon] || <Analytics />}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default KPICards;
