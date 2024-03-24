"use client";

import React from "react";
import { FaFire } from "react-icons/fa";
import { GiCornerExplosion } from "react-icons/gi";
import { SiStackblitz } from "react-icons/si";
import { HiMiniCloud } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ms from "ms";
import NadeWrapper from "./NadeWrapper";
import { useDispatch } from "react-redux";
import { setAppNades, setAppShowNadeWrapper } from "../redux/app.slice";

export type PositionsProps = {
  top: number;
  left: number;
};

type Props = {
  nadeData: any;
  type: "Smoke" | "Molotov" | "Grenade" | "Flashbang" | string;
  team: string;
};

const NadeDot = ({ nadeData, type, team }: Props) => {
  const { top, left, position, grenades } = nadeData;
  const dispatch = useDispatch();

  const getBorderColor = () => {
    switch (type) {
      case "Molotov":
        return "border-orange-400";
      case "Smoke":
        return "border-green-300";
      case "Grenade":
        return "border-red-500";
      case "Flashbang":
        return "border-main";
    }
  };

  const styles = {
    top: `${top}%`,
    left: `${left}%`,
  };

  const handleClick = () => {
    // grenades.map((grenade: any) => {
    //   console.log("Type:", grenade.type);
    //   console.log("Description:", grenade.description);
    //   console.log("Video:", grenade.video);
    //   console.log(
    //     "Gallery:",
    //     grenade.gallery !== "No images" ? JSON.parse(grenade.gallery) : grenade.gallery
    //   );
    //   console.log("Created At:", ms(grenade.createdAt / 10000));
    //   console.log("----------------------");
    // });
    dispatch(setAppShowNadeWrapper(true));
    dispatch(setAppNades(grenades));
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              animate={{ opacity: [0, 1] }}
              initial={{ opacity: 0 }}
              style={styles}
              onClick={handleClick}
              className={`bg-dark rounded-full border-4 flex items-center justify-center ${getBorderColor()} absolute transform -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 md:w-6 md:h-6 xsm:w-4 xsm:h-4 cursor-pointer hover:bg-coverLight transition`}
            >
              {type === "Grenade" && <GiCornerExplosion className="w-7 h-7 text-red-500" />}
              {type === "Molotov" && <FaFire className="w-7 h-7 text-orange-400" />}
              {type === "Flashbang" && <SiStackblitz className="w-7 h-7 text-main" />}
              {type === "Smoke" && <HiMiniCloud className="w-7 h-7 text-green-300" />}
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{team === "All teams" ? `${position}` : `${position} - ${team}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default NadeDot;
