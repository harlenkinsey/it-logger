import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TicketCard } from './TicketCard';
import { 
  selectAllTickets, 
  selectError, 
  selectStatus,
  selectSearch,
  selectQuery,
  fetchTickets,
  deleteTicket 
} from './ticketsSlice';

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

  const handleDelete = id => {
    dispatch(deleteTicket(id));
    dispatch(fetchTickets());
  }

  let content

  if(ticketStatus === 'loading') {
    content = 
    <div className='row main-container center-align'>
      <h4>loading...</h4>
    </div>
  } else if (ticketStatus === 'succeeded') {
    content = tickets.map((ticket, index) => (
        <div className='col s12 m6 l3' key={index}>
          <TicketCard ticket={ticket} id={index} handleDelete={handleDelete} />
        </div>
      ))
  } else if (ticketStatus === 'failed') {
    content = <div>{error}</div>
  }

  if(query && search.length > 0) {
    content = search.map((ticket, index) => (
        <div className='col s12 m6 l3' key={index}>
          <TicketCard ticket={ticket} id={index} handleDelete={handleDelete} />
        </div>
     ))
  } else if (query && search.length === 0) {
    content = 
    <div className='row main-container center-align'>
      <h4>No results...</h4>
    </div>
  }

  return (
    <div className='row' style={{width: '80%'}}>
        {content}
    </div>
  )
}