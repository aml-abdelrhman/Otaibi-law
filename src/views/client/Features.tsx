import React from 'react';
import { useAppStore } from '@/store/useAppStore'; // Keep this import
import { ShieldCheck, Clock, Award, Activity, UserCheck, Scale, ThumbsUp } from 'lucide-react';
import heroImage from '@/assets/hero.png';
import lawImage from '@/assets/law.jpg';
export const Features: React.FC = () => {
  const { lang, dir } = useAppStore();

  const features = [
    { icon: <ShieldCheck />, titleAr: 'سرية وخصوصية', titleEn: 'Confidentiality', descAr: 'نلتزم بسرية معلومات عملائنا وخصوصية بياناتهم.', descEn: 'We are committed to the confidentiality of client data.' },
    { icon: <Clock />, titleAr: 'سرعة في الإنجاز', titleEn: 'Speedy Execution', descAr: 'نعمل بكفاءة عالية لتحقيق أفضل النتائج بأسرع وقت.', descEn: 'We work efficiently to achieve the best results quickly.' },
    { icon: <Award />, titleAr: 'خبرة قانونية', titleEn: 'Legal Experience', descAr: 'فريق من المحامين والمستشارين ذوي الخبرة والكفاءة العالية.', descEn: 'A team of highly experienced lawyers and consultants.' },
    { icon: <Activity />, titleAr: 'متابعة مستمرة', titleEn: 'Continuous Follow-up', descAr: 'نرافقك في كل خطوة ونبقيك على اطلاع دائم بقضيتك.', descEn: 'We accompany you every step and keep you updated.' }
  ];

  const stats = [
    { icon: <UserCheck />, number: '+500', labelAr: 'استشارة قانونية', labelEn: 'Legal Consultation' },
    { icon: <Scale />, number: '+200', labelAr: 'قضية ناجحة', labelEn: 'Successful Case' },
    { icon: <Award />, number: '+10', labelAr: 'سنوات الخبرة', labelEn: 'Years of Experience' },
    { icon: <ThumbsUp />, number: '95%', labelAr: 'رضا العملاء', labelEn: 'Client Satisfaction' }
  ];

  return (
    <section className="bg-[#030712]">
      {/* القسم الأول: العنوان والمميزات - ثابت كما هو */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover opacity-25"
          style={{ 
            backgroundImage: `url(${typeof heroImage === 'string' ? heroImage : (heroImage as any).src})` 
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030712]/95 via-[#030712]/85 to-[#030712]/95" />

        <div className="relative z-10 w-full pt-20 pb-0" style={{ direction: dir }}>
          <div className="flex justify-center mb-10">
            <div className="px-10 py-4 text-center backdrop-blur-sm rounded-2xl border-white/5">
              <h2 className="mb-2 text-xl font-semibold tracking-wide text-white md:text-4xl">
                {lang === 'ar' ? 'لماذا نحن ؟' : 'Why Choose Us?'}
              </h2>
              <div className="w-15 h-[2px] mx-auto bg-[#c5a85c]" />
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 p-10 sm:grid-cols-2 lg:grid-cols-4 bg-[#0a192f]/40 backdrop-blur-sm border-y border-white/5">
            {features.map((item, idx) => (
              <div key={idx} className="text-center group border-white/10 last:border-0 lg:border-e lg:last:border-e-0">
                <div className="flex justify-center mb-4 transition-transform text-[#9c7b3c] group-hover:scale-110">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 50 })}
                </div>
                <h4 className="mb-2 text-lg font-semibold text-white">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h4>
                <p className="px-4 text-sm leading-relaxed text-gray-400">
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* القسم الثاني: الإحصائيات (Stats) في ديف منفصل مع خلفية الصورة المطلوبة */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-25"
          style={{ 
            backgroundImage: `url(${typeof lawImage === 'string' ? lawImage : (lawImage as any).src})` 
          }}
        />
        <div className="absolute inset-0 z-0 bg-[#1a1108]/80 backdrop-blur-sm" />
        <div className="relative z-10 w-full pt-4" style={{ direction: dir }}>
          <div className="relative grid w-full grid-cols-2 p-10 lg:grid-cols-4 gap-y-10 bg-[#0a192f]/60 backdrop-blur-md border-y border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#c5a85c]/5 blur-2xl" />
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-center gap-4 px-4 border-white/10 
                  ${idx % 2 === 0 ? 'border-e' : ''} 
                  lg:border-e lg:last:border-e-0`}
              >
                <div className="text-[#9c7b3c] shrink-0 drop-shadow-[0_0_8px_rgba(156,123,60,0.2)]">
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 45 })}
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <div className="mb-0 font-mono text-2xl font-bold text-white lg:text-3xl">
                    {stat.number}
                  </div>
                  <div className="text-xs font-medium text-white whitespace-nowrap">
                    {lang === 'ar' ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};