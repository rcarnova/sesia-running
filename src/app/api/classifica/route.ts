// src/app/api/classifica/route.ts
import { NextResponse } from 'next/server'
import { fetchClassificaFromDrive } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await fetchClassificaFromDrive()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Drive fetch error:', err)
    return NextResponse.json(
      { error: 'Impossibile caricare la classifica' },
      { status: 500 }
    )
  }
}
