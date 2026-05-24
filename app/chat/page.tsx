import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ChatLayout } from '@/components/chat/chat-layout'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user's conversations with participants
  const { data: conversations } = await supabase
    .from('conversation_participants')
    .select(`
      conversation_id,
      conversations (
        id,
        created_at,
        updated_at
      )
    `)
    .eq('user_id', user.id)
    .order('joined_at', { ascending: false })

  // Get all contacts
  const { data: contacts } = await supabase
    .from('contacts')
    .select(`
      *,
      contact:profiles!contacts_contact_id_fkey (
        id,
        username,
        email,
        avatar_url,
        status,
        last_seen
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'accepted')

  return (
    <ChatLayout
      user={user}
      profile={profile}
      conversations={conversations || []}
      contacts={contacts || []}
    />
  )
}
