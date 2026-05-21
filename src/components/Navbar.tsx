'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '../store/useAppStore';
import { Phone, Globe, Menu, X, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const store = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lang = mounted ? store.lang : 'ar';
  const dir = mounted ? store.dir : 'rtl';

  const menuItems = {
    ar: [
      { name: 'الرئيسية', id: 'hero' },
      { name: 'عن المكتب', id: 'about' },
      { name: 'المدونة', id: 'blog' },
      { name: 'فريق العمل', id: 'team' },
      { name: 'الخدمات', id: 'services' },
      { name: 'تواصل معنا', id: 'booking' }
    ],
    en: [
      { name: 'Home', id: 'hero' },
      { name: 'About Us', id: 'about' },
      { name: 'Blog', id: 'blog' },
      { name: 'Our Team', id: 'team' },
      { name: 'Services', id: 'services' },
      { name: 'Contact Us', id: 'booking' }
    ]
  };

  return (
    <nav className="w-full bg-[#0a192f]/95 backdrop-blur-md fixed top-0 z-50 transition-all duration-300 border-b border-[#c5a85c]/10">
      <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-7xl" style={{ direction: dir }}>
        
        <Link href="/" className="relative z-0 flex items-center h-full transform translate-y-1 shrink-0 ms-4 md:ms-10 lg:ms-12 me-12">
          <img 
            src="/logo3.png" 
            alt="Al Otaibi Law Logo" 
            className="object-contain w-auto h-12 md:h-20 lg:h-24 drop-shadow-[0_0_15px_rgba(197,168,92,0.1)] transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(197,168,92,0.3)]"
          />
        </Link>

        <div className="items-center hidden gap-8 md:flex">
          {menuItems[lang].map((item, index) => (
            <Link 
              key={index} 
              href={item.id === 'hero' ? '/' : (['services', 'booking'].includes(item.id) ? `/#${item.id}` : `/${item.id}`)} 
              className={`${lang === 'ar' ? 'text-sm' : 'text-[13px]'} hover:text-[#c5a85c] transition-colors ${
                (item.id === 'hero' ? pathname === '/' : pathname === `/${item.id}`)
                  ? 'text-[#c5a85c] font-semibold'
                  : 'text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/admin/consultations/track" 
            className="hidden lg:flex px-6 py-2.5 bg-transparent hover:bg-[#c5a85c]/5 text-[#c5a85c] font-semibold border border-[#c5a85c]/30 rounded-lg text-xs transition-all whitespace-nowrap"
          >
            {lang === 'ar' ? 'تتبع حالة طلب سابق' : 'Track Previous Request'}
          </Link>
          
          <button 
            suppressHydrationWarning
            onClick={store.toggleLanguage} 
            className="flex items-center gap-1 text-xs border border-[#c5a85c]/30 text-[#c5a85c] px-3 py-1.5 rounded bg-[#c5a85c]/5 hover:bg-[#c5a85c]/10 transition-all cursor-pointer"
          >
            <Globe size={14} />
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>

          <Link 
            href="/auth/login" 
            className="p-2 text-gray-400 hover:text-[#c5a85c] transition-colors rounded-lg hover:bg-white/5"
            title="لوحة التحكم"
          >
            <Lock size={16} />
          </Link>

          <button 
            suppressHydrationWarning
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-gray-300 transition-colors md:hidden hover:text-[#c5a85c]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div 
        className={`fixed top-20 left-0 w-full bg-[#030712] transition-all duration-300 ease-in-out md:hidden border-t border-gray-800/50 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
        style={{ direction: dir }}
      >
        <div className="flex flex-col gap-5 px-6 py-6">
          {menuItems[lang].map((item, index) => (
            <Link 
              key={index} 
              href={item.id === 'hero' ? '/' : (['services', 'booking'].includes(item.id) ? `/#${item.id}` : `/${item.id}`)} 
              onClick={() => setIsOpen(false)}
              className={`text-base transition-colors pb-2 border-b border-gray-800/50 ${
                (item.id === 'hero' ? pathname === '/' : pathname === `/${item.id}`)
                  ? 'text-[#c5a85c] font-semibold'
                  : 'text-gray-300 hover:text-[#c5a85c]'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <Link 
            href="/admin/consultations/track" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full px-8 py-3.5 bg-transparent hover:bg-[#c5a85c]/5 text-[#c5a85c] font-semibold border border-[#c5a85c]/30 rounded-lg text-sm transition-all lg:hidden"
          >
            {lang === 'ar' ? 'تتبع حالة طلب سابق' : 'Track Previous Request'}
          </Link>
        </div>
      </div>
    </nav>
  );
};