import React, { useState } from "react";
import './App.css';

import Header from "./app/Header";
import { TechniciansList } from "./features/technicians/TechniciansList";
import { TechniciansHeader } from "./features/technicians/TechniciansHeader";
import { TicketsList } from "./features/tickets/TicketsList";
import { TicketsHeader } from "./features/tickets/TicketsHeader";


import store from './app/store';
import { Provider } from 'react-redux';



function App() {

  const [view, setView] = useState('tickets')
  
  return (
    <Provider store={store}>
      <React.Fragment>
        
        <Header></Header>
        
        <TechniciansHeader />
        <TechniciansList />

        <TicketsHeader />
        <TicketsList />
        
      </React.Fragment>
    </Provider>
  );
}

export default App;
