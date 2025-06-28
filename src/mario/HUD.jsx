import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import { Joystick } from "react-joystick-component";

export const HUD = () => {
  const wheel = useRef();
  const [image, setImage] = useState("");
  const { item, gameStarted, actions, controls } = useStore();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (wheel.current) {
        const { clientX, clientY } = e;
        const screenWidth = window.innerWidth;
        const rotation = ((clientX - screenWidth / 2) / screenWidth) * 180;

        wheel.current.style.left = `${clientX - 100}px`;
        wheel.current.style.top = `${clientY - 100}px`;
        wheel.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMove = (e) => {
    actions.setJoystickX(e.x);
  };

  const handleStop = () => {
    actions.setJoystickX(0);
  };

  useEffect(() => {
    switch (item) {
      case "banana":
        setImage("https://content.mext.app/uploads/7a20c485-70f3-4016-bfc7-38a25ef78eaf.webp");
        break;
      case "mushroom":
        setImage("https://content.mext.app/uploads/a1b1123c-65e8-4ed9-83e0-0487c54246c2.png");
        break;
      case "shell":
        setImage("https://content.mext.app/uploads/afa37b63-4182-4e32-b838-7c19ba1c3070.webp");
        break;
      default:
        setImage("");
    }
  }, [item]);

  return (
    <div className="overlay">
      {gameStarted && (
        <>
          <div className="item">
            <div className="borderOut">
              <div className="borderIn">
                <div className="background">
                  {image && <img src={image} alt="item" width={90} />}
                </div>
              </div>
            </div>
          </div>
          {controls === "touch" && (
            <>
            <div className="controls joystick">
            <Joystick
              size={100}
              sticky={false}
              baseColor="rgba(255, 255, 255, 0.5)"
              stickColor="rgba(255, 255, 255, 0.5)"
              move={handleMove}
              stop={handleStop}
            ></Joystick>
          </div>
          <div
            className="controls drift"
            onMouseDown={(e) => {
              actions.setDriftButton(true);
            }}
            onMouseUp={(e) => {
              actions.setDriftButton(false);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              actions.setDriftButton(true);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              actions.setDriftButton(false);
            }}
          >
            drift
          </div>
          <div
            className="controls itemButton"
            onMouseDown={(e) => {
              actions.setItemButton(true);
            }}
            onMouseUp={(e) => {
              actions.setItemButton(false);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              actions.setItemButton(true);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              actions.setItemButton(false);
            }}

          >
            item
          </div>
          </>
          )}
        </>
      )}
    </div>
  );
};
