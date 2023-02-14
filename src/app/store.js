import { configureStore } from '@reduxjs/toolkit';
import techniciansReducer from '../features/technicians/techniciansSlice';
import ticketsReducer from '../features/tickets/ticketsSlice';
import viewReducer from '../features/view/viewSlice';
import modalsReducer from '../features/modal/modalsSlice';
import recaptchaReducer from '../features/recaptcha/recaptchaSlice';

export default configureStore({
    reducer: {
        technicians: techniciansReducer,
        tickets: ticketsReducer,
        view: viewReducer,
        modals: modalsReducer,
        recaptcha: recaptchaReducer
    },
})