import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Recaptcha } from '../recaptcha/Recaptcha';
import M from 'materialize-css';

import { selectSuccess } from '../recaptcha/recaptchaSlice';

import {
    addTechnician,
    fetchTechnicians
} from '../technicians/techniciansSlice';

export const AddTechnicianModal = () => {

    const dispatch = useDispatch();
    const success = useSelector(selectSuccess);

    const [state, setState] = useState({
        success: false,
        firstName: '',
        lastName: '',
        certification: ''
    });
    
    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
        
    }, [dispatch])

    const handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        setState({...state, [id]: value});
    }

    const handleSubmit = () => {
        
        let newTechnician = {
            name: state.firstName + ' ' + state.lastName,
            certification: state.certification,
            age: state.age,
            id: Math.floor(Math.random() * 1000000).toString()
        };
        
        dispatch(addTechnician(newTechnician));
        dispatch(fetchTechnicians());
    }

    let submit

    if(success) {

        submit =

        <div className='col s3'>
            <div className='modal-footer'>
                <a className='left modal-close waves-effect waves-green btn' onClick={handleSubmit}>Submit</a>
            </div>
        </div>

    } else {
    
        submit =
        
        <div className='col s4'>
            <Recaptcha />
        </div>
    }

    return(
        <Fragment>
                <div id='addTechnician' className='modal'>
                    <div className='padding-no-bottom row'>
                        <div className='col s11'>
                            <h4><b><i>Add Technician</i></b></h4>
                        </div>
                        <div className='col s1'>
                            <a className='modal-close waves-effect waves-light btn-floating red'><i className='material-icons'>clear</i></a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row align-center'>
                        <div className='modal-content'>
                            <div className='col s1'></div>
                            <form className='col s10' id='technician-form'>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='firstName' type='text' className='validate' onChange={handleFormChange}/>
                                        <label htmlFor='firstName'>First Name</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                    <input id='lastName' type='text' className='validate' onChange={handleFormChange}/>
                                        <label htmlFor='lastName'>Last Name</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='certification' type='text' className='validate' onChange={handleFormChange}/>
                                        <label htmlFor='certification'>Certification</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='age' type='text' className='validate' onChange={handleFormChange}/>
                                        <label htmlFor='age'>Age</label>
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
