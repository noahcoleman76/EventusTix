import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const EventDetailPage = () => {
    const { venueId, eventId } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        console.log("Fetching:", venueId, eventId); // ✅
        axios.get(`http://localhost:5000/api/venues/${venueId}/events/${eventId}`)
            .then(res => {
                console.log("API response:", res.data);
                setVenue(res.data.venue);
                setEvent(res.data.event);
            })
            .catch(err => {
                console.error("Error fetching event:", err);
            });
    }, [venueId, eventId]);



    if (!event) {
        return <p style={{ padding: "20px" }}>Loading event...</p>;
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

            {/* Event Details */}
            <h2>{event.name}</h2>
            <img src={event.image} alt={event.name} style={{ width: "100%", maxWidth: "500px", marginBottom: "15px" }} />
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

            {/* Buy Tickets */}
            <button
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/venue/${venueId}/checkout/${event.id}`)}
            >
                Buy Tickets
            </button>
        </div>
    );
};

export default EventDetailPage;
