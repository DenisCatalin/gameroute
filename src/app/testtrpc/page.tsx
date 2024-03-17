"use client";

import React from "react";
import { trpc } from "../_trpc/client";

const TestTRPCpage = () => {
  const nades = trpc.getNades.useQuery();
  const resources = trpc.getResources.useQuery();

  const getNades = () => {
    console.log(nades.data);
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
    </div>
  );
};

export default TestTRPCpage;
