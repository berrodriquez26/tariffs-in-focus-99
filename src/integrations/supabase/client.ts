// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jlymzwiguefxlahnoijq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpseW16d2lndWVmeGxhaG5vaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzQ0NTIsImV4cCI6MjA1ODU1MDQ1Mn0.1pjJNU07Z8V5RJafGPYR5h94gjn6fRi5HgqEw-pp-94";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);