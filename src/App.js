import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import { EventProvider } from './contexts/EventContext';

function App() {
  return (
    <EventProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/event/add" element={<EventForm />} />
            <Route path="/event/edit/:id" element={<EventForm />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
