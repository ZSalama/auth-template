import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export const revalidate = 60 // Page regenerates every 60 seconds

export default async function Address() {
    //get auth cookie from user

    const userCookies = await cookies()
    const userId = userCookies.get('better-auth.session_token')?.value
    if (!userId) return <div>User session not found</div>
    const newUserId = userId.split('.')[0] //split cookie to get session token to match in db

    // get user ID from session token
    const session = await prisma.session.findUnique({
        where: { token: newUserId },
    })
    if (!session) return <div>User session not found</div>

    // get user address from user ID
    const response = await prisma.address.findFirst({
        where: { userId: session.userId },
        orderBy: { createdAt: 'desc' },
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
