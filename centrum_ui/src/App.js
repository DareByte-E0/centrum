
import './App.css';
import MainLayout from './MainLayout';
import LandingPage from './screens/LandingPage';
import CustomSearch from './CustomSearch';
import SearchResults from './SearchResults';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CollapsibleNavBar from './screens/CollpasibleNabar';

function App() {
  return (
    <div className="App">
      <Router>
        <section>
          <Routes>
            <Route path='/' element={ <LandingPage /> } />
            <Route path='/room' element={ <MainLayout /> } />
            <Route path='/ser' element={ <CustomSearch /> } />
            <Route path='/result' element={ <SearchResults /> } />
            <Route path='/c' element={ <CollapsibleNavBar /> } />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
