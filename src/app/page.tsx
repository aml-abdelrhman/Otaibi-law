'use client'; // ضيفيها عشان لو أي مكون من المكونات دي جواه أزرار أو تفاعل

import React from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/views/client/Services';
import { Features } from '@/views/client/Features';
import { BookingForm } from '@/views/client/BookingForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-[#c5a85c] selection:text-black">
      <Hero />
      <Services />
      <Features />
      <BookingForm />
    </div>
  );
}