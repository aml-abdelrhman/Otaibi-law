"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useAppStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Camera,
  Edit3,
  ArrowLeft, 
  ArrowRight,
  Briefcase,
  LayoutDashboard,
  Phone,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, Link } from "@/i18n/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const ROLE_HOME: Record<string, string> = {
  user:      "/profile",
  agent:     "/dashboard",
  developer: "/dashboard",
  admin:     "/admin",
};

const ProfilePage = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { darkMode } = useAppStore();
  const router = useRouter();
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/auth/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <p className={isAr ? "font-cairo" : "font-inter"}>
          {isAr ? "جاري تحميل البيانات..." : "Loading profile..."}
        </p>
      </div>
    );
  }

  if (!profile) return null;

  const getDashboardPath = (role: string) => ROLE_HOME[role] || "/profile";

  return (
    <div className={cn(
      "min-h-screen pb-20 transition-colors duration-500",
      darkMode ? "bg-[#020617] text-white" : "bg-[#fcfcfd] text-slate-900",
      isAr ? "font-cairo" : "font-inter"
    )}>
      {/* Hero Section with Architectural Blueprint Pattern */}
      <div className="relative h-72 md:h-96 bg-[#0b0f1a] overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-6xl px-4 pt-40 mx-auto md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-amber-500/10 border-amber-500/20 w-fit">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400"></span>
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-amber-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  {profile.role}
                </span>
              </div>
              <h1 className={cn(
                "text-4xl md:text-6xl font-black text-white",
                isAr ? "tracking-tight" : "tracking-tighter"
              )}>
                {isAr ? "مرحباً بك،" : "Welcome back,"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{profile.full_name?.split(' ')[0]}</span>
              </h1>
            </div>
            
            <Link href="/">
              <Button 
                variant="ghost" 
                className="flex gap-2 px-6 py-6 text-white border group rounded-xl bg-white/5 hover:bg-white/10 border-white/10 backdrop-blur-md"
              >
                {isAr ? <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} /> : <ArrowLeft className="transition-transform group-hover:-translate-x-1" size={18} />}
                {isAr ? "العودة للرئيسية" : "Back to Home"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-6xl px-4 mx-auto -mt-12 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Column: Profile Card */}
          <div className="space-y-6 lg:col-span-4">
            <div className={cn(
              "p-8 rounded-[2rem] border shadow-2xl backdrop-blur-xl relative overflow-hidden group",
              darkMode ? "bg-slate-900/80 border-white/5" : "bg-white border-slate-200 shadow-slate-200/50"
            )}>
              {/* Decorative design element */}
              <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-all rounded-full bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 overflow-hidden transition-transform duration-500 border-4 border-white shadow-2xl md:w-40 md:h-40 rounded-3xl dark:border-slate-800 rotate-3 group-hover:rotate-0">
                    <Image 
                      src={profile.avatar_url || "/images/logo.png"} 
                      alt={profile.full_name || "User"} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <Button size="icon" className="absolute w-10 h-10 bg-blue-600 border-4 border-white shadow-xl -bottom-2 -right-2 rounded-xl hover:bg-blue-700 dark:border-slate-800">
                    <Camera className="w-4 h-4 text-white" />
                  </Button>
                </div>

                <div className="mt-8 space-y-1 text-center">
                  <h2 className="text-2xl font-black tracking-tight">{profile.full_name}</h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{profile.email}</p>
                </div>

                <div className="w-full mt-10 space-y-3">
                  <Button 
                    className="w-full gap-3 text-xs font-bold text-white bg-blue-600 py-6 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                    onClick={() => router.push(getDashboardPath(profile.role))}
                  >
                    <LayoutDashboard size={16} />
                    {isAr ? "لوحة التحكم" : "Control Panel"}
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full gap-3 py-6 text-xs font-bold transition-all border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    onClick={() => router.push("/servics")}
                  >
                    <Briefcase size={16} className="text-amber-500" />
                    {isAr ? "استكشاف المشاريع" : "Explore Projects"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats or Status */}
            <div className={cn(
              "p-6 rounded-[2rem] border",
              darkMode ? "bg-slate-900/40 border-white/5" : "bg-blue-50/50 border-blue-100"
            )}>
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{isAr ? "حالة الحساب" : "Account Status"}</p>
                    <p className="text-sm font-bold text-emerald-500">{isAr ? "نشط" : "Active"}</p>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-emerald-500 opacity-20" />
               </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-8">
            <div className={cn(
              "p-8 md:p-10 rounded-[2rem] border shadow-sm h-full relative overflow-hidden",
              darkMode ? "bg-slate-900/50 border-white/5" : "bg-white border-slate-100 shadow-slate-200/30"
            )}>
              <div className="flex items-center justify-between mb-12">
                <h3 className="flex items-center gap-4 text-2xl font-black">
                  <span className="w-1.5 h-8 rounded-full bg-blue-600" />
                  {isAr ? "المعلومات الشخصية" : "Personal Details"}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2 font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => alert(isAr ? "قريباً: تعديل البيانات" : "Coming Soon: Edit Profile")}
                >
                  <Edit3 size={16} />
                  {isAr ? "تعديل" : "Edit"}
                </Button>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <InfoRow 
                  icon={<User className="text-blue-600" size={20} />} 
                  label={isAr ? "الاسم بالكامل" : "Full Name"} 
                  value={profile.full_name} 
                  darkMode={darkMode} 
                />
                <InfoRow 
                  icon={<Mail className="text-blue-600" size={20} />} 
                  label={isAr ? "البريد الإلكتروني" : "Email Address"} 
                  value={profile.email} 
                  darkMode={darkMode} 
                />
                <InfoRow 
                  icon={<Phone className="text-blue-600" size={20} />} 
                  label={isAr ? "رقم الهاتف" : "Phone Number"} 
                  value={profile.phone} 
                  darkMode={darkMode} 
                />
                <InfoRow 
                  icon={<ShieldCheck className="text-blue-600" size={20} />} 
                  label={isAr ? "فئة العضوية" : "Membership"} 
                  value={profile.role === 'user' ? (isAr ? 'عميل' : 'Client') : (isAr ? 'وكيل' : 'Agent')} 
                  darkMode={darkMode} 
                />
                <InfoRow 
                  icon={<Calendar className="text-blue-600" size={20} />} 
                  label={isAr ? "تاريخ التسجيل" : "Registration Date"} 
                  value={profile.created_at ? new Date(profile.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' }) : "---"} 
                  darkMode={darkMode} 
                />
              </div>

              {/* Decorative Architectural Line */}
              <div className="pt-8 mt-16 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 italic">
                  {isAr 
                    ? "* يتم تأمين كافة البيانات الشخصية وفقاً لمعايير الخصوصية في رواد الأعمال القابضة." 
                    : "* All personal data is secured according to Business Pioneers Holding privacy standards."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div> 
  );
};

const InfoRow = ({ icon, label, value, darkMode }: any) => (
  <div className="flex items-center gap-6 group">
    <div className={cn(
      "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-sm",
      darkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600"
    )}>
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black tracking-widest uppercase text-slate-400">{label}</p>
      <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">{value || "---"}</p>
    </div>
  </div>
);

export default ProfilePage;