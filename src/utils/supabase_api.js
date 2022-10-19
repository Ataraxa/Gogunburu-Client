import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://khclnuvbrguopwuxynei.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoY2xudXZicmd1b3B3dXh5bmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU5NDY5NjgsImV4cCI6MTk4MTUyMjk2OH0.O9S-0oPG0E0LLe13HRDZU4W3EbTxCczaUL_uAxT8Hsk";

export const supabase = createClient(supabaseUrl, supabaseKey);
