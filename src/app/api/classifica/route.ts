// src/app/api/classifica/route.ts
import { NextResponse } from 'next/server'
import { readClassifica } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = readClassifica()
  return NextResponse.json(data)
}
