import errorPage from "@/assets/notFound.jpg";
import AnimCursor from "@/components/AnimCursor";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="lg:flex flex-col justify-center items-center">
      <AnimCursor />
      <div>
        <Image
          src={errorPage}
          height={500}
          width={500}
          alt="404 not found page by donation"
        />
      </div>
      <div>
        <Link href="/">
          <button className="bg-gray-800 text-white rounded-xl px-5 py-5  mt-10 cursor-pointer">
            Go Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
