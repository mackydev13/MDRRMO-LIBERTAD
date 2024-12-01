import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncLogout } from 'services/reqres/requests'

function Logout() {
  const dispatch = useDispatch()
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info', // "info", "success", "warning", "error"
  });

  const showNotification = (message, type) => {
    
  }

  useEffect(() => {
    dispatch(asyncLogout())
  }, [dispatch])
}

export default Logout
