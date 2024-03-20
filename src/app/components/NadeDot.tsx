"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type PositionsProps = {
  top: number;
  left: number;
};

type Props = {
  positionData: PositionsProps;
  nade: string;
  positionName: string;
};

const NadeDot = ({ nade, positionData, positionName }: Props) => {
  const { top, left } = positionData;

  console.log(top, left);

  const getBorderColor = () => {
    switch (nade) {
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
            className={`bg-dark rounded-full bg-dark border-4 ${getBorderColor()} absolute transform -translate-x-1/2 -translate-y-1/2 lg:w-8 lg:h-8 md:w-6 md:h-6 xsm:w-4 xsm:h-4 cursor-pointer hover:bg-success transition`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{positionName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NadeDot;
