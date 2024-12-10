import React from 'react';

const Pnf = () => {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#e74c3c',
  };

  const messageStyle = {
    fontSize: '1.5rem',
    margin: '10px 0',
  };

  const goBackButtonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={pageStyle}>
      <div style={titleStyle}>404</div>
      <div style={messageStyle}>Oops! The page you're looking for doesn't exist.</div>
      <button
        style={goBackButtonStyle}
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Pnf;
