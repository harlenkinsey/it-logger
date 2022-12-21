import React, { useEffect, useState } from "react";
import './App.css';

import Header from "./app/Header";
import { TechniciansList } from "./features/technicians/TechniciansList";

import {db} from './firebase-config';
import { collection, getDocs } from "firebase/firestore";


import store from './app/store';
import { Provider } from 'react-redux';



function App() {
  
  const [tickets, setTickets] = useState([]);

  const ticketCollectionRef = collection(db, "tickets");

  useEffect(() => {

    const getTickets = async () => {
      const data = await getDocs(ticketCollectionRef);
      setTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getTickets()
  }, [])
  
  return (
    <Provider store={store}>
      <React.Fragment>
        <Header></Header>
        <h1>Technicians: </h1>

        <TechniciansList />

        <h1>Tickets</h1>
        {tickets.map((ticket) => {
          return (
            <div> 
              <h3>Subject: {ticket.subject}</h3>
              <h3>Details: {ticket.details}</h3>
              <h3>Status: {ticket.status}</h3>
              <h3>Technician: {ticket.technician}</h3>
            </div>
          )
        })}
        
      </React.Fragment>
    </Provider>
  );
}

export default App;
