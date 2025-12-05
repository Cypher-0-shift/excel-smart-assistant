import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import {
  AutoFixHigh,
  Download,
  Upload,
  Refresh,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import SmartOpsPanel from '../components/Operations/SmartOpsPanel';
import { fetchGridData, uploadExcelFile, ExcelData } from '../api/placeholder';
import { useUser } from '../context/UserContext';

const DataGridPage: React.FC = () => {
  const { preferences, updatePreferences } = useUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ExcelData[]>([]);
  const [opsPanelOpen, setOpsPanelOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchGridData();
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (preferences.hasUploadedFile) {
      loadData();
    }
  }, [preferences.hasUploadedFile]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      try {
        const result = await uploadExcelFile(acceptedFiles[0]);
        setData(result.data);
        updatePreferences({ hasUploadedFile: true });
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
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
    noClick: data.length > 0,
    noDrag: data.length > 0,
  });

  // Generate columns dynamically from data
  const generateColumns = (): GridColDef[] => {
    if (data.length === 0) return [];
    
    const sampleRow = data[0];
    return Object.keys(sampleRow)
      .filter((key) => key !== 'id')
      .map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1,
        minWidth: 120,
        renderCell: (params) => {
          if (key === 'status') {
            return (
              <Chip
                label={params.value}
                size="small"
                color={params.value === 'Active' ? 'success' : 'default'}
                sx={{ borderRadius: 1.5 }}
              />
            );
          }
          if (typeof params.value === 'number' && key.toLowerCase().includes('revenue')) {
            return `${preferences.currency}${params.value.toLocaleString()}`;
          }
          return params.value;
        },
      }));
  };

  const columns = generateColumns();
  const selectedCount = selectedRows.type === 'include' ? selectedRows.ids.size : 0;

  return (
    <Box sx={{ height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Data Grid
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.length > 0
              ? `${data.length} rows • ${columns.length} columns${selectedCount > 0 ? ` • ${selectedCount} selected` : ''}`
              : 'Upload a file to get started'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {data.length > 0 && (
            <>
              <Tooltip title="Refresh data">
                <IconButton onClick={loadData}>
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export">
                <IconButton>
                  <Download />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<AutoFixHigh />}
                onClick={() => setOpsPanelOpen(true)}
              >
                Smart Operations
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Content */}
      {!preferences.hasUploadedFile || data.length === 0 ? (
        /* Upload Area */
        <Card
          {...getRootProps()}
          sx={{
            p: 6,
            textAlign: 'center',
            cursor: 'pointer',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'divider',
            backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input {...getInputProps()} />
          {loading ? (
            <CircularProgress />
          ) : (
            <>
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
                  mb: 2,
                }}
              >
                <Upload sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {isDragActive ? 'Drop your file here' : 'Upload Excel File'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Drag and drop or click to browse
              </Typography>
            </>
          )}
        </Card>
      ) : (
        /* Data Grid */
        <Card sx={{ height: 'calc(100vh - 280px)', minHeight: 500 }}>
          <DataGrid
            rows={data}
            columns={columns}
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f1f5f9',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f8fafc',
              },
              '& .MuiDataGrid-toolbarContainer': {
                padding: 2,
                borderBottom: '1px solid #e2e8f0',
              },
            }}
          />
        </Card>
      )}

      {/* Smart Operations Panel */}
      <SmartOpsPanel open={opsPanelOpen} onClose={() => setOpsPanelOpen(false)} />
    </Box>
  );
};

export default DataGridPage;
