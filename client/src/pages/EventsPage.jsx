import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


const EventsPage = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/venues/${venueId}/events`)
      .then(res => {
        setVenue(res.data.venue);
        setEvents(res.data.events);
      })
      .catch(err => console.error(err));
  }, [venueId]);

  if (!venue) {
    return <p style={{ padding: "20px" }}>Loading venue...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      {/* Venue Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src={venue.logo} alt={`${venue.name} logo`} style={{ height: "50px", marginRight: "10px" }} />
        <h1>{venue.name}</h1>
        <a href={venue.website} style={{ marginLeft: 'auto' }}>Back to Venue Site</a>
      </div>

      {/* Events */}
      {events.map(event => (
        <Link to={`/venue/${venueId.toLowerCase()}/event/${event.id}`}>
          <div style={{
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
        </Link>
      ))}

    </div>
  );
};

export default EventsPage;
