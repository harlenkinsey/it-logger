import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllTickets, 
  selectError, 
  selectStatus,
  selectSearch,
  selectQuery,
  fetchTickets 
} from './ticketsSlice';

const TicketBlock = ({ ticket }) => {
  return (
    <div className='row main-container border-full' >
      <div className='col s3'>
        <h5 className='ellipsis center-align'>{ticket.reference}</h5>
      </div>
      <div className='col s3' >
        <h5 className='ellipsis center-align'>{ticket.subject}</h5>
      </div>
      <div className='col s3'>
        <h5 className='ellipsis center-align'>{ticket.technician}</h5>
      </div>
      <div className='col s3'>
        <h5 className='ellipsis center-align'>{ticket.status}</h5>
      </div>
    </div>
  )
}

export const TicketsList = () => {
  const dispatch = useDispatch()
  const tickets = useSelector(selectAllTickets)
  const search = useSelector(selectSearch)
  const query = useSelector(selectQuery)

  const ticketStatus = useSelector(selectStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    if (ticketStatus === 'idle') {
      dispatch(fetchTickets())
    }
  }, [ticketStatus, dispatch])

  let content

  if(ticketStatus === 'loading') {
    content = 
    <div className='row main-container center-align'>
      <h4>loading...</h4>
    </div>
  } else if (ticketStatus === 'succeeded') {
    content = tickets.map(ticket => (
     <TicketBlock key={ticket.id} ticket={ticket} />
    ))
  } else if (ticketStatus === 'failed') {
    content = <div>{error}</div>
  }

  if(query && search.length > 0) {
    content = search.map(ticket => (
      <TicketBlock key={ticket.id} ticket={ticket} />
     ))
  } else if (query && search.length === 0) {
    content = 
    <div className='row main-container center-align'>
      <h4>No results...</h4>
    </div>
  }

  return (
    <section>
      {content}
    </section>
  )
}