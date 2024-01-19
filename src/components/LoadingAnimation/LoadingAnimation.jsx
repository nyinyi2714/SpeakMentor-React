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

  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const loadingPage = useRef();
  const loadingBar = useRef();

  const hideLoadingPage = () => {
    if(!loadingPage.current) return;
    loadingPage.current.classList.add("slide-up");
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
    <div 
      className="loading-animation" 
      ref={loadingPage}
    >
      <div className="loading-animation--content">
        <img src="/images/main-logo.png" alt="main-logo" onLoad={() => setIsLogoLoaded(true)} />
        <div className={`loading-bar ${isLogoLoaded && "show"}`}>
          <span 
            className={`bar ${isLogoLoaded && "load"}`}
            ref={loadingBar} 
            onTransitionEnd={hideLoadingPage}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;