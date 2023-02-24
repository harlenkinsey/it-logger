import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectView } from './viewSlice';

import { TechniciansList } from '../technicians/TechniciansList';
import { TechniciansHeader } from '../technicians/TechniciansHeader';
import { TicketsList } from '../tickets/TicketsList';
import { TicketsHeader } from '../tickets/TicketsHeader';
import { UpdateTicketModal } from '../modal/UpdateTicketModal';
import { UpdateTechnicianModal } from '../modal/UpdateTechnicianModal.js';

export const View = () => {

    const view = useSelector(selectView);

    let content
    
    if(view === 'tickets')
    {
        content =
            <Fragment>
                <TicketsHeader />
                <UpdateTicketModal />
                <TicketsList />
            </Fragment>
    } else {
        content =
            <Fragment>
                <TechniciansHeader />
                <UpdateTechnicianModal />
                <TechniciansList />
            </Fragment>
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
