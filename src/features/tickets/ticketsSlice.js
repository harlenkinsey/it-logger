import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs} from 'firebase/firestore';

import {db} from '../../firebase-config';

const ticketCollectionRef = collection(db, 'tickets');

const initialState = {
  tickets: [],
  ticketsStringified: [],
  status: 'idle',
  search: null,
  query: null,
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
        const query = action.payload.split(' ');
        let matches = [];

        for(let x = 0; x < state.ticketsStringified.length; x++) {
          for(let y = 0; y < state.ticketsStringified[x].length; y++) {
            for(let z = 0; z < query.length; z++) {
              if(state.ticketsStringified[x][y] == query[z]) {
                matches.push(state.tickets[x]);
              }
            }
          }
        }
        
        state.search = matches;
      },
    
    queryUpdated: {
      reducer(state, action) {
        state.query = action.payload;
      }
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
      state.ticketsStringified = action.payload.map(ticket => stringifyTicket(ticket))
    })
    .addCase(fetchTickets.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

const stringifyTicket = (ticket) => {
  return [ticket.technician, ticket.reference.toString(), ticket.status, ticket.details]
}

export const selectAllTickets = state => state.tickets.tickets
export const selectAllStatuses = state => state.tickets.status
export const selectAllErrors = state => state.tickets.error
export const selectAllReferences = state => state.tickets.reference
export const selectSearch = state => state.search
export const selectQuery = state => state.query

export const { searchClicked, queryUpdated } = ticketsSlice.actions

export default ticketsSlice.reducer