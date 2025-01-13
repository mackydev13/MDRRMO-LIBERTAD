import { createBrowserRouter } from 'react-router-dom'

import PrimaryLayout from 'components/layout/primary-layout'
import PrivateRoutes from 'components/router/private-routes'

import ContactUs from 'pages/contact-us'
import Dashboard  from 'pages/dashboard'
import Information from 'pages/userInformation'
import Login from 'pages/login'
import Logout from 'pages/logout'
import Hotline from 'pages/hotline'
import NotFound404 from 'pages/not-found-404'
import Register from 'pages/register'
import Reports from 'pages/reports'
import ResetPassword from 'pages/reset-password'
import Settings from 'pages/settings'
import Record from 'pages/history'
import Details from 'pages/personDetails'

const routes = [
  {
    path: '/',
    errorElement: <NotFound404 />,
    element: (
      <PrimaryLayout>
        <PrivateRoutes />
      </PrimaryLayout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/Info',
        element: <Information />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/hotline',
        element: <Hotline />,
      },
      {
        path: '/details',
        element: <Details />,
      },
      {
        path: '/record',
        element: <Record />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
  },
]

const router = createBrowserRouter(routes)
export default router
