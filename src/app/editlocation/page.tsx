"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../interface/Input";
import { useSelector, useDispatch } from "react-redux";
import { setLocationToBeAdded, setWatchingDocID } from "../redux/app.slice";
import firebase from "../lib/firebase";
import { useRouter } from "next/navigation";
import { setEditDocument, setEditDocumentID } from "../redux/edit.slice";
import useSnackbar from "../hooks/useSnackbar";

const EditLocationPage = () => {
  const [locationName, setLocationName] = useState<string>("");

  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!user.admin) {
      showSnackbar("Error", "You are not allowed to access this page");
      router.push("/");
      return;
    }
  }, []);

  const firestore = firebase.firestore();

  async function getDocumentIdByFieldValue(field: string, value: any) {
    try {
      const querySnapshot = await firestore.collection("scrap").where(field, "==", value).get();
      if (querySnapshot.empty) {
        dispatch(setWatchingDocID(""));
        return;
      } else {
        const document = querySnapshot.docs[0];
        const data = document.data();
        router.push(`/editlocation/${data.locationName}`);
        dispatch(setWatchingDocID(document.id));
        dispatch(setEditDocumentID(document.id));
        dispatch(setEditDocument(data));
        return;
      }
    } catch (error) {
      console.error(`Error getting document with ${field} equal to ${value}:`, error);
      return;
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
  };

  const searchForDocument = async () => {
    try {
      await getDocumentIdByFieldValue("locationName", locationName);
    } catch (error) {
      console.error(error);
      return;
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
        onClick={searchForDocument}
        className="bg-main text-light text-bold h-16 w-64 mt-6 text-xl rounded-regular shadow-headerLightShadow dark:shadow-headerDarkShadow"
      >
        SEARCH FOR LOCATION
      </button>
    </div>
  );
};

export default EditLocationPage;
