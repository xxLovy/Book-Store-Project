import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adress } from '../../config'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const CreateBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')

    const [loading, setLoading] = useState('')
    // what is this??
    const navigate = useNavigate()
    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear,
        }
        setLoading(true)
        // then accepts 2 prams
        axios
            .post(`${adress}/books`, data)
            .then(() => {
                setLoading(false)
                navigate('/')
            })
            .catch(error => {
                setLoading(false)
                alert('an error occourred in creating book')
                console.log(error)
            })
    }
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3ml my-4'>Create Book</h1>
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
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateBook