import Link from "next/link";
import Icon from "../../public/blog.png"
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-neutral-100">
        <div className="container">
            <div className="flex-1 p-5">
                <Link href="/">
                    <Image src={Icon} width={80} height={80} alt="icon"/>
                </Link>
            </div>
            <div className="flex-none">
                <Link href="/create">
                    <button type="button" className="btn btn-outline">新規作成</button>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Navbar;