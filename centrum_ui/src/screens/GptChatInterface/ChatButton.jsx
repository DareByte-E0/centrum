import React, { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';

const ChatButton = ({ onClick }) => {
  const buttonRef = useRef(null);

  // Function to simulate button animation
  const animateButton = () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = '#0056b3'; 
      setTimeout(() => {
        buttonRef.current.style.backgroundColor = '#007bff'; 
      }, 1000);
    }
  };

  useEffect(() => {
    const interval = setInterval(animateButton, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 20,
        zIndex: 1000,
        '& .MuiButton-root': {
          backgroundColor: '#007bff',
          color: '#ffffff',
          borderRadius: '50%',
          padding: 5,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease',
        },
      }}
    >
      <Button ref={buttonRef} onClick={onClick}>
        Chat with AI
      </Button>
    </Box>
  );
};

export default ChatButton;
