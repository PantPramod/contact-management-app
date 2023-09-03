import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ContactState {
    firstName: string,
    lastName: string,
    status: string
}

const initialState: ContactState = {
    firstName: "",
    lastName: "",
    status: "InActive"
}

export const ContactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        saveContact: (state, action: PayloadAction<{ firstName: string, lastName: string, status: string }>) => {
            const { firstName, lastName, status } = action.payload
            console.log("payload==>",action.payload)
            state.firstName = firstName
            state.lastName = lastName
            state.status = status
        }

    },
})


export const { saveContact } = ContactSlice.actions

export default ContactSlice.reducer