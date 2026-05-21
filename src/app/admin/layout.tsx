'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';
import { LogOut, Calendar } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, lang, dir, logout } = useAppStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsReady(true);
        
        // تحويل تلقائي لجدول الاستشارات إذا كان المسار هو /admin فقط
        if (pathname === '/admin' || pathname === '/admin/') {
          router.replace('/admin/consultations');
        }
      } else {
        router.replace('/auth/login');
      }
    };
    checkSession();
  }, [router, setUser, pathname]);

  if (!isReady) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      {lang === 'ar' ? 'جاري التحقق...' : 'Verifying...'}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020617]" style={{ direction: dir }}>
      {/* العمود الجانبي - مخفي في الموبايل ويظهر في الشاشات الكبيرة فقط */}
      <aside className={`hidden lg:flex w-72 bg-[#0b1329]/50 backdrop-blur-md border-gray-800 p-6 pt-32 flex-col gap-4 shadow-xl z-20 ${dir === 'rtl' ? 'border-l' : 'border-r'}`}>
        <nav className="flex flex-col gap-4">
          <Link 
            href="/admin/consultations" 
            className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border ${
              pathname.includes('consultations') 
              ? 'bg-[#c5a85c] text-black font-bold shadow-lg shadow-[#c5a85c]/20 border-[#c5a85c]' 
              : 'text-gray-400 border-transparent hover:bg-[#c5a85c]/10 hover:text-[#c5a85c]'
            }`}
          >
            <Calendar size={20} />
            <span className="text-sm font-medium">{lang === 'ar' ? 'جدول الاستشارات' : 'Consultations Table'}</span>
          </Link>
        </nav>

        {/* زر تسجيل الخروج في أسفل السايدبار */}
        <button 
          onClick={async () => {
            await supabase.auth.signOut(); // إنهاء الجلسة في سوبابيز فعلياً
            logout(); // تفريغ بيانات المستخدم من الـ Store
            router.push('/auth/login'); // التوجيه لصفحة تسجيل الدخول
          }}
          className="flex items-center gap-4 p-4 mt-auto text-red-400 transition-all duration-300 border border-transparent cursor-pointer rounded-xl hover:bg-red-500/10 hover:border-red-500/20 group"
        >
          <LogOut size={20} className="transition-transform group-hover:scale-110" />
          <span className="text-sm font-medium">{lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
        </button>
      </aside>
      {/* المحتوى الرئيسي (الصفحات ستظهر هنا) */}
      <main className="relative flex-1 p-8 pt-32 overflow-y-auto">
        {/* شعار الخلفية في المنتصف مع تأثير غشاء خفيف جداً */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <img 
            src="/logo3.png" 
            alt="Background Logo" 
            className="w-[300px] md:w-[600px] h-auto opacity-10 grayscale brightness-125 select-none pointer-events-none transform translate-y-20"
          />
        </div>

        {/* نضع المحتوى داخل div بـ z-index أعلى ليظهر فوق الشعار */}
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}