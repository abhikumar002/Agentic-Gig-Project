"use client"

import { createContext, useContext, useEffect, useState } from "react"

export interface UserType {
    uid: string
    name: string
    email: string
    role: string
    farmSize?: string
    emailVerified: boolean
    lastLoginAt?: string
    joinCode?: string
}

interface AuthContextType {
    user: UserType | null
    setUser: (user: UserType | null) => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("projectKisan_user")
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
