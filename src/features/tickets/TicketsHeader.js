import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { queryUpdated } from './ticketsSlice';


export const TicketsHeader = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

    const onQueryUpdated = (e) => {
        setQuery(e.target.value)
        dispatch(queryUpdated(e.target.value))
    }

    const clearQuery = () => {
        let query = document.getElementById('searchQuery');
        
        if (query.value != '') { 
            dispatch(queryUpdated(''))
        }
        
        document.getElementById('searchQuery').value = '';
        
    }
    
    return (
    <div>
        <div className='row main-container valign-wrapper'>
            <div className='col s6'>
                <a class="waves-effect waves-light btn-large">Technicians</a>
            </div>
            <div className='col s1'>
                <a class="waves-effect waves-light btn-large red" onClick={clearQuery}>
                    <i className='material-icons'>delete</i>
                </a>
            </div>
            <div className='input-field col s5'>
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
        <div className='row main-container border-full'>
            <div className='col s3 border-right'>
                <h5>Reference #</h5>
            </div>
            <div className='col s3 border-right'>
                <h5>Subject</h5>
            </div>
            <div className='col s3 border-right'>
                <h5>Technician</h5>
            </div>
            <div className='col s3'>
                <h5>Status</h5>
            </div>
        </div>
    </div>
      )
}