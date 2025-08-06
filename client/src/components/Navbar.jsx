// Navbar.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Navbar = () => {
  const { venueId } = useParams();

  return (
    <nav style={{ background: "#333", color: "#fff", padding: "10px" }}>
      <Link to={`/venue/${venueId}`} style={{ color: "#fff", marginRight: "15px" }}>
        Events
      </Link>
      <Link to={`/venue/${venueId}/cart`} style={{ color: "#fff" }}>
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;
