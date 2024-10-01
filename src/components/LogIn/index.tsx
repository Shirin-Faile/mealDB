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
        if (loggedInUser.length) {
            setUser(loggedInUser[0])
        }
    }

    return (
        <div>
            <p>To log in please enter your user name</p>
            <label htmlFor="user-input">Enter User Name</label>
            <input id="user-input" onChange={handleChange} />
            <button onClick={handleClick}>Log In</button>
        </div>
    )
}

export default LogIn;