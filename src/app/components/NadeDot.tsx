"use client";

import React from "react";
import { FaFire } from "react-icons/fa";
import { GiCornerExplosion } from "react-icons/gi";
import { SiStackblitz } from "react-icons/si";
import { HiMiniCloud } from "react-icons/hi2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type PositionsProps = {
  top: number;
  left: number;
};

type Props = {
  nadeData: any;
  type: "Smoke" | "Molotov" | "Grenade" | "Flashbang" | string;
};

const NadeDot = ({ nadeData, type }: Props) => {
  const { top, left, position, grenades } = nadeData;

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
    // Log details for all grenades at this position
    grenades.forEach((grenade: any) => {
      console.log("Type:", grenade.type);
      console.log("Description:", grenade.description);
      console.log("Video:", grenade.video);
      console.log("Gallery:", grenade.gallery);
      console.log("Created At:", grenade.createdAt);
      console.log("----------------------");
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            style={styles}
            onClick={handleClick}
            className={`bg-dark rounded-full border-4 flex items-center justify-center ${getBorderColor()} absolute transform -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 md:w-6 md:h-6 xsm:w-4 xsm:h-4 cursor-pointer hover:bg-coverLight transition`}
          >
            {type === "Grenade" && <GiCornerExplosion className="w-7 h-7 text-red-500" />}
            {type === "Molotov" && <FaFire className="w-7 h-7 text-orange-400" />}
            {type === "Flashbang" && <SiStackblitz className="w-7 h-7 text-main" />}
            {type === "Smoke" && <HiMiniCloud className="w-7 h-7 text-green-300" />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{position}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NadeDot;
