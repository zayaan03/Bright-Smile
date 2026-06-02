import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://izbfmzcxvmucsfgmxnpg.supabase.co'
const supabaseKey = 'sb_publishable_dmSjPvL51HieM8ZjwZQGUQ_xqWcOtUW'

export const supabase = createClient(supabaseUrl, supabaseKey)