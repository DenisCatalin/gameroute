import React from "react";
import GameItem from "./GameItem";

type ItemsState = {
  name: string;
  logo: string;
  image: string;
};

const ITEMS: ItemsState[] = [
  {
    name: "Scrap",
    logo: "/static/scrap.png",
    image: "/static/scrapMetal.jpg",
  },
  {
    name: "Statues",
    logo: "/static/statues.png",
    image: "/static/statues.png",
  },
  {
    name: "Treasures",
    logo: "/static/treasures.png",
    image: "/static/treasuresMask.jpg",
  },
  {
    name: "Animal-skins",
    logo: "/static/animal-skins.png",
    image: "/static/animalSkin.jpg",
  },
];

const GTAHomepage = () => {
  return (
    <div className="group transition w-full flex flex-wrap items-center justify-between min-h-80dvh px-6 lg2:px-0">
      {ITEMS.map((map: ItemsState, index: number) => (
        <React.Fragment key={index}>
          <GameItem name={map.name} logo={map.logo} image={map.image} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default GTAHomepage;
