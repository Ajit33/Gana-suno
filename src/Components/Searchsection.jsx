import React, { useContext } from 'react'
import musicContext from '../context/MusicContext'
import SongItem from './SongItem'

const Searchsection = () => {
    const { searchedSongs}=useContext(musicContext)
  return (
    <div
    className={`fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center flex-wrap gap-4 bg-white bg-opacity-50 backdrop-blur-lg ${
      searchedSongs.length === 0 ? "-translate-y-[1200px]" : "translate-y-0"
    } transition-all duration-500 ease-linear`}
  >
    {searchedSongs?.map((song) => (
      <SongItem key={song.id} {...song} />
    ))}
  </div>
  )
}

export default Searchsection