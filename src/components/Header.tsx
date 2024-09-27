import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

const Header = () => {
    const { user, logout } = useUserContext();

    return (
        <header className="p-4 bg-gray-800 text-white">
            <nav className="flex justify-between items-center">
                <h1 className="text-2xl">MealDB</h1>
                <div>
                    {user ? (
                        <>
                        <Link href="/" className="mr-4">Home</Link>
                        <Link href="/profile" className="mr-4">Profile</Link>
                        <Link href="/categories" className="mr-4">Categories</Link>
                        <button onClick={logout} className="bg-red-500 px-3 py-2 rounded">Logout</button>
                        </>
          ) : (
            <p>Please log in to access the menu</p>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;