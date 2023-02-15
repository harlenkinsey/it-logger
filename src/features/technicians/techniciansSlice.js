import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, setDoc, deleteDoc, doc} from 'firebase/firestore';

import {db} from '../../firebase-config';

const technicianCollectionRef = collection(db, 'technicians');

const initialState = {
  technicians: [],
  techniciansStringified: [],
  status: 'idle',
  search: [],
  query: null,
  error: null
}

export const fetchTechnicians = createAsyncThunk('technicians/fetchTechnicians', async () => {
  const response = await getDocs(technicianCollectionRef);
  return (response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
})

export const addTechnician = createAsyncThunk('technicians/addTechnician', async (technician) => {
  const res = await setDoc(doc(db, 'technicians', technician.id), technician)
  .catch(error => { console.log(error) });
  return res;
})

export const updateTechnician = createAsyncThunk('technicians/updateTechnician', async (technician) => {
  
  let sentTechnician = {...technician};
  delete sentTechnician.id;

  const res = await setDoc(doc(db, 'technicians', technician.id), sentTechnician)
  .catch(error => { console.log(error) });
  
  return res;
})

export const deleteTechnician = createAsyncThunk('technicians/deleteTechnician', async (id) => {
  const res = await deleteDoc(doc(db, 'technicians', id));
  return res;
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
              if(state.techniciansStringified[x][y] === query[z]) {
                matches.push(state.technicians[x]);
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

  let name = technician.firstName + ' ' + technician.lastName;
  let technicianStringified = [technician.age.toString()].concat(name);
  let technicianStringifiedLower = technicianStringified.map(element => element.toLowerCase())
  
  return technicianStringifiedLower
}

export const selectAllTechnicians = state => state.technicians.technicians
export const selectStatus = state => state.technicians.status
export const selectError = state => state.technicians.error
export const selectSearch = state => state.technicians.search
export const selectQuery = state => state.technicians.query

export const { queryUpdated } = techniciansSlice.actions

export default techniciansSlice.reducer