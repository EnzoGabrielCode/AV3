import React from "react";

function Modal({ open, onClose, children }) {
  if (!open) return null; // não renderiza se estiver fechado

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
