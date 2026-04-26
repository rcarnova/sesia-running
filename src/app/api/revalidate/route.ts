// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET
  if (adminSecret && req.headers.get('x-admin-secret') !== adminSecret) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }
  revalidatePath('/api/classifica')
  revalidatePath('/')
  return NextResponse.json({ revalidated: true })
}
