import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const ProductDetailBottom = () => {
  const [rating, setRating] = useState(2);

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
    console.log("New Rating: ", newRating); // Gửi giá trị rating
  };

  return (
    <div className="flex justify-center mx-auto scroll-mt-[150px] md:scroll-mt-[100px]">
      <Box>
        <Rating
          name="product-rating"
          value={rating}
          onChange={handleRatingChange} // Cập nhật khi người dùng thay đổi
          precision={0.5} // Đánh giá phân số
          size="large" // Kích thước sao
        />
        <p>Đánh giá của bạn: {rating} sao</p>
      </Box>
    </div>
    
  );
};

export default ProductDetailBottom;