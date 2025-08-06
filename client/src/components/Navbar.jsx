import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Navbar = () => {
  const { venueId } = useParams();

  if (!venueId) return null;

  const logoSrc = `/images/${venueId}-logo.png`;

  return (
    <nav style={{
      width: '100%',
      backgroundColor: '#333',
      color: '#fff',
      padding: '15px 30px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoSrc} alt={`${venueId} logo`} style={{ height: '40px', objectFit: 'contain' }} />
      </div>

      {/* Center: Back to venue site */}
      <div>
        <a
          href={`https://${venueId}.com`} // or pull venue.website from context/backend if available
          style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Home
        </a>
      </div>

      {/* Right: Nav Links */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to={`/venue/${venueId}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          Upcoming Events
        </Link>
        <Link to={`/venue/${venueId}/cart`} style={{ color: '#fff', textDecoration: 'none' }}>
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
