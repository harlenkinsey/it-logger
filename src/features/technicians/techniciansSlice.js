import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', name: 'John', age: '20', certification: 'A+' }
]

const techniciansSlice = createSlice({
  name: 'technicians',
  initialState,
  reducers: {}
})

export default techniciansSlice.reducer