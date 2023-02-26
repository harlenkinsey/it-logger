import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css';

import { 
    selectAllTechnicians, 
    selectError, 
    selectStatus,
    fetchTechnicians 
  } from '../technicians/techniciansSlice';

import {
    updateTicket,
    fetchTickets
} from '../tickets/ticketsSlice';

import {
    selectUpdateTicket,
    updateTicketChanged
} from '../modal/modalsSlice';

export const UpdateTicketModal = () => {

    const dispatch = useDispatch()
    const technicians = useSelector(selectAllTechnicians)
    const technicianStatus = useSelector(selectStatus)
    const error = useSelector(selectError)
    const UT = useSelector(selectUpdateTicket)

    let statusOptions
    
    useEffect(() => {

        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

        if (technicianStatus === 'idle') {
            dispatch(fetchTechnicians())
        }
  
    }, [technicianStatus, dispatch, UT])

    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
  
    }, [dispatch])

    const handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        dispatch(updateTicketChanged({...UT, [id]: value}));
    }

    const handleSubmit = () => {
        dispatch(updateTicket(UT));
        dispatch(fetchTickets());
    }

    let optionsList

    if (technicianStatus === 'loading') {
        optionsList = 
            <option value='loading...'>
                loading...
            </option>
    } else if (technicianStatus === 'succeeded') {
    
        optionsList = 
        
        technicians.map(technician => (
            <option 
                key={technician.id} 
                value={technician.firstName + ' ' + technician.lastName}
                selected={UT.technician == (technician.firstName + ' ' + technician.lastName) ? true : false}
            >{technician.firstName + ' ' + technician.lastName}
            </option>
        ))

        optionsList.unshift(
            <option 
                key='key' 
                value='None'
                selected={UT.technician == 'None' ? true : false}
            >None
            </option>
        );

    } else if (technicianStatus === 'failed') {
    
        optionsList = 
            
            <option value='Failed to load technicians...'>
                {error}
            </option>
    }

    // Initializes status option list to have the first option = state.status
    let statuses = ['New', 'Assigned', 'In Progress', 'Pending', 'Resolved'];

    statusOptions = statuses.map(status => (
        <option 
            value={status} 
            key={status}
            selected={UT.status == status ? true : false}
        >{status}</option>
    ))

    return(
        <Fragment>
                <div id='updateTicketModal' className='modal'>
                    <div className='padding-no-bottom row'>
                        <div className='col s10 m11'>
                            <h4><b><i>Update Ticket #{UT.reference}</i></b></h4>
                        </div>
                        <div className='col s2 m1'>
                            <a className='modal-close waves-effect waves-light btn-floating red'><i className='material-icons'>clear</i></a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row align-center'>
                        <div className='modal-content'>
                            <div className='col s1'></div>
                            <form className='col s10' id='ticket-form'>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input type='text' id='subject' className='validate'
                                        value={UT.subject} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='subject'>Subject</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <select name='technician' id='technician' onChange={handleFormChange}>
                                            {optionsList}
                                        </select>
                                        <label htmlFor='technician'>Technician</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='details' type='text' className='validate'
                                        value={UT.details} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='details'>Details</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <select id='status' name='status' onChange={handleFormChange}>
                                            {statusOptions}
                                        </select>
                                        <label htmlFor='status'>Status</label>
                                    </div>
                                </div>
                            </form>
                            <div className='col s1'></div>
                        </div>
                        <div className='row'>
                            <div className='col s5'></div>
                            <div className='col s3'>
                                <div className='modal-footer'>
                                    <a className='left modal-close waves-effect waves-green btn' onClick={handleSubmit}>Submit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
