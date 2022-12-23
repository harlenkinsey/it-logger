import React, { useEffect } from 'react';


export const TicketsHeader = () => {
    return (
    <div>
        <div className='row main-container border-full'>
            <div className='col s6 border-right'>
                <h5>Reference #</h5>
            </div>
            <div className='col s6'>
                <h5>Subject</h5>
            </div>
        </div>
        <div className='row main-container border-full'>
            <div className='col s3 border-right'>
                <h5>Reference #</h5>
            </div>
            <div className='col s3 border-right'>
                <h5>Subject</h5>
            </div>
            <div className='col s3 border-right'>
                <h5>Technician</h5>
            </div>
            <div className='col s3'>
                <h5>Status</h5>
            </div>
        </div>
    </div>
      )
}