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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <p className="mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="mb-2"><strong>Category:</strong> {event.category}</p>
        <p className="mb-4"><strong>Description:</strong> {event.description}</p>
        <div className="flex justify-end">
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
          >
            Delete
          </button>
          <button 
            onClick={() => navigate(`/event/edit/${event.id}`)} 
            className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
          >
            Edit
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
