import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/Landing';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import Membership from './pages/Membership';
import Events from './pages/Events';
import ContactUs from './pages/ContactUs';
import Testimonials from './pages/Testimonials';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InvoiceTransactions from './pages/InvoiceTransactions';
import Referrals from './pages/Referrals';
import ClubUnits from './pages/ClubUnits';
import Settings from './pages/Settings';
import Education from './pages/Education';
import AffordabilityCalculator from './pages/AffordabilityCalculator';
import FinancialQuestionnaire from './pages/FinancialQuestionnaire';
import Webinars from './pages/Webinars';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/invoices" element={
              <ProtectedRoute>
                <InvoiceTransactions />
              </ProtectedRoute>
            } />
            <Route path="/referrals" element={
              <ProtectedRoute>
                <Referrals />
              </ProtectedRoute>
            } />
            <Route path="/club-units" element={
              <ProtectedRoute>
                <ClubUnits />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/education" element={
              <ProtectedRoute>
                <Education />
              </ProtectedRoute>
            } />
            <Route path="/affordability-calculator" element={
              <ProtectedRoute>
                <AffordabilityCalculator />
              </ProtectedRoute>
            } />
            <Route path="/financial-questionnaire" element={
              <ProtectedRoute>
                <FinancialQuestionnaire />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
