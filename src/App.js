import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import ServiceDetailsPage from './pages/ServiceDetailsPage/ServiceDetailsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/services' element={<HomePage />} />
          <Route path='/services/:serviceId' element = {<ServiceDetailsPage /> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
