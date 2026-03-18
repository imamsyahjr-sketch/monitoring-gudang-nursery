import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kgoofmezcdorxznsudiq.supabase.co"
const supabaseKey = "sb_publishable_7-m7yCUiut6wVjAgXIz5oA_87CLppNd"

export const supabase = createClient(supabaseUrl, supabaseKey)