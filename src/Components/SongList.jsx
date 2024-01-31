import React from "react";
import { GoPlay } from "react-icons/go";
import { useContext } from "react";
import musicContext from "../context/MusicContext";

const SongList = ({
  name,
  primaryArtists,
  duration,
  downloadUrl,
  image,
  id,
}) => {
  const convertTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const second = duration % 60;
    return `${minutes}:${second}`;
  };
  const { isplaying, currentSong, playMusic } = useContext(musicContext);

  return (
    <div className="flex justify-between items-center w-[83vw] lg:w-[50vw] mb-2 lg:mb-1 p-1 px-3 hover:bg-white hover:shadow-md">
      <GoPlay
        className="text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor-pointer"
        onClick={() =>
          playMusic(downloadUrl, name, duration, image, id, primaryArtists)
        }
      />
      <div className="flex flex-col lg:flex-row justify-between items-center w-[80] ">
        <span
          className={`font-bold text-md ${
            id === currentSong?.id && "text-[#46c7b6ff]"
          }`}
        >
          {name}
        </span>
        <span className="font-thin text-xs text-gray-500">
          {primaryArtists}
        </span>
      </div>
      <div>
        <span className="font-thin text-xs text-gray-500 lg:block">
          {convertTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default SongList;
