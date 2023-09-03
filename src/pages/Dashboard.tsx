import { useQuery, useMutation } from '@tanstack/react-query'
import SideBar from '../components/SideBar'
import { Link, useNavigate } from 'react-router-dom'
import { contactType } from './CreateContact'
import axios from 'axios'
import { queryClient } from '../main'
import baseUrl from '../helper/baseUrl'

const Dashboard = () => {
    const navigate = useNavigate()
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['allContacts'],
        queryFn: () =>
            fetch(`${baseUrl}/api/contact`).then(
                (res) => res.json(),
            ),
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`${baseUrl}/api/contact/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allContacts'])
        }
    })


    if (isLoading) {
        return (<div className=''>Loading.................</div>)
    }

    if (error) {
        return (<div className=''>Something Went Wrong....</div>)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row gap-y-10">
            <SideBar />

            <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center w-full'>
                <Link to="/create-contact">
                    <button className='bg-black hover:bg-gray-800 transition-all ease-in-out duration-300 hover:scale-105 rounded-md px-8 py-2 text-white mt-10'>Create Contact</button>
                </Link>


                {data?.length <= 0 ?
                    <h3 className='mt-10 text-2xl h-[200px] flex items-center justify-center rounded-3xl border border-black w-[90%] mx-auto '>No Contact Found</h3> :
                    <>
                        <h2 className='text-2xl  mt-20'>All Contacts</h2>
                        <div className='mt-10 flex gap-x-5 gap-y-5 flex-wrap w-full px-4'>
                            {data?.length > 0 &&
                                data?.map((contact: contactType, index: number) => <div
                                    onClick={() => { navigate(`/detailed-contact/${contact?._id}`) }}
                                    key={contact?._id}
                                    className='mt-4 p-6  shadow-2xl'>
                                    <p className=''><span>{index + 1}. </span>{contact?.firstName} {contact?.lastName}</p>
                                    <Link to={`/edit-contact/${contact._id}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button className='mt-3 w-[80px] border-blue-600 border px-4 py-2 rounded-md'>Edit</button>
                                    </Link>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(contact?._id as string) }}
                                        className='mt-3 ml-5 border-red-600 border px-4 py-2 rounded-md'>Delete</button>
                                </div>)
                            }
                        </div>
                    </>
                }

            </div>


        </div>
    )
}

export default Dashboard
