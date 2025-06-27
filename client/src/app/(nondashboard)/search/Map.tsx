"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector((state) => state.global.isFiltersFullOpen);
  const { data: properties, isLoading, isError } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !properties) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/hryntar/cmcf779bq00k001r19vf249i1",
      center: filters.coordinates || [-74.5, 40],
      zoom: 9,
    });

    const resizeMap = () => {
      setTimeout(() => {
        map.resize();
      }, 700);
    };
    
    resizeMap();

    map.on("load", resizeMap);
    window.addEventListener("resize", resizeMap);

    return () => map.remove();
  });

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        ref={mapContainerRef}
        className="map-container rounded-xl"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Map;
