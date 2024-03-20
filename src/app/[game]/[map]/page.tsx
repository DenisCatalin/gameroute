"use client";

import { Maps, MapsState } from "@/app/utils/constants";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { setAppCurrentGame, setAppCurrentGameItem } from "@/app/redux/app.slice";
import OpacityImage from "@/app/utils/OpacityImage";
import Select from "@/app/interface/Select";
import { FaCircleInfo } from "react-icons/fa6";
import {
  anubisPositions,
  ancientPositions,
  nukePositions1,
  nukePositions2,
  vertigoPositions1,
  vertigoPositions2,
  overpassPositions,
  miragePositions,
  infernoPositions,
} from "@/app/utils/constants";
import NadeDot, { PositionsProps } from "@/app/components/NadeDot";

const Buttons = ["MOLOTOV", "SMOKE", "FLASHBANG", "GRENADE"];

type PositionFromDB = {
  map: string;
  position: string;
  type: string;
};

interface HardcodedPositions {
  [key: string]: {
    [key: string]: {
      top: string;
      left: string;
    };
  };
}

const CSRadarPage = () => {
  const router = useRouter();
  const params = useParams<{ game: string; map: string }>();
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const [callouts, setCallouts] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("All positions");
  const [nade, setNade] = useState<string>("");
  const [mapData, setMapData] = useState<MapsState>({
    name: "",
    logo: "",
    image: "",
    radar: [""],
  });

  useEffect(() => {
    const isNameFound = Maps.findIndex(map => map.name === params.map);
    if (isNameFound !== -1) {
      setMapData(Maps[isNameFound]);
      dispatch(setAppCurrentGame("cs"));
      dispatch(setAppCurrentGameItem(params.map));
    } else {
      router.push("/cs");
    }
  }, []);

  useEffect(() => {
    switch (params.map) {
      case "Anubis":
        return setCallouts(anubisPositions);
      case "Ancient":
        return setCallouts(ancientPositions);
      case "Nuke":
        return setCallouts(nukePositions1);
      case "Vertigo":
        return setCallouts(vertigoPositions1);
      case "Mirage":
        return setCallouts(miragePositions);
      case "Inferno":
        return setCallouts(infernoPositions);
      case "Overpass":
        return setCallouts(overpassPositions);
      default:
        return setCallouts([]);
    }
  }, [params.map]);

  useEffect(() => {
    if (params.map === "Nuke") {
      if (index === 0) setCallouts(nukePositions1);
      else if (index === 1) setCallouts(nukePositions2);
    }
    if (params.map === "Vertigo") {
      if (index === 0) setCallouts(vertigoPositions1);
      else if (index === 1) setCallouts(vertigoPositions2);
    }
  }, [index]);

  const [positions, setPositions] = useState<{ top: string; left: string; position: string }[]>([]);

  // Mocked data similar to your hardcodedPositions object
  const hardcodedPositions: HardcodedPositions = {
    Anubis: {
      Heaven: { top: "34", left: "23" },
      Heaven2: { top: "65", left: "45" },
    },
    Nuke: {
      Ramp: { top: "34", left: "23" },
      Hell: { top: "65", left: "45" },
    },
    // Add more maps and positions here as needed
  };

  useEffect(() => {
    // Mocked data from database response
    const positionsFromDB: PositionFromDB[] = [
      { map: "Anubis", position: "Heaven", type: "Smoke" },
      { map: "Anubis", position: "Heaven2", type: "Smoke" },
      { map: "Anubis", position: "Heaven2", type: "Molotov" },
      { map: "Nuke", position: "Ramp", type: "Molotov" },
      // Add more positions from DB here
    ];

    // Filter positions from DB based on type and hardcoded positions
    const filteredPositions = positionsFromDB
      .filter(
        position =>
          position.type === "Smoke" &&
          position.map === "Anubis" &&
          hardcodedPositions[position.map] &&
          hardcodedPositions[position.map][position.position]
      )
      .map(position => ({
        top: hardcodedPositions[position.map][position.position].top,
        left: hardcodedPositions[position.map][position.position].left,
        position: position.position,
      }));

    setPositions(filteredPositions);
    console.log(filteredPositions);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center lg3:flex-row lg3:items-stretch lg3:justify-start">
      <div className="transition mt-6 mb-6 w-90percent static h-110 py-6 flex flex-col items-center justify-evenly rounded-regular bg-coverLight shadow-headerLightShadow dark:bg-coverDark dark:shadow-headerDarkShadow ml-0 lg3:ml-16 lg3:fixed lg3:top-25percent lg3:left-75percent lg3:w-72 lg3:h-110">
        <div className="w-32 h-32 relative">
          {mapData.logo.length > 0 && <OpacityImage src={mapData.logo} fittment="cover" />}
        </div>
        <Select options={callouts} value={location} select={setLocation} styles="w-60" />
        {Buttons.map((button: string, index: number) => (
          <button
            key={index}
            className="w-40 h-16 hover:bg-main font-bold text-xl rounded-regular transition text-dark dark:text-light hover:text-light"
            onClick={(e: any) => setNade(e.target.textContent)}
          >
            {button}
          </button>
        ))}
      </div>
      <div className="max-w-full lg2:w-192">
        <div className="w-full relative">
          {mapData.radar && mapData.radar[index] && (
            <img src={mapData.radar[index]} className="w-full" />
          )}
          {/* <button className="rounded-full fixed top-15percent left-90percent transform -translate-x-1/2 -translate-y-1/2">
            <FaCircleInfo className="w-8 h-8" />
          </button> */}
          {positions.map((data: any, index: number) => (
            <div key={index}>
              <NadeDot positionData={data} nade={"Smoke"} positionName={data.position} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSRadarPage;
