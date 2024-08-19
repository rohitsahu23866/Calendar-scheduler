import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import Footer from './components/Footer'; // Import Footer component
import { EventProvider } from './contexts/EventContext';

function App() {
  return (
    <EventProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/event/add" element={<EventForm />} />
              <Route path="/event/edit/:id" element={<EventForm />} />
            </Routes>
          </div>
          <Footer /> 
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
