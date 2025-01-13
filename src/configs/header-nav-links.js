import { Dashboard,Home,History, AccountBox as User,Emergency, MedicalInformation } from '@mui/icons-material';


export const navigation = [
    {name: 'Dashboard', path: '/', icon: <Dashboard />},
    { name: 'User Information', path: '/Info' , icon: <User />},
    {name: 'Involvement Details', path: '/details', icon: <MedicalInformation />},
    { name: 'Emergency Reports', path: '/reports', icon: <Home />},
    {name: 'Emergency Hotline', path: '/hotline', icon: <Emergency />},
    { name: 'Emergency Record', path: '/record', icon: <History />},
]

export const userNavigation = [
  { name: 'Settings', path: '/settings' },
  { name: 'Logout', path: '/logout' },
]
