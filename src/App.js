import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import ServiceDetailsPage from './pages/ServiceDetailsPage/ServiceDetailsPage';
import ProvidersPage from './pages/ProvidersPage/ProvidersPage';
import ProviderDetailsPage from './pages/ProviderDetailsPage/ProviderDetailsPage';
import Booking from './pages/Booking/Booking';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ProviderDashboardPage from './pages/ProviderDashboardPage/ProviderDashboardPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path='/' element={<Login />} /> */}
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/home' element={<HomePage />} /> */}
          <Route path='/services/:serviceId' element={<ServiceDetailsPage />} />
          {/* <Route path='/providers' element={<ProvidersPage />} /> */}
          <Route path='/providers/:id' element={<ProviderDetailsPage />} />
          <Route path='/booking/:id' element={<Booking />} />
          {/* <Route path='/providers/dashboard/:id' element={<ProviderDashboardPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
