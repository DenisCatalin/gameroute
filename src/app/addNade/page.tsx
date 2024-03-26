"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select from "../interface/Select";
import Input from "../interface/Input";
import Loading from "../components/Loading";
import {
  ancientPositions,
  anubisPositions,
  infernoPositions,
  miragePositions,
  nukePositionsLower,
  nukePositionsUpper,
  overpassPositions,
  vertigoPositionsLower,
  vertigoPositionsUpper,
} from "../utils/constants";
import { trpc } from "../_trpc/client";
import { CldUploadWidget } from "next-cloudinary";

type Props = {
  nadeID: number;
  nadeMap: string;
  nadePosition: string;
  nadeGrenades: string;
  nadeTeam: string;
};

const Maps = [
  "Anubis",
  "Ancient",
  "Inferno",
  "Mirage",
  "Nuke Upper",
  "Nuke Lower",
  "Overpass",
  "Vertigo Upper",
  "Vertigo Lower",
];

const Teams = ["All teams", "T", "CT"];
const Nades = ["Molotov", "Smoke", "Grenade", "Flashbang"];

const AddNadePage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { showSnackbar } = useSnackbar();
  const [description, setDescription] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [imageLinks, setImageLinks] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [nade, setNade] = useState<string>("Choose a nade");
  const [callouts, setCallouts] = useState<string[]>([]);
  const [position, setPosition] = useState<string>("Choose a position");
  const [map, setMap] = useState<string>("Choose a map");
  const [team, setTeam] = useState<string>("All teams");

  const nades = trpc.getNades.useQuery();

  const updateNadeQuery = trpc.updateNade.useMutation({
    onSettled: () => {
      nades.refetch();
    },
  });

  const addNadeQuery = trpc.addNade.useMutation({
    onSettled: () => {
      nades.refetch();
    },
  });

  useEffect(() => {
    if (user && !user.admin) {
      router.push("/");
      showSnackbar(
        "Error",
        "You are not allowed to see this page. This page can only be accessed by admins."
      );
    }
  }, []);

  useEffect(() => {
    switch (map) {
      case "Anubis":
        return setCallouts(anubisPositions);
      case "Ancient":
        return setCallouts(ancientPositions);
      case "Nuke Upper":
        return setCallouts(nukePositionsUpper);
      case "Nuke Lower":
        return setCallouts(nukePositionsLower);
      case "Vertigo Upper":
        return setCallouts(vertigoPositionsUpper);
      case "Vertigo Lower":
        return setCallouts(vertigoPositionsLower);
      case "Mirage":
        return setCallouts(miragePositions);
      case "Inferno":
        return setCallouts(infernoPositions);
      case "Overpass":
        return setCallouts(overpassPositions);
      default:
        return setCallouts([]);
    }
  }, [map]);

  useEffect(() => {
    console.log(imageLinks);
    console.log(videoLink);
  }, [imageLinks, videoLink]);

  const addNade = async () => {
    if (map === "Choose a map") {
      showSnackbar("Error", "You need to select a map in order to upload a new nade");
      return;
    }
    if (position === "Choose a position") {
      showSnackbar("Error", "You need to select a position in order to upload a new nade");
      return;
    }
    if (imageLinks.length === 0 && videoLink.length === 0) {
      showSnackbar(
        "Error",
        "You didn't add any video or images. Add some media in order to upload a new nade"
      );
      return;
    }
    try {
      const getCorrectNade = nades.data?.find((nadeItem: Props) => {
        return (
          nadeItem.nadeMap === map &&
          nadeItem.nadePosition === position &&
          nadeItem.nadeTeam === team
        );
      });
      if (getCorrectNade) {
        const grenades = JSON.parse(getCorrectNade.nadeGrenades);
        const grenadeToAdd = {
          type: nade,
          description: description,
          video: videoLink.length > 0 ? videoLink : "No video",
          gallery: imageLinks.length > 0 ? JSON.stringify(imageLinks) : "No images",
        };
        grenades.push(grenadeToAdd);
        await updateNadeQuery.mutate({
          id: getCorrectNade.nadeID,
          grenades: JSON.stringify(grenades),
        });
      } else {
        addNadeQuery.mutate({
          map: map,
          position: position,
          team: team,
          grenades: JSON.stringify([
            {
              type: nade,
              description: description,
              video: videoLink.length > 0 ? videoLink : "No video",
              gallery: imageLinks.length > 0 ? JSON.stringify(imageLinks) : "No images",
            },
          ]),
        });
      }
      setUploadStatus(false);
      showSnackbar("Success", "Nade added successfully");
      setDescription("");
    } catch (error) {
      console.error(error);
      setUploadStatus(false);
      showSnackbar("Error", "Upload to database failed");
    }
  };

  return (
    <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-72 h-100 p-2">
          <div className="w-full h-12 my-4">
            <Input
              placeholder="Description"
              name="Description"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="w-full h-12">
            <Select options={Maps} value={map} select={setMap} />
          </div>
          <div className="w-full h-12">
            <Select options={callouts} value={position} select={setPosition} />
          </div>
          <div className="w-full h-12">
            <Select options={Teams} value={team} select={setTeam} />
          </div>
          <div className="w-full h-12">
            <Select options={Nades} value={nade} select={setNade} />
          </div>
          <div className="w-full h-24 flex items-center justify-center">
            <CldUploadWidget
              uploadPreset="dci9d6id"
              onSuccess={(result, {}) => {
                //@ts-ignore
                if (result?.info?.format === "mp4") {
                  //@ts-ignore
                  setVideoLink(result?.info?.public_id);
                } else if (
                  //@ts-ignore
                  result?.info?.format === "jpg" ||
                  //@ts-ignore
                  result?.info?.format === "jpeg" ||
                  //@ts-ignore
                  result?.info?.format === "png"
                ) {
                  //@ts-ignore
                  setImageLinks(prev => [...prev, result?.info?.secure_url]);
                }
                showSnackbar("Success", "Your assets has been uploaded on cloud!");
                // widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className="w-full h-12 bg-main rounded-regular font-bold shadow-headerLightShadow text-light dark:shadow-headerDarkShadow"
                  >
                    UPLOAD ASSETS
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
      </div>
      <button
        onClick={addNade}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        {uploadStatus ? <Loading /> : "ADD NADE"}
      </button>
    </div>
  );
};

export default AddNadePage;
