import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs} from 'firebase/firestore';

import {db} from '../../firebase-config';

const technicianCollectionRef = collection(db, 'technicians');

const initialState = {
  technicians: [],
  status: 'idle',
  error: null
}

export const fetchTechnicians = createAsyncThunk('technicians/fetchTechnicians', async () => {
  const response = await getDocs(technicianCollectionRef);
  return (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
})

const techniciansSlice = createSlice({
  name: 'technicians',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
    .addCase(fetchTechnicians.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchTechnicians.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.technicians = action.payload
    })
    .addCase(fetchTechnicians.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const selectAllTechnicians = state => state.technicians.technicians

export default techniciansSlice.reducer