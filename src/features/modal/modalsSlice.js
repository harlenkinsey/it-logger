import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addTicket: {
    subject: '',
    technician: '',
    details: '',
    status: '',
    id: ''
  },
  updateTicket: {
    subject: '',
    technician: '',
    details: '',
    status: '',
    reference: '',
    id: ''
  },
  addTechnician: {
    firstName: '',
    lastName: '',
    certification: '',
    age: '',
    id: ''
  },
  updateTechnician: {
    firstName: '',
    lastName: '',
    certification: '',
    age: '',
    id: ''
  }
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    addTicketUpdated: {
      reducer(state, action) {
        state.addTicket = action.payload
      }
    },
    updateTicketChanged: {
      reducer(state, action) {
        state.updateTicket = action.payload;
      }
    },
    updateTicketUpdated: {
      reducer(state, action) {
        let name = action.payload.name;
        let value = action.payload.value;

        state.updateTicket[name] = value;
      }
    },
    deleteTicketUpdated: {
      reducer(state, action) {
        state.deleteTicket = action.payload
      }
    },
    addTechnicianChanged: {
      reducer(state, action) {
        state.addTicket = action.payload;
      }
    },
    addTechnicianUpdated: {
      reducer(state, action) {
        let name = action.payload.name;
        let value = action.payload.value;

        state.updateTechnician[name] = value;
      }
    },
    updateTechnicianChanged: {
      reducer(state, action) {
        state.updateTechnician = action.payload;
      }
    },
    updateTechnicianUpdated: {
      reducer(state, action) {
        let name = action.payload.name;
        let value = action.payload.value;

        state.updateTechnician[name] = value;
      }
    },
    deleteTechnicianUpdated: {
      reducer(state, action) {
        state.deleteTechnician = action.payload
      }
    }
  }
})

export const selectAddTicket = state => state.modals.addTicket
export const selectUpdateTicket = state => state.modals.updateTicket
export const selectDeleteTicket = state => state.modals.deleteTicket
export const selectAddTechnician = state => state.modals.addTechnician
export const selectUpdateTechnician = state => state.modals.updateTechnician
export const selectDeleteTechnician = state => state.modals.deleteTechnician
export const { 
  addTicketUpdated, 
  updateTicketChanged, 
  updateTicketUpdated, 
  deleteTicketUpdated,
  addTechnicianChanged,
  addTechnicianUpdated, 
  updateTechnicianChanged, 
  updateTechnicianUpdated, 
  deleteTechnicianUpdated
} = modalsSlice.actions

export default modalsSlice.reducer