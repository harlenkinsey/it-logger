import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllTickets, 
  selectAllErrors, 
  selectAllStatuses, 
  selectAllReferences,
  selectSearch, 
  fetchTickets 
} from './ticketsSlice';

const TicketBlock = ({ ticket }) => {
  return (
    <div className='row main-container border-full'>
      <div className='col s3'>
        <h5>{ticket.reference}</h5>
      </div>
      <div className='col s3'>
        <h5>{ticket.subject}</h5>
      </div>
      <div className='col s3'>
        <h5>{ticket.technician}</h5>
      </div>
      <div className='col s3'>
        <h5>{ticket.status}</h5>
      </div>
    </div>
  )
}

export const TicketsList = () => {
  const dispatch = useDispatch()
  const tickets = useSelector(selectAllTickets)
  const search = useSelector(selectSearch)

  const ticketStatus = useSelector(selectAllStatuses)
  const error = useSelector(selectAllErrors)

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

  if(search != null) {
    content = search.map(ticket => (
      <TicketBlock key={ticket.id} ticket={ticket} />
     ))
  }

  return (
    <section>
      {content}
    </section>
  )
}