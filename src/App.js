import React from "react";
import './App.css';

import Header from "./app/Header";
import { TechniciansList } from "./features/technicians/TechniciansList";
import { TicketsList } from "./features/tickets/TicketsList";
import { TicketsHeader } from "./features/tickets/TicketsHeader";


import store from './app/store';
import { Provider } from 'react-redux';



function App() {
  
  return (
    <Provider store={store}>
      <React.Fragment>
        
        <Header></Header>
        
        <h1>Technicians: </h1>
        <TechniciansList />

        <TicketsHeader />
        <TicketsList />
        
      </React.Fragment>
    </Provider>
  );
}

export default App;
