import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css';

import { 
    selectAllTechnicians, 
    selectError, 
    selectStatus,
    fetchTechnicians 
  } from '../technicians/techniciansSlice';

import {
    addTicket,
    fetchTickets
} from '../tickets/ticketsSlice';

export const AddTicketModal = () => {

    const dispatch = useDispatch()
    const technicians = useSelector(selectAllTechnicians)
    const technicianStatus = useSelector(selectStatus)
    const error = useSelector(selectError)

    const [state, setState] = useState({
        subject: '',
        technician: '',
        details: '',
        status: ''
    });
    
    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});

        if (technicianStatus === 'idle') {
            dispatch(fetchTechnicians())
        }

    }, [dispatch])

    useEffect(() => {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [state])

    const handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        setState({...state, [id]: value});
    }

    const clearState = () => {
        
        let emptyTicket = {
            subject: '',
            technician: '',
            details: '',
            status: ''
        }

        setState(emptyTicket);
    }

    const handleSubmit = () => {
        
        let newTicket = {
            subject: state.subject,
            technician: state.technician,
            details: state.details,
            status: state.status,
            reference: Math.floor(Math.random() * 1000),
            id: Math.floor(Math.random() * 1000000).toString()
        };
        
        dispatch(addTicket(newTicket));
        dispatch(fetchTickets());
        clearState();
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
        <option key={technician.id} value={technician.firstName + ' ' + technician.lastName}>
            {technician.firstName + ' ' + technician.lastName}
        </option>
    ))

    optionsList.unshift(
        <option key='key' value='None'>
            None
        </option>
    );

    } else if (technicianStatus === 'failed') {
    
    optionsList = 
        
        <option value='Failed to load technicians...'>
            {error}
        </option>
    }

    return(
        <Fragment>
                <div id='addTicket' className='modal'>
                    <div className='padding-no-bottom row'>
                        <div className='col s10 m11'>
                            <h4><b><i>Create Ticket</i></b></h4>
                        </div>
                        <div className='col s2 m1'>
                            <a className='modal-close waves-effect waves-light btn-floating red' onClick={clearState}><i className='material-icons'>clear</i></a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row align-center'>
                        <div className='modal-content'>
                            <div className='col s1'></div>
                            <form className='col s10' id='ticket-form'>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='subject' type='text' value={state.subject}  className='validate' onChange={handleFormChange}/>
                                        <label htmlFor='subject'>Subject</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <select name='technician' value={state.technician}  id='technician' onChange={handleFormChange}>
                                            {optionsList}
                                        </select>
                                        <label htmlFor='technician'>Technician</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='details' type='text' value={state.details} className='validate' onChange={handleFormChange}/>
                                        <label htmlFor='details'>Details</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <select id='status' name='status'  value={state.status}onChange={handleFormChange}>
                                            <option value='New'>New</option>
                                            <option value='Assigned'>Assigned</option>
                                            <option value='In Progress'>In Progress</option>
                                            <option value='Pending'>Pending</option>
                                            <option value='Resolved'>Resolved</option>
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
