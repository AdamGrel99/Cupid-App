import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { addAlbumPage } from "../../features/wedding/historyAlbumSlice";

interface AlbumNavigatorProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}

const AlbumNavigator: React.FC<AlbumNavigatorProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const albumStack = useSelector(
    (state: RootState) => state.historyAlbum.albumStack
  );

  // test
  console.log(currentPage);
  console.log(albumStack);

  const handleAddPage = () => {
    const newPage = {
      pageNumber: albumStack.length + 1,
      images: [],
    };
    dispatch(addAlbumPage(newPage));
    setCurrentPage(albumStack.length + 1);
  };

  const handleNextPage = () => {
    if (currentPage < albumStack.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        Strona {currentPage} / {albumStack.length}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === albumStack.length}
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
