import { configureStore } from '@reduxjs/toolkit'
import AddtoCartReducer from '../redux/features/AddtoCart/AddtoCartSlice'

export default configureStore({
  reducer: {
    AddtoCart: AddtoCartReducer
  }
})