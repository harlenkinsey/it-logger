import { useEffect, useState } from "react";
import './App.css';
import {db} from './firebase-config';
import { collection, getDocs } from "firebase/firestore";



function App() {
  
  const [technicians, setTechnicians] = useState([]);
  const [tickets, setTickets] = useState([]);

  const technicianCollectionRef = collection(db, "technicians");
  const ticketCollectionRef = collection(db, "tickets");

  useEffect(() => {

    const getTechnicians = async () => {
      const data = await getDocs(technicianCollectionRef);
      setTechnicians(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getTechnicians()

    const getTickets = async () => {
      const data = await getDocs(ticketCollectionRef);
      setTickets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getTickets()
  }, [])
  
  return (
    <div className="App">
      <h1>Technicians: </h1>
      {technicians.map((technician) => {
        return (
          <div> 
            <h3>Name: {technician.name}</h3>
            <h3>Age: {technician.age}</h3>
            <h3>Certification: {technician.certification}</h3>
          </div>
        )
      })}

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
    </div>
  );
}

export default App;
