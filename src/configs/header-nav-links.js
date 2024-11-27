import { Dashboard,Home,AccountBox as User,Emergency } from '@mui/icons-material';


export const navigation = [
    {name: 'Dashboard', path: '/', icon: <Dashboard />},
    { name: 'User Information', path: '/Info' , icon: <User />},
    { name: 'Emergency Reports', path: '/reports', icon: <Home />},
    {name: 'Emergency Hotline', path: '/hotline', icon: <Emergency />},
]

export const userNavigation = [
  { name: 'Settings', path: '/settings' },
  { name: 'Logout', path: '/logout' },
]
