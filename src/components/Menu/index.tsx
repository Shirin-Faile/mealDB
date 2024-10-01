import Link from "next/link"

const Menu = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/Profile">Profile</Link>
            <Link href="/Category">Category</Link>
        </nav>
    )
}

export default Menu;