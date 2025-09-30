import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ebankdxsxgjcniasaioy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYW5rZHhzeGdqY25pYXNhaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NzI0MTcsImV4cCI6MjA3MzQ0ODQxN30.FiOVhiP5F6zheYRf0QEQN3dOvvCe_GQtK82Mz9MlgSg'
const supabase = createClient(supabaseUrl, supabaseKey)
export { supabase }