import { useState, useRef } from "react";
import "./LoadingAnimation.css";

function LoadingAnimation(props) {

  const { 
    isLoading, 
    setIsPopupOpen, 
    setMicPermission, 
    closePopup,
    requestMicPermission, 
  } = props;

  const loadingPage = useRef();

  const hideLoadingPage = () => {
    if(!loadingPage.current) return;
    loadingPage.current.classList.add("hide");
    setTimeout(() => {
      loadingPage.current.classList.add("slide-up");
    }, 1100);
    checkIsVisited();
  };

  /*
    Open popup reminder and request mic permission
    if user visits for first time
   */
  const checkIsVisited = () => {
    const isVisited = localStorage.getItem("isVisited");

    if (isVisited !== "true") {
      localStorage.setItem("isVisited", "true");
      setTimeout(() => {
        setIsPopupOpen(true);
        requestMicPermission(closePopup, setIsPopupOpen, setMicPermission);
      }, [900])
    }
  };

  return(
    // <div 
    //   className="loading-animation" 
    //   ref={loadingPage}
    // >
    //   <div className="video-wrapper">
    //     <video autoPlay muted onEnded={hideLoadingPage}>
    //       <source src="/icon-animation.webm" />
    //     </video>
    //     <span></span>
    //   </div>
      
    // </div>
    <></>
  );
}

export default LoadingAnimation;