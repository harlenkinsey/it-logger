import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs} from 'firebase/firestore';

import {db} from '../../firebase-config';

const technicianCollectionRef = collection(db, 'technicians');

const initialState = {
  technicians: [],
  techniciansStringified: [],
  status: 'idle',
  search: [],
  query: null,
  view: 'tickets',
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
    queryUpdated: {
      reducer(state, action) {
        let query = action.payload.toLowerCase();
        state.query = query;
        query = query.split(' ');

        let matches = [];

        for(let x = 0; x < state.techniciansStringified.length; x++) {
          for(let y = 0; y < state.techniciansStringified[x].length; y++) {
            for(let z = 0; z < query.length; z++) {
              if(state.techniciansStringified[x][y] == query[z]) {
                matches.push(state.technicians[x]);
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
    .addCase(fetchTechnicians.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchTechnicians.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.technicians = action.payload
      state.techniciansStringified = action.payload.map(technician => stringifyTechnician(technician))
    })
    .addCase(fetchTechnicians.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

const stringifyTechnician = (technician) => {

  let split = technician.name.split(' ').concat(technician.certification.split(' '));
  
  let technicianStringified = [technician.age.toString()].concat(split)
  let technicianStringifiedLower = technicianStringified.map(element => element.toLowerCase())
  
  return technicianStringifiedLower
}

export const selectAllTechnicians = state => state.technicians.technicians
export const selectStatus = state => state.technicians.status
export const selectError = state => state.technicians.error
export const selectSearch = state => state.technicians.search
export const selectQuery = state => state.technicians.query
export const selectView = state => state.technicians.view

export const { queryUpdated, viewUpdated } = techniciansSlice.actions

export default techniciansSlice.reducer