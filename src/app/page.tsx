import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import LineGraph, { ChartDataItem} from '@/app/components/LineGraph'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  let { data: market_snapshot_btc_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .eq('pair', 'BTC-USD')
                  .order('time_in_ms', { ascending: false })
                  .limit(1000);

  const market_snapshot_btc_usd_reversed = [...(market_snapshot_btc_usd ?? [])].reverse();
                  
  const { data: market_snapshot_eth_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .eq('pair', 'ETH-USD')
                  .order('time_in_ms', { ascending: false })
                  .limit(1000);

  const market_snapshot_eth_usd_reversed = [...(market_snapshot_eth_usd ?? [])].reverse();

  const { data: market_snapshot_xrp_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .eq('pair', 'XRP-USD')
                  .order('time_in_ms', { ascending: false })
                  .limit(1000);

  const market_snapshot_xrp_usd_reversed = [...(market_snapshot_xrp_usd ?? [])].reverse();

  const { data: market_snapshot_doge_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .eq('pair', 'DOGE-USD')
                  .order('time_in_ms', { ascending: false })
                  .limit(1000);

  const market_snapshot_doge_usd_reversed = [...(market_snapshot_doge_usd ?? [])].reverse();

  const { data: market_snapshot_sol_usd } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .eq('pair', 'SOL-USD')
                  .order('time_in_ms', { ascending: false })
                  .limit(1000);

  const market_snapshot_sol_usd_reversed = [...(market_snapshot_sol_usd ?? [])].reverse();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-blue-100 p-6 rounded-lg"><LineGraph data={market_snapshot_btc_usd_reversed as ChartDataItem[]}/></div>
      <div className="bg-blue-200 p-6 rounded-lg"><LineGraph data={market_snapshot_eth_usd_reversed as ChartDataItem[]}/></div>
      <div className="bg-blue-300 p-6 rounded-lg"><LineGraph data={market_snapshot_xrp_usd_reversed as ChartDataItem[]}/></div>
      <div className="bg-blue-400 p-6 rounded-lg"><LineGraph data={market_snapshot_doge_usd_reversed as ChartDataItem[]}/></div>
      <div className="bg-blue-500 p-6 rounded-lg"><LineGraph data={market_snapshot_sol_usd_reversed as ChartDataItem[]}/></div>
    </div>  
  )
}
