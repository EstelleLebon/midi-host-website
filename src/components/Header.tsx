import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full mx-auto h-80px flex items-center justify-between p-5 border-b border-gray-300" style={{maxHeight: "80px", backgroundImage: "url('/headbg.png')", backgroundSize: "100%", backgroundPosition: "center"}}>
        <div className="text-2xl font-bold">
            <Link href="/">
                <Image src="/7a27179e37e90a1c77c74e3bfccfc39e.png" alt="Logo" width={70} height={70} />
            </Link>
        </div>
        <div className="text-2xl font-bold">
            <Link href="https://discord.gg/bard-midi-library-998261522683924491" target="_blank" rel="noopener noreferrer">
              <Image src="/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg" alt="Discord_Link" width={40} height={40} />
            </Link>
        </div>
    </nav>
  );
};

export default Header;