import Link from "next/link"

const Menu = () => {
    return (
        <nav className="bg-green-900 p-4 rounded-md shadow-md">
            <ul className="flex space-x-6 justify-center">
                <li>
                    <Link href="/" className="text-white text-lg font-semibold hover:text-green-300 transition-colors">Home</Link>
                </li>
                <li>
                    <Link href="/Profile" className="text-white text-lg font-semibold hover:text-green-300 transition-colors">Profile</Link>
                </li>
                <li>
                    <Link href="/Category" className="text-white text-lg font-semibold hover:text-green-300 transition-colors">Category</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;