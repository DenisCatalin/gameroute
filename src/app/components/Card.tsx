import React from "react";
import OpacityImage from "../utils/OpacityImage";
import { useDispatch } from "react-redux";
import { setAppGallery, setShowGallery } from "../redux/app.slice";
import { useRouter } from "next/navigation";

type CardProps = {
  thumbnail: string;
  name: string;
  gallery: string[];
};

const Card = ({ thumbnail, name, gallery }: CardProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setShowGallery(true));
    dispatch(setAppGallery(gallery));
    router.push(`/scrap/${name}`);
  };
  return (
    <div className="group w-60 h-80 rounded-regular p-2 relative shadow-headerLightShadow dark:shadow-headerDarkShadow overflow-hidden">
      <OpacityImage src={thumbnail} fittment="cover" />
      <div className="rounded-regular absolute w-full h-full bg-cardHover top-0 left-0 transform -translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
        <div className="w-full h-full relative p-4 flex flex-col justify-around items-center">
          <p className="text-center font-bold text-light">{name}</p>
          <button
            onClick={handleClick}
            className="text-center font-bold text-light bg-main rounded-regular p-4"
          >
            GALLERY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
