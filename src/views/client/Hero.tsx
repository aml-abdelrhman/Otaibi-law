import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#050c1b] overflow-hidden py-16" dir="rtl">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container relative z-10 px-12 mx-auto text-right md:px-20 lg:px-28">
        <div className="max-w-2xl pl-4">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            نحمي <span className="text-[#c5a85c]">حقوقك</span> <br /> 
            بخبرة قانونية رصينة
          </h1>
          <p className="mb-10 text-xl leading-relaxed text-gray-300">
            مكتب البندر للمحاماة والاستشارات القانونية، شريككم الموثوق في مواجهة التحديات القانونية وتحقيق العدالة.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#booking" className="bg-[#c5a85c] text-slate-950 px-8 py-4 rounded-md font-bold text-lg hover:bg-[#d4bd81] transition-all text-center shadow-lg shadow-[#c5a85c]/10">
              ابدأ استشارتك الآن
            </a>
            <a href="#services" className="px-8 py-4 text-lg font-bold text-center text-white transition-all border-2 rounded-md border-white/80 hover:bg-white hover:text-slate-950">
              اكتشف خدماتنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;