// src/components/BackLink.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackLink = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      marginLeft: '30px'
    }}>
    <div style={{
      position: 'relative',
      marginTop: '80px', // accounts for fixed navbar height
    }}>
      <span
        onClick={() => navigate(-1)}
        style={{
          cursor: 'pointer',
          color: '#007bff',
          textDecoration: 'underline',
          fontSize: '14px'
        }}
      >
        ← Back
      </span>
    </div>
    </div>
  );
};

export default BackLink;
