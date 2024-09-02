import React, { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find(event => event.id === parseInt(id));

  if (!event) return <p>Event not found!</p>;

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/'); // Navigate back to the calendar after deletion
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{event.title}</h2>
        <p className="text-gray-700 mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="text-gray-700 mb-2"><strong>Category:</strong> {event.category}</p>
        <p className="text-gray-700 mb-4"><strong>Description:</strong> {event.description}</p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button 
            onClick={() => navigate(`/event/edit/${event.id}`)} 
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
