import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import styled from "styled-components";
import { useState } from "react";
import app from "../utils/firbase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,   
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [lnerr,setlnerr] = useState("");
  const [formVal, setFormVal] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const authentication = getAuth(app);
  const handleLogIn = async () => {
    
    setlnerr("");
    try {
      const { email, password } = formVal;
      await signInWithEmailAndPassword(authentication, email, password)
     
    } catch (err) {
       let _er = JSON.stringify(err);
       let _erAr = _er.split('"'); 
      if(formVal.password.length<1)setlnerr("Enter email/password");
      else if(_erAr.length>=3) setlnerr(_erAr[3]);
      else setlnerr("Invalid email/password");
     
    }
  };
  
   onAuthStateChanged(authentication, (currentUser) => { //##
              
              // let data={'email':currentUser.email};
              // console.log(data);
             localStorage.setItem('FlixEmail',currentUser.email);
            if (currentUser) navigate("/");              //##
          });                                            //##
         


  return (
    <>
      <Container>
        <BackgroundImage />
        <div className="content">
          <Header btn={true} />
          <div className="form-container flex column a-center j-center">
            <div className="form flex column a-center j-center">
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="container flex column">
              {
                lnerr.length>0 && <div class="errmsg" >{lnerr}</div>
              }
              
                <input
                  type="email"
                  placeholder="Email Address "
                  name="email"
                  value={formVal.email}
                  onChange={(e) =>
                    setFormVal({ ...formVal, [e.target.name]: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formVal.password}
                  onChange={(e) =>
                    setFormVal({
                      ...formVal,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

                <button onClick={handleLogIn}>Log In</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 1rem;
        color: white;
        .container {
          gap: 2rem;
          .errmsg{
            text-align:center;
               color:yellow;
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;
