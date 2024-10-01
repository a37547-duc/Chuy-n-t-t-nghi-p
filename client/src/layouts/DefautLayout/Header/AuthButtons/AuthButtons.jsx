import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom"

export default function AuthButtons() {
  return (
    <div className="flex items-center lg:order-2">
      <FontAwesomeIcon
        icon={faUser}
        className="h-5 w-5 text-gray-800 dark:text-white mr-4"
      />
      <div className="flex flex-col text-xs mr-2">
        <Link to="/login">
          <div className="cursor-pointer hover:underline hover:text-red-500">Đăng nhập</div>
        </Link>
        <Link to="signup">
          <div className="cursor-pointer hover:underline hover:text-red-500">Đăng ký</div>
        </Link>
      </div>
    </div>
  );
}
