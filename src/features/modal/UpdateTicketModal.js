import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
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
    updateTicketUpdated 
} from '../modal/modalsSlice';

export const UpdateTicketModal = () => {

    const dispatch = useDispatch()
    const technicians = useSelector(selectAllTechnicians)
    const technicianStatus = useSelector(selectStatus)
    const error = useSelector(selectError)
    const updateModal = useSelector(selectUpdateTicket);

    let statusOptions

    const [state, setState] = useState({
        success: false,
        subject: '',
        technician: '',
        details: '',
        status: '',
        reference: ''
    });
    
    useEffect(() => {

        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

        if (technicianStatus === 'idle') {
            dispatch(fetchTechnicians())
        }
  
    }, [technicianStatus, dispatch, updateModal])

    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
  
    }, [dispatch])

    const handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        dispatch(updateTicketUpdated({name: id, value: value}));
    }

    const handleSubmit = () => {
        
        let updatedTicket = {
            subject: updateModal.subject,
            technician: updateModal.technician,
            details: updateModal.details,
            status: updateModal.status,
            reference: updateModal.reference,
            id: updateModal.id
        };
        
        dispatch(updateTicket(updatedTicket));
        dispatch(fetchTickets());
    }

    const onChange = value => {
        
        axios.post('https://www.google.com/recaptcha/api/siteverify', { 
            secret: process.env.REACT_APP_SECRET_KEY, 
            response: value
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => {
            setState({...state, success: res.data['success']});
        })
        .catch(error => {
            console.log(error);
        })
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
                value={technician.name}
                selected={updateModal.technician == technician.name ? true : false}
            >{technician.name}
            </option>
        ))

        optionsList.unshift(
            <option 
                key='key' 
                value='None'
                selected={updateModal.technician.name == 'None' ? true : false}
            >None
            </option>
        );

    } else if (technicianStatus === 'failed') {
    
        optionsList = 
            
            <option value='Failed to load technicians...'>
                {error}
            </option>
    }

    // Initializes status option list to have the first option = updateModal.status
    let statuses = ['New', 'Assigned', 'In Progress', 'Pending', 'Resolved'];

    statusOptions = statuses.map(status => (
        <option 
            value={status} 
            key={status}
            selected={updateModal.status == status ? true : false}
        >{status}</option>
    ))

    let submit

    if(state.success) {

        submit =

        <div className='col s3'>
            <div className='modal-footer'>
                <a className='left modal-close waves-effect waves-green btn' onClick={handleSubmit}>Submit</a>
            </div>
        </div>

    } else {
    
        submit =
        
        <div className='col s4'>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                onChange={onChange}
            />
        </div>

    }
     
    return(
        <Fragment>
                <div id='updateTicketModal' className='modal'>
                    <div className='padding-no-bottom row'>
                        <div className='col s11'>
                            <h4><b><i>Update Ticket #{updateModal.reference}</i></b></h4>
                        </div>
                        <div className='col s1'>
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
                                        value={updateModal.subject} 
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
                                        value={updateModal.details} 
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
                            {submit}
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
