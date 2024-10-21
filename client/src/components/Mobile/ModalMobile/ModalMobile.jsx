import Modal from "react-modal";
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const ModalMobile = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`fixed inset-0 flex items-center justify-center pt-4 z-[9999]
      transition-transform transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      duration-300 ease-in-out`}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[999]"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="bg-white rounded-lg shadow-md h-full w-full relative z-[9999]">
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

export default ModalMobile;
