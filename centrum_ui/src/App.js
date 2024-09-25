import React, { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
import InstallPrompt from './install';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout';
import LoadingIndicator from './screens/Loaders/loadingbar';
import LoadingScreen from './screens/Loaders/LoadingScreen';


const LandingPage = lazy(() => import('./screens/HomePage/LandingPage'));
const SearchResults = lazy(() => import('./screens/GoogleResultPage/SearchResults'));
const UploadPage = lazy(() => import('./screens/UploadPage/UploadPage'));
const LandingFeed = lazy(() => import('./screens/FeedPage/LandingFeed'));
const MainLayout = lazy(() => import('./screens/StudyPage/MainLayout'));
const UserProfile = lazy(() => import('./screens/UserProfile/UserProfile'));

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  const user = {
    name: 'John Doe',
    bio: 'Lover of coffee and technology and what ever like brings, like beacon.',
    followers: 150,
    following: 200,
    profilePicture: '', 
  };

  return (
    <div className="App">
      <InstallPrompt />
      <LoadingIndicator loading={loading} />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path='/' element={<Layout><LandingPage /></Layout>} />
          <Route path='/feed' element={<Layout><LandingFeed /></Layout>} />
          <Route path='/upload' element={<Layout><UploadPage /></Layout>} />
          <Route path='/result' element={<Layout ><SearchResults /></Layout>} />
          <Route path='/study' element={<Layout showHeader={false}><MainLayout /></Layout>} />
          <Route path='/profile' element={<Layout ><UserProfile user={user}/></Layout>} />

        </Routes>
      </Suspense>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
