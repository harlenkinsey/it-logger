import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addTicket: {
    subject: null,
    technician: null,
    details: null,
    status: null
  },
  updateTicket: {
    subject: null,
    technician: null,
    details: null,
    status: null
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
    updateTicketUpdated: {
      reducer(state, action) {
        state.updateTicket = action.payload
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
export const { addTicketUpdated, updateTicketUpdated, deleteTicketUpdated } = modalsSlice.actions

export default modalsSlice.reducer