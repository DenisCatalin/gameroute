"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSnackbar from "@/app/hooks/useSnackbar";
import { Locations, acceptedRouteNames } from "@/app/utils/constants";
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

  const [location, setLocation] = useState<string>("All locations");
  const [tagList, setTagList] = useState<string[]>(["All tags"]);
  const [tag, setTag] = useState<string>("All tags");

  const getResourcesTagsQuery = trpc.getResourcesTags.useQuery();
  const tags = getResourcesTagsQuery?.data;

  const filteredLocations =
    location === "All locations" && tag === "All tags"
      ? resources
      : location === "All locations"
      ? resources?.filter(item => item.resourceTag === tag)
      : tag === "All tags"
      ? resources?.filter(item => item.resourceLocation === location)
      : resources?.filter(item => item.resourceLocation === location && item.resourceTag === tag);

  useEffect(() => {
    if (!acceptedRouteNames.includes(params.resource)) {
      router.push("/");
      showSnackbar(
        "Error",
        "This is not a valid route for resources page. You have been redirected to the homepage"
      );
    }
  }, []);

  useEffect(() => {
    if (tags) {
      const tagListForResource = tags.filter(item => item.tagResource === resourceType);
      const listOfTags = ["All tags", ...JSON.parse(tagListForResource[0].tagList)];
      setTagList(listOfTags);
    }
  }, [tags]);

  return (
    <div className="w-full min-h-80dvh flex flex-col items-center justify-center p-4">
      <div className="w-full h-20 mb-6 flex items-center justify-between">
        <div className="w-80 h-20 flex items-center justify-start">
          <div className="w-20 h-20 relative">
            <OpacityImage src={`/static/${params.resource}.png`} fittment="contain" />
          </div>
          <h1 className="font-bold text-2xl">{params.resource.toUpperCase()}</h1>
        </div>
        <Select options={tagList} value={tag} select={setTag} styles="w-60" />
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
