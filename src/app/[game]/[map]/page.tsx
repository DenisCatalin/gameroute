"use client";

import { Maps, MapsState, hardcodedPositions } from "@/app/utils/constants";
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
  nukePositionsUpper,
  nukePositionsLower,
  vertigoPositionsUpper,
  vertigoPositionsLower,
  overpassPositions,
  miragePositions,
  infernoPositions,
} from "@/app/utils/constants";
import NadeDot from "@/app/components/NadeDot";

const Buttons = ["Molotov", "Smoke", "Flashbang", "Grenade"];
const Teams = ["All teams", "CT", "T"];

type PositionFromDB = {
  map: string;
  position: string;
  team: string;
  grenades: {
    type: string;
    description: string;
    video: string;
    gallery: string;
    createdAt: string;
  }[];
};

const CSRadarPage = () => {
  const router = useRouter();
  const params = useParams<{ game: string; map: string }>();
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const [callouts, setCallouts] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("All positions");
  const [nade, setNade] = useState<string>("Smoke");
  const [team, setTeam] = useState<string>("All teams");
  const [map, setMap] = useState<string>(params.map);
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
      case "Nuke": {
        setCallouts(nukePositionsUpper);
        setMap("Nuke_Upper");
        return;
      }
      case "Vertigo": {
        setMap("Vertigo_Upper");
        setCallouts(vertigoPositionsUpper);
        return;
      }
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
    setLocation("All positions");
    if (params.map === "Nuke") {
      if (index === 0) {
        setCallouts(nukePositionsUpper);
        setMap("Nuke_Upper");
      } else if (index === 1) {
        setCallouts(nukePositionsLower);
        setMap("Nuke_Lower");
      }
    }
    if (params.map === "Vertigo") {
      if (index === 0) {
        setCallouts(vertigoPositionsUpper);
        setMap("Vertigo_Upper");
      } else if (index === 1) {
        setCallouts(vertigoPositionsLower);
        setMap("Vertigo_Lower");
      }
    }
  }, [index]);

  const [positions, setPositions] = useState<{ top: string; left: string; position: string }[]>([]);

  const positionsFromDB: PositionFromDB[] = [];

  useEffect(() => {
    vertigoPositionsUpper.forEach(position => {
      positionsFromDB.push({
        map: map,
        position: position,
        team: "All teams",
        grenades: [
          {
            type: "Molotov",
            description: "Description 1",
            video: "Video 1",
            gallery: "Gallery 1",
            createdAt: "Date 1",
          },
        ],
      });
    });

    vertigoPositionsLower.forEach(position => {
      positionsFromDB.push({
        map: map,
        position: position,
        team: "All teams",
        grenades: [
          {
            type: "Molotov",
            description: "Description 1",
            video: "Video 1",
            gallery: "Gallery 1",
            createdAt: "Date 1",
          },
        ],
      });
    });

    const filteredPositions = positionsFromDB
      .filter(position =>
        position.grenades.some(
          grenade =>
            grenade.type === nade &&
            position.map === map &&
            (location === "All positions" || position.position === location) &&
            (team === "All teams" || position.team === team) &&
            hardcodedPositions[position.map] &&
            hardcodedPositions[position.map][position.position]
        )
      )
      .map(position => ({
        top: hardcodedPositions[position.map][position.position].top,
        left: hardcodedPositions[position.map][position.position].left,
        team: team,
        grenades: position.grenades.filter(grenade => grenade.type === nade),
        position: position.position,
      }));

    setPositions(filteredPositions);
  }, [nade, location, team, map]);

  const changeRadar = () => {
    if (index === 0) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg3:flex-row lg3:items-stretch lg3:justify-start">
      <div className="transition mt-6 mb-6 w-90percent static h-110 py-6 flex flex-col items-center justify-evenly rounded-regular bg-coverLight shadow-headerLightShadow dark:bg-coverDark dark:shadow-headerDarkShadow ml-0 lg3:ml-16 lg3:fixed lg3:top-35percent lg3:left-75percent lg3:w-72 lg3:h-96">
        {(params.map === "Vertigo" && (
          <button
            onClick={changeRadar}
            className="w-24 h-12 bg-main rounded-regular flex items-center justify-center"
          >
            Change
          </button>
        )) ||
          (params.map === "Nuke" && (
            <button
              onClick={changeRadar}
              className="w-24 h-12 bg-main rounded-regular flex items-center justify-center"
            >
              Change
            </button>
          ))}
        <div className="w-24 h-24 relative">
          {mapData.logo.length > 0 && <OpacityImage src={mapData.logo} fittment="cover" />}
        </div>
        <Select options={Teams} value={team} select={setTeam} styles="w-60" />
        <Select options={callouts} value={location} select={setLocation} styles="w-60" />
        <Select options={Buttons} value={nade} select={setNade} styles="w-60" />
      </div>
      <div className="max-w-full lg2:w-192">
        <div className="w-full relative">
          {mapData.radar && mapData.radar[index] && (
            <img src={mapData.radar[index]} className="w-full" />
          )}
          {positions.map((data: any, index: number) => (
            <div key={index}>
              <NadeDot nadeData={data} type={nade} team={team} />
            </div>
          ))}
          {/* <div
            className={`bg-dark top-66percent left-31percent rounded-full border-4 flex items-center justify-center border-main absolute transform -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 md:w-6 md:h-6 xsm:w-4 xsm:h-4 cursor-pointer hover:bg-coverLight transition`}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CSRadarPage;
