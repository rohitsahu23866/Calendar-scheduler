import React, { useState, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';

const EventFilter = () => {
  const { events } = useContext(EventContext);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [category, setCategory] = useState('All');

  const filterEvents = (category) => {
    setCategory(category);
    if (category === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === category));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">Filter by Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => filterEvents(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-gray-100 text-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="font-semibold">{event.title}</p>
            <p className="text-sm">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;
