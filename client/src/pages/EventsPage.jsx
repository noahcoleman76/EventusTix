import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import VenueTitle from '../components/VenueTitle';

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
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{ padding: "20px" }} className='main-content'>
        <Navbar />
        <VenueTitle name={venue.name} />

        {/* Events */}
        {events.map(event => (
          <Link to={`/venue/${venueId.toLowerCase()}/event/${event.id}`} style={{width: '80vw'}}>
            <div style={{
              display: 'flex',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '15px',
              overflow: 'hidden',
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
      <Footer />
    </div>
  );
};

export default EventsPage;
