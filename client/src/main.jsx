import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import EventsPage from './pages/EventsPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<EventsPage />} />
      <Route path="/events" element={<EventsPage />} />
    </Routes>
  </Router>
);
