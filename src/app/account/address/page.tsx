import { PrismaClient } from '@prisma/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

const prisma = new PrismaClient()

async function FetchAddress() {
    // Get the user's session
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })
    if (!session) {
        return <div>User session not found</div>
    }
    const response = await prisma.address.findFirst({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div>
            <p>name: {response?.name}</p>
            <p>street: {response?.street}</p>
            <p>state: {response?.state}</p>
            <p>city: {response?.city}</p>
            <p>zipcode: {response?.zip}</p>
            <p>country: {response?.country}</p>
        </div>
    )
}

export default function Address() {
    return (
        <Suspense fallback={<Loading />}>
            <FetchAddress />
        </Suspense>
    )
}
