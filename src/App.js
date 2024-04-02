import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import ServiceDetailsPage from './pages/ServiceDetailsPage/ServiceDetailsPage';
import ProviderDetailsPage from './pages/ProviderDetailsPage/ProviderDetailsPage';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/services/:serviceId' element={<ServiceDetailsPage />} />
          <Route path='/providers/:id' element={<ProviderDetailsPage />} />
          <Route path='/booking/:id' element={<Booking />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
