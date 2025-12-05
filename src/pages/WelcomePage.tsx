import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  TableChart,
  AutoAwesome,
  Speed,
  Security,
  CloudUpload,
  Analytics,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const features = [
  {
    icon: <AutoAwesome sx={{ fontSize: 32 }} />,
    title: 'AI-Powered Analysis',
    description: 'Ask questions in natural language and get instant insights from your data.',
  },
  {
    icon: <Speed sx={{ fontSize: 32 }} />,
    title: 'Lightning Fast',
    description: 'Process and analyze large Excel files in seconds, not minutes.',
  },
  {
    icon: <Security sx={{ fontSize: 32 }} />,
    title: 'Secure & Private',
    description: 'Your data stays on your device. No uploads to external servers.',
  },
  {
    icon: <Analytics sx={{ fontSize: 32 }} />,
    title: 'Smart Dashboards',
    description: 'Visualize your data with beautiful charts and KPI cards automatically.',
  },
];

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { preferences } = useUser();

  const handleGetStarted = () => {
    if (preferences.hasCompletedOnboarding) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      {/* Navbar */}
      <Box
        component="nav"
        sx={{
          py: 2,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TableChart sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} color="primary.main">
            ExcelWise
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleGetStarted}
          endIcon={<ArrowForward />}
        >
          Get Started
        </Button>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 6, md: 10 },
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              mb: 3,
              borderRadius: 5,
              backgroundColor: 'primary.main',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            <AutoAwesome sx={{ fontSize: 18 }} />
            Powered by AI
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Transform Your Excel Data
            <br />
            Into Actionable Insights
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Upload, analyze, and visualize your spreadsheet data with AI-powered tools.
            No formulas needed.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 8 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              startIcon={<CloudUpload />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 3,
                boxShadow: '0 8px 30px rgba(37, 99, 235, 0.3)',
              }}
            >
              Start Analyzing Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 3,
              }}
            >
              Watch Demo
            </Button>
          </Stack>

          {/* Hero Image Placeholder */}
          <Box
            sx={{
              position: 'relative',
              maxWidth: 900,
              mx: 'auto',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                height: 8,
                backgroundColor: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
              }}
            >
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981' }} />
            </Box>
            <Box
              sx={{
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                p: 4,
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                  gap: 3,
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    height: 250,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Analytics sx={{ fontSize: 64, color: '#2563eb', opacity: 0.5 }} />
                </Box>
                <Stack spacing={2}>
                  {[1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Box sx={{ height: 8, width: '60%', backgroundColor: '#e2e8f0', borderRadius: 1, mb: 1 }} />
                      <Box sx={{ height: 20, width: '80%', backgroundColor: '#cbd5e1', borderRadius: 1 }} />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Why Choose ExcelWise?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}
          >
            Everything you need to make sense of your spreadsheet data
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: { xs: 6, md: 8 },
            mb: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Ready to Transform Your Data?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users who are already saving hours every week.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 3,
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Get Started Now — It's Free
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 ExcelWise. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomePage;
