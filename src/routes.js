import { Navigate, Routes,Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/Authentication/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/Authentication/SignUpPage';
import ResetPage from './pages/Authentication/ResetPage'

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/resetpass" element={<ResetPage/>} />
 

      <Route path="/" element={<SimpleLayout />}>
        <Route index element={<Navigate to="/dashboard/docs" />} />
        <Route path="/404" element={<Page404 />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/docs" />} />
            <Route path="/dashboard/docs" element={<DashboardAppPage />} />
            <Route path="/dashboard/shared" element={<UserPage />} />
            <Route path="/dashboard/recent" element={<ProductsPage />} />
            <Route path="/dashboard/trashed" element={<BlogPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}