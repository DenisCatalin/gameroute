"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ResourceName = () => {
  const router = useRouter();

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center">
      <h1>
        Oops! If you landed on this page it might be not what you are looking for. Go back to
        homepage locations list by clicking the button below
      </h1>
      <button
        onClick={() => router.push("/gta")}
        className="mt-8 flex items-center justify-center w-24 h-12 font-bold p-2 rounded-regular bg-main text-light"
      >
        BACK
      </button>
    </div>
  );
};

export default ResourceName;
