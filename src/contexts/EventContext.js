// EventContext.js
import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, setEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
