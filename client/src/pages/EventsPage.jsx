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
    axios.get(`http://localhost:8080/api/venues/${venueId}/events`)
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
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%'}}>
      <div style={{ padding: "20px", height: '100%' }} className='main-content'>
        <Navbar />
        <VenueTitle name={venue.name} />

        {/* Events */}
        {events.map(event => {
          // Format the date as "Aug 1st, 2025"
          const eventDate = new Date(event.date);
          const options = { month: 'short', day: 'numeric', year: 'numeric' };
          const formattedDate = eventDate.toLocaleDateString('en-US', options)
            .replace(/(\d+)(,)/, (_, d, c) => {
              const suffix = ['st', 'nd', 'rd'][((d % 10) - 1)] && ![11, 12, 13].includes(+d % 100) ? ['st', 'nd', 'rd'][(d % 10) - 1] : 'th';
              return `${d}${suffix}${c}`;
            });

          return (
            <Link to={`/venue/${venueId.toLowerCase()}/event/${event.id}`} style={{ width: '80vw' }}>
              <div style={{
                display: 'flex',
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginBottom: '15px',
                overflow: 'hidden',
                position: 'relative',
                height: '200px',
                backgroundColor: '#000' // Optional: dark background to contrast white text
              }}>
                <img src={event.image} alt={event.name} style={{ width: "150px", objectFit: "cover", height: '100%' }} />

                {/* Centered text */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  width: '60%',
                  padding: '10px',
                  color: 'white' // Make all text white
                }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>{event.name}</h3>
                  <p style={{ marginBottom: '10px' }}>{event.description}</p>
                  <small>Performance: {formattedDate}</small>
                </div>
              </div>
            </Link>
          );
        })}

      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
