import React, {  useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default React.memo( function CardSlider({data,title}) {

   const [showControls,setShowControls] = useState(false);
   const [sliderPosition,setSliderPosition]=useState(0);
 

   var css={
    transform: `translateX(${sliderPosition}px)`
   }
   let content_length=2444;

   const handleDirection=(direction)=>{
    
    let innerW=document.documentElement.clientWidth;
    let cnt=innerW/240;
    cnt=Math.floor(cnt);   

    if(direction== "left" && sliderPosition <0){
      let pos= -1*sliderPosition;
      console.log(pos);
      if(innerW<pos)pos=240*cnt;
      setSliderPosition(sliderPosition+pos);
    }
    else if(direction== "right" && (sliderPosition-innerW) >-1*content_length){
      let pos=sliderPosition+content_length;
      if(innerW<pos)pos=240*cnt;  
      console.log(pos);
      setSliderPosition(sliderPosition-pos);
     }
   }

   const _tscroll=(val)=>{
       setTimeout(
          () => handleDirection(val)
       ,16)
   }

  
  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <div onClick={()=>_tscroll("left")} >
            <AiOutlineLeft />
          </div>
        </div>
        <div
          className="flex slider"
          style={{
            transform: `translateX(${sliderPosition}px)`,
          }}
        >
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <div onClick={()=>_tscroll("right")} >
            <AiOutlineRight />
          </div>
        </div>
      </div>
    </Container>
  );
}
)

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      ${'' /* transform: translateX(0px); */}
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
      
    }

    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;