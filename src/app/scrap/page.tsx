import React from "react";
import firebase from "../lib/firebase";

const Scrap = () => {
  const firestore = firebase.firestore();
  const locationsRef = firestore.collection("locations");
  return <div>Scrap</div>;
};

export default Scrap;
