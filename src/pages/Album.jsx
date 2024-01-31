import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import musicContext from "../context/MusicContext";
import Navbar from "../Components/Navbar";
import Player from "../Components/Player";
import SongList from "../Components/SongList";

const Album = () => {
  const { setSongs } = useContext(musicContext);
  const [albumms, setalbumms] = useState([]);
  const [image, setimage] = useState([]);

  const { id } = useParams();
  const getalbum = async () => {
    const res = await axios.get(`https://saavn.me/albums?id=${id}`);
    const { data } = await res.data;
    setalbumms(data);
    setSongs(data.songs);
    setimage(getImage(data.image));
  };
  const getImage = (image) => (image = image[2].link);
  useEffect(() => {
    getalbum();
  }, []);
  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen  lg:my-0 mx-2 lg:mx-auto">
        <div>
          <img
            src={image}
            alt={albumms.title}
            width={250}
            className="mx-auto mb-4"
          />
          <div className="w-[250px] text-gray-600">
            <h1>{albumms.name}</h1>
            <p>
              {albumms.primaryArtists}.{albumms.songCount} Songs
            </p>
          </div>
        </div>
        <div>
          {
            albumms.songs?.map((song)=>(
              <SongList key={song.id} {...song} />
            ))
          }
        
        </div>
      </div>

      <Player />
    </>
  );
};

export default Album;
