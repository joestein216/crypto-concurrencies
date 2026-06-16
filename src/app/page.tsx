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

  const { data: market_snapshot_sol_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .order('time_in_ms', { ascending: true })
                  .eq('pair', 'SOL-USD')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-blue-100 p-6 rounded-lg"><LineGraph data={market_snapshot_btc_usd as ChartDataItem[]}/></div>
      <div className="bg-blue-200 p-6 rounded-lg"><LineGraph data={market_snapshot_eth_usd as ChartDataItem[]}/></div>
      <div className="bg-blue-300 p-6 rounded-lg"><LineGraph data={market_snapshot_xrp_usd as ChartDataItem[]}/></div>
      <div className="bg-blue-400 p-6 rounded-lg"><LineGraph data={market_snapshot_doge_usd as ChartDataItem[]}/></div>
      <div className="bg-blue-500 p-6 rounded-lg"><LineGraph data={market_snapshot_sol_usd as ChartDataItem[]}/></div>
    </div>  
  )
}
