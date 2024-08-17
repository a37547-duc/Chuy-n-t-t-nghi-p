import React from "react";
import { IoIosStar } from "react-icons/io";
export default function ProductCategory() {
  return (
    <div className="border-2 border-rose-600 bg-white-100 w-full min-h-screen gap-6 flex-wrap flex justify-center items-center">
      {/* card1 */}
      <div
        className="w-60 p-2 bg-white rounded-xl transition-all hover:-translate-y-2  
      duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
      >
        <img
          src="https://fastly.picsum.photos/id/268/200/300.jpg?hmac=M1JKzVXjrhIffE66T4sLediL7lhGmvS2rNr8pW2JipE"
          alt=""
          className="h-40 w-full object-cover rounded-xl"
        />
        <div className="p-2">
          <h2 className="font-bold text-lg mb-2">Heading</h2>
          <span className="text-xl font-semibold">180000</span>

          <div className="flex items-center gap-2">
            <span className="text-sm line-through opacity-75">Rs.20000</span>
            <span className="font-bold text-sm p-2 bg-yellow-300 rounded-ss-2xl text-gray-600">
              Save 10%
            </span>
          </div>

          <div className="flex items-center mt-2 gap-1">
            <IoIosStar className="text-yellow-300"></IoIosStar>
            <IoIosStar className="text-yellow-300"></IoIosStar>
            <IoIosStar className="text-yellow-300"></IoIosStar>
            <IoIosStar className="text-yellow-300"></IoIosStar>
            <p className="font-bold text-xs text-gray-700">Best Ratings</p>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          </p>
        </div>
      </div>

      {/* card1 */}
    </div>
  );
}
