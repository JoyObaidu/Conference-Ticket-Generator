import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Ticket = ({ data, reset }) => {
  if (!data) return null;

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg mt-4 text-center w-full mx-auto">
      <h2 className="text-2xl font-bold">
      <FontAwesomeIcon icon={faTicket} />
        Your Conference Ticket</h2>

      <div className="mt-4 flex flex-col items-center">
        {data.avatar && (
          <img
            src={data.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
        )}
        <p className="text-lg font-semibold">{data.fullName}</p>
        <p className="text-gray-600">{data.email}</p>
        <p className="text-gray-600">GitHub: @{data.githubUserName}</p>

        <div className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg font-bold">
          Ticket ID: {Math.floor(100000 + Math.random() * 900000)}
        </div>

        <button
          onClick={reset}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Generate Another Ticket
        </button>
      </div>
    </div>
  );
};

Ticket.propTypes = {
  data: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    githubUserName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  reset: PropTypes.func.isRequired,
};

export default Ticket;
