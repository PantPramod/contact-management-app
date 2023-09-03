import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { queryClient } from '../main'
import { contactType } from '../pages/CreateContact'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import baseUrl from '../helper/baseUrl'
import { useDispatch } from 'react-redux'
import {  saveContact } from '../features/contact/ContactSlice'

type propTypes = {
    data: {
        firstName: string,
        lastName: string,
        status: string
    },
    setData: Dispatch<SetStateAction<{ firstName: string; lastName: string; status: string; }>>,
    isEdit?: boolean

}

const Form = ({ data: contact, setData: setContact, isEdit }: propTypes) => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const navigate = useNavigate()



    const mutation = useMutation({
        mutationFn: (newContact: contactType) => {
            return axios.post(`${baseUrl}/api/contact`, newContact)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allContacts'])
        }
    })

    const editMutation = useMutation({
        mutationFn: (newData: contactType) => {
            return axios.patch(`${baseUrl}/api/contact/${id}`, newData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allContacts'])
        }
    })

    const submitHandler = (e: any) => {
        e.preventDefault()
        if (isEdit) {
            editMutation.mutate(contact)
            dispatch(saveContact({ firstName:contact.firstName, lastName:contact.lastName, status:contact.status }))
        } else {
            mutation.mutate(contact)
        }

        navigate('/')
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['detailedContact', id],
        queryFn: () =>
            fetch(`${baseUrl}/api/contact/${id}`).then(
                (res) => res.json(),
            ),
    })

    useEffect(() => {
        if (data?.firstName)
            setContact({
                firstName: data?.firstName,
                lastName: data?.lastName,
                status: data?.status
            })
    }, [data])

    if (isEdit && isLoading) return 'Loading...'

    if (isEdit && error) return 'An error has occurred: '

    return (
        <form
            onSubmit={submitHandler}
            className='shadow-2xl p-4 rounded-2xl min-w-[350px] w-[90%] pt-10'>

            <div className='w-full flex items-center'>
                <label className='whitespace-nowrap'>First Name</label>
                <input
                    type='text'
                    className='ml-2 p-2 border border-gray-300 rounded-md w-full outline-none'
                    placeholder='First Name'
                    value={contact.firstName}
                    onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                />
            </div>

            <div className='mt-5 flex items-center w-full'>
                <label className='whitespace-nowrap'>Last Name</label>
                <input
                    type='text'
                    className='ml-2 p-2  border border-gray-300 rounded-md w-full outline-none'
                    placeholder='Last Name'
                    value={contact.lastName}
                    onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                />
            </div>

            <div className='mt-5 flex items-center'>
                <label className='min-w-[75px] inline-block'>Status</label>
                <div className='ml-2'>
                    <div className=''>

                        <input
                            name="status"
                            type='radio'
                            className='mt-2 mr-2 cursor-pointer '
                            value={"Active"}
                            onChange={(e) => setContact({ ...contact, status: e.target.value })}
                            checked={contact.status === "Active"}
                        />
                        <label>Active</label>
                    </div>

                    <div className=''>

                        <input
                            name="status"
                            type='radio'
                            className='mt-2 mr-2 cursor-pointer'
                            value={"InActive"}
                            onChange={(e) => setContact({ ...contact, status: e.target.value })}
                            checked={contact.status === "InActive"}
                        />
                        <label>Inactive</label>
                    </div>
                </div>

            </div>

            <button className='bg-gray-800 hover:scale-105 transition-all ease-in-out duration-300 text-white px-4 py-2 rounded-md block mx-auto mt-5'>
                {isEdit ? "Update Contact" : "Save Contact"}
            </button>

        </form>
    )
}

export default Form
