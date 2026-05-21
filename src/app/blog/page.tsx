'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight, ArrowLeft, Clock, MessageSquare } from 'lucide-react';
import lawImg from '@/assets/law.jpg';

export default function BlogPage() {
  const { lang, dir } = useAppStore();
  const isAr = lang === 'ar';

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" }
  } as const;

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.1 },
    transition: { staggerChildren: 0.2 }
  } as const;

  const blogPosts = [
    {
      id: 1,
      title: isAr ? "تعديلات نظام العمل الجديد 2024" : "New Labor Law Amendments 2024",
      excerpt: isAr ? "نظرة شاملة على أهم التغييرات في نظام العمل السعودي وكيف تؤثر على المنشآت..." : "A comprehensive look at the key changes in the Saudi Labor Law and their impact on enterprises...",
      date: "2024-05-15",
      author: isAr ? "د. محمد العتيبي" : "Dr. Mohammed Al Otaibi",
      category: isAr ? "أنظمة العمل" : "Labor Law"
    },
    {
      id: 2,
      title: isAr ? "دليل تأسيس الشركات الأجنبية" : "Guide to Setting Up Foreign Companies",
      excerpt: isAr ? "خطوات وإجراءات الحصول على التراخيص الاستثمارية من وزارة الاستثمار..." : "Steps and procedures for obtaining investment licenses from the Ministry of Investment...",
      date: "2024-05-10",
      author: isAr ? "أ. سارة الأحمد" : "Sarah Al Ahmad",
      category: isAr ? "قانون تجاري" : "Commercial Law"
    },
    {
      id: 3,
      title: isAr ? "حماية الملكية الفكرية في العصر الرقمي" : "IP Protection in the Digital Age",
      excerpt: isAr ? "كيف تحمي علامتك التجارية وبراءات الاختراع من الانتهاكات الإلكترونية..." : "How to protect your brand and patents from electronic infringements...",
      date: "2024-05-05",
      author: isAr ? "أ. فهد المنصور" : "Fahad Al Mansour",
      category: isAr ? "ملكية فكرية" : "Intellectual Property"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a192f] text-white overflow-x-hidden" style={{ direction: dir }}>
      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[450px] flex items-center justify-center pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src={typeof lawImg === 'string' ? lawImg : (lawImg as any).src} 
            className="object-cover object-center w-full h-full opacity-40"
            alt="Legal Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/40 via-[#0a192f]/60 to-[#0a192f]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#9c7b3c 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <motion.div {...fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border rounded-full border-[#9c7b3c]/30 bg-[#9c7b3c]/5 text-[#9c7b3c] text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#9c7b3c] animate-pulse" />
            {isAr ? 'المعرفة القانونية' : 'Legal Knowledge'}
          </motion.div>
          <motion.h1 {...fadeInUp} transition={{ delay: 0.2 }} className="mb-4 text-4xl font-medium leading-tight text-white md:text-6xl lg:text-7xl">
            <span className="text-[#9c7b3c] block mb-2 font-serif italic font-semibold text-2xl md:text-4xl opacity-90 tracking-widest relative inline-block">
              <span className="relative z-10">{isAr ? 'العتيبي' : 'Al Otaibi'}</span>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#9c7b3c]/50 to-transparent" />
            </span>
            <span className="block mt-2 font-bold">{isAr ? 'المدونة القانونية والبحوث المتخصصة' : 'Legal Blog & Specialized Research'}</span>
          </motion.h1>
         
        </div>
      </div>

      {/* Blog Feed Section */}
      <div className="relative z-20 px-6 pb-32 mx-auto mt-4 max-w-7xl">
        <motion.div {...staggerContainer} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.article key={post.id} {...fadeInUp} className="group bg-[#0d1f3d]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-[#9c7b3c]/30 transition-all duration-500 shadow-xl">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-xs font-medium uppercase tracking-wider text-[#9c7b3c]">
                  <span className="px-3 py-1 bg-[#9c7b3c]/10 rounded-full">{post.category}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-[#9c7b3c] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mb-6 text-sm font-light leading-relaxed text-gray-400 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Calendar size={14} className="text-[#9c7b3c]" />
                    <span>{post.date}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="flex items-center gap-2 text-sm font-semibold text-[#9c7b3c] hover:gap-3 transition-all"
                  >
                    {isAr ? 'اقرأ المزيد' : 'Read More'}
                    {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
