import React, {useState} from 'react';

export default function TicketForm({dispatch, editingTicket}){
    
    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    };

    //create states:
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1'); //default low priority

    const clearForm =()=>{
        setTitle('');
        setDescription('');
        setPriority('1');
    };

    const handleSubmit =(event)=>{
        //below prevents the entire page from being reloaded on form submit: ++++++++++
        event.preventDefault();

        const ticketData = {
            id: new Date().toISOString(), //nice easy to read id, associated with current date/time
            title, //this will always be the value of the state (no need define key/value pair)
            description,
            priority
        };

        //call dispatch function of useReducer (passed into ticketform in App.js)
        dispatch({
            type: "ADD_TICKET",
            payload: ticketData
        });

        clearForm(); //clear form
    };

    return(
        <form onSubmit={handleSubmit} className='ticket-form'>
            <div>
                <label>Title</label>
                <input 
                    type='text' 
                    value={title}
                    className='form-input'
                    onChange={event => setTitle(event.target.value)}
                ></input>
            </div>
            <div>
                <label>Description</label>
                <textarea 
                    type='text' 
                    value={description}
                    className='form-input'
                    onChange={event => setDescription(event.target.value)}
                ></textarea>
            </div>
            <fieldset className='priority-fieldset'>
                <legend>Priority</legend>
                {
                    //decontructing the object enty into labl & value (key/value), and returning label tag
                    //checked={priority === value} - if priority is same as 
                    Object.entries(priorityLabels).map(([label, value]) => (
                        <label key={value} className='priority-label'>
                            <input 
                                type='radio' 
                                value={value}
                                checked={priority === value}
                                className='priority-input'
                                onChange={event => setPriority(event.target.value)}
                            ></input>
                            {label} 
                        </label>
                    ))
                }
            </fieldset>
            <button type='submit' className='buton'>Submit</button>
        </form>
    );
};