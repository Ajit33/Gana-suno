import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Album from "./pages/Album";
import "./index.css";
import musicContext from "./context/MusicContext";
function App() {
  const [songs, setSongs] = useState([]);
  const [isplaying, setisPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSongs,setSearchedSongs]=useState([]);
  const playMusic = async (
    music,
    name,
    duration,
    image,
    id,
    primaryArtists
  ) => {
    if (currentSong && currentSong.id === id) {
      if (isplaying) {
        setisPlaying(false);
        currentSong.audio.pause();
      } else {
        setisPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setisPlaying(false);
      }
      const newAudio = new Audio(music[4].link);
      setCurrentSong({
        name,
        duration,
        image: image[2].link,
        id,
        audio: newAudio,
        primaryArtists,
      });
      setisPlaying(true);
      console.log(currentSong)
      await newAudio.play()
    }
  };

const nextSong=()=>{
  if(currentSong){
    const idx=songs.findIndex((song)=>song.id===currentSong.id)
    if(idx===songs.length-1){
      const { downloadUrl, name, duration, image, id, primaryArtists } =songs[0]
      playMusic( downloadUrl, name, duration, image, id, primaryArtists )
    }
    else{
      const { downloadUrl, name, duration, image, id, primaryArtists } =songs[idx+1]
      playMusic( downloadUrl, name, duration, image, id, primaryArtists )
    }
  }
}
const prevSong=()=>{
  if(currentSong){
    const idx=songs.findIndex((song)=>song.id===currentSong.id)
    if(idx===0){
      const { downloadUrl, name, duration, image, id, primaryArtists } =songs[songs.length-1]
      playMusic( downloadUrl, name, duration, image, id, primaryArtists )
    }
    else{
      const { downloadUrl, name, duration, image, id, primaryArtists } =songs[idx-1]
      playMusic( downloadUrl, name, duration, image, id, primaryArtists )
    }
  }
}



  return (
    <musicContext.Provider
      value={{
        songs,
        setSongs,
        playMusic,
        isplaying,
        setCurrentSong,
        currentSong,
        nextSong,
        prevSong,
        searchedSongs,
        setSearchedSongs,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:id" element={<Album />} />
        </Routes>
      </BrowserRouter>
    </musicContext.Provider>
  );
}

export default App;
