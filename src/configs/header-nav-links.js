import { Home,AccountBox as User,Emergency } from '@mui/icons-material';


export const navigation = [
    { name: 'Emergency Reports', path: '/reports', icon: <Home />},
    { name: 'User Information', path: '/' , icon: <User />},
    {name: 'Emergency Hotline', path: '/hotline', icon: <Emergency />},
]

export const userNavigation = [
  { name: 'Settings', path: '/settings' },
  { name: 'Logout', path: '/logout' },
]
