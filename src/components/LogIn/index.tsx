'use client'
import { SetStateAction, useState } from "react"
import { registeredUsers } from "@/utils/users"
import { UserContextType, UserType } from "@/utils/types"
import { useUserContext } from "@/utils/contexts"

const LogIn = () => {
    const[userInput, setUserInput] = useState<string | null>(null)

    const {setUser} = useUserContext() as UserContextType

    const handleChange = (e: { target: { value: SetStateAction<string | null> } }) => {
        setUserInput(e.target.value)
    }

    const handleClick = () => {
        const loggedInUser:UserType[] = registeredUsers.filter((user:UserType) => user.name === userInput)
        if (loggedInUser) {
            setUser(loggedInUser[0])
        }
    }

    return (
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
            <p className="text-lg text-green-900 font-semibold mb-4">
                Please enter your username to log in.
            </p>
            <div className="mb-4">
                <label htmlFor="user-input" className="block text-sm text-green-700 mb-2">
                    Your Username:
                </label>
                <input 
                id="user-input" 
                onChange={handleChange}
                className="w-full p-2 border border-green-400 rounded-md focus:outline-none focus:border-green-700" 
                />
            </div>
            <button 
            onClick={handleClick} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">Log In</button>
        </div>
    )
}

export default LogIn;