import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { isAuthenticated } from 'src/Auth/auth';
import PropTypes from 'prop-types';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const PrivateRoute = ({ element, ...rest }) => (
  isAuthenticated() ? element : <Navigate to="/login" replace />
);

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

const PrivateLoginRoute = ({ element, ...rest }) => (
  isAuthenticated() ? <Navigate to="/" replace /> : element
);

PrivateLoginRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PrivateRoute element={<IndexPage />} />, index: true },
        { path: 'user', element: <PrivateRoute element={<UserPage />} /> },
        { path: 'products', element: <PrivateRoute element={<ProductsPage />} /> },
        { path: 'blog', element: <PrivateRoute element={<BlogPage />} /> },
      ],
    },
    {
      path: 'login',
      element: <PrivateLoginRoute element={<LoginPage />} />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
