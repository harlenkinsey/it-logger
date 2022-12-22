import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import techniciansReducer from '../features/technicians/techniciansSlice';
import ticketsReducer from '../features/tickets/ticketsSlice';

export default configureStore({
    reducer: {
        technicians: techniciansReducer,
        tickets: ticketsReducer
    },
})