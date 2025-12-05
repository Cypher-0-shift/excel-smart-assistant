import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Settings,
  CheckCircle,
  ArrowBack,
  ArrowForward,
  TableChart,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const steps = ['Personal Info', 'Preferences', 'Confirm'];

const roles = [
  'Data Analyst',
  'Business Analyst',
  'Finance Manager',
  'Marketing Manager',
  'Product Manager',
  'Developer',
  'Student',
  'Other',
];

const currencies = [
  { value: '₹', label: 'Indian Rupee (₹)' },
  { value: '$', label: 'US Dollar ($)' },
  { value: '€', label: 'Euro (€)' },
  { value: '£', label: 'British Pound (£)' },
  { value: '¥', label: 'Japanese Yen (¥)' },
];

const dateFormats = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
];

const timeFormats = [
  { value: '12h', label: '12-hour (AM/PM)' },
  { value: '24h', label: '24-hour' },
];

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: preferences.name || '',
    role: preferences.role || '',
    company: preferences.company || '',
    currency: preferences.currency || '$',
    dateFormat: preferences.dateFormat || 'MM/DD/YYYY',
    timeFormat: preferences.timeFormat || '12h',
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      updatePreferences({
        ...formData,
        hasCompletedOnboarding: true,
      });
      navigate('/dashboard');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return formData.name.trim() !== '' && formData.role !== '';
    }
    return true;
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Person sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Tell us about yourself
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Help us personalize your experience
                </Typography>
              </Box>
            </Box>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Your Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>Your Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Your Role"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Company (Optional)"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </Stack>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Settings sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Set your preferences
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose how you'd like to see your data
                </Typography>
              </Box>
            </Box>

            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  label="Currency"
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur.value} value={cur.value}>
                      {cur.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={formData.dateFormat}
                    label="Date Format"
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  >
                    {dateFormats.map((fmt) => (
                      <MenuItem key={fmt.value} value={fmt.value}>
                        {fmt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Time Format</InputLabel>
                  <Select
                    value={formData.timeFormat}
                    label="Time Format"
                    onChange={(e) => handleInputChange('timeFormat', e.target.value)}
                  >
                    {timeFormats.map((fmt) => (
                      <MenuItem key={fmt.value} value={fmt.value}>
                        {fmt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  backgroundColor: 'success.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  You're all set!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Review your settings and get started
                </Typography>
              </Box>
            </Box>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {formData.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Role
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {formData.role}
                    </Typography>
                  </Box>
                  {formData.company && (
                    <Box sx={{ gridColumn: 'span 2' }}>
                      <Typography variant="body2" color="text.secondary">
                        Company
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {formData.company}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Preferences
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                  <Chip
                    label={`Currency: ${currencies.find((c) => c.value === formData.currency)?.label}`}
                    size="small"
                  />
                  <Chip
                    label={`Date: ${formData.dateFormat}`}
                    size="small"
                  />
                  <Chip
                    label={`Time: ${formData.timeFormat}`}
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TableChart sx={{ color: 'primary.main', fontSize: 36 }} />
            <Typography variant="h4" fontWeight={700} color="primary.main">
              ExcelWise
            </Typography>
          </Box>
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / steps.length) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Step {activeStep + 1} of {steps.length}
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Content Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBack />}
            color="inherit"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
            endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
          >
            {activeStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingPage;
