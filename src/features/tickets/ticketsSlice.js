import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs} from 'firebase/firestore';

import {db} from '../../firebase-config';

const ticketCollectionRef = collection(db, 'tickets');

const initialState = {
  tickets: [],
  ticketsStringified: [],
  status: 'idle',
  search: [],
  error: null
}

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const response = await getDocs(ticketCollectionRef);
  return (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    searchClicked: {
      reducer(state, action) {

      }
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchTickets.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchTickets.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.tickets = action.payload
      state.ticketsStringified = action.payload.map(ticket => JSON.stringify(ticket))
    })
    .addCase(fetchTickets.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const selectAllTickets = state => state.tickets.tickets
export const selectAllStatuses = state => state.tickets.status
export const selectAllErrors = state => state.tickets.error
export const selectAllReferences = state => state.tickets.reference
export const selectSearch = state => state.search

export default ticketsSlice.reducer