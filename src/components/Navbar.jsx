import React, {useEffect,useState } from 'react'
import styled from 'styled-components'
// import logo from "../assets/logo.png"
import logoV from "../assets/logo2.mp4"
import {  NavLink, useNavigate } from 'react-router-dom'
import {FaSearch,FaPowerOff, FaMoneyCheckAlt} from "react-icons/fa"
import {  signOut} from 'firebase/auth'
import {
  getAuth
} from "firebase/auth";
import app from '../utils/firbase-config'



export default function Navbar({isScrolled}) {
  
  const navigate=useNavigate();
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Show", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setinputHover] = useState(false);
  const Logout= async()=>{
    try{
      localStorage.clear();
      await signOut(getAuth(app));
      navigate("/login");
      window.location.reload();
    }
    catch(e){
      console.log(e);
    }
  }

  const _home=(link)=>{
     setTimeout(()=>navigate(link),10);
  }


  const [user_name,set_user_name]=useState("");
  const [user_email,set_user_email]=useState("");
  const [show_logout_btn,set_logout_btn]=useState(false);
  useEffect(()=>{
        const _eml=localStorage.getItem('FlixEmail');
        // console.log(_eml);
        let nm=_eml.split('@');
        const len=nm[0].length;
        nm= nm[0][0]+nm[0][len-1];
        // console.log(nm);
         set_user_name(nm);
         set_user_email(_eml);

  },[]);

  
  // window.addEventListener("click", (event) => {
  //        setTimeout(() => {
  //          if(show_logout_btn)set_logout_btn(false);          
  //        }, 20);
  // });


  return (
    <>
      <Container>
        <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
          <div className="left flex a-center">
            <div className="brand flex a-center j-center" onClick={()=>_home("/")}>
              {/* <img src={logo} alt="logo" /> */}
              <video src={logoV} autoPlay loop muted/>
              
            </div>
            <ul className="links flex">
              {links.map(({ name, link }) => {
                return (
                  <li key={name}>
                    <NavLink
                      to={link}
                      style={({ isActive }) => ({
                        // backgroundColor: isActive?'blue':'none'
                        display: isActive ? "none" : "inline",
                      })}
                    >
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right flex a-center">
            <div className={`search ${showSearch ? "show-search" : ""}`}>
              <button
                onFocus={() => setShowSearch(true)}
                onBlur={() => {
                  if (!inputHover) setShowSearch(false);
                }}
              >
                {" "}
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search"
                onMouseEnter={() => setinputHover(true)}
                onMouseLeave={() => setinputHover(false)}
                onBlur={() => {
                  setShowSearch(false);
                  setinputHover(false);
                }}
              />
            </div>
            <div className="pro" title='Upgrade to Pro' onClick={()=>navigate("/subscription")}>
              <FaMoneyCheckAlt />
            </div>
             <div className='user-profile'>
               <div className='nm'  onClick={()=>set_logout_btn(!show_logout_btn)}>
               <h2>{user_name.toUpperCase()}</h2>
               </div>
              {
               show_logout_btn &&<>
               <div className='options' onClick={()=>set_logout_btn(true)}>
                    <div>
                    {user_email}
                    </div>
                    <button onClick={Logout} title="logout">
                      <FaPowerOff />
                    </button>
                </div>
               </>
                }

             </div> 
          </div>
        </nav>
      </Container>  
    </>
  );
}


const Container = styled.div`
  .scrolled {
    background-color: Black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
        video {
          height: 4rem;
          border-radius: 20rem;
        }
        &:hover {
          cursor: pointer;
        }
      }
      .links {
        list-style-type: none;
        gap: 1.5rem;
        li {
          a {
            color: white;
            text-decoration: none;
            padding: 0.3rem;
            border-radius: 3.5px;
          }
        }
      }
    }

    .right {
      gap: 1rem;
      .pro {
        cursor: pointer;
        svg {
          color: yellow;
          font-size: 1.8rem;
        }
      }

      .user-profile {
        .nm {
          &:hover {
            cursor: pointer;
            opacity: 100%;
          }
          opacity: 60%;
          background-color: rgb(203, 193, 193);
          padding: 0.5rem;
          width: 3.5rem;
          border: 2px solid black;
          color: blue;
          border-radius: 45% 45% 45% 0;
        }
        .options {
          &:hover {
            opacity: 100%;
          }
          ${"" /* transition: 10s ease-in-out; */}
          background-color: black;
          max-width: 120px;
          opacity: 70%;
          overflow-wrap: anywhere;
          text-align: center;
          margin: 0 2rem 0 0;
          position: fixed;
          display: absolute;
          right: 0.8rem;
          ${"" /* width:auto; */}
          padding:0.5rem 0.3rem 0 0.3rem;
          border: 1px solid black;
        }
      }
      button {
        margin: 0.3rem 0 0 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: 100%;
        &:hover {
          background-color: grey;
        }
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }

      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: white;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          background-color: transparent;
          transition: 0.3s ease-in-out;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgb(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
    .errMessage {
      text-align: center;
      color: white;
      padding: 2rem;
    }
  }
`;