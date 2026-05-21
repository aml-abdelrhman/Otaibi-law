'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { lang, dir } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(lang === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid login credentials');
        setLoading(false);
        return;
      }

      router.refresh();
      router.push('/admin/consultations');
    } catch (err) {
      setError(lang === 'ar' ? 'حدث خطأ في الاتصال بالسيرفر' : 'Server connection error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden" style={{ direction: dir }}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c5a85c]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#c5a85c]/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-24 h-24 p-1 rounded-2xl bg-gradient-to-b from-[#c5a85c]/20 to-transparent border border-[#c5a85c]/10">
              <img 
                src="/logo3.png" 
                alt="Al Otaibi Logo" 
                className="object-contain w-full h-full"
              />
            </div>
          </motion.div>
          
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
            {lang === 'ar' ? 'مكتب العتيبي' : 'Al Otaibi Law Firm'}
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#c5a85c] to-transparent mx-auto mb-3" />
          <p className="text-sm font-light text-slate-400">
            {lang === 'ar' ? 'لوحة الإدارة - سجل دخول للمتابعة' : 'Admin Panel - Sign in to continue'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 text-sm text-center text-red-200 border border-red-500/20 rounded-xl bg-red-500/10"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="block px-1 text-sm font-medium text-slate-300">
              {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative group">
              <Mail 
                className={`absolute text-slate-500 group-focus-within:text-[#c5a85c] transition-colors -translate-y-1/2 top-1/2 ${lang === 'ar' ? 'right-4' : 'left-4'}`} 
                size={18} 
              />
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 text-white text-sm focus:outline-none focus:border-[#c5a85c] focus:ring-1 focus:ring-[#c5a85c]/30 transition-all disabled:opacity-50 ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                placeholder="admin@alotaibi.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block px-1 text-sm font-medium text-slate-300">
              {lang === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative group">
              <Lock 
                className={`absolute text-slate-500 group-focus-within:text-[#c5a85c] transition-colors -translate-y-1/2 top-1/2 ${lang === 'ar' ? 'right-4' : 'left-4'}`} 
                size={18} 
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 text-white text-sm focus:outline-none focus:border-[#c5a85c] focus:ring-1 focus:ring-[#c5a85c]/30 transition-all disabled:opacity-50 ${lang === 'ar' ? 'pr-12 pl-12' : 'pl-12 pr-12'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#c5a85c] transition-colors ${lang === 'ar' ? 'left-4' : 'right-4'}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#c5a85c] hover:bg-[#d4bd7d] text-[#030712] font-bold rounded-xl transition-all shadow-xl shadow-[#c5a85c]/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#030712] border-t-transparent rounded-full animate-spin" />
                <span>{lang === 'ar' ? 'جاري التحقق...' : 'Verifying...'}</span>
              </>
            ) : (
              <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}