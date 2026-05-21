import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface AppState {
  lang: 'ar' | 'en';
  dir: 'rtl' | 'ltr';
  user: any | null;
  loading: boolean;
  toggleLanguage: () => void;
  setUser: (user: any) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'ar',
      dir: 'rtl',
      user: null,
      loading: true, // ابدأ بـ true دائماً
      
      toggleLanguage: () =>
        set((state) => ({
          lang: state.lang === 'ar' ? 'en' : 'ar',
          dir: state.lang === 'ar' ? 'ltr' : 'rtl',
        })),

      setUser: (user) => set({ user }),

      checkAuth: async () => {
        // لا نحتاج لضبط loading إلى true هنا إذا كنا نفحص في الخلفية
        const { data: { session } } = await supabase.auth.getSession();
        set({ user: session?.user ?? null, loading: false });
      },

      logout: () => set({ user: null }),
    }),
    {
      name: 'law-firm-storage',
      storage: createJSONStorage(() => localStorage),
      // قمنا بإزالة 'user' من الـ partialize لأننا سنعتمد على Supabase 
      // كمرجع أساسي وليس الـ LocalStorage.
      partialize: (state) => ({
        lang: state.lang,
        dir: state.dir,
      }),
    }
  )
);