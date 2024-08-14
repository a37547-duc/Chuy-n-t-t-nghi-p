import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function AuthButtons() {
  return <div className="flex items-center lg:order-2"> 
    <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-gray-800 dark:text-white mr-4" />
    <div className="flex flex-col text-xs mr-2">
      <div className="cursor-pointer hover:underline">Đăng nhập</div>
      <div className="cursor-pointer hover:underline">Đăng ký</div>
    </div>
  </div>;
}
