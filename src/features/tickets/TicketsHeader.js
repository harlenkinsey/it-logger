import React, { useState } from 'react';
import { AddTicketModal } from '../modal/AddTicketModal';
import { useDispatch } from 'react-redux';
import { queryUpdated } from './ticketsSlice';
import { viewUpdated } from '../view/viewSlice';

export const TicketsHeader = () => {

    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

    const techniciansClicked = () => 
    {
        dispatch(viewUpdated('technicians'));
    }

    const onQueryUpdated = (e) => { 
        setQuery(e.target.value)
        dispatch(queryUpdated(e.target.value))
    }

    const clearQuery = () => {
        let query = document.getElementById('searchQuery');
        
        if (query.value !== '') { 
            dispatch(queryUpdated(''))
        }
        
        document.getElementById('searchQuery').value = '';
    }
    
    return (
        <div>
            <div className='row main-container valign-wrapper'>
                <div className='col s6 padding-left'>
                    <button className='waves-effect waves-light btn-large' onClick={techniciansClicked}>Technicians</button>
                    <div className='padding-left' style={{ display: 'inline' }}>
                        <a className='waves-effect waves-light btn-floating modal-trigger btn-large blue' href='#addTicket'><i className='material-icons'>add</i></a>
                        <AddTicketModal/>
                    </div>
                </div>
                <div className='col s1'>
                    <a href='' className='modal-close waves-effect waves-light btn-floating btn-large red right' onClick={clearQuery}><i className='material-icons'>clear</i></a>
                </div>
                <div className='col s5'>
                    <div className='input-field padding-left'>
                        <input
                            placeholder='Search tickets...' 
                            id='searchQuery' 
                            type='text' 
                            name='searchQuery'
                            value={query}
                            onChange={onQueryUpdated}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}