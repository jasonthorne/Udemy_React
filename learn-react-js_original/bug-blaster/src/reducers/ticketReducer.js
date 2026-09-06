
//state is the current tickets available
//'action' is what you want to do (add, delete etc)
//action has 2 information types:
//action type (what do you want to do - add, delete etc)
//and a payload (what info do you need inorder to do that)
export default function ticketReducer(state, action){
    
    switch(action.type){
        case "ADD_TICKET":
            //return whats in the current state + new tickets made of old + the action payload (which includes the logic for makeing a new ticket, and terefore adds one - I think!)
            return{...state, tickets: [...state.tickets, action.payload]} 
        case "UPDATE_TICKET":
            return {
                ...state, //copy over state to create a new state (as above too)
                tickets: state.tickets.map(ticket =>
                    /*if we find a ticket with id that mateches our payload id,
                    then return the payload, else return the ticket
                    */
                    ticket.id === action.payload.id? action.payload: ticket
                )
            }
        case "DELETE_TICKET":
            return {
                ...state, //return properties of state
                //return tickets, where ticket id != payload id (i.e all OTHER tickets)
                tickets:  state.tickets.filter(ticket => ticket.id !== action.payload.id)
            }
        default:
            return state; //if nothing is true, then just return the current state
    }


}