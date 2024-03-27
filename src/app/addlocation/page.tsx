"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../interface/Input";
import Select from "../interface/Select";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import useSnackbar from "../hooks/useSnackbar";
import { Locations } from "../utils/constants";
import { RootState } from "../redux/store";
import { CldUploadWidget } from "next-cloudinary";
import { trpc } from "../_trpc/client";

type FormProps = {
  locationName: string;
  locationTag: string;
};

const Categories: string[] = ["Scrap", "Statues", "Treasures", "Animal skins"];

const AddLocationPage = () => {
  const [resource, setCategory] = useState("Select the resource");
  const [location, setLocation] = useState("Select a location");
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [imageLinks, setImageLinks] = useState<any[]>([]);
  const [form, setForm] = useState<FormProps>({
    locationName: "",
    locationTag: "",
  });

  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const { showSnackbar } = useSnackbar();

  const addTagsQuery = trpc.addTag.useMutation();
  const updateTagsQuery = trpc.updateTag.useMutation();
  const getResourcesTagsQuery = trpc.getResourcesTags.useQuery();
  const tags = getResourcesTagsQuery?.data;

  const addLocationQuery = trpc.addLocation.useMutation({
    onSettled: () => {
      setUploadStatus(false);
      showSnackbar("Success", "Location added successfully");
      setForm({
        locationName: "",
        locationTag: "",
      });
    },
  });

  useEffect(() => {
    if (!user.admin) {
      showSnackbar("Error", "You are not allowed to access this page");
      router.push("/");
      return;
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addLocation = async () => {
    if (form.locationName === "") {
      showSnackbar("Error", "You need to name the location in order to upload a new location");
      return;
    }
    if (resource === "Select the resource" || location === "Select a location") {
      showSnackbar(
        "Error",
        "You need to select both the resource and location in order to upload a new location"
      );
      return;
    }
    if (imageLinks.length === 0) {
      showSnackbar(
        "Error",
        "You need to upload at least one image in order to upload a new location"
      );
      return;
    }

    setUploadStatus(true);

    try {
      addLocationQuery.mutate({
        name: form.locationName,
        tag: form.locationTag,
        location: location,
        gallery: JSON.stringify(imageLinks),
        type: resource,
      });

      if (tags) {
        const tagsArray = tags?.filter(tag => tag.tagResource === resource);

        if (tagsArray.length === 0) {
          const firstTagListArray = [form.locationTag];
          await addTagsQuery.mutate({
            resource: resource,
            list: JSON.stringify(firstTagListArray),
          });
        } else {
          const list: string[] = JSON.parse(tagsArray[0].tagList);
          if (!list?.includes(form.locationTag)) {
            list.push(form.locationTag);
            await updateTagsQuery.mutate({
              id: tagsArray[0].tagID,
              list: JSON.stringify(list),
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-72 h-64 p-2">
          <div className="w-full h-12 my-4">
            <Input
              placeholder="Location name"
              name="locationName"
              type="text"
              onChange={handleInputChange}
              value={form.locationName}
            />
          </div>
          <div className="w-full h-12  my-4">
            <Input
              placeholder="Custom tag (optional)"
              name="locationTag"
              type="text"
              onChange={handleInputChange}
              value={form.locationTag}
            />
          </div>
          <div className="w-full h-12">
            <Select options={Categories} value={resource} select={setCategory} />
          </div>
          <div className="w-full h-12">
            <Select options={Locations} value={location} select={setLocation} />
          </div>
        </div>
      </div>
      <div className="w-72 h-24 flex items-center justify-center">
        <CldUploadWidget
          uploadPreset="dci9d6id"
          onSuccess={(result, {}) => {
            //@ts-ignore
            setImageLinks(prev => [...prev, result?.info?.secure_url]);
            showSnackbar("Success", "Your assets has been uploaded on cloud!");
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
      <button
        onClick={addLocation}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        {uploadStatus ? <Loading /> : "ADD LOCATION"}
      </button>
    </div>
  );
};

export default AddLocationPage;
