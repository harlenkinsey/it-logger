import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'tickets'
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    viewUpdated: {
      reducer(state, action) {
        state.view = action.payload;
      }
    }
  }
})

export const selectView = state => state.view.view

export const { viewUpdated } = viewSlice.actions

export default viewSlice.reducer