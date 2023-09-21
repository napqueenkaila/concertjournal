import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to="/">
      <header className="flex items-center justify-center gap-2 bg-accent p-8 text-xl font-medium tracking-tighter text-white sm:p-12 sm:text-2xl md:p-14 md:text-3xl lg:p-16 lg:text-4xl">
        <i className="fa-solid fa-music"></i>
        <p>kaila&apos;s concert journal.</p>
      </header>
    </Link>
  );
}
