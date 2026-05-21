import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/views/client/Services';
import { Features } from '@/views/client/Features';
import { BookingForm } from '@/views/client/BookingForm';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-[#c5a85c] selection:text-black">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;