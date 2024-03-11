"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../interface/Input";
import Select from "../../interface/Select";
import { useSelector, useDispatch } from "react-redux";
import { setLocationToBeAdded } from "../../redux/app.slice";
import axios from "axios";
import firebase from "../../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../../components/Loading";
import { useRouter } from "next/navigation";
import AddLocation from "../../addlocation/AddLocation";
import { EditState } from "@/app/redux/edit.slice";
import useSnackbar from "@/app/hooks/useSnackbar";

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

const EditLocationPage = () => {
  const user = useSelector((state: any) => state.user);
  const edit: EditState = useSelector((state: any) => state.edit);
  const { documentData } = edit;

  const { showSnackbar } = useSnackbar();

  const [resource, setCategory] = useState(
    documentData.resource ? documentData.resource : "Select a resource"
  );
  const [location, setLocation] = useState(
    documentData.location !== "" ? documentData.location : "Select a location"
  );
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [imageLinks, setImageLinks] = useState<any[]>(documentData.gallery);
  const [form, setForm] = useState<FormProps>({
    locationName: documentData.locationName,
    locationTag: documentData.locationTag,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user.admin) {
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

  const onEdit = async () => {
    setUploadStatus(true);
    showSnackbar("Notification", "The location is being edited ...");
    if (selectedImages && selectedImages.length > 0) {
      await uploadToCloudinary();
    } else {
      await uploadToFirebase();
    }
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    selectedImages.forEach((image: any) => {
      formData.append("file", image);
    });
    formData.append("resource", resource);
    formData.append("name", form.locationName);
    try {
      const response = await axios.post("/api/uploadCloudinary", formData);
      if (response.data.error) {
        showSnackbar("Error", response.data.error);
        setUploadStatus(false);
        return;
      }
      setTimeout(() => {
        setImageLinks([...imageLinks, ...response.data.uploadedImageUrls]);
      }, 2000);
      showSnackbar("Success", "Your images have been successfully uploaded to the cloud");
      setSelectedImages([]);
    } catch (error) {
      setUploadStatus(false);
      showSnackbar("Error", "Upload failed");
    }
  };

  const uploadToFirebase = async () => {
    if (locations) {
      if (form.locationTag !== documentData.locationTag && form.locationTag !== "") {
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
        const docID = firestore.collection(resource.toLocaleLowerCase()).doc(edit.documentID);
        if (imageLinks && imageLinks.length > 0) {
          await docID.update({
            locationName: form.locationName,
            locationTag: form.locationTag,
            resource: resource,
            location: location,
            gallery: imageLinks,
          });
        } else {
          await docID.update({
            locationName: form.locationName,
            locationTag: form.locationTag,
            resource: resource,
            location: location,
          });
        }
        setUploadStatus(false);
        showSnackbar("Success", "Location edited successfully");
      } catch (error) {
        console.log(error);
        setUploadStatus(false);
        showSnackbar("Error", "Upload to firebase failed");
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onDelete = async () => {
    try {
      const docRef = firestore.collection(resource.toLocaleLowerCase()).doc(edit.documentID);

      await docRef.delete();

      showSnackbar("Success", "Location deleted successfully");
      router.push("/");
    } catch (error) {
      console.error("Error removing document: ", error);
      showSnackbar("Error", "Error deliting the location");
    }
  };

  useEffect(() => {
    (async () => {
      await uploadToFirebase();
    })();
  }, [imageLinks]);

  return (
    <div className="w-full min-h-80dvh py-4 px-4 lg2:px-0 flex items-center justify-center flex-col">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="w-72 h-96 p-2">
          <div className="w-full h-12 my-4">
            <Input
              placeholder={documentData.locationName ? documentData.locationName : "Location name"}
              name="locationName"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full h-12  my-4">
            <Input
              placeholder={
                documentData.locationTag ? documentData.locationTag : "Custom tag (optional)"
              }
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
        onClick={onEdit}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        {uploadStatus ? <Loading /> : "EDIT LOCATION"}
      </button>
      <button
        onClick={onDelete}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        DELETE LOCATION
      </button>
    </div>
  );
};

export default EditLocationPage;
