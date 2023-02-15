import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';

import { useDispatch } from 'react-redux';
import { updateTechnicianChanged } from '../modal/modalsSlice';
 
export const TechnicianCard = ({ technician, id, handleDelete }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
    }, [])

    const handleEdit = () => {
        dispatch(updateTechnicianChanged(technician));
    }

    const bodyStyles = {
    padding: '10px',
    lineHeight: 0
    }
    const headerStyles = {
    paddingLeft: '10px',
    paddingRight: '10px',
    lineHeight: 0
    }
    const spacingStyles = {
    height: '100px'
    }

    let deleteModalHREF = '#technicianmodal' + id.toString() + '1';
    let deleteModalID = 'technicianmodal' + id.toString() + '1';

    return (

    <Fragment>
        <div className='card medium sticky-action'>
            
            <div className='activator'>
                <div className='row' style={headerStyles}>
                    <div className='col s10'>
                    <h5>{technician.firstName + ' ' + technician.lastName}</h5>
                    </div>
                    <div className='col s2'>
                        <a className='btn btn-floating red modal-trigger' href={deleteModalHREF}><i className='material-icons'>delete</i></a>
                    </div>
                </div>
                <hr></hr>
                <div style={bodyStyles}>
                    <div className='row'> 
                        <p><u>Certification:</u></p>
                    </div>
                    <div className='row'>
                        <p>{technician.certification}</p>
                    </div>
                    <div className='row'> 
                        <p><u>Age:</u></p>
                    </div>
                    <div className='row'>
                        <p>{technician.age}</p>
                    </div>
                </div>
            </div>

            <div className='card-action'>
                <a className='btn blue btn-block modal-trigger' onClick={handleEdit} href='#updateTechnicianModal'>Edit</a>
            </div>
        </div>

        { /* Delete Modal */ }

        <div id={deleteModalID} className='modal'>
            <div className='modal-content'>
                <h2 className='center-align'><b>Delete technician {technician.name}?</b></h2>
                <div style={spacingStyles}></div>
            </div>
            <div className='modal-footer'>
                <div className='row'>
                    <div className='col s6 center-align'>
                        <a className='modal-close btn waves-effect red' onClick={() => handleDelete(technician.id)}>delete</a>
                    </div>
                    <div className='col s6 center-align'>
                        <a className='modal-close btn waves-effect green'>cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>

    )
}