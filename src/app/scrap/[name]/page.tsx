"use client";

import React, { useEffect } from "react";
import firebase from "../../lib/firebase";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAppGallery, setShowGallery, setWatchingDocID } from "@/app/redux/app.slice";

const ScrapName = () => {
  const firestore = firebase.firestore();

  const params = useParams<{ name: string }>();
  const router = useRouter();

  const dispatch = useDispatch();

  async function getDocumentIdByFieldValue(field: string, value: any) {
    try {
      const querySnapshot = await firestore.collection("scrap").where(field, "==", value).get();
      if (querySnapshot.empty) {
        dispatch(setWatchingDocID(""));
        return;
      } else {
        const document = querySnapshot.docs[0];
        const data = document.data();
        dispatch(setShowGallery(true));
        dispatch(setAppGallery(data.gallery));
        dispatch(setWatchingDocID(document.id));
        return;
      }
    } catch (error) {
      console.error(`Error getting document with ${field} equal to ${value}:`, error);
      return;
    }
  }

  useEffect(() => {
    (async () => {
      const name = params.name.replaceAll("%20", " ");
      await getDocumentIdByFieldValue("locationName", name);
    })();
  }, []);

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center">
      <h1>
        Oops! If you landed on this page it might be not what you are looking for. Go back to scrap
        metal locations list by clicking the button below
      </h1>
      <button
        onClick={() => router.push("/scrap")}
        className="mt-8 flex items-center justify-center w-24 h-12 font-bold p-2 rounded-regular bg-main text-light"
      >
        BACK
      </button>
    </div>
  );
};

export default ScrapName;
