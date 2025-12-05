// Placeholder API functions - NO BACKEND LOGIC
// These are mock functions that simulate API calls

export interface ExcelData {
  id: number;
  [key: string]: string | number | boolean;
}

export interface KPIData {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  category?: string;
}

// Mock data for demonstration
export const mockExcelData: ExcelData[] = [
  { id: 1, product: 'Widget A', sales: 1250, revenue: 45000, region: 'North', status: 'Active' },
  { id: 2, product: 'Widget B', sales: 890, revenue: 32000, region: 'South', status: 'Active' },
  { id: 3, product: 'Widget C', sales: 2100, revenue: 78000, region: 'East', status: 'Inactive' },
  { id: 4, product: 'Widget D', sales: 560, revenue: 21000, region: 'West', status: 'Active' },
  { id: 5, product: 'Widget E', sales: 1800, revenue: 65000, region: 'North', status: 'Active' },
  { id: 6, product: 'Widget F', sales: 420, revenue: 15000, region: 'South', status: 'Inactive' },
  { id: 7, product: 'Widget G', sales: 3200, revenue: 112000, region: 'East', status: 'Active' },
  { id: 8, product: 'Widget H', sales: 980, revenue: 36000, region: 'West', status: 'Active' },
  { id: 9, product: 'Widget I', sales: 1450, revenue: 52000, region: 'North', status: 'Active' },
  { id: 10, product: 'Widget J', sales: 670, revenue: 24000, region: 'South', status: 'Inactive' },
];

export const mockKPIData: KPIData[] = [
  { title: 'Total Revenue', value: '$480,000', change: 12.5, changeType: 'increase', icon: 'revenue' },
  { title: 'Total Sales', value: '13,320', change: 8.2, changeType: 'increase', icon: 'sales' },
  { title: 'Active Products', value: '7', change: 2, changeType: 'increase', icon: 'products' },
  { title: 'Avg Order Value', value: '$36.04', change: 3.1, changeType: 'decrease', icon: 'average' },
];

export const mockChartData: ChartData[] = [
  { name: 'Jan', value: 4000, category: 'Sales' },
  { name: 'Feb', value: 3000, category: 'Sales' },
  { name: 'Mar', value: 5000, category: 'Sales' },
  { name: 'Apr', value: 4500, category: 'Sales' },
  { name: 'May', value: 6000, category: 'Sales' },
  { name: 'Jun', value: 5500, category: 'Sales' },
];

export const mockPieData: ChartData[] = [
  { name: 'North', value: 35 },
  { name: 'South', value: 25 },
  { name: 'East', value: 25 },
  { name: 'West', value: 15 },
];

// Placeholder async functions
export const uploadExcelFile = async (file: File): Promise<{ success: boolean; data: ExcelData[] }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('File uploaded:', file.name);
  return { success: true, data: mockExcelData };
};

export const fetchDashboardData = async (): Promise<{ kpis: KPIData[]; charts: ChartData[] }> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { kpis: mockKPIData, charts: mockChartData };
};

export const fetchGridData = async (): Promise<ExcelData[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockExcelData;
};

export const processAIQuery = async (query: string): Promise<{ results: ExcelData[]; filters: string[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  console.log('Processing query:', query);
  return {
    results: mockExcelData.slice(0, 5),
    filters: ['Region = North', 'Sales > 1000'],
  };
};

export const applyOperation = async (
  operation: string,
  params: Record<string, unknown>
): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Applying operation:', operation, params);
  return { success: true, message: `${operation} applied successfully` };
};

export const motivationalQuotes = [
  "Data is the new oil. Refine it well.",
  "In God we trust, all others must bring data.",
  "Without data, you're just another person with an opinion.",
  "The goal is to turn data into information, and information into insight.",
  "Data beats emotions.",
  "Information is the oil of the 21st century.",
];

export const getRandomQuote = (): string => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};
