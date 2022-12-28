import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchClicked, queryUpdated } from './ticketsSlice';


export const TicketsHeader = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

    const onQueryChanged = e => setQuery(e.target.value)

    const onSearchClicked = () => {
        if (query) {
            dispatch(searchClicked(query))
        }
    }

    const onQueryUpdated = () => {
        
    }
    
    return (
    <div>
        <div className='row main-container valign-wrapper'>
            <div className='col s6'>
                <a class="waves-effect waves-light btn-large">Technicians</a>
            </div>
            <div className='input-field col s5'>
                <input
                    placeholder='Search tickets...' 
                    id='searchQuery' 
                    type='text' 
                    name='searchQuery'
                    value={query}
                    onChange={onQueryChanged}
                />
            </div>
            <div className='col s1'>
                <a class="waves-effect waves-light btn-large" onClick={onSearchClicked}>
                    <i className='material-icons'>search</i>
                </a>
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