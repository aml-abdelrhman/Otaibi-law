import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// استخدام createBrowserClient هو الحل الأساسي للحفاظ على الجلسة
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);