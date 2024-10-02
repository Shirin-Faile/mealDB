'use client';
import { useUserContext } from "@/utils/contexts";
import LogIn from "../LogIn";
import { UserContextType } from "@/utils/types";
import Menu from "../Menu";

const LogInWrapper = ({children}:{children:React.ReactNode}) => {
    const { user } = useUserContext() as UserContextType;

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
            {!user ? (
                <LogIn />
            ) : (
                <div className="text-center w-full max-w-md">
                    <Menu />
                    <p className="text-xl text-green-900 font-bold mt-6">Welcome back, {user.name}!</p>
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogInWrapper;
