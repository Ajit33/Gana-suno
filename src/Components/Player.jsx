import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuHardDriveDownload } from "react-icons/lu";
import VolumeController from "./VolumeController";

import musicContext from "../context/MusicContext";

const Player = () => {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const { currentSong, playMusic, nextSong, prevSong,isplaying } =
    useContext(musicContext);

const inputref=useRef();

useEffect(()=>{
 if(currentSong){
  const audioElement=currentSong.audio;
  const handelTime=()=>{
    const duration=Number(currentSong.duration)
    const currentTime=audioElement.currentTime;
    const newTime=(currentTime/duration)*100;
    inputref.current.value=newTime
  }
  audioElement.addEventListener("timeupdate",handelTime)
  audioElement.addEventListener("ended",handelsongEnd)
  return()=>{
    audioElement.addEventListener("timeupdate",handelTime)
    audioElement.addEventListener("ended",handelsongEnd)
  }
 }
},[currentSong])
const handelProgressChange=(event)=>{
   const newPercentage= parseFloat(event.target.value);
   const newTime=(newPercentage/100)* Number(currentSong.duration)
   if(newTime>=0){
   currentSong.audio.currentTime=newTime;
   }
}

const handelsongEnd=()=>nextSong();



const  handelDownLoadsong=async(Url)=>{

  try {
    const res=await fetch(Url);
    const blob=await res.blob();
    const link= document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download=`${currentSong.name}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.log("somthing went wrong please check again",error)
  }
}

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#f5f5f5ff] flex flex-col">
      <input
        type="range"
        name="progress"
        id="progress"
        min={0}
        max={100}
        step="0.1"
        value={0}
        ref={inputref}
        onChange={handelProgressChange}
        className="w-full h-[5px] text-green-400 range"
      />
      <div className="flex justify-between items-center mb-3 px-3">
        <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
          <img
            src={currentSong?.image}
            alt=""
            width={55}
            className="rounded-lg "
          />
          <div className="hidden lg:block">
            <span>{currentSong?.name}</span>
            <p className="text-xs text-gray-500">
              {currentSong?.primaryArtists}
            </p>
          </div>
        </div>
        <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
          <BiRepeat className="text-gray-400 cursor-pointer" />
          <IoMdSkipBackward   onClick={prevSong} className="text-gray-700 hover:text-gray-500 cursor-pointer" />
         
          {isplaying ? (
            <FaPause
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong?.audio,
                  currentSong.name,
                  currentSong.duration,
                  currentSong.image,
                  currentSong.id
                )
              }
            />
          ) : (
            <FaPlay
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong.audio,
                  currentSong.name,
                  currentSong.duration,
                  currentSong.image,
                  currentSong.id
                )
              }
            />
          )}

          <IoMdSkipForward  onClick={nextSong}  className="text-gray-700 hover:text-gray-500 cursor-pointer" />
          <PiShuffleBold className="text-gray-400 cursor-pointer" />
        </div>
        <div
          className="flex lg:w-[30vw] justify-end items-center "
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
          <LuHardDriveDownload onClick={()=>handelDownLoadsong(currentSong.audio.src)} className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer lg:mr-2" />
          <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer hidden lg:block" />
          <VolumeController isVolumeVisible={isVolumeVisible} />
        </div>
      </div>
    </div>
  );
};

export default Player;
