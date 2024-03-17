export const acceptedRouteNames: string[] = ["scrap", "statues", "treasures"];
export const acceptedRouteGames: string[] = ["cs", "gta"];

export const Locations: string[] = [
  "All locations",
  "Calafia",
  "Sawmill",
  "Timber tunnel",
  "Gino's place",
  "First bridge",
  "Second bridge",
  "Plane",
  "Epsylon",
  "Farm",
  "Chilliad",
  "Ranch",
  "Paleto",
  "FZ",
  "Behind SAHP",
];

export type MapsState = {
  name: string;
  logo: string;
  image: string;
  radar: string[];
};

export const Maps: MapsState[] = [
  {
    name: "Anubis",
    logo: "/static/cs/logo/anubisLogo.png",
    image: "/static/cs/wallpaper/anubis.jpg",
    radar: ["https://assets.csnades.gg/anubis_game_radar_7bada7b5e9.webp"],
  },
  {
    name: "Ancient",
    logo: "/static/cs/logo/ancientLogo.webp",
    image: "/static/cs/wallpaper/ancient.jpg",
    radar: ["https://assets.csnades.gg/ancient_game_radar_14875e0cb1.webp"],
  },
  {
    name: "Inferno",
    logo: "/static/cs/logo/infernoLogo.png",
    image: "/static/cs/wallpaper/inferno.jpeg",
    radar: ["https://assets.csnades.gg/inferno_game_radar_bbecda6217.webp"],
  },
  {
    name: "Mirage",
    logo: "/static/cs/logo/mirageLogo.png",
    image: "/static/cs/wallpaper/mirage.webp",
    radar: ["https://assets.csnades.gg/mirage_game_radar_dfb164f478.webp"],
  },
  {
    name: "Nuke",
    logo: "/static/cs/logo/nukeLogo.webp",
    image: "/static/cs/wallpaper/nuke.jpg",
    radar: [
      "https://assets.csnades.gg/nuke_game_radar_9276ffd1a4.webp",
      "https://assets.csnades.gg/nuke_game_radar_lower_b42d4863bf.webp",
    ],
  },
  {
    name: "Overpass",
    logo: "/static/cs/logo/overpassLogo.webp",
    image: "/static/cs/wallpaper/overpass.jpg",
    radar: ["https://assets.csnades.gg/overpass_game_radar_454d8227ee.webp"],
  },
  {
    name: "Vertigo",
    logo: "/static/cs/logo/vertigoLogo.webp",
    image: "/static/cs/wallpaper/vertigo.png",
    radar: [
      "https://assets.csnades.gg/vertigo_game_radar_fdb7e7081d.webp",
      "https://assets.csnades.gg/vertigo_game_radar_2_1f01133fe9.webp",
    ],
  },
];
