import { Link } from "react-router-dom";

export default function Logo() {
  return <div className="">
    <Link to={"/"} className="flex items-center">
      <img src="https://themewagon.com/wp-content/uploads/2021/03/Frame-172-1.png" className="h-9" alt="Computer logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
    </Link>
  </div>;
}
