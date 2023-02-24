import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updateTicket: {
    success: false,
    subject: '',
    status: '',
    details: '',
    technician: '',
    reference: '',
    id: ''
  },
  updateTechnician: {
    success: false,
    firstName: '',
    lastName: '',
    age: '',
    certification: '',
    id: ''
  }
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    updateTicketChanged: {
        reducer(state, action) {
            state.updateTicket = action.payload;
        }
    },
    updateTechnicianChanged: {
        reducer(state, action) {
            state.updateTechnician = action.payload;
        }
    }
  }
})



export const selectUpdateTicket = state => state.modals.updateTicket
export const selectUpdateTechnician = state => state.modals.updateTechnician

export const { updateTicketChanged, updateTechnicianChanged } = modalsSlice.actions

export default modalsSlice.reducer