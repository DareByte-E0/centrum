import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import './newsfeed.css';

// ========== CONSTANTS ==========
const AD_DATA = {
  title: "NEUROLINK UPGRADE",
  excerpt: "Get 20% off brain-cloud sync. Limited time.",
  source: "Advertiser",
  isAd: true,
  category: "Sponsored"
};

const TRENDING_TOPICS = [
  "Neural Interfaces 2030",
  "Mars Colony Funding",
  "DARPA's New AI",
  "Quantum Internet",
  "Biohacking Trends"
];

// ========== UTILITIES ==========
const injectAds = (data, frequency = 3) => {
  return data.reduce((acc, item, index) => {
    acc.push(item);
    if ((index + 1) % frequency === 0) {
      acc.push({ ...AD_DATA, id: `ad-${Math.random().toString(36).substr(2, 9)}` });
    }
    return acc;
  }, []);
};

// ========== COMPONENT ==========
const NewsFeed = () => {
  // Mock data - replace with API fetch later
  const newsData = [
    {
      id: 1,
      title: "Quantum Computing Breakthrough",
      excerpt: "Researchers achieve 99% qubit stability in room-temperature environments.",
      source: "Neural Frontiers",
      isAd: false,
      category: "Science"
    },
    {
      id: 2,
      title: "SPONSORED: Augmented Reality Glasses v5.0",
      excerpt: "See the future today with 200° FOV and neural integration.",
      source: "CyberOptics Inc.",
      isAd: true,
      category: "Tech"
    },
    // Add more sample data...
    {
      id: 3,
      title: "Mars Colony Construction Begins",
      excerpt: "Elon Musk announces Phase 1 of permanent Martian habitat.",
      source: "Space Daily",
      isAd: false,
      category: "Space"
    },
    {
      id: 4,
      title: "Breakthrough in Fusion Energy",
      excerpt: "Scientists achieve net energy gain for 24 consecutive hours.",
      source: "Energy Tomorrow",
      isAd: false,
      category: "Science"
    }
  ];

  const combinedData = injectAds(newsData);

  return (
    <div className="scanlines">
      <Container fluid className="mt-4 px-4">
        {/* Cyberpunk Header */}
        <Row className="mb-4">
          <Col>
            <div style={{
              background: 'linear-gradient(90deg, #1B2838 0%, #2C3E50 100%)',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid #F7DC6F'
            }}>
              <Typography 
                variant="h4" 
                sx={{
                  fontFamily: '"Orbitron", sans-serif',
                  color: '#F7DC6F',
                  textAlign: 'center',
                  textShadow: '0 0 8px rgba(247, 220, 111, 0.7)'
                }}
              >
                <Typewriter
                  options={{
                    strings: [
                      'PROFESSOR NEWS NETWORK', 
                      'SYSTEMS ONLINE', 
                      'YOUR FUTURE STARTS HERE'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    deleteSpeed: 40,
                  }}
                />
              </Typography>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Main Feed Column */}
          <Col md={8}>
            {combinedData.map((item) => (
              <Card 
                key={item.id}
                sx={{
                  bgcolor: '#1B2838',
                  color: 'white',
                  mb: 3,
                  borderLeft: item.isAd 
                    ? '4px solid #F7DC6F' 
                    : '4px solid #4CAF50',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: item.isAd
                      ? '0 5px 15px rgba(247, 220, 111, 0.5)'
                      : '0 5px 15px rgba(76, 175, 80, 0.3)'
                  }
                }}
              >
                <CardContent>
                  {item.isAd && (
                    <Chip
                      label="SPONSORED CONTENT"
                      size="small"
                      sx={{
                        bgcolor: '#F7DC6F',
                        color: '#1B2838',
                        mb: 1,
                        fontFamily: '"Orbitron", sans-serif',
                        fontSize: '0.7rem'
                      }}
                    />
                  )}
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      fontFamily: '"Rajdhani", sans-serif',
                      mb: 1
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#B8B8B8', 
                      fontFamily: '"Rajdhani", sans-serif',
                      mb: 2
                    }}
                  >
                    {item.excerpt}
                  </Typography>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        bgcolor: '#2C3E50',
                        color: 'white',
                        fontFamily: '"Rajdhani", sans-serif'
                      }}
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#7F8C8D',
                        fontFamily: '"Rajdhani", sans-serif'
                      }}
                    >
                      {item.source}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Col>

          {/* Sidebar Column */}
          <Col md={4}>
            {/* Trending Section */}
            <Card sx={{
              bgcolor: '#1B2838',
              color: 'white',
              mb: 3,
              border: '1px solid #2C3E50'
            }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Orbitron", sans-serif',
                    color: '#F7DC6F',
                    borderBottom: '1px solid #F7DC6F',
                    pb: 1,
                    mb: 2
                  }}
                >
                  TRENDING NETWORKS
                </Typography>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  fontFamily: '"Rajdhani", sans-serif'
                }}>
                  {TRENDING_TOPICS.map((topic, index) => (
                    <li 
                      key={index}
                      style={{
                        padding: '8px 0',
                        borderBottom: '1px solid #2C3E50',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#F7DC6F',
                        borderRadius: '50%',
                        marginRight: '10px'
                      }}></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Sticky Ad */}
            <Card sx={{
              bgcolor: '#2C3E50',
              color: 'white',
              position: 'sticky',
              top: '20px',
              border: '2px dashed #F7DC6F',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 0 20px rgba(247, 220, 111, 0.4)'
              }
            }}>
              <CardContent>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Orbitron", sans-serif',
                    color: '#F7DC6F',
                    display: 'block',
                    mb: 1
                  }}
                >
                  PREMIUM PARTNER
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  Cybernetic Implants v3.2
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Rajdhani", sans-serif',
                    color: '#B8B8B8',
                    mt: 1,
                    mb: 2
                  }}
                >
                  "Upgrade your biological limits today"
                </Typography>
                <div style={{
                  background: 'rgba(247, 220, 111, 0.2)',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '1px solid #F7DC6F'
                }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: '"Orbitron", sans-serif',
                      color: '#F7DC6F'
                    }}
                  >
                    LIMITED TIME OFFER
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsFeed;