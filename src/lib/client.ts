import { createClient } from '@supabase/supabase-js';

const globalForSupabase = globalThis as unknown as {
    __supabase?: ReturnType<typeof createClient>;
};

export const supabase =
    globalForSupabase.__supabase ??
    (globalForSupabase.__supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ));