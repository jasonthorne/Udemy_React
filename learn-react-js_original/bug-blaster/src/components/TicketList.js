import React from 'react';
import TicketItem from './TicketItem';

//dispach function needs passed here as it needs to  then be passed (drilled down) to the ticket item component
export default function TicketList({tickets,dispatch}){

    return(
        <div className='ticket-list'>
            { //for each ticket in tickets, create a ticket item:
            //with the item's key equal to the ticket's id, and passing the ticket and the dispach event args to the ticketItem
                tickets.map(ticket => (
                    <TicketItem key={ticket.id} dispatch={dispatch} ticket={ticket}></TicketItem>
                ))
            }
        </div>
    );
};