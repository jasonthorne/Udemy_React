import React from 'react';

export default function TicketItem({ticket, dispatch}){
 
    //create obj with props. = make it equal to passed ticket:
    const {id, title, description, priority} = ticket;

    const priorityClass = {
        1: "low",
        2: "medium",
        3: "high"
    };

    //priority class is whatever number is in ticket.priority gets text priorityClass ++++
    return (
        <div className='ticket-item'>
            <div className={`priority-${priorityClass[ticket.priority]}`}></div>
            <h3>{title}</h3>
            <p>{description}</p>

            <button className='button' onClick={()=> dispatch({type: "DELETE_TICKET", payload: {id}})}>
                Delete
            </button>
            <button className='button' onClick={()=> {/*Edit ticket */}}>
                Edit
            </button>
        </div>
    );
};