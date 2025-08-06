import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/venue/:venueId" element={<EventsPage />} />
      <Route path="/venue/:venueId/event/:eventId" element={<EventDetailPage />} />
      <Route path="/venue/:venueId/checkout/:eventId" element={<CheckoutPage />} />
    </Routes>
  </Router>
);
