import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Divider } from '@mui/material';
import { Container } from 'react-bootstrap';
import './profile.css';

// Mock user data
const user = {
  name: "Neo_Researcher",
  level: "Level 5 Quantum Analyst",
  xp: 1240,
  savedArticles: 28,
  joined: "2023-10-15",
  avatarText: "NR"
};

const recentActivity = [
  { id: 1, action: "Saved", title: "AI Ethics Paper", time: "2h ago" },
  { id: 2, action: "Commented", title: "Mars Terraforming", time: "5h ago" },
  { id: 3, action: "Shared", title: "Neural Networks", time: "1d ago" },
];

function Profile() {
  return (
    <div className="profile-container scanlines">
      <Container fluid className="py-4 px-4">
        {/* Header */}
        <Card sx={{ bgcolor: '#1B2838', color: 'white', mb: 4, borderLeft: '4px solid #F7DC6F' }}>
          <CardContent className="d-flex align-items-center">
            <Avatar 
              sx={{ 
                bgcolor: '#F7DC6F', 
                color: '#1B2838', 
                width: 80, 
                height: 80, 
                fontSize: '2rem',
                mr: 3
              }}
            >
              {user.avatarText}
            </Avatar>
            <div>
              <Typography variant="h4" sx={{ fontFamily: '"Orbitron", sans-serif' }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#B8B8B8' }}>
                {user.level}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card sx={{ bgcolor: '#1B2838', color: 'white', mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ borderBottom: '1px solid #F7DC6F', pb: 1, mb: 2 }}>
              RESEARCH METRICS
            </Typography>
            <div className="d-flex justify-content-between">
              <div>
                <Typography variant="body2">XP POINTS</Typography>
                <Chip 
                  label={user.xp} 
                  sx={{ bgcolor: '#4CAF50', color: 'white', mt: 1 }} 
                />
              </div>
              <div>
                <Typography variant="body2">ARTICLES SAVED</Typography>
                <Chip 
                  label={user.savedArticles} 
                  sx={{ bgcolor: '#2196F3', color: 'white', mt: 1 }} 
                />
              </div>
              <div>
                <Typography variant="body2">MEMBER SINCE</Typography>
                <Typography variant="body1" sx={{ color: '#F7DC6F', mt: 1 }}>
                  {user.joined}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card sx={{ bgcolor: '#1B2838', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ borderBottom: '1px solid #F7DC6F', pb: 1, mb: 2 }}>
              RECENT ACTIVITY
            </Typography>
            {recentActivity.map((activity) => (
              <div key={activity.id} className="mb-3">
                <div className="d-flex justify-content-between">
                  <Typography variant="body1">
                    <span style={{ color: '#F7DC6F' }}>{activity.action}</span>: {activity.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#7F8C8D' }}>
                    {activity.time}
                  </Typography>
                </div>
                <Divider sx={{ bgcolor: '#2C3E50', mt: 1 }} />
              </div>
            ))}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;