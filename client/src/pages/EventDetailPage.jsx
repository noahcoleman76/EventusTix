import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackLink';
import VenueTitle from '../components/VenueTitle';

const EventDetailPage = () => {
    const { venueId, eventId } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/venues/${venueId}/events/${eventId}`)
            .then(res => {
                setVenue(res.data.venue);
                setEvent(res.data.event);
            })
            .catch(err => {
                console.error("Error fetching event:", err);
            });
    }, [venueId, eventId]);

    if (!event || !venue) {
        return <p style={{ padding: "20px" }}>Loading event...</p>;
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Top content outside the card */}
            <div style={{ padding: '20px' }}>
                <BackButton />
                <VenueTitle name={venue.name} />
            </div>

            {/* Card */}
            <div style={{ flex: 1, padding: "20px", display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '20px',
                    maxHeight: '75vh',
                    overflowY: 'auto',
                    width: 'auto',
                    maxWidth: '90vw'
                }}>
                    {/* Left - Image */}
                    <img
                        src={event.image}
                        alt={event.name}
                        style={{
                            width: '300px',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />

                    {/* Right - Event Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ marginTop: '0' }}>{event.name}</h2>
                            <p style={{ marginTop: '10px' }}>{event.description}</p>
                            <p style={{ marginTop: '10px' }}>
                                <strong>Performance:</strong> {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                }).replace(/(\d+)(,)/, (_, d, c) => {
                                    const suffix = ['st', 'nd', 'rd'][(d % 10) - 1] && ![11, 12, 13].includes(+d % 100) ? ['st', 'nd', 'rd'][(d % 10) - 1] : 'th';
                                    return `${d}${suffix}${c}`;
                                })}
                            </p>
                        </div>

                        {/* Buy Tickets Button */}
                        <button
                            style={{
                                alignSelf: 'start',
                                marginTop: '20px',
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
                </div>
            </div>

            <Footer />
        </div>

    );
};

export default EventDetailPage;
