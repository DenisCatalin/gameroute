"use client";

import React from "react";
import { trpc } from "../_trpc/client";

type Props = {
  nadeID: number;
  nadeMap: string;
  nadePosition: string;
  nadeGrenades: string;
  nadeTeam: string;
};

const TestTRPCpage = () => {
  const resources = trpc.getResources.useQuery();
  // const deleteNade = trpc.deleteNade.useQuery({ id: 19 });
  const nades = trpc.getNades.useQuery();
  const updateNadeQuery = trpc.updateNade.useMutation({
    onSettled: () => {
      nades.refetch();
    },
  });
  const addNadeQuery = trpc.addNade.useMutation({
    onSettled: () => {},
  });

  const getNades = () => {
    console.log(nades.data);
  };

  const addNade = async () => {
    const getCorrectNade = nades.data?.find((nadeItem: Props) => {
      return (
        nadeItem.nadeMap === "Anubis" &&
        nadeItem.nadePosition === "Heaven" &&
        nadeItem.nadeTeam === "All teams"
      );
    });
    if (getCorrectNade) {
      const grenades = JSON.parse(getCorrectNade.nadeGrenades);
      const grenadeToAdd = {
        type: "Smoke",
        description: "Description 3",
        video: "Video 3",
        gallery: "Gallery 3",
        createdAt: "Date 3",
      };
      grenades.push(grenadeToAdd);
      await updateNadeQuery.mutate({
        id: getCorrectNade.nadeID,
        grenades: JSON.stringify(grenades),
      });
    } else {
      addNadeQuery.mutate({
        map: "Anubis",
        position: "Heaven",
        team: "All teams",
        grenades: JSON.stringify([
          {
            type: "Smoke",
            description: "Description 3",
            video: "Video 3",
            gallery: "Gallery 3",
            createdAt: "Date 3",
          },
        ]),
      });
    }
  };

  const getResources = () => {
    console.log(resources.data);
  };
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <button
        onClick={getNades}
        className="mt-12 w-52 flex items-center justify-center font-bold p-4 h-12 bg-main rounded-regular"
      >
        GET NADES
      </button>
      <button
        onClick={getResources}
        className="mt-12 w-52 flex items-center justify-center font-bold p-4 h-12 bg-main rounded-regular"
      >
        GET RESOURCES
      </button>
      <button
        onClick={addNade}
        className="mt-12 w-52 flex items-center justify-center font-bold p-4 h-12 bg-main rounded-regular"
      >
        ADD NADE
      </button>
    </div>
  );
};

export default TestTRPCpage;
