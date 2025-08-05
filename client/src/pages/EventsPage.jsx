import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Venue Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src="/images/venue-logo.png" alt="Venue Logo" style={{ height: "50px", marginRight: "10px" }} />
        <h1>Sample Venue</h1>
        <a href="https://samplevenue.com" style={{ marginLeft: 'auto' }}>Back to Venue Site</a>
      </div>

      {/* Events */}
      {events.map(event => (
        <div key={event.id} style={{
          display: 'flex',
          border: '1px solid #ccc',
          borderRadius: '8px',
          marginBottom: '15px',
          overflow: 'hidden'
        }}>
          <img src={event.image} alt={event.name} style={{ width: "150px", objectFit: "cover" }} />
          <div style={{ padding: "10px" }}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <small>{new Date(event.date).toLocaleDateString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;
