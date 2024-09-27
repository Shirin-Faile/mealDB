"use client"
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";

const LoginForm = () => {
    const { login } = useUserContext();
    const [username, setUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            setUsername('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             placeholder="Enter your username" className="p-2 border border-gray-300 rounded"
             required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Log In</button>
        </form>
    );
};

export default LoginForm;