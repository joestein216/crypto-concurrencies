import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: market_snapshots } = await supabase.from('market_snapshots').select()

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4">
      {market_snapshots?.map((market_snapshot) => (
        <React.Fragment key={market_snapshot.id}>
          <div >{market_snapshot.collected_at}</div>
          <div >{market_snapshot.venue}</div>
          <div >{market_snapshot.pair}</div>
          <div >{market_snapshot.observed_price}</div>
        </React.Fragment>
      ))}
    </div>
  )
}
