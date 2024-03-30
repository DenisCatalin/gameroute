export type HardcodedPositions = {
  [key: string]: {
    [key: string]: {
      top: string;
      left: string;
    };
  };
};

export type MapsState = {
  name: string;
  logo: string;
  image: string;
  radar: string[];
};

export type PositionsProps = {
  top: number;
  left: number;
};

export type NadeProps = {
  nadeID: number;
  nadeMap: string;
  nadePosition: string;
  nadeGrenades: string;
  nadeTeam: string;
};

export type AddResourceFormProps = {
  locationName: string;
  locationTag: string;
};

export type SnackbarState = {
  title: "Error" | "Success" | "Warning" | "Notification" | "";
  message: string;
  open: boolean;
};

export type ResourcesProps = {
  resourceID: number;
  resourceName: string;
  resourceTag: string;
  resourceType: string;
  resourceLocation: string;
  resourceGallery: string;
};

export type NadesProp = {
  type: string;
  description: string;
  video: string;
  gallery: string;
  createdAt: string;
};
