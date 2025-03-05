'use server'

import { PrismaClient } from '@prisma/client'
import { addressSchema } from '@/lib/types'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export async function submitForm(formData: addressSchema) {
    // Get the user's session
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    })
    if (!session) {
        return 'User session not found'
    }
    // Validate input data
    const result = addressSchema.safeParse(formData)

    if (!result.success) {
        return 'Invalid form data' // Ideally, return detailed errors
    }

    const { name, street, city, state, zip, country } = result.data

    try {
        // Save form data to the database
        await prisma.address.create({
            data: {
                name,
                street,
                city,
                state,
                zip,
                country,
                createdAt: new Date(),
                userId: session.user.id,
            },
        })

        return `Thank you, ${name}! Your message has been saved.`
    } catch (error) {
        console.error('Database Error:', error)
        return 'An error occurred while saving your message.'
    }
}
