import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CheckoutPage = () => {
  const { venueId, eventId } = useParams();
  const [venue, setVenue] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/venues/${venueId}/events/${eventId}`)
      .then(res => {
        setVenue(res.data.venue);
        setEvent(res.data.event);
      })
      .catch(err => console.error(err));
  }, [venueId, eventId]);

  if (!venue || !event) return <p style={{ padding: "20px" }}>Loading checkout...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      {/* Venue Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src={venue.logo} alt={`${venue.name} logo`} style={{ height: "50px", marginRight: "10px" }} />
        <h1>{venue.name}</h1>
        <a href={venue.website} style={{ marginLeft: 'auto' }}>Back to Venue Site</a>
      </div>

      <h2>Checkout — {event.name}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      
      <form style={{ marginTop: "20px" }}>
        <input type="text" placeholder="Name" required style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
        <input type="email" placeholder="Email" required style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
        <input type="number" placeholder="Number of Tickets" required style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px" }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
