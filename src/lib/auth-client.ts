import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

export const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: 'google',
    })
}

export const signOut = async () => {
    await authClient.signOut()
}
