import React from "react";

type Props = {
  item: "page" | "location" | "tag";
};

const NotFound = ({ item }: Props) => {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center">
      <h1 className="font-bold">Oh, no!</h1>
      <h2 className="font-bold">The {item} you are looking for has not been found.</h2>
    </div>
  );
};

export default NotFound;
