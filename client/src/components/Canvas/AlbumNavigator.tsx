import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  addAlbumPage,
  addImageToPage,
  clearImagesOnPage,
} from "../../features/wedding/historyAlbumSlice";
import {
  AlbumNavigatorProps,
  ImageProps,
} from "../../models/canvas/CanvasProps";

const AlbumNavigator: React.FC<AlbumNavigatorProps> = ({
  currentPage,
  setCurrentPage,
  images,
  setImages,
  handleSelect,
  handleDeselect,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const albumStack = useSelector(
    (state: RootState) => state.historyAlbum.albumStack
  );

  useEffect(() => {
    const currentPageData = albumStack.find(
      (page) => page.pageNumber === currentPage
    );
    if (currentPageData) {
      const updatedImages = currentPageData.images.map((image) => ({
        ...image,
        onSelect: () => handleSelect(images.length),
        onDeselect: () => handleDeselect(),
      }));
      setImages(updatedImages);
    } else {
      setImages([]);
    }
  }, [currentPage]);

  const handleAddPage = () => {
    const newPage = {
      pageNumber: albumStack.length + 1,
      images: [],
    };

    dispatch(addAlbumPage(newPage));
    handleAddImages(images);
    setCurrentPage(albumStack.length + 1);
  };

  const handleNextPage = () => {
    if (currentPage < albumStack.length) {
      handleAddImages(images);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handleAddImages(images);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddImages = (images: ImageProps[]) => {
    dispatch(clearImagesOnPage(currentPage));
    images.forEach((image) => {
      const newImage = {
        src: image.src,
        x: image.x,
        y: image.y,
        width: image.width,
        height: image.height,
        rotation: image.rotation,
        isSelected: false,
      };
      dispatch(addImageToPage({ pageNumber: currentPage, image: newImage }));
    });
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
    </div>
  );
};

export default AlbumNavigator;
