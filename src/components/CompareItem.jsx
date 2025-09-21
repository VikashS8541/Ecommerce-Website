import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareProvider";

export default function CompareItem({ isOpen, onClose }) {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[80%] mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-between items-center border-b px-4 py-3">
                <Dialog.Title className="font-semibold heading-color">
                  Compare Products ({compareList.length})
                </Dialog.Title>
                <button onClick={onClose} className="heading-color">
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {compareList.length === 0 ? (
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                    <div className="flex items-center gap-3 heading-color">
                      <span>No products in your compare list yet.</span>
                    </div>
                    <Link
                      to="/products"
                      onClick={onClose}
                      className="w-full bg-[#212529] text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-500 transition duration-200 w-max focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      Browse products
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {compareList.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 w-64 flex flex-col items-center">
                          <img
                            src={item.thumbnail || item.image || "https://via.placeholder.com/100x100?text=No+Image"}
                            alt={item.title}
                            className="w-32 h-32 object-contain mb-2"
                          />
                          <div className="font-semibold mb-1 text-center">{item.title}</div>
                          <div className="text-gray-600 mb-1">${item.price?.toFixed(2) || '—'}</div>
                          <button className="flex items-center gap-1 text-red-600 hover:underline mt-2" onClick={() => removeFromCompare(item.id)}>
                            <DeleteOutlineIcon fontSize="small" /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={clearCompare} disabled={compareList.length === 0}>
                      Clear Compare List
                    </button>
                  </>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
