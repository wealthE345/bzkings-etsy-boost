// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pgmvjnnajmzcyfyjmdpt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbXZqbm5ham16Y3lmeWptZHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDQxNzQsImV4cCI6MjA2NjI4MDE3NH0.QMe1QwPohSgo6crJimkt-GUmSqLAnrVfp59A0lvFkWo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);