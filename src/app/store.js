import { configureStore } from '@reduxjs/toolkit';
import techniciansReducer from '../features/technicians/techniciansSlice';
import ticketsReducer from '../features/tickets/ticketsSlice';
import viewReducer from '../features/view/viewSlice';

export default configureStore({
    reducer: {
        technicians: techniciansReducer,
        tickets: ticketsReducer,
        view: viewReducer
    },
})