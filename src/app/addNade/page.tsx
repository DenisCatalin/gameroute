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
  dust2Positions,
  // anubisPositions,
  infernoPositions,
  miragePositions,
  nukePositionsLower,
  nukePositionsUpper,
  overpassPositions,
  trainPositions,
  // vertigoPositionsLower,
  // vertigoPositionsUpper,
} from "../utils/constants";
import { trpc } from "../_trpc/client";
import { CldUploadWidget } from "next-cloudinary";
import { NadeProps } from "../utils/types";

const Maps = [
  // "Anubis",
  "Ancient",
  "Inferno",
  "Mirage",
  "Nuke Upper",
  "Nuke Lower",
  "Overpass",
  // "Vertigo Upper",
  // "Vertigo Lower",
  "Dust2",
  "Train",
];

const Teams = ["All teams", "T", "CT"];
const Nades = ["Molotov", "Smoke", "Grenade", "Flashbang", "Execution"];

const AddNadePage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { showSnackbar } = useSnackbar();
  const [description, setDescription] = useState<string>("");
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [uploadedVideoIds, setUploadedVideoIds] = useState<string[]>([]);
  const [uploadedImageIds, setUploadedImageIds] = useState<string[]>([]);
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
    if (user && user.adminPermissions.length === 0) {
      router.push("/");
      showSnackbar(
        "Error",
        "You are not allowed to see this page. This page can only be accessed by admins."
      );
    }
  }, [user]);

  useEffect(() => {
    switch (map) {
      // case "Anubis":
      //   return setCallouts(anubisPositions);
      case "Ancient":
        return setCallouts(ancientPositions);
      case "Nuke Upper":
        return setCallouts(nukePositionsUpper);
      case "Nuke Lower":
        return setCallouts(nukePositionsLower);
      case "Vertigo Upper":
      //   return setCallouts(vertigoPositionsUpper);
      // case "Vertigo Lower":
      //   return setCallouts(vertigoPositionsLower);
      case "Mirage":
        return setCallouts(miragePositions);
      case "Inferno":
        return setCallouts(infernoPositions);
      case "Overpass":
        return setCallouts(overpassPositions);
      case "Dust2":
        return setCallouts(dust2Positions);
      case "Train":
        return setCallouts(trainPositions);
      default:
        return setCallouts([]);
    }
  }, [map]);

  const addNade = async () => {
    if (map === "Choose a map") {
      showSnackbar("Error", "You need to select a map in order to upload a new nade");
      return;
    }
    if (position === "Choose a position") {
      showSnackbar("Error", "You need to select a position in order to upload a new nade");
      return;
    }
    if (nade === "Choose a nade") {
      showSnackbar("Error", "You need to select a nade type");
      return;
    }
    if (imageLinks.length === 0 && videoLinks.length === 0) {
      showSnackbar(
        "Error",
        "You didn't add any video or images. Add some media in order to upload a new nade"
      );
      return;
    }
    setUploadStatus(true);

    try {
      const existing = nades.data?.find((nadeItem: NadeProps) => {
        return (
          nadeItem.nadeMap === map &&
          nadeItem.nadePosition === position &&
          nadeItem.nadeTeam === team
        );
      });

      const videoValue =
        nade === "Execution"
          ? JSON.stringify(videoLinks)
          : videoLinks.length > 0
          ? videoLinks[0]
          : "No video";
      const galleryValue = imageLinks.length > 0 ? JSON.stringify(imageLinks) : "No images";

      let ok = false;
      if (existing) {
        const grenades = JSON.parse(existing.nadeGrenades);
        const grenadeToAdd = {
          type: nade,
          description: description,
          video: videoValue,
          gallery: galleryValue,
        };
        grenades.push(grenadeToAdd);
        ok = (await updateNadeQuery.mutateAsync({
          id: existing.nadeID,
          grenades: JSON.stringify(grenades),
        })) as unknown as boolean;
      } else {
        ok = (await addNadeQuery.mutateAsync({
          map: map,
          position: position,
          team: team,
          grenades: JSON.stringify([
            {
              type: nade,
              description: description,
              video: videoValue,
              gallery: galleryValue,
            },
          ]),
        })) as unknown as boolean;
      }

      if (ok) {
        showSnackbar("Success", "Nade added successfully");
        setDescription("");
        setVideoLinks([]);
        setImageLinks([]);
        setUploadedVideoIds([]);
        setUploadedImageIds([]);
      } else {
        showSnackbar("Error", "Server did not confirm save. Cleaning up uploaded assets.");
        await cleanupUploadedAssets();
        setVideoLinks([]);
        setImageLinks([]);
      }
    } catch (error) {
      console.error("addNade client error:", error);
      showSnackbar("Error", "Upload to database failed. Cleaning up uploaded assets.");
      await cleanupUploadedAssets();
      setVideoLinks([]);
      setImageLinks([]);
    } finally {
      setUploadStatus(false);
    }
  };

  const cleanupUploadedAssets = async () => {
    if (uploadedVideoIds.length === 0 && uploadedImageIds.length === 0) return;
    try {
      const res = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoIds: uploadedVideoIds, imageIds: uploadedImageIds }),
      });
      if (!res.ok) {
        console.error("Failed to cleanup Cloudinary assets", await res.text());
      }
    } catch (e) {
      console.error("Cleanup request failed", e);
    } finally {
      setUploadedVideoIds([]);
      setUploadedImageIds([]);
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
              uploadPreset="custom_preset"
              onSuccess={(result, {}) => {
                const info = (result as any)?.info;
                const resourceType = info?.resource_type;
                const format = (info?.format || "").toLowerCase();
                const isVideo =
                  resourceType === "video" || ["mp4", "mov", "webm", "mkv", "avi"].includes(format);
                const isImage =
                  resourceType === "image" ||
                  ["jpg", "jpeg", "png", "webp", "gif", "heic"].includes(format);
                if (isVideo) {
                  setVideoLinks(prev => [...prev, info?.public_id]);
                  setUploadedVideoIds(prev => [...prev, info?.public_id]);
                } else if (isImage) {
                  setImageLinks(prev => [...prev, info?.secure_url]);
                  setUploadedImageIds(prev => [...prev, info?.public_id]);
                } else {
                  console.warn("Unknown upload type", info);
                }
                showSnackbar("Success", "Your assets has been uploaded on cloud!");
                // widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className="w-full h-12 bg-main rounded-regular shadow-headerLightShadow text-light dark:shadow-headerDarkShadow"
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
