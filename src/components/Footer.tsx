'use client';

import React from 'react';
import { useAppStore } from '../store/useAppStore';

export const Footer: React.FC = () => {
  const { lang, dir } = useAppStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071121] border-t border-[#c5a85c]/10 py-5">
      <div className="flex flex-col items-center justify-between gap-4 px-6 mx-auto max-w-7xl md:flex-row" style={{ direction: dir }}>
        
        {/* روابط السياسات - أصبحت في البداية */}
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#privacy" className="transition-colors hover:text-[#c5a85c]">
            {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </a>
          <a href="#terms" className="transition-colors hover:text-[#c5a85c]">
            {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </a>
        </div>
        
        {/* اللوجو المصغر والحقوق */}
        <div className="flex items-center gap-3 text-center md:text-initial">
          <span className="text-sm text-gray-500">
            {lang === 'ar' 
              ? `جميع الحقوق محفوظة © ${currentYear} العتيبي للمحاماة والاستشارات القانونية.` 
              : `All Rights Reserved © ${currentYear} Al Otaibi Law Firm.`}
          </span>
        </div>

        {/* شعار المكتب المصغر */}
        <div className="shrink-0">
          <img 
            src="/logo3.png" 
            alt="Law Firm Logo" 
            className="w-auto h-20 transition-all duration-300 hover:scale-105" 
          />
        </div>
      </div>
    </footer>
  );
};