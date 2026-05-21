import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // إذا كنت تحاول دخول مسارات الـ admin ولم تكن مسجلاً -> اطرده للوجن
  if (request.nextUrl.pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // إذا كنت في صفحة اللوجن ومسجل دخول مسبقاً -> دخله للوحة التحكم
  if (request.nextUrl.pathname.startsWith('/auth/login') && session) {
    return NextResponse.redirect(new URL('/admin/consultations', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
};