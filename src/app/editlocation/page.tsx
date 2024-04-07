"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../interface/Input";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useSnackbar from "../hooks/useSnackbar";
import { RootState } from "../redux/store";
import { trpc } from "../_trpc/client";
import { setEditRowID } from "../redux/edit.slice";
import Select from "../interface/Select";
import { ResourcesProps } from "../utils/types";
import Card from "../components/Card";

const Resources: string[] = ["Scrap", "Statues", "Treasures", "Animal skins"];

const EditLocationPage = () => {
  const getResources = trpc.getResources.useQuery();
  const resources = getResources.data;

  const [locationName, setLocationName] = useState<string>("");
  const [resource, setResource] = useState<string>("Choose a resource");
  const [multipleResults, setMultipleResults] = useState<ResourcesProps[]>([]);

  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user && user.adminPermissions.length === 0) {
      showSnackbar("Error", "You are not allowed to access this page");
      router.push("/");
      return;
    }
  }, [user]);

  const searchForLocation = () => {
    if (locationName === "") {
      showSnackbar("Error", "Please enter a location name in the search field");
      return;
    }
    if (resource === "Choose a resource") {
      showSnackbar("Error", "Please select the resource type that you want to search for.");
      return;
    }

    const location = resources?.filter(
      row => row.resourceName === locationName && row.resourceType === resource
    );

    if (location) {
      if (location.length === 0) {
        showSnackbar("Error", "No such location has been found with the given name.");
        setLocationName("");
        setResource("Choose a resource");
        return;
      } else if (location.length === 1) {
        showSnackbar("Success", "Location has been found");
        dispatch(setEditRowID(location[0].resourceID));
        router.push(`editlocation/${location[0].resourceID}`);
      } else if (location.length > 1) {
        console.log("multiple results", location);
        setMultipleResults(location);
      }
    }
  };

  return (
    <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-72 h-40 p-2">
          <div className="w-full h-12 my-4">
            <Input
              placeholder="Location name"
              name="locationName"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationName(e.target.value)}
              value={locationName}
            />
            <div className="w-full h-12 mt-4">
              <Select options={Resources} value={resource} select={setResource} />
            </div>
          </div>
        </div>
      </div>
      {multipleResults.length > 0 && (
        <div className="w-80percent h-110 overflow-auto p-4 flex items-center justify-center flex-wrap gap-8">
          {multipleResults.map((data: ResourcesProps, index: number) => (
            <React.Fragment key={index}>
              <Card data={data} edit={true} />
            </React.Fragment>
          ))}
        </div>
      )}
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
