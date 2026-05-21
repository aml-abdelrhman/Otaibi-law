'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { Calendar, User, Phone, Eye, MessageSquare, Inbox } from 'lucide-react';

const tableLang = {
  ar: {
    heading: 'جدول طلبات الاستشارات',
    subheading: 'متابعة الطلبات القانونية الواردة والتحكم بحالاتها وتفاصيلها.',
    all: 'الكل',
    pending: 'قيد الانتظار',
    review: 'في المراجعة',
    completed: 'مكتمل',
    client: 'العميل',
    type: 'نوع الاستشارة',
    date: 'تاريخ التقديم',
    status: 'الحالة',
    actions: 'الإجراءات',
    view: 'عرض التفاصيل',
    noData: 'لا توجد طلبات استشارة حالياً.',
    checkingAuth: 'جاري التحقق من صلاحيات الأدمن...'
  },
  en: {
    heading: 'Consultation Requests Table',
    subheading: 'Monitor incoming legal requests, manage statuses, and view details.',
    all: 'All',
    pending: 'Pending',
    review: 'In Review',
    completed: 'Completed',
    client: 'Client',
    type: 'Type',
    date: 'Submission Date',
    status: 'Status',
    actions: 'Actions',
    view: 'View Details',
    noData: 'No consultation requests found.',
    checkingAuth: 'Checking admin permissions...'
  }
};

interface Consultation {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  consultation_type: string;
  status: string;
}

export default function ConsultationsPage() {
  const { lang, user, setUser } = useAppStore();
  const t = tableLang[lang];
  const router = useRouter();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredData, setFilteredData] = useState<Consultation[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      // 1. تحقق مباشرة من Supabase (هذا هو المصدر الحقيقي)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }
      
      // تحديث الستور لضمان تزامن بيانات المستخدم في القوائم الجانبية
      setUser(session.user);

      // 2. إذا وجد session، ابدأ الجلب
      fetchConsultations();
      setVerifying(false);
    };

    checkAccess();
  }, [router, setUser]);

  const fetchConsultations = async () => {
    console.log('📡 [Fetch] بدء إرسال طلب البيانات إلى سوبابيز...');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('id, created_at, full_name, phone_number, consultation_type, status')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [Fetch Error] سوبابيز رفضت الطلب ورجعت خطأ:', error.message, error);
        throw error;
      }

      if (data) {
        console.log(`📦 [Fetch Success] تم جلب عدد (${data.length}) طلب استشارة بنجاح.`);
        setConsultations(data);
        setFilteredData(data);
      }
    } catch (err) {
      console.error('❌ [Catch Block] حدث كراش أثناء محاولة جلب الاستشارات:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status: string) => {
    setFilter(status);
    if (status === 'all') {
      setFilteredData(consultations);
    } else {
      setFilteredData(consultations.filter(item => item.status === status));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 text-xs font-semibold border rounded-full bg-amber-500/10 text-amber-400 border-amber-500/20">{t.pending}</span>;
      case 'في المراجعة':
      case 'review':
        return <span className="px-3 py-1 text-xs font-semibold text-blue-400 border rounded-full bg-blue-500/10 border-blue-500/20">{t.review}</span>;
      case 'مكتمل':
      case 'completed':
        return <span className="px-3 py-1 text-xs font-semibold border rounded-full bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{t.completed}</span>;
      default:
        return <span className="px-3 py-1 text-xs font-semibold text-gray-400 rounded-full bg-gray-500/10">{status}</span>;
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#c5a85c] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-[#c5a85c]/70 tracking-widest font-light">{t.checkingAuth}</p>
      </div>
    );
  }

  if (!user) {
    console.log('🚫 [DOM Prevent] الريندر محجوب (user هو null) ولن يتم عرض أي واجهة مستخدم للجدول لحين انتهاء التوجيه.');
    return null;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* رأس الصفحة */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white md:text-2xl">{t.heading}</h2>
          <p className="mt-1 text-sm text-gray-400">{t.subheading}</p>
        </div>

        {/* كبسولات الفلترة */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-[#0b1329]/60 border border-gray-800 rounded-lg w-full sm:w-auto">
          {['all', 'pending', 'review', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab === 'review' ? 'في المراجعة' : tab === 'completed' ? 'مكتمل' : tab)}
              className={`flex-1 sm:flex-none px-3 md:px-4 py-1.5 rounded-md text-[10px] md:text-xs font-medium transition-all text-center whitespace-nowrap ${
                filter === tab || (tab === 'review' && filter === 'في المراجعة') || (tab === 'completed' && filter === 'مكتمل')
                  ? 'bg-[#b59441] text-[#020617] font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t[tab as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* حاوية البيانات المتجاوبة */}
      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-20 bg-[#080f1e]/40 border border-[#c5a85c]/10 rounded-xl">
            <div className="w-8 h-8 border-2 border-[#c5a85c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-20 text-center text-gray-500 bg-[#080f1e]/40 border border-[#c5a85c]/10 rounded-xl">
            <Inbox size={40} className="text-gray-700" />
            <p className="text-sm">{t.noData}</p>
          </div>
        ) : (
          <>
            {/* نسخة الموبايل: عرض كروت (Cards) بدلاً من الجدول */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredData.map((item) => (
                <div key={item.id} className="bg-[#080f1e]/60 backdrop-blur-xl border border-[#c5a85c]/10 rounded-xl p-5 shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold leading-tight text-white">{item.full_name}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone size={12} /> {item.phone_number}
                      </span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 mb-4 border-y border-gray-800/50">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{t.type}</p>
                      <p className="text-sm font-medium text-gray-300">{item.consultation_type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{t.date}</p>
                      <p className="text-sm text-gray-300">
                        {new Date(item.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/admin/consultations/${item.id}`)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-[#020617] bg-[#c5a85c] hover:bg-[#e5c97c] rounded-lg transition-all shadow-lg shadow-[#c5a85c]/10"
                  >
                    <Eye size={16} />
                    <span>{t.view}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* نسخة الديسكتوب: جدول تقليدي يظهر فقط في الشاشات المتوسطة وما فوق */}
            <div className="hidden md:block w-full bg-[#080f1e]/40 backdrop-blur-xl border border-[#c5a85c]/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm text-gray-300 min-w-[800px]">
                  <thead className="bg-[#0b1329]/90 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-start">{t.client}</th>
                      <th className="px-6 py-4 text-start">{t.type}</th>
                      <th className="px-6 py-4 text-start">{t.date}</th>
                      <th className="px-6 py-4 text-start">{t.status}</th>
                      <th className="px-6 py-4 text-center">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900/60">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-slate-900/20 group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium text-white group-hover:text-[#e5c97c] transition-colors">{item.full_name}</span>
                            <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><Phone size={12}/> {item.phone_number}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                          {item.consultation_type}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => router.push(`/admin/consultations/${item.id}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#020617] bg-[#c5a85c] hover:bg-[#e5c97c] rounded transition-all cursor-pointer shadow-lg shadow-[#c5a85c]/5"
                          >
                            <Eye size={14} />
                            <span>{t.view}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}