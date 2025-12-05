import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload,
  Refresh,
  CalendarToday,
  FormatQuote,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useUser } from '../context/UserContext';
import {
  uploadExcelFile,
  fetchDashboardData,
  getRandomQuote,
  mockKPIData,
  mockChartData,
  KPIData,
  ChartData,
} from '../api/placeholder';
import KPICards from '../components/Dashboard/KPICards';
import ChartsPanel from '../components/Dashboard/ChartsPanel';

const DashboardPage: React.FC = () => {
  const { preferences, updatePreferences } = useUser();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [kpis, setKpis] = useState<KPIData[]>([]);
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [quote, setQuote] = useState(getRandomQuote());

  const formatDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return now.toLocaleDateString('en-US', options);
  };

  const formatTime = () => {
    const now = new Date();
    if (preferences.timeFormat === '24h') {
      return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }
    return now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardData();
      setKpis(data.kpis);
      setCharts(data.charts);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (preferences.hasUploadedFile) {
      loadDashboardData();
    }
  }, [preferences.hasUploadedFile]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploading(true);
      try {
        await uploadExcelFile(acceptedFiles[0]);
        updatePreferences({ hasUploadedFile: true });
        await loadDashboardData();
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  }, [updatePreferences]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const refreshQuote = () => {
    setQuote(getRandomQuote());
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome back, {preferences.name || 'User'}! 👋
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                <CalendarToday sx={{ fontSize: 18 }} />
                <Typography variant="body2">{formatDate()}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {formatTime()}
              </Typography>
            </Box>
          </Box>
          {preferences.hasUploadedFile && (
            <Box {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                variant="outlined"
                startIcon={<CloudUpload />}
                disabled={uploading}
              >
                Upload Another
              </Button>
            </Box>
          )}
        </Box>

        {/* Quote Card */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid #bae6fd',
          }}
        >
          <CardContent sx={{ py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormatQuote sx={{ color: 'primary.main', fontSize: 32, transform: 'scaleX(-1)' }} />
            <Typography variant="body1" color="text.secondary" sx={{ flex: 1, fontStyle: 'italic' }}>
              "{quote}"
            </Typography>
            <Tooltip title="New quote">
              <IconButton onClick={refreshQuote} size="small">
                <Refresh />
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content */}
      {!preferences.hasUploadedFile ? (
        /* Upload Card - No file uploaded yet */
        <Card
          {...getRootProps()}
          sx={{
            p: 6,
            textAlign: 'center',
            cursor: 'pointer',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'divider',
            backgroundColor: isDragActive ? 'primary.main' : 'background.paper',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            {uploading ? (
              <CircularProgress size={36} color="inherit" />
            ) : (
              <CloudUpload sx={{ fontSize: 36 }} />
            )}
          </Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {isDragActive ? 'Drop your file here' : 'Upload Your Excel File'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Drag and drop your Excel file here, or click to browse
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supported formats: .xlsx, .xls, .csv
          </Typography>
        </Card>
      ) : loading ? (
        /* Loading State */
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        /* Dashboard Content */
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Key Metrics
            </Typography>
            <KPICards data={kpis.length > 0 ? kpis : mockKPIData} />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Analytics
            </Typography>
            <ChartsPanel lineData={charts.length > 0 ? charts : mockChartData} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
