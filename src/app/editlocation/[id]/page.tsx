"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../interface/Input";
import Select from "../../interface/Select";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { useRouter, useParams } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { StatuesLocations, ScrapLocations } from "@/app/utils/constants";
import { RootState } from "@/app/redux/store";
import { trpc } from "@/app/_trpc/client";
import { AddResourceFormProps } from "@/app/utils/types";
import { setEditRowID } from "@/app/redux/edit.slice";
import { setAppGallery, setShowGallery } from "@/app/redux/app.slice";

const Resources: string[] = ["Scrap", "Statues", "Treasures", "Animal skins"];

const EditLocationPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const searchID = useSelector((state: RootState) => state.edit.rowID);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const getLocation = trpc.getLocationByID.useQuery({ id: searchID });
  const data = getLocation.data;
  const editResourceQuery = trpc.editResource.useMutation();
  const deleteResourceQuery = trpc.deleteResource.useMutation();

  const { showSnackbar } = useSnackbar();

  const [fetched, setFetched] = useState<boolean>(false);
  const [gallery, setGallery] = useState<string[]>([]);
  const [resourcesLocations, setResourcesLocations] = useState<string[]>([""]);
  const [resource, setResource] = useState("Select a resource");
  const [location, setLocation] = useState("Select a location");
  const [status, setStatus] = useState<boolean>(false);

  const [form, setForm] = useState<AddResourceFormProps>({
    locationName: "",
    locationTag: "",
  });

  useEffect(() => {
    if (user && user.adminPermissions.length === 0) {
      showSnackbar("Error", "You are not allowed to access this page");
      router.push("/");
      return;
    }
  }, [user]);

  useEffect(() => {
    if (searchID !== 0) {
      if (data && data !== -1 && data.length > 0) {
        setFetched(true);
        setResource(data[0].resourceType);
        setForm({
          locationName: data[0].resourceName,
          locationTag: data[0].resourceTag || "",
        });
        setLocation(data[0].resourceLocation);
        setGallery(JSON.parse(data[0].resourceGallery));
      }
    }
  }, [searchID, data]);

  useEffect(() => {
    switch (resource) {
      case "Scrap": {
        setResourcesLocations(ScrapLocations);
        return;
      }
      case "Statues": {
        setResourcesLocations(StatuesLocations);
        return;
      }
      case "Treasures": {
        // setResourcesLocations(TreasuresLocations);
        return;
      }
      case "Animal skins": {
        // setResourcesLocations(AnimalsLocations);
        return;
      }
      default: {
        setResourcesLocations([]);
        return;
      }
    }
  }, [resource]);

  useEffect(() => {
    if (searchID === undefined || searchID === 0) {
      dispatch(setEditRowID(JSON.parse(params.id)));
    }
  }, []);

  const openGallery = () => {
    dispatch(setShowGallery(true));
    dispatch(setAppGallery(gallery));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onEdit = async () => {
    setStatus(true);
    if (data && data !== -1 && data.length > 0) {
      try {
        await editResourceQuery.mutate({
          id: searchID,
          name: form.locationName,
          tag: form.locationTag,
          type: resource === "Select a resource" ? data[0].resourceType : resource,
          location: location,
        });
        setStatus(false);
        showSnackbar("Success", "Location has been updated successfully");
        router.push("/gta");
      } catch (e) {
        showSnackbar("Error", "Something went wrong editing the location");
        console.error(e);
        setStatus(false);
      }
    } else {
      setStatus(false);
      showSnackbar("Error", "Something went wrong editing the location");
    }
  };

  const onDelete = async () => {
    if (data && data !== -1 && data.length > 0) {
      try {
        await deleteResourceQuery.mutate({
          id: searchID,
        });

        showSnackbar("Success", "Location deleted successfully");
        router.push(`/`);
      } catch (error) {
        console.error("Error removing location: ", error);
        showSnackbar("Error", "Error deleting the location");
      }
    }
  };

  return (
    <>
      {fetched ? (
        <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
          <div className="w-full h-auto flex items-center justify-center">
            <div className="w-72 h-96 p-2">
              <div className="w-full h-12 my-4">
                <Input
                  placeholder={"Location name"}
                  name="locationName"
                  type="text"
                  onChange={handleInputChange}
                  value={form.locationName}
                />
              </div>
              <div className="w-full h-12  my-4">
                <Input
                  placeholder={"Custom tag (optional)"}
                  name="locationTag"
                  type="text"
                  onChange={handleInputChange}
                  value={form.locationTag}
                />
              </div>
              <div className="w-full h-12">
                <Select options={Resources} value={resource} select={setResource} />
              </div>
              <div className="w-full h-12">
                <Select options={resourcesLocations} value={location} select={setLocation} />
              </div>
              <button
                onClick={openGallery}
                className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
              >
                GALLERY
              </button>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
          >
            {status ? <Loading /> : "EDIT LOCATION"}
          </button>
          <button
            onClick={onDelete}
            className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
          >
            DELETE LOCATION
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditLocationPage;
