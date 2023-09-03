import { useState } from 'react'
import SideBar from '../components/SideBar'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import { contactType } from './CreateContact'

const EditContact = () => {
    const [data, setData] = useState<contactType>({
        firstName: '',
        lastName: '',
        status: 'InActive'
    })
    return (
        <div className='flex min-h-screen flex-col md:flex-row gap-y-10'>
            <SideBar />

            <div className='relative flex flex-col gap-y-10 items-center justify-center w-full'>
                <Link to="/" className='absolute left-2 top-2'>
                    <button className='bg-black text-white px-2 py-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                </Link>
                <h2 className='text-center text-2xl font-bold'>Update Contact</h2>
                <Form
                    data={data}
                    setData={setData}
                    isEdit
                />
            </div>
        </div>
    )
}

export default EditContact
