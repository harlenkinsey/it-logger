import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs} from 'firebase/firestore';

import {db} from '../../firebase-config';

const ticketCollectionRef = collection(db, 'tickets');

const initialState = {
  tickets: [],
  ticketsStringified: [],
  status: 'idle',
  search: [],
  query: null,
  view: 'tickets',
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
    queryUpdated: {
      reducer(state, action) {
        let query = action.payload.toLowerCase();
        state.query = query;
        query = query.split(' ');

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
      }
    },
    viewUpdated: {
      reducer(state, action) {
        state.view = action.payload;
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

  let split = ticket.technician.split(' ').concat(ticket.details.split(' ')).concat(ticket.subject.split(' '));
  
  let ticketStringified = [ticket.reference.toString(), ticket.status].concat(split)
  let ticketStringifiedLower = ticketStringified.map(element => element.toLowerCase())
  
  return ticketStringifiedLower
}

export const selectAllTickets = state => state.tickets.tickets
export const selectStatus = state => state.tickets.status
export const selectError = state => state.tickets.error
export const selectSearch = state => state.tickets.search
export const selectQuery = state => state.tickets.query
export const selectView = state => state.tickets.view

export const { queryUpdated, viewUpdated } = ticketsSlice.actions

export default ticketsSlice.reducer