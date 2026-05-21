'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { Search, Phone, Calendar, Bookmark, Info } from 'lucide-react';

const trackLang = {
  ar: {
    title: 'الاستعلام عن حالة طلبك',
    subtitle: 'أدخل رقم الهاتف المستخدم أثناء تقديم الطلب لمتابعة مستجدات استشارتك.',
    placeholder: 'أدخل رقم الهاتف (مثال: 0501234567)',
    searchBtn: 'استعلام',
    searching: 'جاري البحث...',
    notFound: 'لم يتم العثور على أي طلبات مسجلة بهذا الرقم.',
    status: 'حالة الطلب الحالي:',
    pending: 'قيد الانتظار - جاري تحويل الطلب للمستشار المختص',
    review: 'في المراجعة - يقوم المستشار حالياً بدراسة طلبك القانوني',
    completed: 'مكتمل - تم الرد على طلبك، سيتواصل معك المكتب فوراً',
    type: 'نوع الاستشارة:',
    date: 'تاريخ التقديم:'
  },
  en: {
    title: 'Track Your Request Status',
    subtitle: 'Enter the phone number used during submission to follow up on your consultation.',
    placeholder: 'Enter phone number (e.g., 0501234567)',
    searchBtn: 'Track',
    searching: 'Searching...',
    notFound: 'No consultation requests found for this phone number.',
    status: 'Current Status:',
    pending: 'Pending - Your request is being assigned to a legal expert',
    review: 'In Review - The consultant is currently studying your case',
    completed: 'Completed - Your request has been reviewed, we will contact you shortly',
    type: 'Consultation Type:',
    date: 'Submission Date:'
  }
};

interface RequestResult {
  id: string;
  created_at: string;
  consultation_type: string;
  status: string;
}

export default function TrackConsultationPage() {
  const { lang, dir } = useAppStore();
  const t = trackLang[lang];

  const [phone, setPhone] = useState('');
  const [results, setResults] = useState<RequestResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setSearched(true);
    setResults(null);

    // سحب البيانات بناءً على رقم الهاتف
    const { data, error } = await supabase
      .from('consultations')
      .select('id, created_at, consultation_type, status')
      .eq('phone_number', phone.trim())
      .order('created_at', { ascending: false });

    if (!error && data) {
      setResults(data);
    }
    setLoading(false);
  };

  const getStatusText = (status: string) => {
    if (status === 'pending') return t.pending;
    if (status === 'في المراجعة' || status === 'review') return t.review;
    if (status === 'مكتمل' || status === 'completed') return t.completed;
    return status;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-20 px-4 relative overflow-hidden" style={{ direction: dir }}>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c5a85c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* رأس الصفحة */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#c5a85c] to-[#e5c97c] bg-clip-text text-transparent">{t.title}</h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed text-gray-400">{t.subtitle}</p>
        </div>

        {/* فورم البحث */}
        <form onSubmit={handleTrack} className="bg-[#080f1e]/60 backdrop-blur-xl border border-[#c5a85c]/10 rounded-xl p-6 shadow-2xl flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Phone className={`absolute text-gray-500 -translate-y-1/2 top-1/2 ${lang === 'ar' ? 'right-4' : 'left-4'}`} size={18} />
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.placeholder}
              className={`w-full bg-[#020617] border border-gray-800 rounded-lg py-3.5 text-white text-sm focus:outline-none focus:border-[#c5a85c] transition-colors ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-[#b59441] hover:bg-[#c5a85c] text-[#020617] font-bold rounded-lg text-sm transition-all shadow-lg shadow-[#b59441]/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Search size={16} />
            <span>{loading ? t.searching : t.searchBtn}</span>
          </button>
        </form>

        {/* عرض النتائج */}
        {searched && !loading && (
          <div className="space-y-4">
            {results && results.length > 0 ? (
              results.map((req) => (
                <div key={req.id} className="bg-[#0b1329]/40 backdrop-blur-md border border-[#c5a85c]/5 rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                    <span className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(req.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </span>
                    <span className="text-xs font-semibold text-[#e5c97c] bg-[#c5a85c]/10 px-3 py-1 rounded-full border border-[#c5a85c]/10 flex items-center gap-1.5">
                      {req.consultation_type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center gap-1 text-xs font-medium text-gray-400">
                      <Info size={14} className="text-[#c5a85c]" />
                      {t.status}
                    </p>
                    <p className={`text-sm font-semibold ${req.status === 'مكتمل' || req.status === 'completed' ? 'text-emerald-400' : req.status === 'في المراجعة' || req.status === 'review' ? 'text-blue-400' : 'text-amber-400'}`}>
                      {getStatusText(req.status)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-center border rounded-lg text-red-400/80 bg-red-500/5 border-red-500/10">{t.notFound}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}