import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import LineGraph, { ChartDataItem} from '@/app/components/LineGraph'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: market_snapshot_btc_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .order('time_in_ms', { ascending: true })
                  .eq('pair', 'BTC-USD')

  const { data: market_snapshot_eth_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .order('time_in_ms', { ascending: true })
                  .eq('pair', 'ETH-USD')

  const { data: market_snapshot_xrp_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .order('time_in_ms', { ascending: true })
                  .eq('pair', 'XRP-USD')

  const { data: market_snapshot_doge_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .order('time_in_ms', { ascending: true })
                  .eq('pair', 'DOGE-USD')

  return (
    <div>
      <div className="grid grid-cols-2 gap-0">
        <div className="bg-blue-200 p-4">
          <LineGraph data={market_snapshot_btc_usd as ChartDataItem[]}/>
        </div>
        <div className="bg-blue-300 p-4">
          <LineGraph data={market_snapshot_eth_usd as ChartDataItem[]}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-0">
        <div className="bg-blue-200 p-4">
          <LineGraph data={market_snapshot_xrp_usd as ChartDataItem[]}/>
        </div>
        <div className="bg-blue-300 p-4">
          <LineGraph data={market_snapshot_doge_usd as ChartDataItem[]}/>
        </div>
      </div>
    </div>
    
  )
}
