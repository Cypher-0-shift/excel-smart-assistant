import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout/Layout';
import WelcomePage from './pages/WelcomePage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import DataGridPage from './pages/DataGridPage';
import AISearchPage from './pages/AISearchPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/data-grid" element={<DataGridPage />} />
            <Route path="/ai-search" element={<AISearchPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>
);

export default App;
