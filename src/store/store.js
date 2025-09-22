import { configureStore } from '@reduxjs/toolkit'
import AddtoCartReducer from '@/app/redux/features/AddtoCart/AddtoCartSlice'

export default configureStore({
  reducer: {
    AddtoCart: AddtoCartReducer,
  }
})