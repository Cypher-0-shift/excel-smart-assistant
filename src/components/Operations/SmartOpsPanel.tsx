import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Functions,
  FilterList,
  Sort,
  MergeType,
  CallSplit,
  AddCircle,
  DeleteSweep,
  Calculate,
  Close,
  AutoAwesome,
} from '@mui/icons-material';

interface SmartOpsPanelProps {
  open: boolean;
  onClose: () => void;
}

type OperationType = 
  | 'sum' 
  | 'average' 
  | 'duplicates' 
  | 'filter' 
  | 'sort' 
  | 'merge' 
  | 'split' 
  | 'create' 
  | 'formula';

interface Operation {
  id: OperationType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const operations: Operation[] = [
  { id: 'sum', label: 'Sum Column', icon: <Functions />, description: 'Calculate sum of a column' },
  { id: 'average', label: 'Average Column', icon: <Calculate />, description: 'Calculate average of values' },
  { id: 'duplicates', label: 'Remove Duplicates', icon: <DeleteSweep />, description: 'Remove duplicate rows' },
  { id: 'filter', label: 'Filter Rows', icon: <FilterList />, description: 'Filter data by conditions' },
  { id: 'sort', label: 'Sort Data', icon: <Sort />, description: 'Sort by column' },
  { id: 'merge', label: 'Merge Columns', icon: <MergeType />, description: 'Combine two columns' },
  { id: 'split', label: 'Split Column', icon: <CallSplit />, description: 'Split column by delimiter' },
  { id: 'create', label: 'Create Column', icon: <AddCircle />, description: 'Add new column' },
  { id: 'formula', label: 'Apply Formula', icon: <AutoAwesome />, description: 'Apply custom formula' },
];

const mockColumns = ['Product', 'Sales', 'Revenue', 'Region', 'Status'];

const SmartOpsPanel: React.FC<SmartOpsPanelProps> = ({ open, onClose }) => {
  const [selectedOp, setSelectedOp] = useState<OperationType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    column: '',
    column2: '',
    delimiter: '',
    newColumnName: '',
    formula: '',
    sortOrder: 'asc',
    filterCondition: '',
  });

  const handleOperationClick = (opId: OperationType) => {
    setSelectedOp(opId);
    setDialogOpen(true);
  };

  const handleApply = () => {
    // Placeholder - no actual logic
    console.log('Applying operation:', selectedOp, formValues);
    setDialogOpen(false);
    setSnackbarOpen(true);
    setFormValues({
      column: '',
      column2: '',
      delimiter: '',
      newColumnName: '',
      formula: '',
      sortOrder: 'asc',
      filterCondition: '',
    });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOp(null);
  };

  const renderDialogContent = () => {
    switch (selectedOp) {
      case 'sum':
      case 'average':
        return (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Column</InputLabel>
            <Select
              value={formValues.column}
              label="Select Column"
              onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
            >
              {mockColumns.map((col) => (
                <MenuItem key={col} value={col}>{col}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'duplicates':
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              This will remove all duplicate rows based on selected columns.
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Based on Column</InputLabel>
              <Select
                value={formValues.column}
                label="Based on Column"
                onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 'filter':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Column</InputLabel>
              <Select
                value={formValues.column}
                label="Column"
                onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Filter Condition"
              placeholder="e.g., > 1000, = 'Active', contains 'Widget'"
              value={formValues.filterCondition}
              onChange={(e) => setFormValues({ ...formValues, filterCondition: e.target.value })}
            />
          </Box>
        );

      case 'sort':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Column</InputLabel>
              <Select
                value={formValues.column}
                label="Column"
                onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Order</InputLabel>
              <Select
                value={formValues.sortOrder}
                label="Order"
                onChange={(e) => setFormValues({ ...formValues, sortOrder: e.target.value })}
              >
                <MenuItem value="asc">Ascending (A-Z, 0-9)</MenuItem>
                <MenuItem value="desc">Descending (Z-A, 9-0)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 'merge':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>First Column</InputLabel>
              <Select
                value={formValues.column}
                label="First Column"
                onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Second Column</InputLabel>
              <Select
                value={formValues.column2}
                label="Second Column"
                onChange={(e) => setFormValues({ ...formValues, column2: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="New Column Name"
              value={formValues.newColumnName}
              onChange={(e) => setFormValues({ ...formValues, newColumnName: e.target.value })}
            />
          </Box>
        );

      case 'split':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Column to Split</InputLabel>
              <Select
                value={formValues.column}
                label="Column to Split"
                onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Delimiter"
              placeholder="e.g., comma, space, hyphen"
              value={formValues.delimiter}
              onChange={(e) => setFormValues({ ...formValues, delimiter: e.target.value })}
            />
          </Box>
        );

      case 'create':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="New Column Name"
              sx={{ mb: 2 }}
              value={formValues.newColumnName}
              onChange={(e) => setFormValues({ ...formValues, newColumnName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Default Value (optional)"
              placeholder="Leave empty for blank column"
              value={formValues.formula}
              onChange={(e) => setFormValues({ ...formValues, formula: e.target.value })}
            />
          </Box>
        );

      case 'formula':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Apply to Column</InputLabel>
              <Select
                value={formValues.column}
                label="Apply to Column"
                onChange={(e) => setFormValues({ ...formValues, column: e.target.value })}
              >
                {mockColumns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Formula"
              placeholder="e.g., =A1*B1, =SUM(A:A), =IF(A1>100, 'High', 'Low')"
              value={formValues.formula}
              onChange={(e) => setFormValues({ ...formValues, formula: e.target.value })}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Supported formulas: SUM, AVERAGE, COUNT, IF, CONCAT, TRIM, UPPER, LOWER
              </Typography>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    const op = operations.find((o) => o.id === selectedOp);
    return op?.label || 'Operation';
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 320,
            borderRadius: '16px 0 0 16px',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Smart Operations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transform your data
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <List>
            {operations.map((op) => (
              <ListItem key={op.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleOperationClick(op.id)}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {op.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={op.label}
                    secondary={op.description}
                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {operations.find((o) => o.id === selectedOp)?.icon}
            <Typography variant="h6" fontWeight={600}>
              {getDialogTitle()}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained">
            Apply Operation
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Operation applied successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SmartOpsPanel;
