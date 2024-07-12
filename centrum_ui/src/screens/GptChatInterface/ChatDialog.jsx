// ChatDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ChatDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} sx={{ maxWidth: '80vw' }}>
      <DialogTitle sx={{ backgroundColor: '#3f51b5', color: 'white' }}>
        Chat with AI
      </DialogTitle>
      <DialogContent sx={{ padding: '20px', minHeight: '200px' }}>
        {/* Replace with your chat interface content */}
        <p>Chat interface content here...</p>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#f5f5f5' }}>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
