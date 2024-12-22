import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full mx-auto h-80px flex items-center justify-between p-5 border-b border-gray-300">
        <div className="text-2xl font-bold">
            <Link href="/"><img src="/The_Bald_Gs_Logo.png" alt="Logo" className="h-10 w-auto" /></Link>
        </div>
        <div className="flex items-center space-x-5">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
        </div>
    </nav>
  );
};

export default Header;