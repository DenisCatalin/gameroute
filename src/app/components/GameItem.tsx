import OpacityImage from "@/app/utils/OpacityImage";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppCurrentGameItem } from "../redux/app.slice";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";

type Props = {
  name: string;
  logo: string;
  image: string;
  countNades?: number;
};

const GameItem = ({ name, logo, image, countNades }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const currentGame = useSelector((state: RootState) => state.app.currentGame);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(setAppCurrentGameItem(name));
    if (currentGame === "cs") {
      router.push(`/${currentGame}/${name}`);
    }
    if (currentGame === "gta") {
      router.push(`/${currentGame}/resources/${name.toLocaleLowerCase()}`);
    }
  };

  return (
    <>
      {currentGame === "cs" && (
        <div
          className="transition mt-2 w-full h-80 rounded-regular relative flex flex-col items-center justify-between py-6 px-2 overflow-hidden cursor-pointer shadow-headerLightShadow dark:shadow-headerDarkShadow md3:w-14percent md3:h-80dvh sm:w-1/2 sm:w-49percent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <OpacityImage src={image} fittment="cover" />
          <div
            className={`w-full h-full flex flex-col items-center justify-between p-6 rounded-regular absolute w-full h-full bg-cardHover top-0 left-0 transform ${
              isHovered ? "" : "opacity-0"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="relative w-40 h-40">
              <OpacityImage src={logo} fittment="contain" />
            </div>
            <h1 className="font-bold text-light text-3xl text-center">{countNades} NADES</h1>
          </div>
        </div>
      )}
      {currentGame === "gta" && (
        <div
          className="transition mt-2 w-full h-80 rounded-regular relative flex flex-col items-center justify-between py-6 px-2 overflow-hidden cursor-pointer shadow-headerLightShadow dark:shadow-headerDarkShadow md3:w-24percent md3:h-80dvh sm:w-1/2 sm:w-49percent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <OpacityImage src={image} fittment="cover" />
          <div
            className={`w-full h-full flex flex-col items-center justify-between p-6 rounded-regular absolute w-full h-full bg-black/80 dark:bg-black/85 top-0 left-0 transform ${
              isHovered ? "" : "opacity-0"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="relative w-24 h-24">
              <OpacityImage src={logo} fittment="contain" />
            </div>
            <h1 className="font-bold text-light text-3xl text-center">{name.toUpperCase()}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default GameItem;
