import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Avatar,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Stack,
} from '@mui/material';
import {
  Person,
  Settings as SettingsIcon,
  Notifications,
  Save,
} from '@mui/icons-material';
import { useUser } from '../context/UserContext';

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

const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences } = useUser();
  const [formData, setFormData] = useState({
    name: preferences.name,
    role: preferences.role,
    company: preferences.company,
    currency: preferences.currency,
    dateFormat: preferences.dateFormat,
    timeFormat: preferences.timeFormat,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updatePreferences(formData);
    setSnackbarOpen(true);
    setHasChanges(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          gap: 3,
        }}
      >
        {/* Profile Section */}
        <Box>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                  fontWeight: 600,
                }}
              >
                {formData.name ? getInitials(formData.name) : 'U'}
              </Avatar>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {formData.name || 'Your Name'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formData.role || 'Role not set'}
              </Typography>
              {formData.company && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {formData.company}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    {preferences.hasUploadedFile ? '1' : '0'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Files Uploaded
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    12
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Queries Made
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    5
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Reports
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Settings Forms */}
        <Box>
          {/* Personal Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Person sx={{ color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Personal Information
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    label="Role"
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
                  label="Company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  sx={{ gridColumn: { sm: 'span 2' } }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <SettingsIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Display Preferences
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 3,
                }}
              >
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
            </CardContent>
          </Card>

          {/* Notifications (Placeholder) */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Notifications sx={{ color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Notifications
                </Typography>
              </Box>
              <Stack>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email notifications for new features"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Desktop notifications"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Marketing communications"
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
