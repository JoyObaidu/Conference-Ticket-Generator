const Ticket = ({ ticket }) => {
    if (!ticket?.fullName) return null;

    return (
        <div className="ticket-container">
            <h2>🎟️ Conference Ticket</h2>
            <img 
                src={ticket.avatar} 
                alt="User Avatar" 
                className="ticket-avatar" 
                onError={(e) => e.target.src = "/default-avatar.png"} 
            />
            <p><strong>Name:</strong> {ticket.fullName}</p>
            <p><strong>Email:</strong> {ticket.email}</p>
        </div>
    );
};

export default Ticket;