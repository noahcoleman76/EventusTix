import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ background: "#333", color: "#fff", padding: "10px" }}>
    <Link to="/events" style={{ color: "#fff", marginRight: "15px" }}>Events</Link>
    <Link to="/checkout" style={{ color: "#fff" }}>Checkout</Link>
  </nav>
);

export default Navbar;
