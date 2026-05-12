"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { createBrowserClient } from "@supabase/ssr";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function RegisterPage() {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "ar";

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    role: "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. إنشاء الحساب في نظام الـ Auth الخاص بسوبابيز
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          // نرسل البيانات الإضافية في الـ metadata كاحتياط
          data: {
            full_name: formData.fullName,
            role: formData.role,
          }
        }
      });

      if (authError) throw authError;

      // 2. إذا نجح الإنشاء، نقوم بحفظ البيانات الإضافية في جدول Profiles
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: authData.user.id,
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              role: formData.role,
            },
            { onConflict: 'id' }
          );

        if (profileError) {
          console.error("DEBUG - Database Error:", profileError);
          throw new Error(isRtl ? `خطأ في قاعدة البيانات: ${profileError.message}` : `DB Error: ${profileError.message}`);
        }

        setMessage({ 
          type: "success", 
          text: isRtl ? "تم إنشاء الحساب بنجاح! جاري التوجيه..." : "Account created successfully! Redirecting..." 
        });

        // توجيه المستخدم بعد نجاح العملية
        setTimeout(() => {
          router.push(`/${locale}/auth/login`);
        }, 2000);
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4" dir={isRtl ? "rtl" : "ltr"}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-8 border shadow-2xl bg-slate-900/50 border-slate-800 rounded-3xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
            {isRtl ? "ابدأ رحلتك معنا" : "Start Your Journey"}
          </h1>
          <p className="text-sm italic font-light tracking-wide text-slate-400">Business Pioneers Holding</p>
        </div>

        <AnimatePresence mode="wait">
          {message.text && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex items-center gap-3 p-4 rounded-2xl mb-6 text-sm border ${
                message.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* اختيار نوع الحساب */}
          <div className="flex p-1.5 bg-slate-950 rounded-2xl border border-slate-800 gap-2">
            {['user', 'agent'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({...formData, role: r})}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  formData.role === r ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {r === 'user' ? (isRtl ? "عميل" : "Client") : (isRtl ? "وكيل / مطور" : "Agent / Developer")}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* الاسم بالكامل */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500 px-1 tracking-widest">{isRtl ? "الاسم الكامل" : "Full Name"}</label>
              <div className="relative">
                <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={16} />
                <input
                  required
                  className={`w-full bg-slate-950 border border-slate-800 py-3.5 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} rounded-xl focus:border-blue-500 outline-none transition-all placeholder:text-slate-700`}
                  placeholder={isRtl ? "أحمد محمد" : "John Doe"}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            {/* رقم الجوال */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500 px-1 tracking-widest">{isRtl ? "الجوال" : "Phone"}</label>
              <div className="relative">
                <Phone className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={16} />
                <input
                  required
                  className={`w-full bg-slate-950 border border-slate-800 py-3.5 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} rounded-xl focus:border-blue-500 outline-none transition-all placeholder:text-slate-700`}
                  placeholder="05xxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 px-1 tracking-widest">{isRtl ? "البريد الإلكتروني" : "Email"}</label>
            <div className="relative">
              <Mail className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={16} />
              <input
                type="email"
                required
                className={`w-full bg-slate-950 border border-slate-800 py-3.5 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} rounded-xl focus:border-blue-500 outline-none transition-all placeholder:text-slate-700`}
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* كلمة المرور */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 px-1 tracking-widest">{isRtl ? "كلمة المرور" : "Password"}</label>
            <div className="relative">
              <Lock className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                className={`w-full bg-slate-950 border border-slate-800 py-3.5 ${isRtl ? 'pr-11 pl-12' : 'pl-11 pr-12'} rounded-xl focus:border-blue-500 outline-none transition-all placeholder:text-slate-700`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors`}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-white shadow-xl shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (isRtl ? "إنشاء حساب جديد" : "Create Account")}
          </button>
        </form>

        <div className="mt-8 text-sm text-center text-slate-500">
          {isRtl ? "لديك حساب بالفعل؟" : "Already have an account?"} {" "}
          <Link href="/auth/login" className="font-bold text-blue-400 transition-all hover:underline">
            {isRtl ? "تسجيل الدخول" : "Login Now"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}