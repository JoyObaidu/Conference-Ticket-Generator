import { useState } from "react";
import Form from './components/Form';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [ticket, setTicket] = useState(null);

  // Function to reset the ticket
  const reset = () => {
    setTicket(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!ticket ? (
        // ✅ Show Form if ticket is not generated yet
        <Form setTicket={setTicket} />
      ) : (
        // ✅ Show Ticket when form is submitted
        <Ticket data={ticket} reset={reset} />
      )}
    </div>
  );
}

export default App;
