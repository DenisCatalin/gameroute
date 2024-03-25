"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  NadesProp,
  setAppGallery,
  setAppShowNadeWrapper,
  setShowGallery,
} from "../redux/app.slice";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { SlOptionsVertical } from "react-icons/sl";
import Dropdown from "../interface/Dropdown/Dropdown";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { trpc } from "../_trpc/client";
import { FaCircleInfo } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useSnackbar from "../hooks/useSnackbar";
import AlertDialog from "../interface/AlertDialog";

type Props = {
  nades: any;
};

type Nades = {
  nadeID: number;
  nadeMap: string;
  nadePosition: string;
  nadeGrenades: string;
  nadeTeam: string;
};

const NadeWrapper = ({ nades }: Props) => {
  const isAdmin = useSelector((state: RootState) => state.user.admin);
  const nadesWrapper = useSelector((state: RootState) => state.app.showNadeWrapper);
  const grenades = useSelector((state: RootState) => state.app.nades);
  const dispatch = useDispatch();

  const { showSnackbar } = useSnackbar();

  const updateNadeQuery = trpc.updateNade.useMutation({
    onSettled: () => {
      nades.refetch();
    },
  });

  const positionsFromDB = nades.data;

  const handleCloseWrapper = () => {
    dispatch(setAppShowNadeWrapper(false));
  };

  useEffect(() => {
    const body = document.body;
    if (nadesWrapper) {
      body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      body.style.overflow = "auto";
    }
  }, [nadesWrapper]);

  const openGallery = (images: any) => {
    dispatch(setShowGallery(true));
    dispatch(setAppGallery(images));
  };

  const handleEdit = () => {};

  const handleDelete = async (video: string) => {
    if (positionsFromDB) {
      let idOfRowWithVideo: number | null = null;

      for (const position of positionsFromDB) {
        const grenades = JSON.parse(position.nadeGrenades);

        for (const grenade of grenades) {
          if (grenade.video === video) {
            idOfRowWithVideo = position.nadeID;
            break;
          }
        }
      }

      const currentRow = positionsFromDB.filter((item: Nades) => item.nadeID === idOfRowWithVideo);

      if (currentRow.length > 0) {
        const updatedCurrentRow = currentRow.map((row: Nades) => {
          const grenades = JSON.parse(row.nadeGrenades).filter(
            (grenade: any) => grenade.video !== video
          );
          return { ...row, nadeGrenades: JSON.stringify(grenades) };
        });

        if (idOfRowWithVideo !== null) {
          await updateNadeQuery.mutate({
            id: idOfRowWithVideo,
            grenades: updatedCurrentRow[0].nadeGrenades,
          });

          dispatch(setAppShowNadeWrapper(false));
          showSnackbar("Success", "Grenade successfully removed");
        }
      }
    }
  };

  return (
    <>
      {nadesWrapper && (
        <div className="z-1000 absolute top-0 left-0 w-full h-screen backdrop-blur bg-blurBgLight dark:bg-blurBgDark flex items-start justify-start px-6">
          <button
            className="absolute w-12 h-12 top-5 left-90percent bg-main shadow-normal rounded-small"
            onClick={handleCloseWrapper}
          >
            X
          </button>
          <div className="w-full h-142 flex flex-wrap items-start gap-4 justify-start overflow-auto p-6 lg:w-full lg:h-148">
            {grenades.map((grenade: NadesProp, index: number) => (
              <div
                className="w-96 h-96 bg-dark rounded-regular flex items-center justify-center flex-col"
                key={index}
              >
                <div className="w-full h-80 rounded-t-regular overflow-hidden">
                  <CldVideoPlayer
                    id={grenade.video}
                    width="1920"
                    height="1080"
                    src={grenade.video}
                  />
                </div>
                <div className="w-full h-32 bg-coverDark rounded-b-regular flex items-center justify-between p-4">
                  {grenade.gallery !== "No images" ? (
                    <button
                      className="w-32 h-12 bg-main rounded-regular font-bold"
                      onClick={() => openGallery(grenade.gallery)}
                    >
                      Gallery
                    </button>
                  ) : (
                    <h1 className="w-32 font-bold text-dark dark:text-light">No images</h1>
                  )}
                  <div className="">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FaCircleInfo className="w-6 h-6" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-64">{grenade.description}</div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {isAdmin && (
                    <>
                      <AlertDialog
                        continueButton={() => handleDelete(grenade.video)}
                        title="Are you sure you want to remove this nade?"
                        description="You are about to remove this nade from this position."
                        trigger={
                          <>
                            <button className="flex items-center justify-center w-8 h-8 rounded-small hover:bg-offDark transition">
                              <MdDelete className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </>
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NadeWrapper;
