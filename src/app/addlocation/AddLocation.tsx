"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import OpacityImage from "../utils/OpacityImage";

type Props = {
  setSelectedImages: any;
  selectedImages: any;
};

const AddLocation = ({ setSelectedImages, selectedImages }: Props) => {
  const onDrop = useCallback((acceptedFiles: any, _rejectedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      setSelectedImages((prevState: any) => [...prevState, file]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const removeImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <div className="transition w-full h-auto flex flex-col justify-center items-center p-4 lg:w-152 md:w-128">
      <div
        className="transition w-full rounded-regular border-2 border-dashed border-main h-32 flex items-center justify-center p-4"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="font-bold text-dark dark:text-light">Drop file(s) here ...</p>
        ) : (
          <p className="font-bold text-dark dark:text-light">
            Drag and drop file(s) here, or click to select files
          </p>
        )}
      </div>
      <div className="w-full h-96 rounded-regular flex justify-center flex-wrap items-center gap-8 overflow-auto bg-coverLight dark:bg-coverDark p-4 mt-4">
        {selectedImages.length > 0 &&
          selectedImages.map((image: any, index: number) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="w-60 h-60 relative">
                <OpacityImage src={`${URL.createObjectURL(image)}`} fittment="contain" />
              </div>
              <button
                className="bg-main w-24 h-8 rounded-small shadow-normal z-50 mt-4"
                onClick={() => removeImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddLocation;
