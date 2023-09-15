import { Link } from "react-router-dom"

export default function Header() {
    return (
        <Link to="/">
            <header className="bg-accent text-white text-xl font-medium tracking-tighter p-8 sm:p-12 md:p-14 lg:p-16 sm:text-2xl md:text-3xl lg:text-4xl flex justify-center items-center gap-2" >
                <i className="fa-solid fa-music"></i>
                <p>kaila&apos;s concert journal.</p>
            </header>
        </Link>
    )
}