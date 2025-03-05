import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    if (req.body.userId === '') {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const { userId, street, city, state, zipCode, country } = req.body

    if (!street || !city || !state || !zipCode || !country) {
        return res
            .status(400)
            .json({ message: 'All address fields are required' })
    }

    try {
        // const updatedUser = await prisma.user.update({
        //     where: { id: userId },
        //     data: { street, city, state, zip: zipCode, country },
        // })

        return res.status(200).json({
            message: 'Address updated successfully',
            // user: updatedUser,
        })
    } catch (error) {
        console.error('Error updating address:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
