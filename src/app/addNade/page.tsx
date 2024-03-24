"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select from "../interface/Select";
import Input from "../interface/Input";
import AddLocation from "../addlocation/AddLocation";
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
import axios from "axios";
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
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [videoLink, setVideoLink] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [nade, setNade] = useState<string>("Choose a nade");
  const [imageLinks, setImageLinks] = useState<any[]>([]);
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
    onSettled: () => {},
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

  const onUpload = async () => {
    if (map === "Select a map") {
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

    setUploadStatus(true);
    showSnackbar("Notification", "Your images are uploading ...");
    const formData = new FormData();
    selectedImages.forEach((image: any) => {
      formData.append("file", image);
    });
    try {
      const response = await axios.post("/api/uploadCloudinary", formData);
      if (response.data.error) {
        showSnackbar("Error", response.data.error);
        setUploadStatus(false);
        return;
      }
      setTimeout(() => {
        setImageLinks(response.data.uploadedImageUrls);
      }, 2000);
      showSnackbar("Success", "Your images have been successfully uploaded to the cloud");
      setSelectedImages([]);
    } catch (error) {
      setUploadStatus(false);
      showSnackbar("Error", "Upload failed");
    }
  };

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
    if (map === "Choose a map" && position === "Choose a position") return;
    const addNade = async () => {
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
            gallery: imageLinks.length > 0 ? imageLinks : "No images",
            createdAt: Date.now(),
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
                gallery: imageLinks.length > 0 ? imageLinks : "No images",
                createdAt: Date.now(),
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

    addNade();
  }, [imageLinks]);

  return (
    <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-72 h-96 p-2">
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
          <div className="w-full h-52 flex items-center justify-center">
            <CldUploadWidget
              uploadPreset="dci9d6id"
              onSuccess={(result, { widget }) => {
                //@ts-ignore
                setVideoLink(result?.info?.public_id);
                showSnackbar("Success", "Your video has been uploaded on cloud!");
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className="w-full h-12 bg-main rounded-regular font-bold shadow-headerLightShadow text-light dark:shadow-headerDarkShadow"
                  >
                    UPLOAD VIDEO
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <AddLocation setSelectedImages={setSelectedImages} selectedImages={selectedImages} />
      </div>
      <button
        onClick={onUpload}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        {uploadStatus ? <Loading /> : "ADD NADE"}
      </button>
    </div>
  );
};

export default AddNadePage;
