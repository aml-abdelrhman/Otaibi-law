'use client';

import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function TeamPage() {
  const { lang, dir } = useAppStore();

  const team = [
    { 
      name_ar: 'د. خالد البدري', 
      name_en: 'Dr. Khalid Al Badri', 
      role_ar: 'المؤسس والشريك المدير', 
      role_en: 'Founder & Managing Partner', 
      bio_ar: 'حاصل على دكتوراه في القانون من جامعة هارفارد، بخبرة تتجاوز الـ 20 عاماً في القضايا التجارية الكبرى وإدارة الصفقات الدولية والتحكيم.',
      bio_en: 'PhD in Law from Harvard University, with over 20 years of experience in major commercial cases, international deal management, and arbitration.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80' 
    },
    { 
      name_ar: 'أ. سارة العتيبي', 
      name_en: 'Ms. Sarah Al Otaibi', 
      role_ar: 'محامي مستشار', 
      role_en: 'Legal Consultant', 
      bio_ar: 'متخصصة في القانون المدني والأحوال الشخصية، ساهمت في تسوية مئات النزاعات الأسرية والقانونية بكفاءة عالية وحلول ودية مبتكرة.',
      bio_en: 'Specialized in civil law and personal status, she has efficiently resolved hundreds of family and legal disputes using innovative amicable solutions.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80' 
    },
    { 
      name_ar: 'أ. محمد الهاشم', 
      name_en: 'Mr. Mohammed Al Hashem', 
      role_ar: 'رئيس قسم القضايا الجنائية', 
      role_en: 'Head of Criminal Law Dept', 
      bio_ar: 'خبير في الدفاع الجنائي والمرافعات أمام محاكم الاستئناف، يتميز برؤية قانونية ثاقبة في التعامل مع القضايا الجنائية المعقدة.',
      bio_en: 'Expert in criminal defense and appellate litigation, distinguished by a sharp legal vision in handling complex criminal cases.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80' 
    },
    { 
      name_ar: 'أ. فيصل المنصوري', 
      name_en: 'Mr. Faisal Al Mansouri', 
      role_ar: 'خبير قانون الشركات', 
      role_en: 'Corporate Law Expert', 
      bio_ar: 'متخصص في حوكمة الشركات وعمليات الاستحواذ والاندماج، يقدم استشارات استراتيجية لمجالس الإدارة في كبرى الشركات العالمية.',
      bio_en: 'Specialized in corporate governance and M&A, providing strategic advice to boards of directors in major international corporations.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80' 
    },
    { 
      name_ar: 'أ. ليال منصور', 
      name_en: 'Ms. Layal Mansour', 
      role_ar: 'مستشارة المنازعات العقارية', 
      role_en: 'Real Estate Litigation Consultant', 
      bio_ar: 'خبيرة في قوانين العقارات والملكيات، قدمت استشارات قانونية ناجحة في مشاريع تطوير عقاري ضخمة وحلولاً لنزاعات الملكية المعقدة.',
      bio_en: 'Expert in real estate and property laws, providing successful legal counsel on major development projects and solutions for complex property disputes.',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80' 
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a192f] pt-32 pb-20 text-white" style={{ direction: dir }}>
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9c7b3c] mb-4">
            {lang === 'ar' ? 'فريقنا القانوني' : 'Our Legal Team'}
          </h1>
          <p className="text-gray-400">
            {lang === 'ar' ? 'نخبة من المحامين والمستشارين المتخصصين في خدمتك' : 'A selection of expert lawyers and consultants at your service'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <div key={i} className="text-center group">
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="absolute inset-0 border-2 border-[#9c7b3c] rounded-full -m-2 group-hover:m-0 transition-all duration-300 opacity-30" />
                <img 
                  src={member.image} 
                  alt={lang === 'ar' ? member.name_ar : member.name_en}
                  className="object-cover w-full h-full transition-all duration-500 border-4 rounded-full grayscale group-hover:grayscale-0 border-white/10"
                />
              </div>
              <h3 className="mb-1 text-2xl font-bold">
                {lang === 'ar' ? member.name_ar : member.name_en}
              </h3>
              <p className="text-[#9c7b3c] font-medium mb-3">
                {lang === 'ar' ? member.role_ar : member.role_en}
              </p>
              <p className="max-w-xs mx-auto text-sm leading-relaxed text-gray-400">
                {lang === 'ar' ? member.bio_ar : member.bio_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}