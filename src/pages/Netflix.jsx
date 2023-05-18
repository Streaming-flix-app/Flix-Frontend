import React, { useEffect } from "react";
import BackgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp"
import { FaPlay } from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai"
// import Header from "../components/Header";
import styled from "styled-components";
import { useState } from "react";
import app from "../utils/firbase-config";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
    
export default  function Netflix() {
  const authentication = getAuth(app);
  const [isScrolled,setIsScrolled]=useState(false);
  const movies = useSelector((state)=>state.netflix.movies);
  
  const navigate = useNavigate();
  onAuthStateChanged(authentication, (currentUser) => {
    if (!currentUser) {navigate("/login");}
  });
  
  const genresLoaded = useSelector((state)=>state.netflix.genresLoaded) ;
  
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getGenres());
  },[]);
  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type: "all"}));
  },[genresLoaded]);
  
  const genres=useSelector((state)=>state.netflix.genres);//##
  
  window.scrollTo(0, 0);
 
  window.onscroll = ()=>{
    setIsScrolled(window.pageYOffset === 0?false:true);
    return ()=> (window.onscroll=null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={BackgroundImage}
          alt="Bg-Gallery"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="movie-logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}


const Container=styled.div`
background-color: Black;
.hero{
   position: relative;
   .background-image{
    filter: brightness(60%);
   }
   img{
    height: 100vh;
    width:   100vw;
   }
   .container{
    position: absolute;
    bottom: 5rem;
    .logo{
      img{
        width: 100%;
        height: 100%;
        margin-left: 5rem;
      }
    }
    .buttons{
      margin:5rem;
      gap: 2rem;
      button{
      font-size: 1.4rem;
      gap: 1rem;
      border-radius: 0.2rem;
      padding:0.5rem;
      padding-left: 2rem;
      padding-right: 2.4rem;
      border: none;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover{
        opacity: 0.8;
      }
      &:nth-of-type(2){
        background-color: rgba(109,109,110,0.7);
        color: white;
        svg{
          font-size: 1.8rem;
        }
      }
     }
    }
   }
}


`;