import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AlbumsItem from "./AlbumsItem";
import Slider from "./Slider";
const MainSection = () => {
  const [albums, setalbums] = useState([]);
  const [trending, settreding] = useState([]);

  const getHomepageData = async () => {
    const response = await axios.get(
      "https://saavn.me/modules?language=hindi,english"
    );
    const { data } = response.data;
    setalbums(data.albums);
    settreding(data.trending);
  };
  useEffect(() => {
    getHomepageData();
  }, []);
  const trendingAlubms=useMemo(()=>(Array.isArray(trending.albums)?trending.albums:[]),[trending.albums])
  return <div className="my-20">
      <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto">
        Trending Now
      </h2>
    <Slider data={trendingAlubms} />
    <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto">
        Top Albums
      </h2>
      <Slider data={albums}/>
  </div>;
};

export default MainSection;
