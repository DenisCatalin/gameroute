"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { Locations, acceptedRouteNames } from "@/app/utils/constants";
import firebase from "@/app/lib/firebase";
import Card from "@/app/components/Card";
import OpacityImage from "@/app/utils/OpacityImage";
import Select from "@/app/interface/Select";
import { trpc } from "@/app/_trpc/client";

const ResourcesPage = () => {
  const params = useParams<{ resource: string }>();
  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const resourceType = params.resource.charAt(0).toUpperCase() + params.resource.slice(1);

  const getResources = trpc.getResourcesByType.useQuery({
    type: resourceType.replaceAll("-", " "),
  });
  const resources = getResources.data;

  console.log(resources);

  const [listOfTags, setListOfTags] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("All locations");
  const [tag, setTag] = useState<string>("All tags");

  // const tagsRef = firestore.collection("tags").doc("uocf8svMHC9Fed8i5yUN");
  // tagsRef
  //   .get()
  //   .then(doc => {
  //     if (doc.exists) {
  //       const data = doc.data();
  //       const tagsArray = data?.tags;
  //       if (tagsArray.length > 0) {
  //         setListOfTags(["All tags", ...tagsArray]);
  //       }
  //     } else {
  //       console.log("Document doesn't exist");
  //     }
  //   })
  //   .catch(error => {
  //     console.error("Error getting document: ", error);
  //   });

  const filteredLocations =
    location === "All locations" && tag === "All tags"
      ? resources
      : location === "All locations"
      ? resources?.filter((item: any) => item.locationTag === tag)
      : tag === "All tags"
      ? resources?.filter((item: any) => item.location === location)
      : resources?.filter((item: any) => item.location === location && item.locationTag === tag);

  console.log(filteredLocations);

  useEffect(() => {
    if (!acceptedRouteNames.includes(params.resource)) {
      router.push("/");
      showSnackbar(
        "Error",
        "This is not a valid route for resources page. You have been redirected to the homepage"
      );
    }
  }, []);
  return (
    <div className="w-full min-h-80dvh flex flex-col items-center justify-center p-4">
      <div className="w-full h-20 mb-6 flex items-center justify-between">
        <div className="w-80 h-20 flex items-center justify-start">
          <div className="w-20 h-20 relative">
            <OpacityImage src={`/static/${params.resource}.png`} fittment="contain" />
          </div>
          <h1 className="font-bold text-2xl">{params.resource.toUpperCase()}</h1>
        </div>
        <Select options={listOfTags} value={tag} select={setTag} styles="w-60" />
        <Select options={Locations} value={location} select={setLocation} styles="w-60" />
      </div>
      <div className="w-full h-128 flex flex-wrap p-2 gap-8 justify-center items-start overflow-auto">
        {filteredLocations !== undefined &&
          filteredLocations.map((location: any, index: number) => (
            <React.Fragment key={index}>
              <Card
                name={location.resourceName}
                gallery={JSON.parse(location.resourceGallery)}
                resource={params.resource}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
