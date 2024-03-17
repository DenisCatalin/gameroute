import React from "react";
import { Maps, MapsState } from "../utils/constants";
import GameItem from "./GameItem";

const CounterStrikeHomepage = () => {
  return (
    <div className="group transition w-full flex flex-wrap items-center justify-between min-h-80dvh px-6 lg2:px-0">
      {Maps.map((map: MapsState, index: number) => (
        <React.Fragment key={index}>
          <GameItem name={map.name} logo={map.logo} image={map.image} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CounterStrikeHomepage;
