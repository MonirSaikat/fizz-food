import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Foods from './pages/Foods';
import AuthProvider from './context/AuthContext';
import Order from './pages/Order';
import FoodsProvider from './context/FoodsProvider';
import Cart from './pages/Cart';
import PrivatePage from './pages/PrivatePage';
import PartnershipPage from './pages/PartnerShip';
import AboutUsPage from './pages/AboutUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <AuthProvider>
        <FoodsProvider>
          <Navbar />

          <div className="app_wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/foods/:id" element={<Order />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path='/partnership' element={<PartnershipPage />} />
              <Route path='/about-us' element={<AboutUsPage />} />
              <Route element={<PrivatePage />}>
                <Route path="/cart" element={<Cart />} />
              </Route>
            </Routes>
          </div>
        </FoodsProvider>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
