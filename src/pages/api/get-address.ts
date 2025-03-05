import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // if (req.method !== 'POST') {
    //     return res.status(405).json({ message: 'Method not allowed' })
    // }

    // if (req.body.userId === '') {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ message: 'no userId' })
    }

    try {
        const response = await prisma.address.findFirst({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return res.status(200).json({
            message: 'Address gotten successfully',
            user: response,
        })
    } catch (error) {
        console.error('Error getting address:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
