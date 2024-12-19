import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { postRating } from "../../../features/Client/Comment";
import { getCommentsByProductId } from "../../../features/Client/ClientCommentSlice";


/* eslint-disable react/prop-types */
const ModalReviews = ({ open, onClose, product }) => {
  console.log("Product: ",product)
  const dispatch = useDispatch();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const ratingData = {
      productId: product?.product?._id, // ID của sản phẩm
      rating: selectedRating, // Rating (1 đến 5 sao)
      comment: comment,
    };

    // Gửi dữ liệu đến Redux để gửi lên API
    dispatch(postRating(ratingData)).then(() => {
      dispatch(getCommentsByProductId(product?.product?._id));
    });
    onClose();
    setSelectedRating(0);
    setComment("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="rating-modal-title"
      aria-describedby="rating-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white shadow-lg p-4 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-2xl font-bold text-gray-700 hover:text-gray-900 px-2 hover:bg-gray-200 rounded-tr-lg"
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 id="rating-modal-title" className="text-center text-xl font-semibold mb-2">Đánh giá & nhận xét</h2>

        <p id="rating-modal-description" className="text-center text-gray-600 mb-6">{product?.product?.name}</p>

        <div className="text-center mt-4">
          {/* Bọc từng sao và tên trong một div */}
          <div className="flex justify-between max-w-[400px] mx-auto">
            {["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"].map((label, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1"
                onMouseEnter={() => setHoverRating(index + 1)} // Cập nhật hover rating
                onMouseLeave={() => setHoverRating(0)} // Xóa hover khi chuột rời
                onClick={() => setSelectedRating(index + 1)} // Cập nhật giá trị khi click
              >
                {/* Sao tương ứng */}
                <Rating
                  name={`customized-icons-${index}`}
                  value={hoverRating > index || selectedRating > index ? 1 : 0}
                  max={1}
                  size="large"
                  sx={{
                    pointerEvents: "none", // Không cho phép click vào sao (quản lý click từ div)
                  }}
                />
                {/* Tên dưới sao */}
                <span className="text-sm mt-2 whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <textarea
          value={comment} // Đặt giá trị textarea là comment state
          onChange={(e) => setComment(e.target.value)} // Cập nhật comment khi người dùng gõ
          placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm..."
          rows="4"
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <button
          className="w-full bg-red-600 text-white mt-4 py-2 rounded hover:bg-red-700"
          onClick={handleSubmit}
        >
          Gửi đánh giá
        </button>
      </Box>
    </Modal>
  );
};

export default ModalReviews;