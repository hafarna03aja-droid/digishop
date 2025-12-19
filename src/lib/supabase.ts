import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build-time errors when env vars aren't available
let _supabaseClient: SupabaseClient | null = null;

// Create a single supabase client for interacting with your database
export const getSupabase = () => {
    if (!_supabaseClient) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        _supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabaseClient;
};

// For backwards compatibility - use getSupabase() for new code
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return (getSupabase() as any)[prop];
    }
});

// For server-side operations that need service role (admin) access
export const getServiceSupabase = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};

// Type-safe database types (will be generated after setting up Supabase)
export type Database = {
    public: {
        Tables: {
            // Add your table types here after setting up Supabase
            // You can generate these types using: npx supabase gen types typescript
        };
    };
};
