import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvrszslimknfxwyauzco.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cnN6c2xpbWtuZnh3eWF1emNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTc5NzIsImV4cCI6MjA3OTI5Mzk3Mn0.MzvnEOS7aU8EYvVm3T7Rp4YXTMITjUkJXc56LpSEI7I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
