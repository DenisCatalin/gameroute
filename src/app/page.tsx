"use client";

import { setAppCurrentGame } from "./redux/app.slice";
import OpacityImage from "./utils/OpacityImage";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const goToPage = (game: string) => {
    dispatch(setAppCurrentGame(game));
    router.push(`/${game}`);
  };

  return (
    <main className="transition w-full min-h-80dvh bg-light dark:bg-dark px-4 lg2:px-0 flex items-center justify-between">
      <div
        className="w-1/2 h-80dvh mt-4 mr-2 relative rounded-regular overflow-hidden group cursor-pointer shadow-headerLightShadow dark:shadow-headerDarkShadow"
        onClick={() => goToPage("gta")}
      >
        <OpacityImage src={"/static/gta.jpg"} fittment="cover" />
        <div className="flex flex-col items-center justify-center p-6 rounded-regular absolute w-full h-full bg-cardHover top-0 left-0 transform translate-x-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          <h1 className="font-bold text-light text-3xl leading-10">RAGE:MP - GRAND RP - EN1</h1>
          <h1 className="font-bold text-light text-3xl">LOCATIONS FOR RESOURCES</h1>
        </div>
      </div>
      <div
        className="w-1/2 h-80dvh mt-4 ml-2 relative rounded-regular overflow-hidden group cursor-pointer shadow-headerLightShadow dark:shadow-headerDarkShadow"
        onClick={() => goToPage("cs")}
      >
        <OpacityImage src={"/static/cs.jpg"} fittment="cover" />
        <div className="flex flex-col items-center justify-center p-6 rounded-regular absolute w-full h-full bg-cardHover top-0 left-0 transform -translate-x-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          <h1 className="font-bold text-light text-3xl leading-10">COUNTER-STRIKE2</h1>
          <h1 className="font-bold text-light text-3xl">GRENADES ON ALL MAPS</h1>
        </div>
      </div>
    </main>
  );
}
