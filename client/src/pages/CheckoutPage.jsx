import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useCart } from '../CartContext';
import Footer from '../components/Footer';
import BackButton from '../components/BackLink';
import VenueTitle from '../components/VenueTitle';

const CheckoutPage = () => {
    const { venueId, eventId } = useParams();
    const navigate = useNavigate();
    const { addOrUpdateOrder } = useCart();
    const [venue, setVenue] = useState(null);
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        tickets: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/venues/${venueId}/events/${eventId}`)
            .then(res => {
                setVenue(res.data.venue);
                setEvent(res.data.event);
            })
            .catch(err => console.error(err));
    }, [venueId, eventId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.tickets) {
            alert("Please fill out all fields");
            return;
        }
        addOrUpdateOrder({
            venueId,
            eventId: parseInt(eventId),
            event,
            formData
        });
        navigate(`/venue/${venueId}/cart`);
    };

    if (!venue || !event) return <p>Loading checkout...</p>;

    return (
     <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%'}}>
      <div style={{ padding: "20px", height: '100%' }} className='main-content'>
                <Navbar />
                <BackButton />
                <VenueTitle name={venue.name} />
                <h2>Checkout — {event.name}</h2>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
                    <input type="text" placeholder="Last Name"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
                    <input type="email" placeholder="Email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
                    <input type="number" placeholder="Number of Tickets"
                        value={formData.tickets}
                        onChange={e => setFormData({ ...formData, tickets: e.target.value })}
                        style={{ display: "block", marginBottom: "10px", padding: "8px" }} />
                    <button type="submit" style={{
                        padding: "10px 20px",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px"
                    }}>Go to Cart</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
