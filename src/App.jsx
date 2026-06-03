import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import global elements
import Preloader from './components/Preloader';
import CursorGlow from './components/CursorGlow';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

// Import page views
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TechStack from './pages/TechStack';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import CompanyProfile from './pages/CompanyProfile';
import Corporate from './pages/Corporate';
import FreeConsultation from './pages/FreeConsultation';
import Faqs from './pages/Faqs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ServiceDetail from './pages/ServiceDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      {/* Premium UX enhancements */}
      <Preloader />
      <CursorGlow />
      
      {/* Navigation Header */}
      <Header />
      
      {/* Route Views */}
      <main>
        <Routes>
          {/* Modern Clean Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/technology-stack" element={<TechStack />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/free-consultation" element={<FreeConsultation />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Legacy Backward Compatibility Routes (with .html extension support) */}
          <Route path="/index.html" element={<Home />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/services.html" element={<Services />} />
          <Route path="/technology-stack.html" element={<TechStack />} />
          <Route path="/portfolio.html" element={<Portfolio />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/company-profile.html" element={<CompanyProfile />} />
          <Route path="/corporate.html" element={<Corporate />} />
          <Route path="/free-consultation.html" element={<FreeConsultation />} />
          <Route path="/faqs.html" element={<Faqs />} />
          <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions.html" element={<TermsConditions />} />
          
          {/* Dynamic Legacy Service Injections mapping (e.g., service-business-website.html) */}
          <Route path="/service-:slug.html" element={<ServiceDetail />} />

          {/* Dynamic Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating Chat Widget */}
      <WhatsAppWidget />

      {/* Global Footer */}
      <Footer />
    </Router>
  );
};

export default App;
