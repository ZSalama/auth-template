'use client'

import { useState } from 'react'
import { signIn, signOut } from '@/lib/auth-client'

export default function Home() {
    const test = async () => {
        const res = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <button onClick={() => signIn()}>Sign in with GitHub</button>
            <button onClick={() => signOut()}>Sign out</button>
            <button onClick={test}>test API</button>
        </div>
    )
}
