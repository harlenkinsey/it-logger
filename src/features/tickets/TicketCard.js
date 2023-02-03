import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
 
export const TicketCard = ({ ticket, id, handleDelete }) => {

  useEffect(() => {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, [])

  let color

  switch (ticket.status) {
    case 'New':
    case 'Assigned':
        color = 'red';
        break;
    case 'In Progress':
    case 'Pending':
        color = 'yellow';
        break;
    case 'Resolved':
        color = 'green';
        break;
    default:
        color = 'white';
        break;
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

  let editModalHREF = '#ticketmodal' + id.toString() + '2';
  let editModalID = 'ticketmodal' + id.toString() + '2';
  let deleteModalHREF = '#ticketmodal' + id.toString() + '1';
  let deleteModalID = 'ticketmodal' + id.toString() + '1';

  return (

    <Fragment>
        <div className='card medium sticky-action'>
            
            <div className='activator'>
                <div className='row' style={headerStyles}>
                    <div className='col s10'>
                    <h5><span className='border-basic' style={{ backgroundColor: color }}>{ticket.status}</span></h5>
                    </div>
                    <div className='col s2'>
                        <a className='btn btn-floating red modal-trigger' href={deleteModalHREF}><i className='material-icons'>delete</i></a>
                    </div>
                </div>
                <hr></hr>
                <div style={bodyStyles}>
                    <div className='row'> 
                        <p><u>Subject:</u></p>
                    </div>
                    <div className='row'>
                        <p>{ticket.subject}</p>
                    </div>
                    <div className='row'> 
                        <p><u>Technician:</u></p>
                    </div>
                    <div className='row'>
                        <p>{ticket.technician}</p>
                    </div>
                </div>
            </div>
            
            <div className='card-content'>
                <span className='card-title activator grey-text text-darken-4'># {ticket.reference}<i className='material-icons right'>more_vert</i></span>
            </div>

            <div className='card-action'>
                <a className='btn blue btn-block modal-trigger' href={editModalHREF}>Edit</a>
            </div>
            <div className='card-reveal'>
                <span className='card-title grey-text text-darken-4'>Details<i className='material-icons right'>close</i></span>
                <p>{ticket.details}</p>
            </div>
        </div>

        { /* Delete Modal */ }

        <div id={deleteModalID} className='modal'>
            <div className='modal-content'>
                <h2 className='center-align'><b>Delete ticket {ticket.reference}?</b></h2>
                <div style={spacingStyles}></div>
            </div>
            <div className='modal-footer'>
                <div className='row'>
                    <div className='col s6 center-align'>
                        <a className='modal-close btn waves-effect red' onClick={() => handleDelete(ticket.id)}>delete</a>
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