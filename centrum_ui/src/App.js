
import './App.css';
import LandingPage from './screens/HomePage/LandingPage';
import SearchResults from './screens/GoogleResultPage/SearchResults';
import UploadPage from './screens/UploadPage/UploadPage';
import LandingFeed from './screens/FeedPage/LandingFeed';
import MainLayout from './screens/StudyPage/MainLayout'
import InstallPrompt from './install';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <InstallPrompt />
      <Router>
        <section>
          <Routes>
            <Route path='/' element={ <LandingPage /> } />
            <Route path='/feed' element={ <LandingFeed /> } />
            <Route path='/upload' element={ <UploadPage /> } />
            <Route path='/result' element={ <SearchResults /> } />
            <Route path='/study' element={ <MainLayout /> } />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
