"use client";

import React, { useState } from "react";
import firebase from "../lib/firebase";
import Card from "../components/Card";
import OpacityImage from "../utils/OpacityImage";
import Select from "../interface/Select";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Locations: string[] = [
  "All locations",
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

const Scrap = () => {
  const firestore = firebase.firestore();
  const scrapRef = firestore.collection("scrap");
  const query = scrapRef.orderBy("id");
  const [location, setLocation] = useState<string>("All locations");

  //@ts-ignore
  const [locations] = useCollectionData(query, { id: "id" });

  const filteredLocations = locations?.filter((item: any) => item.location === location);
  return (
    <div className="w-full min-h-80dvh flex flex-col items-center justify-center p-4">
      <div className="w-full h-20 mb-6 flex items-center justify-between">
        <div className="w-80 h-20 flex items-center justify-start">
          <div className="w-20 h-20 relative">
            <OpacityImage src={"/static/scrap.png"} fittment="contain" />
          </div>
          <h1 className="font-bold text-2xl">SCRAP METAL</h1>
        </div>
        <Select options={Locations} value={location} select={setLocation} styles="w-60" />
      </div>
      <div className="w-full h-128 flex flex-wrap p-2 gap-8 justify-center items-start overflow-auto">
        {location === "All locations" ? (
          locations &&
          locations.map((testimonial: any, index: number) => (
            <React.Fragment key={index}>
              <Card
                thumbnail={testimonial.thumbnailUrl}
                name={testimonial.locationName}
                gallery={testimonial.gallery}
              />
            </React.Fragment>
          ))
        ) : (
          <>
            {filteredLocations &&
              filteredLocations.map((testimonial: any, index: number) => (
                <React.Fragment key={index}>
                  <Card
                    thumbnail={testimonial.thumbnailUrl}
                    name={testimonial.locationName}
                    gallery={testimonial.gallery}
                  />
                </React.Fragment>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Scrap;
