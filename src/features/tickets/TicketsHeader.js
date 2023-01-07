import React, { useState } from 'react';
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
                <button class='waves-effect waves-light btn-large' onClick={techniciansClicked}>Technicians</button>
            </div>
            <div className='col s1 waves-effect waves-light btn-large red' onClick={clearQuery}>
                <i className='material-icons'>delete</i>
            </div>
            <div className='input-field col s5 padding-left search-padding'>
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
            <div className='col s3 border-right center-align'>
                <h5>Reference #</h5>
            </div>
            <div className='col s3 border-right center-align'>
                <h5>Subject</h5>
            </div>
            <div className='col s3 border-right center-align'>
                <h5>Technician</h5>
            </div>
            <div className='col s3 center-align'>
                <h5>Status</h5>
            </div>
        </div>
    </div>
    )
}