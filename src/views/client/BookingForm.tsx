import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { supabase } from '@/lib/supabase';
import lawImage from '@/assets/law.jpg';
import { Mail, Phone, MapPin, Send, Loader2, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const { lang, dir } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: React.ReactNode } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    consultationType: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.from('consultations').insert([
        {
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email || null,
          consultation_type: formData.consultationType,
          description: formData.description || null,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      setMessage({
        type: 'success',
        text: (
          <span>
            {lang === 'ar' 
              ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً. يمكنك متابعة حالة طلبك في أي وقت باستخدام رقم هاتفك من خلال ' 
              : 'Your request sent successfully! We will contact you soon. You can track your request status at any time using your phone number via '}
            <Link 
              href="/admin/consultations/track" 
              className="font-bold underline transition-colors hover:text-white"
            >
              {lang === 'ar' ? 'صفحة تتبع الطلبات' : 'Track Requests'}
            </Link>
            .
          </span>
        )
      });
      setFormData({ fullName: '', phoneNumber: '', email: '', consultationType: '', description: '' });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: lang === 'ar' ? 'عذراً، حدث خطأ أثناء الإرسال. أعد المحاولة.' : 'Error sending request. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="relative py-24 overflow-hidden border-t border-[#9c7b3c]/5 bg-[#030712]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover opacity-25"
        style={{ 
          backgroundImage: `url(${typeof lawImage === 'string' ? lawImage : (lawImage as any).src})` 
        }}
      />
      <div className="absolute inset-0 z-0 bg-[#7e6229]/15 backdrop-blur-[2px] bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712]/80" />

      <div className="relative z-10 grid grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-12" style={{ direction: dir }}>
        
        {/* نموذج الحجز المباشر */}
        <div className="lg:col-span-8 bg-[#0a192f] p-8 rounded-xl border border-[#9c7b3c]/10">
          <h3 className="mb-6 text-2xl font-bold text-white">
            {lang === 'ar' ? 'احجز استشارتك الآن' : 'Book Your Consultation Now'}
          </h3>

          {message && (
            <div className={`p-4 rounded-md mb-6 text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input 
                type="text" 
                placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'} 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className={`bg-[#030712] border border-gray-800 focus:border-[#9c7b3c]/60 outline-none p-3 rounded text-white text-sm transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              />
              <input 
                type="tel" 
                placeholder={lang === 'ar' ? 'رقم الجوال' : 'Phone Number'} 
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                className={`bg-[#030712] border border-gray-800 focus:border-[#9c7b3c]/60 outline-none p-3 rounded text-white text-sm transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input 
                type="email" 
                placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`bg-[#030712] border border-gray-800 focus:border-[#9c7b3c]/60 outline-none p-3 rounded text-white text-sm transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              />
              <select 
                required
                value={formData.consultationType}
                onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
                className={`bg-[#030712] border border-gray-800 focus:border-[#9c7b3c]/60 outline-none p-3 rounded text-white text-sm transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <option value="" disabled hidden>{lang === 'ar' ? 'نوع الاستشارة' : 'Consultation Type'}</option>
                <option value="commercial">{lang === 'ar' ? 'تجاري' : 'Commercial'}</option>
                <option value="criminal">{lang === 'ar' ? 'جنائي' : 'Criminal'}</option>
                <option value="administrative">{lang === 'ar' ? 'إداري' : 'Administrative'}</option>
              </select>
            </div>

            <textarea 
              rows={4} 
              placeholder={lang === 'ar' ? 'وصف مختصر عن استشارتك' : 'Brief description of your consultation...'}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={`w-full bg-[#030712] border border-gray-800 focus:border-[#9c7b3c]/60 outline-none p-3 rounded text-white text-sm transition-all resize-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
            />

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-[#7e6229] hover:bg-[#9c7b3c] disabled:bg-[#9c7b3c]/40 text-white font-bold rounded transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {lang === 'ar' ? 'إرسال الطلب' : 'Send Request'}
            </button>
          </form>
        </div>

        {/* معلومات الاتصال */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#0a192f] p-8 rounded-xl border border-[#9c7b3c]/10 text-center">
          <h3 className="mb-8 text-2xl font-bold text-white">
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Details'}
          </h3>

          <div className="w-full space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="text-[#9c7b3c]"><Phone size={20} /></div>
              <p className="text-sm text-white dir-ltr">050 123 4567</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="text-[#9c7b3c]"><Mail size={20} /></div>
              <p className="text-sm text-white">info@albandarlaw.com</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="text-[#9c7b3c]"><MapPin size={20} /></div>
              <p className="text-sm text-white">
                {lang === 'ar' ? 'المملكة العربية السعودية - الرياض' : 'Riyadh - Saudi Arabia'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-5 pt-4">
              <a href="#" className="text-[#9c7b3c] hover:text-[#c5a85c] transition-all duration-300 hover:scale-110">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-[#9c7b3c] hover:text-[#c5a85c] transition-all duration-300 hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-[#9c7b3c] hover:text-[#c5a85c] transition-all duration-300 hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-[#9c7b3c] hover:text-[#c5a85c] transition-all duration-300 hover:scale-110">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};