'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import lawImg from '@/assets/law.jpg';

export default function BlogPostPage() {
  const { lang, dir } = useAppStore();
  const params = useParams();
  const isAr = lang === 'ar';

  // بيانات تجريبية تحاكي جلب البيانات من السيرفر بناءً على الـ ID
  const post = {
    id: params.id,
    title: isAr ? "تعديلات نظام العمل الجديد 2024" : "New Labor Law Amendments 2024",
    date: "2024-05-15",
    author: isAr ? "د. محمد العتيبي" : "Dr. Mohammed Al Otaibi",
    category: isAr ? "أنظمة العمل" : "Labor Law",
    readTime: isAr ? "5 دقائق للقراءة" : "5 min read",
    content: isAr ? `
      نظام العمل السعودي الجديد يمثل نقلة نوعية في تنظيم العلاقة التعاقدية بين العامل وصاحب العمل. 
      يهدف النظام إلى تعزيز جاذبية سوق العمل ورفع كفاءة الإنتاجية من خلال بنود واضحة تضمن حقوق الطرفين، مما يساهم في تحقيق مستهدفات رؤية المملكة 2030 في خلق بيئة عمل تنافسية وعادلة.
      
      أبرز ملامح التعديلات تشمل تنظيم ساعات العمل الإضافية، وتطوير آليات فض النزاعات العمالية، 
      بالإضافة إلى تعزيز بيئة العمل الآمنة والمحفزة للكوادر الوطنية.

      كما ركزت التعديلات الأخيرة على دعم التوازن بين الحياة المهنية والشخصية، وزيادة مرونة أنماط العمل لتشمل العمل عن بُعد والعمل المرن، وهو ما يعكس استجابة المشرع السعودي للمتغيرات العالمية في أسواق العمل الحديثة.
    ` : `
      The new Saudi Labor Law represents a qualitative shift in regulating the contractual relationship between workers and employers. 
      The system aims to enhance the attractiveness of the labor market and increase productivity through clear clauses that guarantee the rights of both parties.

      The updates contribute significantly to the Saudi Vision 2030 goals by fostering a competitive and fair work environment. 
      
      Key highlights include regulating overtime hours, developing dispute resolution mechanisms, and enhancing a safe and stimulating environment for the national workforce.
    `
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  } as const;

  return (
    <main className="min-h-screen bg-[#0a192f] text-white overflow-x-hidden" style={{ direction: dir }}>
      {/* Hero Section - Article Header */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src={typeof lawImg === 'string' ? lawImg : (lawImg as any).src} 
            className="object-cover object-center w-full h-full opacity-30"
            alt="Legal Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/40 via-[#0a192f]/80 to-[#0a192f]" />
        </div>
        
        <div className="relative z-10 max-w-5xl px-6 mx-auto">
          <motion.div {...fadeInUp} className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm font-medium uppercase tracking-wider text-[#9c7b3c]">
            <span className="px-4 py-1.5 border border-[#9c7b3c]/30 bg-[#9c7b3c]/10 rounded-full backdrop-blur-md">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              {post.readTime}
            </div>
          </motion.div>

          <motion.h1 
            {...fadeInUp} 
            transition={{ delay: 0.2 }}
            className="mb-8 text-3xl font-medium leading-tight text-center text-white md:text-5xl lg:text-6xl"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 py-6 border-y border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9c7b3c]/20 flex items-center justify-center text-[#9c7b3c]">
                <User size={20} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{isAr ? 'الكاتب' : 'Author'}</p>
                <p className="text-sm font-semibold">{post.author}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9c7b3c]/20 flex items-center justify-center text-[#9c7b3c]">
                <Calendar size={20} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{isAr ? 'تاريخ النشر' : 'Published'}</p>
                <p className="text-sm font-semibold">{post.date}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-20 max-w-4xl px-6 pb-32 mx-auto -mt-10">
        <motion.div 
          {...fadeInUp}
          className="p-8 md:p-16 bg-[#0d1f3d]/60 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl"
        >
          {/* Article Navigation Header */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              href="/blog" 
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#9c7b3c] transition-colors"
            >
              {isAr ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>

          {/* Content Body */}
          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-xl leading-[2] text-gray-300 font-light whitespace-pre-line">
              {post.content}
            </p>
            
            <h3 className="text-2xl font-bold text-[#9c7b3c] mt-12 mb-6">
              {isAr ? 'أهم التغييرات الجوهرية' : 'Key Fundamental Changes'}
            </h3>
            <ul className="space-y-4 text-lg leading-[1.8] text-gray-400 font-light list-none">
              <li className="flex gap-3">
                <span className="text-[#9c7b3c]">•</span>
                {isAr ? 'تعديل ضوابط عقود العمل محددة المدة لضمان استقرار وظيفي أكبر.' : 'Amending regulations for fixed-term contracts to ensure greater job stability.'}
              </li>
              <li className="flex gap-3">
                <span className="text-[#9c7b3c]">•</span>
                {isAr ? 'توسيع نطاق الإجازات الدراسية وإجازات الأمومة والأبوة.' : 'Expanding educational, maternity, and paternity leave benefits.'}
              </li>
              <li className="flex gap-3">
                <span className="text-[#9c7b3c]">•</span>
                {isAr ? 'تغليظ العقوبات على المنشآت المخالفة لمعايير السلامة والصحة المهنية.' : 'Stricter penalties for non-compliance with occupational safety and health standards.'}
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#9c7b3c] mt-12 mb-6">
              {isAr ? 'الخلاصة' : 'Conclusion'}
            </h3>
            <p className="text-lg leading-[1.8] text-gray-400 font-light italic border-r-2 border-[#9c7b3c]/30 pr-6">
              {isAr 
                ? 'إن فهم هذه التعديلات ليس مجرد ترف معرفي، بل ضرورة قانونية لكل صاحب عمل وموظف لتجنب النزاعات المستقبلية وضمان سير العمل وفق الأطر النظامية الصحيحة.' 
                : 'Understanding these amendments is not just a luxury, but a legal necessity for every employer and employee to avoid future disputes and ensure operations run within correct regulatory frameworks.'}
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-[#9c7b3c]/10 to-transparent border border-[#9c7b3c]/20 text-center">
            <h4 className="mb-4 text-xl font-bold">{isAr ? 'هل لديك استفسار قانوني؟' : 'Have a Legal Inquiry?'}</h4>
            <p className="max-w-md mx-auto mb-8 text-gray-400">
              {isAr ? 'نحن هنا لمساعدتك في فهم كافة الجوانب القانونية المتعلقة بموضوعك.' : 'We are here to help you understand all legal aspects related to your matter.'}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-[#9c7b3c] hover:bg-[#8a6d35] text-white font-bold rounded-xl transition-all">
              {isAr ? 'احجز استشارة الآن' : 'Book a Consultation Now'}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}