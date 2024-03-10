"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import AddLocation from "./AddLocation";
import Input from "../interface/Input";
import Select from "../interface/Select";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import firebase from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import useSnackbar from "../hooks/useSnackbar";

type FormProps = {
  locationName: string;
  locationTag: string;
};

const Categories: string[] = ["Scrap", "Statue"];
const Locations: string[] = [
  "Calafia",
  "Sawmill",
  "Timber tunnel",
  "Gino's place",
  "Where the guy cut us",
  "First bridge",
  "Second bridge",
  "Plane",
  "Epsylon",
  "Farm",
  "Chilliad",
  "Paleto",
  "Behind SAHP",
];

const AddLocationPage = () => {
  const [resource, setCategory] = useState("Select the resource");
  const [location, setLocation] = useState("Select a location");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [imageLinks, setImageLinks] = useState<any[]>([]);
  const [form, setForm] = useState<FormProps>({
    locationName: "",
    locationTag: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: any) => state.user);
  const { showSnackbar, hideSnackbar } = useSnackbar();

  useEffect(() => {
    if (!user.admin) {
      hideSnackbar();
      showSnackbar("Error", "You are not allowed to access this page");
      router.push("/");
      return;
    }
  }, []);

  const firestore = firebase.firestore();
  const locationsRef = firestore.collection(resource.toLocaleLowerCase());
  const query = locationsRef.orderBy("id");
  //@ts-ignore
  const [locations] = useCollectionData(query, { id: "id" });

  const tagsRef = firestore.collection("tags").doc("uocf8svMHC9Fed8i5yUN");

  const onUpload = async () => {
    if (form.locationName === "") {
      hideSnackbar();
      showSnackbar("Error", "You need to name the location in order to upload a new location");
      return;
    }
    if (resource === "Select the resource") {
      hideSnackbar();
      showSnackbar("Error", "You need to select the resource in order to upload a new location");
      return;
    }
    if (location === "Select a location") {
      hideSnackbar();
      showSnackbar("Error", "You need to select a location in order to upload a new location");
      return;
    }
    if (selectedImages.length > 3 || selectedImages.length < 1) {
      hideSnackbar();
      showSnackbar(
        "Error",
        "You need to select at least one, but no more that 3 photos in order to upload a new location"
      );
      return;
    }
    setUploadStatus(true);
    hideSnackbar();
    showSnackbar("Notification", "Your images are uploading ...");
    const formData = new FormData();
    selectedImages.forEach((image: any) => {
      formData.append("file", image);
    });
    formData.append("resource", resource);
    formData.append("name", form.locationName);
    try {
      const response = await axios.post("/api/uploadCloudinary", formData);
      if (response.data.error) {
        hideSnackbar();
        showSnackbar("Error", response.data.error);
        setUploadStatus(false);
        return;
      }
      setTimeout(() => {
        setImageLinks(response.data.uploadedImageUrls);
      }, 2000);
      hideSnackbar();
      showSnackbar("Success", "Your images have been successfully uploaded to the cloud");
      setSelectedImages([]);
    } catch (error) {
      setUploadStatus(false);
      hideSnackbar();
      showSnackbar("Error", "Upload failed");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    (async () => {
      if (locations && imageLinks.length > 0) {
        if (form.locationTag !== "") {
          tagsRef
            .get()
            .then(doc => {
              if (doc.exists) {
                const data = doc.data();
                const tagsArray = data?.tags;

                if (!tagsArray.includes(form.locationTag)) {
                  tagsArray.push(form.locationTag);
                  tagsRef
                    .update({ tags: tagsArray })
                    .then(() => {
                      console.log("Document successfully updated!");
                    })
                    .catch(error => {
                      console.error("Error updating document: ", error);
                    });
                }
              } else {
                console.log("Document doesn't exist");
              }
            })
            .catch(error => {
              console.log("Error getting document:", error);
            });
        }
        try {
          await locationsRef.add({
            id: locations.length + 1,
            locationName: form.locationName,
            locationTag: form.locationTag,
            resource: resource,
            location: location,
            thumbnailUrl: imageLinks[0],
            gallery: imageLinks,
          });
          setUploadStatus(false);
          hideSnackbar();
          showSnackbar("Success", "Location added successfully");
        } catch (error) {
          console.log(error);
          setUploadStatus(false);
          hideSnackbar();
          showSnackbar("Error", "Upload to firebase failed");
        }
      }
    })();
  }, [imageLinks]);

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
            />
          </div>
          <div className="w-full h-12  my-4">
            <Input
              placeholder="Custom tag (optional)"
              name="locationTag"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full h-12">
            <Select options={Categories} value={resource} select={setCategory} />
          </div>
          <div className="w-full h-12">
            <Select options={Locations} value={location} select={setLocation} />
          </div>
        </div>
        <AddLocation setSelectedImages={setSelectedImages} selectedImages={selectedImages} />
      </div>
      <button
        onClick={onUpload}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        {uploadStatus ? <Loading /> : "ADD LOCATION"}
      </button>
    </div>
  );
};

export default AddLocationPage;
