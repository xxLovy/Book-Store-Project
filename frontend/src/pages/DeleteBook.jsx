import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adress } from '../../config'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const DeleteBook = () => {
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const handleDeleteBook = () => {
        setLoading(true)
        axios
            .delete(`${adress}/books/${id}`)
            .then(() => {
                navigate('/')
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
                    Yes, delete it
                </button>
            </div>
        </div>
    )
}

export default DeleteBook