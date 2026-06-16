import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import LineGraph, { ChartDataItem} from '@/app/components/LineGraph'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: market_snapshots } = 
    await supabase.from('market_snapshots')
                  .select('time_in_ms, pair, observed_price')
                  .order('time_in_ms', { ascending: true })
                  .eq('pair', 'BTC-USD')

  return (
    <LineGraph data={market_snapshots as ChartDataItem[]}/>
  )
}
