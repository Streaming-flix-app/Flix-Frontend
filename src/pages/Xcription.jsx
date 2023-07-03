import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsArrowLeft, BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import app from "../utils/firbase-config";
import axiosIntance from "../utils/axios";
import app_logo  from "../app_logo.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PaymentConfirmation from "../components/PaymentConfirmation";

export default function Xcription() {
  const [std_no, set_std] = useState(0);
  const navigate = useNavigate();
  let cost=[199,499,649];


  const [email, setEmail] = useState(undefined);
  const [payment,setPayment]=useState(false);
  const [orderId,setOrderId]=useState("");
  const [paymentId,setPaymentId]=useState("");
  const [signature,setSignature]=useState("");
  
  const [show, setShow] = useState(false);

  const authentication = getAuth(app);  
  onAuthStateChanged(authentication, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  
  useEffect(()=>{
       if(payment)navigate("/");
  },[payment])



  const BuyNow=async()=>{ 
    const res=await axiosIntance.get(`/order/${email}/${std_no}`);
    console.log(res);    
    if(res.status!=200)  return;

    const {amount,currency,id}=res.data.order;
    
    var options = {
      "key": "rzp_test_ZbzAdM2rFQPnfZ", // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": currency,
      "name": "Flix the NetflixClone", //your business name
      "description": "Testing Transaction",
      "image": app_logo, 
      "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          setOrderId(response.razorpay_order_id);
          setSignature(response.razorpay_signature);
          setPaymentId(response.razorpay_payment_id);
          setPayment(true);
          setShow(true);
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": email.split("@")[0], //your customer's name
          "email": email, 
          "contact": "0123456789"  //Provide the customer's phone number for better conversion rates 
      },
      // "notes": {
      //     "address": "Razorpay Corporate Office"
      // },
      // "theme": {
      //     "color": "#3399cc"
      // }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });

  }
  

  return (
    <>

    <Container>
       
   

      <div className="back" title="Go Back">
        <BsArrowLeftCircle onClick={() => navigate(-1)} />
      </div>
      <div className="ads">
        <h2>Choose plan for the uninteruppted services</h2>
        <div className="point">
          <AiOutlineCheckCircle />
          <h4>Watch all you want. Ad-free.</h4>
        </div>
        <div className="point">
          <AiOutlineCheckCircle />
          <h4>Recommendations just for you.</h4>
        </div>
        <div className="point">
          <AiOutlineCheckCircle />
          <h4>Change or cancel your plan anytime.</h4>
        </div>
      </div>
      <div className="quality">
        <div className="choice desc">
          <div className="h_ead" style={{ backgroundColor: "black" }}></div>
          <div className="content">
            <li>Monthly price</li>
            <li>Video quality</li>
            <li>Resolution</li>
          </div>
        </div>
        <div className="choice basic" onClick={() => set_std(0)}>
          <div
            className="h_ead"
            style={{ backgroundColor: std_no == 0 ? "red" : "" }}
          >
            <h3>Basic</h3>
          </div>
          <div className="content" style={{ color: std_no == 0 ? "red" : "" }}>
            <li>
              {" "}
              <span>&#8377;</span> {cost[0]}
            </li>
            <li>Good</li>
            <li>720p</li>
          </div>
        </div>
        <div className="choice medium" onClick={() => set_std(1)}>
          <div
            className="h_ead"
            style={{ backgroundColor: std_no == 1 ? "red" : "" }}
          >
            <h3>Medium</h3>
          </div>
          <div className="content" style={{ color: std_no == 1 ? "red" : "" }}>
            <li>
              {" "}
              <span>&#8377;</span> {cost[1]}
            </li>
            <li>Better</li>
            <li>1080p</li>
          </div>
        </div>
        <div className="choice premium" onClick={() => set_std(2)}>
          <div
            className="h_ead"
            style={{ backgroundColor: std_no == 2 ? "red" : "" }}
          >
            <h3>Premium</h3>
          </div>
          <div className="content" style={{ color: std_no == 2 ? "red" : "" }}>
            <li>
              <span>&#8377;</span> {cost[2]}
            </li>
            <li>Best</li>
            <li>4K+HDR</li>
          </div>
        </div>
      </div>
      <div className="features"></div>

      <div className="nextButton">
        <button onClick={BuyNow}>
          <b>Next</b>
        </button>
        <div>
         
          
        </div>
      </div>
    </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  .back {
    width:3rem;
    height:3rem;
    margin-left: 1.5rem;
    margin-top: 2rem;
    font-size: 2rem;
    &:hover {
      font-size: 2.2rem;
    }
  }

  .ads {
    margin-left: 3rem;
    .point {
      display: flex;
      margin-left: 0.5rem;
      margin-top: 0.3rem;
      h4 {
        padding-left: 1rem;
      }
    }
  }
  .quality {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
    .choice {
      width: 15%;
       .h_ead {
        height: 4.5rem;
        position: sticky;
        padding: 0.7rem;
        background-color: rgb(226, 125, 125);
      }
      .content {
        li {
          height: 4.5rem;
          background-color: grey;
          margin: 0.5rem;
        }
      }
      display: block;
      margin: 0.25rem;
    }
  }
  .content {
    li {
      list-style: none;
    }
  }
  .nextButton {
    justify-content: center;
    display: flex;
    self-align: center;
    height: 3rem;
    button {
      width: 35%;
      font-size: 1.5rem;
      cursor: pointer;
      &:hover {
        background-color: red;
        color: white;
      }
    }
  }
`;
