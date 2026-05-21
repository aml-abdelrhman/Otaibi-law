'use client';

import React, { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, User, Phone, Mail, FileText, Calendar, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';

const detailLang = {
  ar: {
    back: 'العودة للجدول',
    cardTitle: 'تفاصيل ملف الاستشارة',
    clientInfo: 'بيانات العميل الاتصالية',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    notProvided: 'غير متوفر',
    reqDetails: 'مضمون الطلب القانوني',
    type: 'نوع القضية/الاستشارة',
    date: 'تاريخ الإرسال',
    desc: 'وصف الاستشارة وشرح العميل',
    statusControl: 'التحكم في الطلب',
    saveSuccess: 'تم تحديث حالة الطلب بنجاح!',
    saving: 'جاري الحفظ...',
    saveBtn: 'حفظ التعديلات',
    deleteBtn: 'حذف الاستشارة',
    deleting: 'جاري الحذف...',
    modalTitle: 'تأكيد الحذف',
    modalDesc: 'هل أنت متأكد من حذف هذه الاستشارة نهائياً؟ لا يمكن التراجع عن هذا الإجراء بعد إتمامه.',
    confirmDelete: 'نعم، احذفها',
    cancelDelete: 'إلغاء'
  },
  en: {
    back: 'Back to Table',
    cardTitle: 'Consultation File Details',
    clientInfo: 'Client Contact Information',
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    notProvided: 'Not Provided',
    reqDetails: 'Legal Content Details',
    type: 'Case / Consultation Type',
    date: 'Submission Date',
    desc: 'Description & Client Explanation',
    statusControl: 'Request Control',
    saveSuccess: 'Status updated successfully!',
    saving: 'Saving...',
    saveBtn: 'Save Changes',
    deleteBtn: 'Delete Consultation',
    deleting: 'Deleting...',
    modalTitle: 'Confirm Deletion',
    modalDesc: 'Are you sure you want to permanently delete this consultation? This action cannot be undone.',
    confirmDelete: 'Yes, Delete',
    cancelDelete: 'Cancel'
  }
};

interface ConsultationDetail {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  consultation_type: string;
  description: string | null;
  status: string;
}

export default function ConsultationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useAppStore();
  const t = detailLang[lang];
  const router = useRouter();

  const [data, setData] = useState<ConsultationDetail | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    const { data: res, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && res) {
      setData(res);
      setStatus(res.status);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async () => {
    setUpdating(true);
    setSuccess(false);
    
    const { error } = await supabase
      .from('consultations')
      .update({ status: status })
      .eq('id', id);

    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }
    setUpdating(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    const { error } = await supabase
      .from('consultations')
      .delete()
      .eq('id', id);

    if (!error) {
      setShowModal(false);
      router.refresh();
      router.push('/admin/consultations');
    } else {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 border-2 border-[#c5a85c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return <p className="text-center text-red-400">Error 404: Not Found</p>;

  return (
    <div className="space-y-6">
      {/* زر العودة للجدول الخارجي */}
      <button
        onClick={() => router.push('/admin/consultations')}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#c5a85c] transition-colors cursor-pointer group"
      >
        {lang === 'ar' ? <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/> : <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1"/>}
        <span>{t.back}</span>
      </button>

      {/* الـ Grid الأساسي */}
      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-3">
        {/* بلوك البيانات المفصلة الكبيرة */}
        <div className="lg:col-span-2 space-y-6 bg-[#080f1e]/60 backdrop-blur-xl border border-[#c5a85c]/10 rounded-xl p-8 shadow-2xl">
          <div className="pb-4 border-b border-gray-800">
            <h3 className="flex items-center gap-2 text-xl font-bold tracking-wide text-white">
              <FileText size={20} className="text-[#c5a85c]" />
              {t.cardTitle}
            </h3>
          </div>

          {/* بيانات العميل */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-gray-500 uppercase">{t.clientInfo}</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-[#020617] border border-gray-900 rounded-lg p-4 flex items-center gap-3">
                <User size={18} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">{t.fullName}</p>
                  <p className="text-sm font-medium text-white mt-0.5">{data.full_name}</p>
                </div>
              </div>
              <div className="bg-[#020617] border border-gray-900 rounded-lg p-4 flex items-center gap-3">
                <Phone size={18} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">{t.phone}</p>
                  <p className="text-sm font-medium text-white mt-0.5" style={{ direction: 'ltr' }}>{data.phone_number}</p>
                </div>
              </div>
              <div className="bg-[#020617] border border-gray-900 rounded-lg p-4 flex items-center gap-3 sm:col-span-2">
                <Mail size={18} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">{t.email}</p>
                  <p className="text-sm font-medium text-white mt-0.5">{data.email || t.notProvided}</p>
                </div>
              </div>
            </div>
          </div>

          {/* مضمون الطلب */}
          <div className="pt-4 space-y-4 border-t border-gray-900/60">
            <h4 className="text-xs font-bold tracking-wider text-gray-500 uppercase">{t.reqDetails}</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-[#020617] border border-gray-900 rounded-lg p-4 flex items-center">
                <div>
                  <p className="text-xs text-gray-500">{t.type}</p>
                  <p className="text-sm font-semibold text-[#e5c97c] mt-0.5">{data.consultation_type}</p>
                </div>
              </div>
              <div className="bg-[#020617] border border-gray-900 rounded-lg p-4 flex items-center gap-3">
                <Calendar size={18} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">{t.date}</p>
                  <p className="text-sm font-medium text-white mt-0.5">
                    {new Date(data.created_at).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#020617] border border-gray-900 rounded-lg p-5 mt-2">
              <p className="mb-2 text-xs text-gray-500">{t.desc}</p>
              <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">{data.description || t.notProvided}</p>
            </div>
          </div>
        </div>

        {/* الكارت الجانبي المخصص للتحكم والتعديل والحذف */}
        <div className="space-y-4 bg-[#0b1329]/50 backdrop-blur-xl border border-[#c5a85c]/10 rounded-xl p-6 shadow-2xl">
          <h3 className="pb-3 text-sm font-bold text-white border-b border-gray-800">{t.statusControl}</h3>
          
          {success && (
            <div className="flex items-center gap-2 p-3 text-xs border rounded bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
              <CheckCircle size={14} />
              <span>{t.saveSuccess}</span>
            </div>
          )}

          <div className="space-y-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#020617] border border-gray-800 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5a85c] transition-all"
            >
              <option value="pending">{lang === 'ar' ? 'قيد الانتظار (Pending)' : 'Pending'}</option>
              <option value="في المراجعة">{lang === 'ar' ? 'في المراجعة (In Review)' : 'In Review'}</option>
              <option value="مكتمل">{lang === 'ar' ? 'مكتمل (Completed)' : 'Completed'}</option>
            </select>

            <button
              onClick={handleUpdateStatus}
              disabled={updating || deleting}
              className="w-full py-3 bg-[#b59441] hover:bg-[#c5a85c] text-[#020617] font-bold rounded text-sm transition-all shadow-lg shadow-[#b59441]/5 disabled:opacity-50 cursor-pointer flex items-center justify-center"
            >
              {updating ? t.saving : t.saveBtn}
            </button>

            {/* زر الحذف الفاخر المتناسق مع الثيم العتيق */}
            <button
              onClick={() => setShowModal(true)}
              disabled={updating || deleting}
              className="flex items-center justify-center w-full gap-2 py-3 mt-4 text-sm font-semibold text-red-400 transition-all border rounded cursor-pointer bg-red-950/20 hover:bg-red-900/30 border-red-500/20 disabled:opacity-50"
            >
              <Trash2 size={16} />
              <span>{t.deleteBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* نافذة التأكيد المنبثقة (Confirmation Modal) Glassmorphism */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#080f1e] border border-red-500/20 rounded-xl p-6 shadow-2xl relative z-50 text-center animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-400 border rounded-full bg-red-500/10 border-red-500/20">
              <AlertTriangle size={24} />
            </div>
            <h4 className="mb-2 text-lg font-bold text-white">{t.modalTitle}</h4>
            <p className="mb-6 text-xs leading-relaxed text-gray-400">{t.modalDesc}</p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition-all disabled:opacity-50 cursor-pointer"
              >
                {deleting ? t.deleting : t.confirmDelete}
              </button>
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 font-semibold text-xs border border-gray-800 rounded transition-all cursor-pointer"
              >
                {t.cancelDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}