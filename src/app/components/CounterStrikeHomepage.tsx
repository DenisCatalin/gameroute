"use client";

import React, { Suspense } from "react";
import { Maps } from "../utils/constants";
import GameItem from "./GameItem";
import { trpc } from "../_trpc/client";
import { MapsState } from "../utils/types";
import Loading from "./Loading";

const CounterStrikeHomepage = () => {
  const getNades = trpc.getNades.useQuery();
  const nades = getNades.data;

  const countNadesForMap = (mapName: string) => {
    if (mapName === "Nuke" || mapName === "Vertigo") {
      const matchingEntries = nades?.filter(entry => entry.nadeMap.startsWith(mapName));

      if (matchingEntries) {
        return matchingEntries.reduce(
          (total, entry) => total + JSON.parse(entry.nadeGrenades).length,
          0
        );
      } else {
        return 0;
      }
    } else {
      const mapNades = nades?.filter(entry => entry.nadeMap === mapName);

      if (mapNades) {
        return mapNades.reduce((total, entry) => total + JSON.parse(entry.nadeGrenades).length, 0);
      } else {
        return 0;
      }
    }
  };

  return (
    <div className="group transition w-full flex flex-wrap items-center justify-between min-h-80dvh px-6 lg2:px-0">
      {Maps.map((map: MapsState, index: number) => (
        <React.Fragment key={index}>
          <Suspense fallback={<Loading />}>
            <GameItem
              name={map.name}
              logo={map.logo}
              image={map.image}
              countNades={getNades.status === "loading" ? <Loading /> : countNadesForMap(map.name)}
            />
          </Suspense>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CounterStrikeHomepage;
