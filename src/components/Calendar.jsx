import React, { useState, useContext } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../contexts/EventContext';
import EventForm from './EventForm';

const Calendar = () => {
  const { events, setEvents, deleteEvent } = useContext(EventContext); // Ensure `setEvents` and `deleteEvent` are in the context
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="flex justify-between items-center py-2">
        <button onClick={prevMonth} className="text-blue-600 hover:text-blue-800">&lt;</button>
        <span className="text-lg font-semibold text-gray-700 hover:text-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm bg-white hover:bg-gray-800 hover:scale-105 transition-transform duration-300 ease-in-out">
          {format(currentMonth, dateFormat)}
        </span>
        <button onClick={nextMonth} className="text-blue-600 hover:text-blue-800">&gt;</button>
      </div>
    );
  }; 

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-gray-600 font-medium" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayEvents = events.filter(event =>
          isSameDay(new Date(event.date), day) && (filter === 'All' || event.category === filter)
        );
        days.push(
          <div
            key={day}
            className={`p-2 h-24 border border-gray-200 ${
              isSameDay(day, new Date()) ? 'bg-blue-300' : 'hover:bg-gray-200 hover:scale-105 interactive'
            }`}
            onClick={() => handleDayClick(cloneDay)}
          >
            <span className="text-sm">{formattedDate}</span>
            <div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-1 rounded mb-1 text-xs ${
                    event.category === 'Work' ? 'bg-yellow-300' : 'bg-green-300'
                  }`}
                  onClick={(e) => handleEventClick(event.id, e)}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const handleDayClick = (day) => {
    setSelectedEvent({ date: day, title: '', category: 'Work', time: '' });
    setShowForm(true);
  };

  const handleEventClick = (id, e) => {
    e.stopPropagation(); // Prevent day click event from firing
    const event = events.find(e => e.id === id);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleSaveEvent = (event) => {
    if (event.id) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, { ...event, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const nextMonth = () => {
    setCurrentMonth(prevMonth => addDays(endOfMonth(prevMonth), 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prevMonth => addDays(startOfMonth(prevMonth), -1));
  };

  return (
    <div className="bg-white border shadow rounded-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <button onClick={() => handleDayClick(new Date())} className="bg-blue-500 hover:bg-blue-300 hover:text-grey-200 text-white px-4 py-2 rounded mr-4 mb-2 md:mb-0">
          Add Event
        </button>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {showForm && (
        <EventForm
          event={selectedEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancel}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
