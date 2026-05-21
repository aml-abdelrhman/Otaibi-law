'use client';

import React from 'react';
import { Cairo } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '@/index.css';

const cairoFont = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* ✅ إضافة suppressHydrationWarning هنا هي السر اللي هيمنع الـ Hydration Mismatch 
      ويحمي الـ Zustand Store من الـ Reset الصامت اللي كان بيطردك من اللوجن
    */
    <html 
      lang="ar" 
      dir="rtl" 
      className={`${cairoFont.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="antialiased bg-[#0a192f] text-white font-sans" 
        style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}