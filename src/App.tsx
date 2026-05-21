import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/views/client/Services';
import { Features } from '@/views/client/Features';
import { BookingForm } from '@/views/client/BookingForm';
import { Footer } from '@/components/Footer';
import Login from '@/views/auth/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white selection:bg-[#c5a85c] selection:text-black">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Services />
              <Features />
              <BookingForm />
              <Footer />
            </>
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;