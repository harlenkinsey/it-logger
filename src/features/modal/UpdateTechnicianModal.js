import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import M from 'materialize-css';

import { 
    fetchTechnicians,
    updateTechnician
  } from '../technicians/techniciansSlice';

import {
    selectUpdateTechnician, updateTechnicianChanged
} from '../modal/modalsSlice';

export const UpdateTechnicianModal = () => {

    const dispatch = useDispatch();
    const UT = useSelector(selectUpdateTechnician);

    const [success, setSuccess] = useState(false)
    
    useEffect(() => {

        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

    }, [dispatch, UT])

    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
  
    }, [dispatch])

    const handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        dispatch(updateTechnicianChanged({...UT, [id]: value}));
    }

    const handleSubmit = () => {
        
        let updatedTechnician = {
            firstName: UT.firstName,
            lastName: UT.lastName,
            certification: UT.certification,
            age: UT.age,
            id: UT.id
        };
        
        dispatch(updateTechnician(updatedTechnician));
        dispatch(fetchTechnicians());
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
            setSuccess(res.data['success'])
        })
        .catch(error => {
            console.log(error);
        })
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
        
        <div className='col s11 m8 right'>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                onChange={onChange}
            />
        </div>

    }
     
    return(
        <Fragment>
                <div id='updateTechnicianModal' className='modal'>
                    <div className='padding-no-bottom row'>
                        <div className='col s10 m11'>
                            <h4><b><i>Update Technician: {UT.firstName + ' ' + UT.lastName}</i></b></h4>
                        </div>
                        <div className='col s2 m1'>
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
                                        <input id='firstName' type='text' className='validate'
                                        value={UT.firstName} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='firstName'>First Name</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='lastName' type='text' className='validate'
                                        value={UT.lastName} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='lastName'>Last Name</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='certification' type='text' className='validate'
                                        value={UT.certification} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='certification'>Certification</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='age' type='text' className='validate'
                                        value={UT.age} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='age'>Age</label>
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
