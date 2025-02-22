'use client'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

export default function Account() {
    const [formData, setFormData] = useState({
        userId: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (
            typeof formData.street !== 'string' ||
            formData.street.trim() === ''
        ) {
            alert('Street must be a non-empty string')
            return
        }
        if (typeof formData.city !== 'string' || formData.city.trim() === '') {
            alert('City must be a non-empty string')
            return
        }
        if (!/^\d{5}$/.test(formData.zipCode)) {
            alert('Zip Code must be a 5-digit number')
            return
        }
        try {
            console.log('Updating address...')
            const { data: session, error } = await authClient.getSession()
            if (error) {
                console.error('Error fetching session:', error)
                alert('Failed to fetch session')
                return
            }
            const token = session?.user.id
            console.log('Session token:', token)
            formData.userId = token
            const response = await fetch('/api/update-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                console.log('Response:', response)
                alert('Address updated successfully')
            } else {
                console.log('Response:', response)
                alert('Failed to update address')
            }
        } catch (error) {
            console.error('Error updating address:', error)
            alert('An error occurred while updating the address')
        }
    }

    return (
        <div>
            <h1>Update Address</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Street:</label>
                    <input
                        type='text'
                        name='street'
                        value={formData.street}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type='text'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type='text'
                        name='state'
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input
                        type='text'
                        name='zipCode'
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type='text'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>Update Address</button>
            </form>
        </div>
    )
}
