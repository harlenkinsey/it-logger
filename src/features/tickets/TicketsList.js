import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTickets, fetchTickets } from './ticketsSlice';


const TicketBlock = ({ ticket }) => {
  return (
    <div>
      <h3>{ticket.subject}</h3>
      <h4>{ticket.status}</h4>
      <h4>{ticket.details}</h4>
      <h4>{ticket.technician}</h4>
    </div>
  )
}

export const TicketsList = () => {
  const dispatch = useDispatch()
  const tickets = useSelector(selectAllTickets)

  console.log(tickets)

  const ticketStatus = useSelector(state => state.tickets.status)
  const error = useSelector(state => state.tickets.error)

  useEffect(() => {
    if (ticketStatus === 'idle') {
      dispatch(fetchTickets())
    }
  }, [ticketStatus, dispatch])

  let content

  if(ticketStatus === 'loading') {
    content = 'loading...'
  } else if (ticketStatus === 'succeeded') {
    content = tickets.map(ticket => (
     <TicketBlock key={ticket.id} ticket={ticket} />
    ))
  } else if (ticketStatus === 'failed') {
    content = <div>{error}</div>
  }
  
  return (
    <section>
      {content}
    </section>
  )
}