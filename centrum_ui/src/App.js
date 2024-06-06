
import './App.css';
import MainLayout from './MainLayout';
import LandingPage from './screens/LandingPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <section>
          <Routes>
            <Route path='/' element={ <LandingPage /> } />
            <Route path='/room' element={ <MainLayout /> } />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
