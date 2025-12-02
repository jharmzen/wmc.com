import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import Membership from './pages/Membership';
import Events from './pages/Events';
import ContactUs from './pages/ContactUs';
import Testimonials from './pages/Testimonials';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
