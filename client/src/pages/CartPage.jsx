import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../CartContext';
import Footer from '../components/Footer';
import BackButton from '../components/BackLink';
import VenueTitle from '../components/VenueTitle';

const CartPage = () => {
  const { venueId } = useParams();
  const { cart } = useCart();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const venueInfo = cart[0]?.event?.venue || cart[0]?.event?.venueName || cart[0]?.venue || {};

  const toggleSelection = (eventId) => {
    setSelectedOrders(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const hasOrders = cart.length > 0;

  if (!hasOrders) {
    return (
      <div style={{ padding: "20px", marginTop: '80px' }}>
        <Navbar />
        <h2>No event tickets selected</h2>
        <Link to={`/venue/${venueId}`}>
          <button style={{
            marginTop: "15px", padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px"
          }}>
            Go to Events
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: "20px" }} className='main-content'>
        <Navbar />
        <BackButton />
        <VenueTitle name={`Cart for ${venueId}`} />
        <h2>Your Cart</h2>
        {cart.map(order => (
          <div key={order.eventId} style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}>
            <input
              type="checkbox"
              checked={selectedOrders.includes(order.eventId)}
              onChange={() => toggleSelection(order.eventId)}
              style={{ marginRight: "10px" }}
            />
            <div>
              <strong>{order.event.name}</strong> — {order.formData.tickets} tickets
              <br />
              Name: {order.formData.firstName} {order.formData.lastName}
            </div>
          </div>
        ))}
        <button
          disabled={selectedOrders.length === 0}
          style={{
            padding: "10px 20px",
            background: selectedOrders.length === 0 ? "#ccc" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: selectedOrders.length === 0 ? "not-allowed" : "pointer"
          }}
        >
          Proceed to Payment
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
