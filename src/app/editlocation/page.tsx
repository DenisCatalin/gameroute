"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../interface/Input";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useSnackbar from "../hooks/useSnackbar";
import { RootState } from "../redux/store";
import { trpc } from "../_trpc/client";
import { setEditRowID } from "../redux/edit.slice";

const EditLocationPage = () => {
  const getResources = trpc.getResources.useQuery();
  const resources = getResources.data;

  const [locationName, setLocationName] = useState<string>("");

  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.data.displayName === "") return;
    if (!user.admin) {
      showSnackbar("Error", "You are not allowed to access this page");
      router.push("/");
      return;
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
  };

  const searchForLocation = () => {
    const location = resources?.filter(row => row.resourceName === locationName);
    if (location) {
      if (location?.length === 0) {
        showSnackbar("Error", "No such location has been found with the given name.");
        setLocationName("");
        return;
      }

      showSnackbar("Success", "Location has been found");
      dispatch(setEditRowID(location[0].resourceID));
      router.push(`editlocation/${location[0].resourceName}`);
    }
  };

  return (
    <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-72 h-96 p-2">
          <div className="w-full h-12 my-4">
            <Input
              placeholder="Location name"
              name="locationName"
              type="text"
              onChange={handleInputChange}
              value={locationName}
            />
          </div>
        </div>
      </div>
      <button
        onClick={searchForLocation}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        SEARCH FOR LOCATION
      </button>
    </div>
  );
};

export default EditLocationPage;
