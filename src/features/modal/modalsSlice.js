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
  deleteTicket: null
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
    }
  }
})

export const selectAddTicket = state => state.modals.addTicket
export const selectUpdateTicket = state => state.modals.updateTicket
export const selectDeleteTicket = state => state.modals.deleteTicket
export const { addTicketUpdated, updateTicketChanged, updateTicketUpdated, deleteTicketUpdated } = modalsSlice.actions

export default modalsSlice.reducer