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
    <div className="p-4">
      <select value={category} onChange={(e) => filterEvents(e.target.value)} className="w-full p-2 border rounded">
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div className="grid grid-cols-7 gap-4 p-4 mt-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-blue-200 text-blue-900 p-2 rounded-lg">
            <p>{event.title}</p>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;
