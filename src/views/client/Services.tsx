'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Scale } from 'lucide-react';



export const Services: React.FC = () => {

  const { lang, dir } = useAppStore();



  const servicesData = [

    {

      icon: <Scale className="w-10 h-10" strokeWidth={2.5} />,
      titleAr: 'التنفيذ',
      titleEn: 'Execution',
      descAr: 'متابعة وتنفيذ الأحكام والقرارات واستيفاء الحقوق.',
      descEn: 'Follow up and execution of judgments and decisions.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      titleAr: 'القضايا التجارية',
      titleEn: 'Commercial Cases',
      descAr: 'حل النزاعات التجارية وحماية الشركات في جميع أعمالها.',
      descEn: 'Resolving commercial disputes and protecting companies.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4M12 16v2" />
        </svg>
      ),
      titleAr: 'القضايا الجنائية',
      titleEn: 'Criminal Cases',
      descAr: 'الدفاع عن حقوق المتهمين في جميع مراحل الدعوى الجنائية.',
      descEn: 'Defending the rights of the accused in criminal proceedings.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M2 22h20M3 17h2M19 17h2M6 17v-5M10 17v-5M14 17v-5M18 17v-5M10 3l8 4H2l8-4zM2 7h16" />
        </svg>
      ),
      titleAr: 'القضايا الإدارية',
      titleEn: 'Administrative Cases',
      descAr: 'تمثيل العملاء أمام الجهات الإدارية والطعن بالقرارات.',
      descEn: 'Representing clients before administrative bodies.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      titleAr: 'صياغة العقود',
      titleEn: 'Contract Drafting',
      descAr: 'صياغة ومراجعة العقود والاتفاقيات باحترافية عالية.',
      descEn: 'Drafting and reviewing contracts with high professionalism.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      titleAr: 'الاستشارات القانونية',
      titleEn: 'Legal Consultations',
      descAr: 'استشارات قانونية دقيقة لحماية تعاملاتكم واتخاذ القرار المناسب.',
      descEn: 'Accurate legal advice to protect your transactions.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#061022] border-t border-[#9c7b3c]/10">
      <div className="px-6 mx-auto max-w-7xl" style={{ direction: dir }}>
        
        <div className="text-center mb-14">
          <h2 className={`mb-3 ${lang === 'ar' ? 'text-3xl md:text-4xl font-medium' : 'text-2xl md:text-3xl font-medium'} text-white tracking-wide`}>
            {lang === 'ar' ? 'خدماتنا القانونية' : 'Our Legal Services'}
          </h2>
          <div className="w-16 h-[1px] mx-auto bg-[#9c7b3c]/60" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="bg-[#0a192f]/40 border border-gray-800/60 hover:border-[#9c7b3c]/30 p-5 rounded text-center group transition-all duration-300 flex flex-col items-center justify-start h-full"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-5 transition-colors duration-300 text-[#7e6229] group-hover:text-[#9c7b3c]">
                {service.icon}
              </div>
              
              <h3 className={`mb-2 ${lang === 'ar' ? 'text-base font-medium' : 'text-sm font-medium'} text-white group-hover:text-[#9c7b3c] transition-colors duration-300`}>
                {lang === 'ar' ? service.titleAr : service.titleEn}
              </h3>
              
              <p className={`${lang === 'ar' ? 'text-[11px] font-light' : 'text-[10px] font-light'} leading-relaxed text-gray-400/80`}>
                {lang === 'ar' ? service.descAr : service.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};