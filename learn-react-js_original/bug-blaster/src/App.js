
import './App.css';
import './styles.css';

import TicketForm from './components/TicketForm';
import ticketReducer from './reducers/ticketReducer';
import { useReducer } from 'react';
import TicketList from './components/TicketList';

function App() {

  //initial state consists of just empty tickets, and a property for editing tickets:
  const initialState = {tickets: [], edititngTicket: null };

  //register a reducer using an initial state  (obj with tiockets array) and our ticker teducer
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  //ticketform is given a dispatch function equal to the dispatch fucntion defined in userReducer 
  //alos passed 'editingTicket' from state (defined in initialState)
  return (
    <div className="App">
      <div className='container'>

        <h1>Bug Blaster</h1>
        <TicketForm dispatch = {dispatch} edititngTicket={state.edititngTicket}></TicketForm>

        { 
          //+++++++++++++++++
          //if we have tickets, THEN (this is used here asa THEN not an AND) show content in brackets:
          state.tickets.length>0 && (
            <div className='results'>
              <h2>All Tickets</h2>
              <TicketList tickets={state.tickets} dispatch={dispatch}></TicketList>
            </div>
          )
        }

      </div>
    </div>
  );
}

export default App;
