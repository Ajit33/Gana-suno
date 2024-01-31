import React from 'react'
import Navbar from '../Components/Navbar'
import Player from '../Components/Player'
import MainSection from '../Components/MainSection'
import Searchsection from '../Components/Searchsection'

const Home = () => {
  return (
    <>
        <Navbar />
        <Searchsection />
        <MainSection />
        <Player />
    </>
  )
}

export default Home