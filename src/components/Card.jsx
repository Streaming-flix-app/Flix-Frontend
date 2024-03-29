import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import video from "../assets/video.mp4";
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck, BsFillCollectionPlayFill} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../utils/firbase-config';
import axiosIntance from '../utils/axios';
import { useDispatch } from 'react-redux';
import { getUserLikedMovies, removeFromLikedMovies } from '../store';
export default function Card({movieData,isLiked=false}) {
  
    const [isHovered,setIsHovered]=useState(false);    
    const navigate=useNavigate();
    const authentication= getAuth(app);
    const [email,setEmail] = useState(undefined);
    onAuthStateChanged(authentication,(currentUser)=>{
     if(currentUser)setEmail(currentUser.email);
     else navigate("/login");
    })

     const addToList = async()=>{
       try{
         await axiosIntance.post("/add",{email,data:movieData});
        }catch(e){
          console.log(e);
        }
      }
    
  const dispatch = useDispatch();
  
    return (
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="movie"
        />
        {isHovered && (
          <div className="hover">
            <div className="image-video-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="movie"
                onClick={() => navigate("/player")}
              />
              <video
                src={video}
                autoPlay
                loop
                muted
                onClick={() => navigate("/player")}
              />
            </div>
            <div className="info-container flex column">
              <h3 className="name" onClick={() => navigate("/player")}>
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="trailer"
                    onClick={() => navigate("/player")}
                  />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {isLiked ? (
                    <BsCheck
                      title="Remove from List"
                      onClick={() => {
                        dispatch(
                          removeFromLikedMovies({ email, id: movieData.id })
                        );
                        dispatch(getUserLikedMovies(email));                        
                      }}
                    />
                  ) : (
                    <AiOutlinePlus title="Add to my list" onClick={addToList} />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
              </div>
              <div className="watchNow" title="watch now" onClick={()=>navigate("/subscription")}>
                <BsFillCollectionPlayFill />
              </div>

              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => {
                    <li key={genre}>{genre}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    );
 }


const Container = styled.div`
 width: 230px;
 height:100%;
 cursor: pointer;
 position:relative;
 img{
    border-radius: 0.2rem;
    width: 100%;
    height: 100%
    z-index:10;
 }
 .hover{
    z-index: 90;
    height: max-content;
    width: 16rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
    transition: 0.3s ease-in-out;
    background-color: #181818;
    .image-video-container{
        position: relative;
        height: 140px;
        img{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 4;
            position: absolute;
        }
        video{
            width:100%;
            height: 140px;
            object-fit:cover;
            border-radius: 0.3rem;
            top: 0;
            z-index: 5;
            position: absolute;
        }
    }
    .info-container{
        padding: 0.6rem;
        gap: 0.5rem;


    }
    .icons{
        .controls{
            display: flex;
            gap: 1rem;
        }
        svg{
            font-size: 1.6rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                color: #b9b9b9;
            }

        }
    }
    .watchNow{
      margin:0.15rem;
      padding:0.05rem;
      background-color:grey;
      text-align:center;
      cursor: pointer;
       svg{
        font-size: 1.8rem;
       }
       &:hover{
                color: #b8b8b8;
         }
    }
    .genres{
        ul{
            gap: 1rem;
            li{
                padding-right: 0.7rem;
                &:first-of-type{
                    list-style-type: none;
                }
            }
        }
    }
 }




`;