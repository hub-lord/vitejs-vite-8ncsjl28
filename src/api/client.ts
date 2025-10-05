import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lhvcvrzqyyhdfympbwsr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxodmN2cnpxeXloZGZ5bXBid3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTU5ODksImV4cCI6MjA3NTE3MTk4OX0.EMv4EtbXJdYv-BlvpysCnCH0xcqVjgQ643M7upJZsqQ'
const supabase = createClient(supabaseUrl, supabaseKey)
export { supabase }