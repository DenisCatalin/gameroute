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
};

const NadeDot = ({ nadeData }: Props) => {
  const { top, left, type, position, description, video, gallery, createdAt } = nadeData;

  console.log(description, video, gallery, createdAt);

  const getBorderColor = () => {
    switch (type) {
      case "Molotov":
        return "border-orange-500";
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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            style={styles}
            className={`bg-dark rounded-full border-4 flex items-center justify-center ${getBorderColor()} absolute transform -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 md:w-6 md:h-6 xsm:w-4 xsm:h-4 cursor-pointer hover:bg-coverLight transition`}
          >
            {type === "Grenade" && <GiCornerExplosion className="w-7 h-7 text-red-500" />}
            {type === "Molotov" && <FaFire className="w-7 h-7 text-orange-500" />}
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
