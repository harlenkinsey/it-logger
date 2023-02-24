import React, { useState } from 'react';
import { AddTechnicianModal } from '../modal/AddTechnicianModal';
import { useDispatch } from 'react-redux';
import { queryUpdated } from './techniciansSlice';
import { viewUpdated } from '../view/viewSlice';


export const TechniciansHeader = ({ recaptcha }) => {
    
    const [query, setQuery] = useState('')
    const dispatch = useDispatch() 

    const ticketsClicked = () => 
    {
        dispatch(viewUpdated('tickets'));
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
                    <a className='modal-close waves-effect waves-light btn-floating btn-large blue header-btn' onClick={ticketsClicked}><i className='material-icons'>assignment</i></a>
                    <div className='padding-left' style={{ display: 'inline' }}>
                        <a className='waves-effect waves-light btn-floating modal-trigger btn-large green header-btn' href='#addTechnician'><i className='material-icons'>add</i></a>
                        <AddTechnicianModal recaptcha={recaptcha}/>
                    </div>
                </div>
                <div className='col s1'>
                    <a href='' className='modal-close waves-effect waves-light btn-floating btn-large red right header-btn' onClick={clearQuery}><i className='material-icons'>clear</i></a>
                </div>
                <div className='col s5'>
                    <div className='input-field padding-left'>
                        <input
                            placeholder='Search technicians...' 
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