import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'
import { nextCookies } from 'better-auth/next-js'

const prisma = new PrismaClient()
export const auth = betterAuth({
    user: {
        additionalFields: {
            street: {
                type: 'string',
                required: false,
            },
            city: {
                type: 'string',
                required: false,
            },
            state: {
                type: 'string',
                required: false,
            },
            zip: {
                type: 'string',
                required: false,
            },
            country: {
                type: 'string',
                required: false,
            },
        },
    },
    database: prismaAdapter(prisma, {
        provider: 'postgresql', // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            callbackUrl: process.env.GITHUB_CALLBACK_URL,
        },
    },
    plugins: [nextCookies()],
})
