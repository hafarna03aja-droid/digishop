import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations that need service role (admin) access
export const getServiceSupabase = () => {
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
