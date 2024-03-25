import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import ServiceDetailsPage from './pages/ServiceDetailsPage/ServiceDetailsPage';
import ProvidersPage from './pages/ProvidersPage/ProvidersPage';
import ProviderDetailsPage from './pages/ProviderDetailsPage/ProviderDetailsPage';
import Booking from './pages/Booking/Booking';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/services' element={<HomePage />} />
          <Route path='/services/:serviceId' element = {<ServiceDetailsPage /> } />
          {/* <Route path='/providers' element={<ProvidersPage />} /> */}
          <Route path='/providers/:id' element={<ProviderDetailsPage />} />
          <Route path='/booking/:id' element={<Booking/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
