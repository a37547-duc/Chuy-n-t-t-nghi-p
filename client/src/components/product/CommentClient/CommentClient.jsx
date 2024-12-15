/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import ModalReviews from "../ModalReviews/ModalReviews";
import LoginCheckModal from "../../product/ModalCheckLogin/ModalCheckLogin";
import { FaRegClock } from "react-icons/fa";
import { getCommentsByProductId } from "../../../features/Client/ClientCommentSlice";

const CommentClient = ({ product }) => {
  const dispatch = useDispatch();
  const { totalRatings, starCounts, ratings } = useSelector((state) => state.clientComment);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [visibleRatingsCount, setVisibleRatingsCount] = useState(5);

  useEffect(() => {
    if (product?.product?._id) {
      dispatch(getCommentsByProductId(product?.product?._id));
    }
  }, [dispatch, product?.product?._id]);

  const ratingSort = ratings.slice().reverse();

  // const totalRatings = ratings.reduce((total, rating) => total + rating.count, 0);
  const averageRating =
    totalRatings > 0 ? Object.keys(starCounts).reduce((total, star) => total + parseInt(star) * starCounts[star],0) / totalRatings : 0;

  // Hàm để tạo màu ngẫu nhiên dựa trên _id
  const generateRandomColor = (userId) => {
    const hash = userId?.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['#502d43', '#d7000e', '#5a2d6a', '#3b7b38', '#f47b02'];
    return colors[hash % colors.length];  // Chọn màu dựa trên giá trị hash
  };

  return (
    <div className="rounded-lg shadow-md mb-4 overflow-hidden p-4 w-full mt-10">
      <h2 className="text-base font-bold leading-[1.125] text-[#4a4a4a] mb-5">
        Đánh giá & nhận xét {product?.product?.name}
      </h2>

      {/* Phần hiển thị điểm trung bình */}
      <div className="border-b border-[#e5e7eb] h-auto mb-5 overflow-hidden pb-5 flex">
        <div className="border-r border-[#e5e7eb] flex flex-col mr-2 w-[40%] items-center justify-center">
          <p className="text-[1.5rem] text-[#363636] font-semibold leading-[1.125]">
            {averageRating.toFixed(1)}/5
          </p>
          <Rating
            value={averageRating} // Điểm trung bình
            precision={0.1}
            readOnly
            size="large"
          />
          <p className="text-blue-500 text-sm cursor-pointer mt-2">{totalRatings} đánh giá</p>
        </div>

        {/* Phần chi tiết đánh giá sao */}
        <div className="flex flex-col justify-center w-[60%]">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="flex items-center mb-2">
              <span className="inline-flex items-center text-yellow-400 text-sm">
                {star} 
                {/* <span className="ml-1">★</span> */}
                <Rating
                  value={star} // Giá trị sao
                  readOnly
                  max={1}
                  size="small"
                />
              </span>
              <div className="w-full h-2 mx-2 bg-gray-300 rounded-md relative">
                <div
                  className="h-full bg-red-500 rounded-md"
                  style={{width: totalRatings > 0 ? `${(starCounts[star] / totalRatings) * 100}%` : "0%"}}
                ></div>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">{starCounts[star] || 0} đánh giá</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phần đánh giá của người dùng */}
      <div className="border-b border-[#e5e7eb] mb-5 pb-5">
        <p className="text-[16px] text-center mb-2 mt-2 text-[#4a4a4a] font-bold leading-5">
          Bạn đánh giá sao về sản phẩm này của chúng tôi?
        </p>
        <div className="text-center">
          <button
            className="font-medium bg-[#d7000e] text-white border-none rounded-md mx-auto my-2 px-8 py-2 text-center cursor-pointer inline-flex justify-center text-base h-10 leading-6 shadow-none"
            onClick={() => {
              if (isAuthenticated && user?.role === "user") {
                setOpenModal(true);
              } else {
                setOpenLoginModal(true);
              }
            }}
          >
            Đánh giá ngay
          </button>
          {isAuthenticated && user?.role === "user" ? (
            <ModalReviews
              open={openModal}
              onClose={() => setOpenModal(false)}
              product={product}
            />
          ) : (
            <LoginCheckModal open={openLoginModal} setOpen={setOpenLoginModal} />
          )}
        </div>
      </div>

      {/* Danh sách nhận xét */}
      <div className="mt-[30px] w-full">
        {ratingSort.length > 0 ? (
          ratingSort.slice(0, visibleRatingsCount).map((rating) => (
            <div key={rating?._id} className="border-b border-[#919EAB] opacity-75 mb-4 pb-4">
              <div className="flex">
                <div className="flex items-center">
                  {/* Hiển thị chữ cái đầu tiên */}
                  <p
                    className="text-white rounded-full font-semibold h-8 w-8 flex items-center justify-center mr-2"
                    style={{ backgroundColor: generateRandomColor(rating?.userId?._id) }}
                  >
                    {rating?.userId?.username[0]?.toUpperCase()}
                  </p>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-semibold">{rating?.userId?.username}</span>
                      <p className="flex items-center text-[#707070] text-[12px] gap-1 pt-1 text-right">
                        <FaRegClock className="flex" />
                        {rating?.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin comment */}
              <div className="ml-10 px-4 pt-2 w-[calc(100%-40px)]">
                <div className="text-[12px] gap-2 items-center">
                  <Rating
                    value={rating?.rating} // Điểm đánh giá của người dùng
                    readOnly
                    size="small"
                  />
                </div>
                <div className="flex flex-col justify-between text-[12px] mt-2">
                  <div className="w-full text-[13px]">
                    <p>{rating?.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-4">Hãy là người đầu tiên đánh giá sản phẩm này của chúng tôi!!!</div>
        )}

        {ratingSort.length > visibleRatingsCount && (
          <div className="text-center mt-4">
            <button
              className="bg-red-500 text-white px-8 py-2 rounded-lg text-[13px] hover:underline transition duration-200 font-medium"
              onClick={() => setVisibleRatingsCount(visibleRatingsCount + 5)}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentClient;