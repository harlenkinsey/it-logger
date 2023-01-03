import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectView } from './viewSlice';

import { TechniciansList } from '../technicians/TechniciansList';
import { TechniciansHeader } from '../technicians/TechniciansHeader';
import { TicketsList } from '../tickets/TicketsList';
import { TicketsHeader } from '../tickets/TicketsHeader';

export const View = () => {

    const view = useSelector(selectView);

    return (
        <Fragment>
            {view === 'tickets' ? <TicketsHeader /> : <TechniciansHeader />}
            {view === 'technicians' ? <TechniciansList /> : <TicketsList />}
        </Fragment>
    )
}
