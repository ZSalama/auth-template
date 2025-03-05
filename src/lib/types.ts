import { z } from 'zod'

export const addressSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters long'),
        street: z.string().min(2, 'Name must be at least 2 characters long'),
        // email: z.string().email('Invalid email address'),
        // message: z.string().min(5, 'Message must be at least 5 characters long'),
        city: z.string().min(2, 'City must be at least 2 characters long'),
        state: z.string().min(2, 'State must be at least 2 characters long'),
        zip: z.string().length(5, 'Zip Code must be 5 characters long'),
        country: z.string().length(3, 'Country must be USA'),
    })
    .refine((data) => data.country.trim().toLowerCase() === 'usa', {
        message: 'Country must be USA',
        path: ['country'],
    })

export type addressSchema = z.infer<typeof addressSchema>
