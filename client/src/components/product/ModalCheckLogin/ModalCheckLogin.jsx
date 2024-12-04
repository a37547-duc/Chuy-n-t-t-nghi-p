/* eslint-disable react/prop-types */
import { Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
// import { useState } from "react";

const LoginCheckModal = ({ open, setOpen }) => {
  const handleCloseLoginModal = () => setOpen(false); // Đóng modal

  return (
    <Modal
      open={open}
      onClose={handleCloseLoginModal}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "24rem",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "0.5rem",
        }}
        className="text-center"
      >
        {/* Nút đóng */}
        <button
          onClick={handleCloseLoginModal}
          className="absolute top-2 right-4 text-gray-600 text-2xl font-bold cursor-pointer focus:outline-none"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Nội dung Modal */}
        <img
          src="/path-to-your-image.png" // Thay thế bằng đường dẫn hình ảnh của bạn
          alt="Logo"
          className="w-20 mx-auto"
        />
        <p
          id="login-modal-description"
          className="text-base mt-4 text-gray-700"
        >
          Vui lòng đăng nhập tài khoản để đánh giá.
        </p>

        {/* Nút hành động */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-4 py-2 border border-red-600 text-red-600 font-medium rounded focus:outline-none hover:bg-red-50"
          >
            Đăng ký
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-red-600 text-white font-medium rounded focus:outline-none hover:bg-red-700"
          >
            Đăng nhập
          </Link>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginCheckModal;
