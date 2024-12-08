'use client'

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"

export default function Provider({ children, session }) {
    return (
        <SessionProvider session={session}>
            <Toaster />
            {children}
        </SessionProvider>
    )
}