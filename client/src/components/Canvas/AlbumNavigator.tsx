import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { HistoryPageStack } from "../../models/canvas/HistoryPageStack";
import { addToStack } from "../../features/wedding/historyPageSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const AlbumNavigator: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const historyPageStack = useSelector(
    (state: RootState) => state.historyPage.stackElements
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handleAddPage = () => {
    const newPage: HistoryPageStack = {
      pageNumber: historyPageStack.length + 1,
      images: [],
    };
    dispatch(addToStack(newPage));
    setCurrentPage(historyPageStack.length + 2); // Przejdź do nowo dodanej strony
  };

  // const handleRemovePage = () => {
  //   if (historyPageStack.length > 0) {
  //     dispatch(removeFromStack());
  //     setCurrentPage((prev) => Math.max(prev - 1, 0)); // Zmniejsz numer strony
  //   }
  // };

  const handleNextPage = () => {
    if (currentPage < historyPageStack.length + 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // const handleUndo = () => {
  //   dispatch(removeFromStack());
  //   setCurrentPage((prev) => Math.max(prev - 1, 0));
  // };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300"
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <span className="text-lg font-semibold">
        Strona {currentPage} / {historyPageStack.length + 1}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === historyPageStack.length + 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300"
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>

      <button
        onClick={handleAddPage}
        className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {/* <button
        onClick={handleRemovePage}
        disabled={historyPageStack.length === 0}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
      >
        <FontAwesomeIcon icon={faX} />
      </button> */}

      {/* <button
        onClick={handleUndo}
        disabled={historyPageStack.length === 0}
        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300"
      >
        <FontAwesomeIcon icon={faRotateLeft} />
      </button> */}
    </div>
  );
};

export default AlbumNavigator;
