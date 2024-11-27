import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'store/auth'
import dataReducer from 'store/Data'

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    incidents: dataReducer,
  },
})

export default store
