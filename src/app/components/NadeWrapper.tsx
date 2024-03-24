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
import {
  NadesProp,
  setAppGallery,
  setAppShowNadeWrapper,
  setShowGallery,
} from "../redux/app.slice";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const NadeWrapper = () => {
  const nadesWrapper = useSelector((state: RootState) => state.app.showNadeWrapper);
  const grenades = useSelector((state: RootState) => state.app.nades);
  const dispatch = useDispatch();
  const handleCloseWrapper = () => {
    dispatch(setAppShowNadeWrapper(false));
  };

  useEffect(() => {
    const body = document.body;
    if (nadesWrapper) {
      body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      body.style.overflow = "auto";
    }
  }, [nadesWrapper]);

  const openGallery = (images: any) => {
    dispatch(setShowGallery(true));
    dispatch(setAppGallery(images));
  };

  return (
    <>
      {nadesWrapper && (
        <div className="z-1000 absolute top-0 left-0 w-full h-screen backdrop-blur bg-blurBgLight dark:bg-blurBgDark flex items-start justify-start px-6">
          <button
            className="absolute w-12 h-12 top-5 left-90percent bg-main shadow-normal rounded-small"
            onClick={handleCloseWrapper}
          >
            X
          </button>
          <div className="w-full h-142 flex flex-wrap items-start gap-4 justify-start overflow-auto p-6 lg:w-full lg:h-148">
            {grenades.map((grenade: NadesProp, index: number) => (
              <div
                className="w-96 h-72 bg-dark rounded-regular overflow-hidden flex items-center justify-center flex-col"
                key={index}
              >
                <div className="w-full h-80">
                  <CldVideoPlayer
                    id={grenade.video}
                    width="1920"
                    height="1080"
                    src={grenade.video}
                  />
                </div>
                <div className="w-full h-32 bg-coverDark flex items-center justify-between p-4">
                  <button
                    className="w-32 h-12 bg-main rounded-regular font-bold"
                    onClick={() => openGallery(grenade.gallery)}
                  >
                    Gallery
                  </button>
                  <h1 className="w-full h-full overflow-auto ml-4 text-center">
                    {grenade.description}
                  </h1>
                </div>
              </div>
            ))}

            {/* <Carousel className="w-full h-full flex items-center justify-center">
              <CarouselContent>
                {nadeGallery.map((photo: string, index: number) => (
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
            </Carousel> */}
          </div>
        </div>
      )}
    </>
  );
};

export default NadeWrapper;
