// src/components/VenueTitle.jsx
import React from 'react';

const VenueTitle = ({ name }) => {
  if (!name) return null;

  return (
    <div style={{
      marginTop: '80px',
      marginBottom: '20px',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      {name}
    </div>
  );
};

export default VenueTitle;
