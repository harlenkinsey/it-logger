import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import M from 'materialize-css';

import { 
    fetchTechnicians,
    updateTechnician
  } from '../technicians/techniciansSlice';

import { 
    selectUpdateTechnician, 
    updateTechnicianUpdated 
} from '../modal/modalsSlice';

export const UpdateTechnicianModal = () => {

    const dispatch = useDispatch();
    const updateModal = useSelector(selectUpdateTechnician);

    const [state, setState] = useState({
        success: false,
        name: '',
        certification: '',
        age: ''
    });
    
    useEffect(() => {

        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

    }, [dispatch, updateModal])

    useEffect(() => {

        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
  
    }, [dispatch])

    const handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        dispatch(updateTechnicianUpdated({name: id, value: value}));
    }

    const handleSubmit = () => {
        
        let updatedTechnician = {
            name: updateModal.name,
            certification: updateModal.certification,
            age: updateModal.age,
            id: updateModal.id
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
            setState({...state, success: res.data['success']});
        })
        .catch(error => {
            console.log(error);
        })
    }

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
                <div id='updateTechnicianModal' className='modal'>
                    <div className='padding-no-bottom row'>
                        <div className='col s11'>
                            <h4><b><i>Update Technician #{updateModal.reference}</i></b></h4>
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
                                        <input id='firstName' type='text' className='validate'
                                        value={updateModal.name.split(' ')[0]} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='firstName'>First Name</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='lastName' type='text' className='validate'
                                        value={updateModal.name.split(' ')[1]} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='lastName'>Last Name</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='certification' type='text' className='validate'
                                        value={updateModal.certification} 
                                        onChange={handleFormChange}/>
                                        <label className='active' htmlFor='certification'>Certification</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input id='age' type='text' className='validate'
                                        value={updateModal.age} 
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
