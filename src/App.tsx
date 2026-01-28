import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import OnlineCourses from './pages/OnlineCourses';
import AffordabilityCalculator from './pages/AffordabilityCalculator';
import FinancialQuestionnaire from './pages/FinancialQuestionnaire';
import Webinars from './pages/Webinars';
import AutoLogin from './pages/AutoLogin';
import PaymentFeedback from './pages/PaymentFeedback';
import Unsubscribe from './pages/Unsubscribe';
import WebinarView from './pages/WebinarView';
import WebinarDetail from './pages/WebinarDetail';
import ServiceRating from './pages/ServiceRating';
import ServiceReassign from './pages/ServiceReassign';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Routes>
            {/* Public pages */}
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

            {/* Auto-login route */}
            <Route path="/auto/code/:token" element={<AutoLogin />} />

            {/* Payment feedback route */}
            <Route path="/payment/feedback/:invoiceId" element={<PaymentFeedback />} />

            {/* Unsubscribe routes */}
            <Route path="/action/unsubscribe/:memberCode" element={<Unsubscribe />} />
            <Route path="/action/unsubscribe/:memberCode/:section" element={<Unsubscribe />} />

            {/* Webinar routes */}
            <Route path="/webinar/view/:eventId" element={<WebinarView />} />
            <Route path="/webinar/:eventId" element={<WebinarDetail />} />

            {/* Service rating route */}
            <Route path="/services/rating/:data" element={<ServiceRating />} />

            {/* Service reassign route (protected) */}
            <Route path="/services/reassign/:requestId" element={
              <ProtectedRoute>
                <ServiceReassign />
              </ProtectedRoute>
            } />

            {/* Member support redirect */}
            <Route path="/services/member-support" element={<Navigate to="/contact-us" replace />} />

            {/* Contact redirect (legacy support) */}
            <Route path="/contact" element={<Navigate to="/contact-us" replace />} />

            {/* Education webinar redirect */}
            <Route path="/education/wealth-masters-webinar" element={<Navigate to="/education" replace />} />

            {/* Legacy portal routes - redirects */}
            <Route path="/legacy/*" element={<Navigate to="/dashboard" replace />} />

            {/* Protected routes */}
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
            <Route path="/online-courses" element={
              <ProtectedRoute>
                <OnlineCourses />
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

            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
