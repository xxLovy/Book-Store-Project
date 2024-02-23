import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adress } from '../../config'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const EditBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    useEffect((() => {
        setLoading(true)
        axios
            .get(`${adress}/books/${id}`)
            .then((response) => {
                setTitle(response.data.title)
                setAuthor(response.data.author)
                setPublishYear(response.data.publishYear)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
                alert('An error occourred. Please check in console')
            })
    }), [])
    const handleEditBook = () => {
        setLoading(true)
        const book = {
            title,
            author,
            publishYear,
        }
        axios
            .put(`${adress}/books/${id}`, book)
            .then(() => {
                setLoading(false)
                navigate('/')
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }



    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3ml my-4'>Edit Book</h1>
            {loading ? (<Spinner />) : ('')}
            <div className='flex flex-col border-2 border-sky-600 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type="text"
                        value={publishYear}
                        onChange={(e) => { setPublishYear(e.target.value) }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBook