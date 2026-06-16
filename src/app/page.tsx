import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: market_snapshots } = await supabase.from('market_snapshots').select().order('collected_at', { ascending: false })

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-1">
      {market_snapshots?.map((market_snapshot) => (
        <React.Fragment key={market_snapshot.id}>
          <div >
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: "short"
            }).format(new Date(market_snapshot.collected_at))}
          </div>
          <div >{market_snapshot.pair}</div>
          <div >{market_snapshot.observed_price}</div>
        </React.Fragment>
      ))}
    </div>
  )
}
