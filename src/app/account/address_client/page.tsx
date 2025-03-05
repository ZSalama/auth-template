'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import Loading from '@/components/Loading'
import { address } from '@prisma/client'

export default function Address() {
    const [latestAddress, setLatestAddress] = useState<address>({
        name: '',
        id: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        createdAt: new Date(),
        userId: '',
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const { data: session, error } = await authClient.getSession()
                if (error) {
                    setError('User session not found')
                    setLoading(false)
                    return
                }
                console.log(session)
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/get-address`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: session?.user.id }),
                    }
                )
                const data = await response.json()
                console.log(data)
                setLatestAddress(data.user)
            } catch (error) {
                setError('Failed to fetch address')
            } finally {
                setLoading(false)
            }
        }

        fetchAddress()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>Latest Address</h1>
            {latestAddress ? (
                <div>
                    <p>name: {latestAddress.name}</p>
                    <p>street: {latestAddress.street}</p>
                    <p>state: {latestAddress.state}</p>
                    <p>city: {latestAddress.city}</p>
                    <p>zipcode: {latestAddress.zip}</p>
                    <p>country: {latestAddress.country}</p>
                </div>
            ) : (
                <div>No address found</div>
            )}
        </div>
    )
}
