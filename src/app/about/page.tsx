'use client';

import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Target, Award, Users, Scale, Shield, History, CheckCircle2, Briefcase, ChevronRight, Gavel, FileText, Clock, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import lawImg from '@/assets/law.jpg';

export default function AboutPage() {
  const { lang, dir } = useAppStore();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 }, // Increased amount for earlier trigger
    transition: { duration: 0.8, ease: "easeOut" } // Smoother transition
  } as const;

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { staggerChildren: 0.15, delayChildren: 0.3 } // Faster stagger, slight delay
  } as const;

  const values = {
    ar: {
      title: "الريادة في المحاماة.. التزام بالعدالة",
      story: "منذ انطلاقتنا، اتخذ مكتب البندر للمحاماة والاستشارات القانونية منهجاً يجمع بين العمق القانوني الأكاديمي والخبرة العملية الواسعة في المحاكم. نحن لا نعمل كمزودي خدمة فحسب، بل كشركاء استراتيجيين لعملائنا، نؤمن بأن التفاصيل الصغيرة هي التي تصنع الفوارق الكبرى في النتائج القضائية.",
      mission: "تمكين عملائنا من تحقيق أهدافهم من خلال تقديم استشارات قانونية دقيقة وحلول قضائية مبتكرة تلتزم بأعلى معايير النزاهة والسرية المهنية.",
      vision: "الريادة كأحد أبرز المراجع القانونية في المنطقة، والمساهمة الفعالة في تطوير الممارسة القانونية بما يتماشى مع التطورات العالمية والتشريعات المحلية.",
      philosophy: [
        { text: "الشفافية المطلقة في تقييم الموقف القانوني وتقديم المشورة الصادقة.", icon: <Scale size={18} /> },
        { text: "الابتكار في إيجاد الحلول البديلة لفض النزاعات.", icon: <Lightbulb size={18} /> },
        { text: "الالتزام الصارم بالجدول الزمني ومواعيد الجلسات.", icon: <Clock size={18} /> },
        { text: "تطوير استراتيجيات دفاع استباقية لتقليل المخاطر.", icon: <Shield size={18} /> }
      ],
      stats: [
        { icon: <History />, label: "عاماً من التميز", value: "+20" },
        { icon: <Award />, label: "نسبة النجاح", value: "98%" },
        { icon: <Briefcase />, label: "كيان تجاري شريك", value: "+120" },
        { icon: <Users />, label: "مستشار وخبير", value: "+15" },
      ],
      extraContent: {
        title: "التزامنا بالتميز القانوني المستدام",
        description: "نسعى في مكتب البندر للمحاماة إلى تقديم تجربة قانونية متكاملة تتجاوز التوقعات التقليدية، حيث نؤمن بأن المحاماة ليست مجرد مهنة بل هي رسالة سامية لإرساء قواعد العدالة. نحن ندمج الخبرة العريقة التي اكتسبناها عبر سنوات من الممارسة مع الحلول المبتكرة والذكية لضمان حصول عملائنا على أفضل تمثيل قانوني ممكن في عالم دائم التغير ومملوء بالتحديات. إننا نؤمن بأن العدالة هي الركيزة الأساسية لأي مجتمع مزدهر، ومن هنا ينبع شغفنا للدفاع عن حقوقكم بكل أمانة واحترافية مطلقة. نحن نحرص في مكتبنا على بناء علاقة وطيدة ومستدامة مع عملائنا تقوم على الثقة المتبادلة والشفافية التامة، حيث يعمل فريقنا من النخبة والمستشارين بلا كلل لدراسة كل قضية بعناية فائقة وتفصيل دقيق، مستخدمين أحدث التقنيات القانونية والبحثية لضمان أدق النتائج وأكفأ الحلول. إننا نفخر بمواكبة رؤية المملكة 2030 في تطوير القطاع العدلي، ونسهم بفاعلية في ترسيخ مبادئ الشفافية والعدالة الناجزة التي تضمن حماية الاستثمارات وحفظ حقوق الأفراد والمؤسسات على حد سواء.",
      }
    },
    en: {
      title: "Al Otaibi Law Firm: Excellence in Advocacy.. Commitment to Justice",
      story: "Since our inception, Al Bandar Law Firm has adopted an approach that merges deep academic legal knowledge with extensive practical experience in courts. We don't just act as service providers, but as strategic partners, believing that small details make the biggest difference in judicial outcomes.",
      mission: "Empowering our clients to achieve their goals by providing precise legal counsel and innovative judicial solutions committed to the highest standards of integrity and professional confidentiality.",
      vision: "To be recognized as a premier legal reference in the region, actively contributing to the development of legal practice in line with global advancements and local legislation.",
      philosophy: [
        { text: "Absolute transparency in legal situation assessment.", icon: <Scale size={18} /> },
        { text: "Innovation in finding alternative dispute resolution methods.", icon: <Lightbulb size={18} /> },
        { text: "Strict commitment to timelines and court schedules.", icon: <Clock size={18} /> },
        { text: "Developing proactive defense strategies to mitigate risks.", icon: <Shield size={18} /> }
      ],
      stats: [
        { icon: <History />, label: "Years of Excellence", value: "+20" },
        { icon: <Award />, label: "Success Rate", value: "98%" },
        { icon: <Briefcase />, label: "Corporate Partners", value: "+120" },
        { icon: <Users />, label: "Consultants & Experts", value: "+15" },
      ],
      extraContent: {
        title: "Our Commitment to Sustainable Legal Excellence",
        description: "At Al Bandar Law Firm, we strive to provide an integrated legal experience that exceeds traditional expectations, believing that the legal profession is not just a job but a noble mission to establish the rules of justice. We blend the deep-rooted expertise gained through years of practice with innovative and smart solutions to ensure our clients receive the best possible legal representation in an ever-changing world full of challenges. We believe that justice is the cornerstone of any thriving society, and this is where our passion for defending your rights with absolute integrity and professionalism stems from. We are keen on building strong, sustainable relationships with our clients based on mutual trust and total transparency. Our team of elite consultants works tirelessly to study every case with utmost care and precise detail, using the latest legal and research techniques to ensure the most accurate results and efficient solutions. We are proud to keep pace with the Kingdom's Vision 2030 in developing the judicial sector, actively contributing to consolidating the principles of transparency and swift justice that ensure the protection of investments and the preservation of the rights of both individuals and institutions alike.",
      }
    }
  };

  const t = values[lang];
  const isAr = lang === 'ar';

  return (
    <main className="min-h-screen bg-[#0a192f] text-white overflow-x-hidden" style={{ direction: dir }}>
      {/* Hero Section with Luxurious Background */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={typeof lawImg === 'string' ? lawImg : (lawImg as any).src} 
            className="object-cover object-center w-full h-full opacity-50"
            alt="Legal Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/20 via-[#0a192f]/40 to-[#0a192f]/60" />
          {/* Overlay Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#9c7b3c 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <motion.div {...fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border rounded-full border-[#9c7b3c]/30 bg-[#9c7b3c]/5 text-[#9c7b3c] text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#9c7b3c] animate-pulse" />
            {isAr ? 'نحو عدالة ناجزة' : 'Towards Swift Justice'}
          </motion.div>
          <motion.h1 {...fadeInUp} transition={{ delay: 0.2 }} className="mb-8 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            <span className="text-[#9c7b3c] block mb-4 font-serif italic text-3xl md:text-4xl opacity-90">
              {isAr ? 'العتيبي' : 'Al Otaibi'}
            </span>
            {t.title}
          </motion.h1>
        
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 px-6 pb-32 mx-auto -mt-12 max-w-7xl">
        <div className="grid items-start grid-cols-1 gap-16 lg:grid-cols-12">
          <motion.div {...fadeInUp} className="p-8 md:p-12 border shadow-2xl lg:col-span-7 bg-[#0d1f3d]/40 backdrop-blur-xl rounded-2xl border-white/5">
            <motion.h2 {...fadeInUp} className="text-2xl md:text-3xl font-bold text-[#9c7b3c] mb-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#9c7b3c]/50" />
              {isAr ? 'قصة النجاح والرسالة' : 'Success Story & Mission'}
            </motion.h2>
            <motion.p {...fadeInUp} className="mb-10 text-lg leading-[1.8] text-gray-300 font-light">
              {t.story}
            </motion.p>
            
            <motion.div {...staggerContainer} className="mt-10 space-y-8">
              <motion.div {...fadeInUp} className="flex gap-4 p-6 transition-all border border-transparent bg-white/5 rounded-2xl hover:border-white/10">
                <Target className="text-[#9c7b3c] shrink-0" size={28} />
                <div>
                  <h4 className="mb-2 font-bold text-white">{isAr ? 'رسالتنا المهنية' : 'Professional Mission'}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">{t.mission}</p>
                </div>
              </motion.div>
              <motion.div {...fadeInUp} className="flex gap-4 p-6 transition-all border border-transparent bg-white/5 rounded-2xl hover:border-white/10">
                <Shield className="text-[#9c7b3c] shrink-0" size={28} />
                <div>
                  <h4 className="mb-2 font-bold text-white">{isAr ? 'الرؤية الاستراتيجية' : 'Strategic Vision'}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">{t.vision}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div {...fadeInUp} className="mt-12">
              <h3 className={`text-xl font-bold text-white mb-6 border-[#9c7b3c] pr-4 ${isAr ? 'border-r-4' : 'border-l-4 pl-4'}`}>
                {isAr ? 'نهج العمل لدينا' : 'Our Work Methodology'}
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {t.philosophy.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 text-gray-300 transition-colors rounded-lg bg-white/5 hover:bg-white/10">
                    <span className="text-[#9c7b3c] mt-0.5">{item.icon}</span>
                    <span className="text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <div className="relative lg:col-span-5">
            <div className="absolute top-0 -left-20 w-72 h-72 bg-[#9c7b3c]/10 blur-[120px] rounded-full" />
            <motion.div {...staggerContainer} className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {t.stats.map((stat, i) => (
                <motion.div {...fadeInUp} key={i} className="flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-xl hover:border-[#9c7b3c]/30 transition-all group relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#9c7b3c]/5 rounded-tl-full translate-x-8 translate-y-8" />
                  <div className="p-4 bg-[#9c7b3c]/10 rounded-full text-[#9c7b3c]">
                    {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white group-hover:text-[#9c7b3c] transition-colors mb-1">{stat.value}</div>
                    <div className="text-[11px] tracking-[0.15em] text-gray-400 uppercase font-medium">{stat.label}</div>
                  </div>
                  
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* القسم الإضافي المضاف - النص الجديد واللوجو كخلفية متحركة */}
        <motion.div 
          {...fadeInUp} 
          className="relative mt-32 pt-24 pb-24 px-8 border-t border-white/10 overflow-hidden rounded-3xl bg-[#0d1f3d]/30 backdrop-blur-md"
        >
          {/* صورة اللوجو كخلفية متحركة */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute z-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
          >
            <img 
              src="/logo3.png" 
              alt="" 
              className="w-[500px] md:w-[800px] h-auto filter brightness-0 invert"
            />
          </motion.div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-[#9c7b3c] mb-10 font-serif"
            >
              {t.extraContent.title}
            </motion.h3>
            <p className="text-lg md:text-xl font-light leading-[2] text-gray-200">
              {t.extraContent.description}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
  