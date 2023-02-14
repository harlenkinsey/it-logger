import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: false
}

const recaptchaSlice = createSlice({
  name: 'recaptcha',
  initialState,
  reducers: {
    successUpdated: {
      reducer(state, action) {
        state.success = action.payload;
      }
    }
  }
})

export const selectSuccess = state => state.recaptcha.success

export const { successUpdated } = recaptchaSlice.actions

export default recaptchaSlice.reducer