"use client";

import { Locations, Maps, MapsState } from "@/app/utils/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { setAppCurrentGame, setAppCurrentGameItem } from "@/app/redux/app.slice";
import OpacityImage from "@/app/utils/OpacityImage";
import Select from "@/app/interface/Select";

const Buttons = ["MOLOTOV", "SMOKE", "FLASHBANG", "GRENADE"];

const CSRadarPage = () => {
  const router = useRouter();
  const params = useParams<{ game: string; map: string }>();
  const app = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const [location, setLocation] = useState<string>("Yo");
  const [nade, setNade] = useState<string>("");
  const [mapData, setMapData] = useState<MapsState>({
    name: "",
    logo: "",
    image: "",
    radar: [""],
  });

  console.log(app);

  useEffect(() => {
    const isNameFound = Maps.findIndex(map => map.name === params.map);
    if (isNameFound !== -1) {
      console.log("Found");
      setMapData(Maps[isNameFound]);
      dispatch(setAppCurrentGame("cs"));
      dispatch(setAppCurrentGameItem(params.map));
    } else {
      router.push("/cs");
    }
  }, []);

  useEffect(() => {
    if (mapData.radar && mapData.radar.length > 0) {
      console.log(mapData.radar[0]);
    }
  }, [mapData]);

  return (
    <div className="w-full h-auto flex items-center justify-center relative overflow-hidden">
      {/* <div className="w-72 h-110 py-6 flex flex-col items-center justify-evenly ml-4 rounded-regular bg-coverLight shadow-headerLightShadow dark:bg-coverDark dark:shadow-headerDarkShadow">
        <div className="w-32 h-32 relative">
          {mapData.logo.length > 0 && <OpacityImage src={mapData.logo} fittment="cover" />}
        </div>
        <Select options={Locations} value={location} select={setLocation} styles="w-60" />
        {Buttons.map((button: string, index: number) => (
          <button
            key={index}
            className="w-40 h-16 hover:bg-main font-bold text-xl rounded-regular transition text-dark dark:text-light hover:text-light"
            onClick={(e: any) => setNade(e.target.textContent)}
          >
            {button}
          </button>
        ))}
      </div> */}
      <div className="w-152 h-152 relative rounded-regular relative">
        {mapData.radar && mapData.radar[0] && (
          <OpacityImage src={mapData.radar[0]} fittment="contain" />
        )}
      </div>
    </div>
  );
};

export default CSRadarPage;
