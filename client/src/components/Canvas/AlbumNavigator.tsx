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

export interface ImageProps {
  x: number;
  y: number;
  rotation: number;
  height: number;
  width: number;
  src: string;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}

interface AlbumNavigatorProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  images: ImageProps[];
  setImages: React.Dispatch<React.SetStateAction<ImageProps[]>>;
}

const AlbumNavigator: React.FC<AlbumNavigatorProps> = ({
  currentPage,
  setCurrentPage,
  images,
  setImages,
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
        onSelect: () => {}, // Możesz dostosować tę funkcję
        onDeselect: () => {}, // Możesz dostosować tę funkcję
      }));
      setImages(updatedImages);
    } else {
      setImages([]);
    }
  }, [currentPage, albumStack, setImages]);

  // test
  // console.log("Current Page");
  // console.log(currentPage);
  // console.log("Album");
  // console.log(albumStack);
  console.log("Images");
  console.log(images);

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

  // const handleNextPage = () => {
  //   if (currentPage < albumStack.length) {
  //     const currentPageData = albumStack.find((page) => page.pageNumber === currentPage);
  //     if (!currentPageData?.images.length) {
  //       handleAddImages(images);
  //     }
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     const currentPageData = albumStack.find((page) => page.pageNumber === currentPage);
  //     if (!currentPageData?.images.length) {
  //       handleAddImages(images);
  //     }
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const handleAddImages = (images: ImageProps[]) => {
    dispatch(clearImagesOnPage(currentPage));
    images.forEach((image, index) => {
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
