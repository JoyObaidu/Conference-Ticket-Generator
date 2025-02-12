import { useState } from "react";
import Form from './components/Form';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [ticket, setTicket] = useState(null);
  return (
    <>
    <Form setTicket={setTicket}/>
    <Ticket ticket={ticket}/>
    </>
  )
}

export default App
