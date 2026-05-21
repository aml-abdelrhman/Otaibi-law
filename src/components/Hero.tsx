'use client';

import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { ShieldCheck } from 'lucide-react';
import heroImage from '@/assets/hero.png';

export const Hero: React.FC = () => {
  const { lang, dir } = useAppStore();

  return (
    <section id="hero" className="relative min-h-screen pt-36 md:pt-24 bg-[#0a192f] flex items-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c5a85c]/5 rounded-full blur-[120px]" />
      
      <div className="z-10 grid items-center w-full grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-12" style={{ direction: dir }}>
        
        <div className={`space-y-6 lg:col-span-7 flex flex-col ${lang === 'ar' ? 'items-start text-right lg:pr-20' : 'items-start text-left lg:pl-20'}`}>
          
          <h1 className={`${lang === 'ar' ? 'text-4xl md:text-5xl lg:text-6xl font-medium' : 'text-3xl md:text-4xl lg:text-5xl font-medium'} leading-tight text-white tracking-wide max-w-xl`}>
            {lang === 'ar' ? (
              <>
                <span className="text-[#9c7b3c] drop-shadow-[0_2px_10px_rgba(156,123,60,0.15)] block">حلول قانونيــة</span>
                <span className="block mt-3 text-white">باحترافية وثقة</span>
              </>
            ) : (
              <>
                <span className="block text-white">Legal Solutions</span>
                <span className="block mt-3 text-[#9c7b3c] drop-shadow-[0_2px_10px_rgba(156,123,60,0.15)]">with Professionalism & Trust</span>
              </>
            )}
          </h1>
          
          <p className="w-full max-w-xl text-sm font-light leading-relaxed md:text-base lg:text-lg text-gray-300/90">
            {lang === 'ar' ? (
              <>
                <span className="block">تقديم خدمات قانونية متكاملة للأفراد والشركات</span>
                <span className="block pr-6 mt-1 md:pr-8">بحماية حقوقكم وتحقيق مصالحكم.</span>
              </>
            ) : 'We provide integrated legal services to individuals and corporations, protecting your rights and achieving your goals.'}
          </p>
          
          <div className="flex flex-wrap justify-start w-full gap-4 pt-4">
            <a href="#booking" className="px-8 py-3 bg-[#7e6229] hover:bg-[#9c7b3c] text-white font-semibold rounded shadow-lg shadow-[#7e6229]/10 transition-all flex items-center gap-2 cursor-pointer">
              <ShieldCheck size={18} />
              {lang === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}
            </a>
            <a 
              href="https://wa.me/966500000000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-8 py-3 text-white transition-all border border-gray-800 rounded hover:border-[#9c7b3c] bg-white/5 backdrop-blur-sm cursor-pointer font-medium"
            >
              <span className="text-[#9c7b3c]">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              {lang === 'ar' ? 'تواصل واتساب' : 'Contact via WhatsApp'}
            </a>
          </div>
          
        </div>

        <div className="relative flex justify-center lg:col-span-5">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent z-10" />
          <img 
            src={typeof heroImage === 'string' ? heroImage : (heroImage as any).src}
            alt="Law Scale" 
            className="rounded-lg object-cover h-[300px] md:h-[450px] w-full max-w-md mix-blend-lighten opacity-80"
            style={{
              maskImage: 'radial-gradient(circle, black 50%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 95%)'
            }}
          />
        </div>

      </div>
    </section>
  );
};