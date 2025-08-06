import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Navbar = () => {
  const { venueId } = useParams();

  return (
    <nav style={{ background: "#333", color: "#fff", padding: "10px" }}>
      <Link to={`/venue/${venueId}`} style={{ color: "#fff", marginRight: "15px" }}>
        Events
      </Link>
      {/* Checkout link removed for now */}
    </nav>
  );
};

export default Navbar;
