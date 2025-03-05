'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { submitForm } from '@/app/actions'
import { addressSchema } from '@/lib/types'

export default function MyForm() {
    const [serverResponse, setServerResponse] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<addressSchema>({
        resolver: zodResolver(addressSchema),
    })

    const onSubmit = async (data: addressSchema) => {
        const response = await submitForm(data)
        setServerResponse(response)
    }

    return (
        <div className='max-w-md mx-auto p-4 border rounded-md shadow'>
            <h2 className='text-xl font-semibold mb-4'>Set Delivery Address</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* Name Input */}
                <div>
                    <label className='block font-medium'>Name:</label>
                    <input
                        {...register('name')}
                        className='w-full border rounded p-2'
                        placeholder='Enter your name'
                    />
                    {errors.name && (
                        <p className='text-red-500'>{errors.name.message}</p>
                    )}
                </div>
                {/* Street Input */}
                <div>
                    <label className='block font-medium'>Street:</label>
                    <input
                        {...register('street')}
                        className='w-full border rounded p-2'
                        placeholder='Enter your Street'
                    />
                    {errors.street && (
                        <p className='text-red-500'>{errors.street.message}</p>
                    )}
                </div>

                {/* City Input */}
                <div>
                    <label className='block font-medium'>city:</label>
                    <input
                        {...register('city')}
                        type='text'
                        className='w-full border rounded p-2'
                        placeholder='Enter your city'
                    />
                    {errors.city && (
                        <p className='text-red-500'>{errors.city.message}</p>
                    )}
                </div>

                {/* Message Input */}
                <div>
                    <label className='block font-medium'>State:</label>
                    <input
                        {...register('state')}
                        type='text'
                        className='w-full border rounded p-2'
                        placeholder='Enter your state'
                    />
                    {errors.state && (
                        <p className='text-red-500'>{errors.state.message}</p>
                    )}
                </div>
                {/* zipCode Input */}
                <div>
                    <label className='block font-medium'>Zip code:</label>
                    <input
                        {...register('zip')}
                        className='w-full border rounded p-2'
                        placeholder='Enter your zipcode'
                    />
                    {errors.zip && (
                        <p className='text-red-500'>{errors.zip.message}</p>
                    )}
                </div>
                {/* Country Input */}
                <div>
                    <label className='block font-medium'>Country:</label>
                    <input
                        {...register('country')}
                        className='w-full border rounded p-2'
                        placeholder='USA'
                    />
                    {errors.country && (
                        <p className='text-red-500'>{errors.country.message}</p>
                    )}
                </div>
                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {/* Display server response */}
            {serverResponse && (
                <p className='mt-4 text-green-600'>{serverResponse}</p>
            )}
        </div>
    )
}
