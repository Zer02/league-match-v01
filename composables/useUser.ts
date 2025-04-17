// composables/useUser.ts
import { useSupabaseClient } from '#imports'

export const useUser = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return { user, logout }
}
