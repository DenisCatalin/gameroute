"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import OpacityImage from "../utils/OpacityImage";
import { useSelector, useDispatch } from "react-redux";
import { setShowGallery } from "../redux/app.slice";

const GalleryWrapper = () => {
  const gallery = useSelector((state: any) => state.app.gallery);
  const showGallery = useSelector((state: any) => state.app.showGallery);
  const dispatch = useDispatch();
  const handleCloseGallery = () => {
    dispatch(setShowGallery(false));
  };
  return (
    <>
      {showGallery && (
        <div className="z-1000 absolute top-0 left-0 w-full h-full bg-dark flex items-center justify-center">
          <button
            className="absolute w-12 h-12 top-5 left-90percent bg-main shadow-normal rounded-small"
            onClick={handleCloseGallery}
          >
            X
          </button>
          <div className="w-142 h-142 flex items-center justify-center lg:w-152 lg:h-148">
            <Carousel className="w-full h-full flex items-center justify-center">
              <CarouselContent>
                {gallery.map((photo: string, index: number) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center relative rounded-regular overflow-hidden"
                  >
                    <div className="w-142 h-142 rounded-regular lg:w-152 lg:h-148">
                      <OpacityImage src={photo} fittment="contain" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryWrapper;
