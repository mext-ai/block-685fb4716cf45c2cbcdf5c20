import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import gsap from "gsap";

export const Landing = () => {
  const { gameStarted, actions } = useStore();

  const logo = useRef();
  const startButton = useRef();
  const homeRef = useRef();
  const [setupStatus, setSetupStatus] = useState(0);
  const [controlStyle, setControlStyle] = useState("");

  useEffect(() => {
    const tl = gsap.timeline();

    if (setupStatus === 0) {
      if (logo.current && startButton.current) {
        tl.from(logo.current, {
          scale: 122,
          opacity: 0,
          duration: 0,
          ease: "power4.out",
        })
          .to(logo.current, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
          })
          .to(startButton.current, {
            opacity: 1,
            duration: 3,
            delay: 1,
            ease: "power4.out",
          });
      }
    }
  }, [setupStatus]);

  if (gameStarted) {
    return null; 
  }
  return (
    <div style={{
      width: '100%',
      height: '100%',
    }}>
      {setupStatus === 0 && (
        <div className="home" ref={homeRef}>
          <div className="logo">
            <img ref={logo} src="https://content.mext.app/uploads/593f2b27-fc26-4787-91c7-1c2330d4640e.png" alt="logo" />
          </div>
          <div className="start" ref={startButton}>
            <button className="start-button" onClick={() => setSetupStatus(1)}>
              PRESS ENTER TO START
            </button>
          </div>
        </div>
      )}
      {setupStatus === 1 && (
        <div className="home">
          <div className="glassy">
            <h1>CHOOSE YOUR CONTROL STYLE</h1>

            <div className="articles">
            <div className={controlStyle === "keyboard" ? "article selected" : "article"} onClick={() => 
              setControlStyle("keyboard")}>
                <h2>Keyboard</h2>
                <img src="https://content.mext.app/uploads/36c3fc6d-9a7f-4b47-9888-0e0bf86f642c.png" alt="keyboard" />
              </div>
              <div className={controlStyle === "gamepad" ? "article selected" : "article"} onClick={() => 
              setControlStyle("gamepad")}>
                <h2>Gamepad</h2>
                <img src="https://content.mext.app/uploads/d5a18f43-11fa-4fb5-bf67-76bdf3aa6f32.png" alt="gamepad" />
              </div>
              <div className={controlStyle === "mouseKeyboard" ? "article selected" : "article"} onClick={() => 
              setControlStyle("mouseKeyboard")}>
                <h2>Mouse & Keybaord</h2>
                <img src="https://content.mext.app/uploads/9f7e5b03-1dd8-41a7-8093-608f76d5a457.png" alt="mouse & keyboard" />
              </div>
              <div className={controlStyle === "touch" ? "article mobile selected" : "article mobile"} onClick={() => 
              setControlStyle("touch")}>
                <h2>Mobile</h2>
                <img src="https://content.mext.app/uploads/a113b274-faa7-4869-98ba-52803a8ca4a4.png" alt="mobile" />
              </div>
              
            </div>

            <div className={controlStyle != "" ? "submit" : "submit disabled"}>
              <button
                className={controlStyle != "" ? "submit-button" : "submit-button disabled"}
                onClick={() => {
                  actions.setControls(controlStyle);
                  actions.setGameStarted(true);
                }}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};
