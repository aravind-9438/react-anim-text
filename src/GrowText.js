import React, {useEffect, useRef, useState } from 'react'
import './styles.module.css'
import animate from './utils/animate.ts'

const initialPhase = {scale:0.2, opacityVal:0}


function GrowText(props) {

  let count = 0;
  let done = false;
  const [animationState, setAnimationState] = useState(initialPhase);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const keyframes = {
    values: [{scale:0.2, opacityVal: 0},{scale:1, opacityVal: 1},{scale:2, opacityVal: 0}],
    duration: props.duration,
    times: [0,0.5,1],
    easings: ['quadratic','quadratic'],
    startOffset: 1
  }

  const frameUpdate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      count = (count + deltaTime * 0.001);
      if(count>keyframes.startOffset)
        setAnimationState(
          animate(count-keyframes.startOffset, keyframes)
        );
    }
    previousTimeRef.current = time;
    
    if(count-keyframes.startOffset<props.duration)
      requestRef.current = requestAnimationFrame(frameUpdate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(frameUpdate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
     return (
      <h1 style = {{position: "relative", fontWeight: "900"}}>
        
        <div style = {{...styles,transform: "scale("+animationState.scale+")", opacity: animationState.opacityVal}}>{props.textList[0]}</div>

      </h1>
     );
   
}

const styles = {
  position: "absolute",
  textAlign: "center",
  margin: "auto",
  left: "0",
  top: "0.3em",
  right: "0"
}

export default GrowText;