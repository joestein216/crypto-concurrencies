import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: market_snapshots } = await supabase.from('market_snapshots').select()

  return (
    <ul>
      {market_snapshots?.map((market_snapshot) => (
        <li key={market_snapshot.id}>{market_snapshot.pair} {market_snapshot.observed_price}</li>
      ))}
    </ul>
  )
}
