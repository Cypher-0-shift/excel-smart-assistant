import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
} from '@mui/material';
import {
  Search,
  AutoAwesome,
  Send,
  FilterList,
  Clear,
  Lightbulb,
} from '@mui/icons-material';
import { processAIQuery, ExcelData, mockExcelData } from '../api/placeholder';
import { useUser } from '../context/UserContext';

const sampleQuestions = [
  'Show all products with sales above 1000',
  'Which region has the highest revenue?',
  'Filter active products in North region',
  'Average revenue by region',
  'Top 5 products by sales',
  'Find inactive products with low revenue',
];

const AISearchPage: React.FC = () => {
  const { preferences } = useUser();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ExcelData[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await processAIQuery(query);
      setResults(response.results);
      setFilters(response.filters);
    } catch (error) {
      console.error('Error processing query:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSampleClick = (question: string) => {
    setQuery(question);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setFilters([]);
    setHasSearched(false);
  };

  const getColumns = () => {
    if (results.length === 0) return [];
    return Object.keys(results[0]).filter((key) => key !== 'id');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AutoAwesome sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h4" fontWeight={700}>
            AI Search
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Ask questions about your data in natural language
        </Typography>
      </Box>

      {/* Search Box */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Ask anything about your data..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {query && (
                    <IconButton onClick={clearSearch} size="small" sx={{ mr: 1 }}>
                      <Clear />
                    </IconButton>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                    endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Send />}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
              sx: {
                py: 1,
                px: 2,
                fontSize: '1.1rem',
              },
            }}
          />

          {/* Sample Questions */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Lightbulb sx={{ fontSize: 18, color: 'warning.main' }} />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Try asking:
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {sampleQuestions.map((question, index) => (
                <Chip
                  key={index}
                  label={question}
                  onClick={() => handleSampleClick(question)}
                  variant="outlined"
                  sx={{
                    cursor: 'pointer',
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Applied Filters */}
      {filters.length > 0 && (
        <Fade in>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <FilterList sx={{ color: 'primary.main' }} />
                <Typography variant="subtitle2" fontWeight={600}>
                  Applied Filters
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {filters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={filter}
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setFilters(filters.filter((_, i) => i !== index));
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Results */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Analyzing your data...
            </Typography>
          </Box>
        </Box>
      ) : hasSearched ? (
        <Fade in>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Results
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Found {results.length} matching records
                </Typography>
              </Box>
              {results.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {getColumns().map((column) => (
                          <TableCell key={column} sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.id} hover>
                          {getColumns().map((column) => (
                            <TableCell key={column}>
                              {column === 'status' ? (
                                <Chip
                                  label={row[column] as string}
                                  size="small"
                                  color={row[column] === 'Active' ? 'success' : 'default'}
                                  sx={{ borderRadius: 1.5 }}
                                />
                              ) : column.toLowerCase().includes('revenue') ? (
                                `${preferences.currency}${(row[column] as number).toLocaleString()}`
                              ) : (
                                row[column]
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No results found for your query. Try a different search.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>
      ) : (
        /* Empty State */
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Search sx={{ fontSize: 36, color: 'primary.main' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Start Searching
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
              Type your question in the search box above. You can ask things like "Show all products
              with sales above 1000" or "Which region has the highest revenue?"
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AISearchPage;
