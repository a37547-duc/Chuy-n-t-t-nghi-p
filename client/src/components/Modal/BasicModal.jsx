import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const BasicModal = ({ isOpen, onRequestClose, children }) => {
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="bg-white rounded-lg shadow-md max-w-lg w-full p-6 relative">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 w-7 text-red-500 hover:text-red-700 focus:outline-none bg-transparent border-none rounded-lg text-xl font-bold transition duration-200 ease-in-out transform hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faTimes} /> {/* Thay &times; bằng icon */}
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default BasicModal;
