import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc} from 'firebase/firestore';

import {db} from '../../firebase-config';

const ticketCollectionRef = collection(db, 'tickets');

const initialState = {
  tickets: [],
  ticketsStringified: [],
  status: 'idle',
  search: [],
  query: null,
  error: null
}

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const res = await getDocs(ticketCollectionRef);
  return (res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
})

export const addTicket = createAsyncThunk('tickets/addTicket', async (ticket) => {
  const res = await setDoc(doc(db, 'tickets', ticket.id), ticket)
  .catch(error => { console.log(error) });
  return res;
})

export const updateTicket = createAsyncThunk('tickets/updateTicket', async (ticket) => {
  
  let sentTicket = {...ticket};
  delete sentTicket.id;

  const res = await setDoc(doc(db, 'tickets', ticket.id), sentTicket)
  .catch(error => { console.log(error) });
  
  return res;
})

export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (id) => {
  const res = await deleteDoc(doc(db, 'tickets', id));
  return res;
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
              if(state.ticketsStringified[x][y] === query[z]) {
                matches.push(state.tickets[x]);
              }
            }
          }
        }
        
        state.search = matches;
      }
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchTickets.pending, (state) => {
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

export const { queryUpdated } = ticketsSlice.actions

export default ticketsSlice.reducer