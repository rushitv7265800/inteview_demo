import React, { useEffect, useRef, useState } from "react";
import Font1 from "../assets/fontStyle/font1.webp";
import Font2 from "../assets/fontStyle/font2.webp";
import Font3 from "../assets/fontStyle/font3.webp";
import Slider from "@mui/material/Slider";
import AnimationText1 from "../assets/animationStyle/animationText1.webp";
import AnimationText2 from "../assets/animationStyle/animationText2.webp";
import AnimationText3 from "../assets/animationStyle/animationText3.webp";
import AnimationText4 from "../assets/animationStyle/animationText4.webp";
import "./style.css";
import { Stack } from "@mui/material";

export default function HomePage() {
  const animationText = useRef();
  const [fontStyle, setFontStyle] = useState({
    textShadow: false,
    noneText: false,
    liftText: false,
  });

  const [animationStyle, setAnimationStyle] = useState({
    riseAnimation: false,
    panAnimation: false,
    fadeAnimation: false,
    clarifyAnimation: false,
  });
  const [animationSpeed, setAnimationSpeed] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setAnimationSpeed(newValue);
  };

  useEffect(() => {
    const canvas = animationText.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";

    if (fontStyle.noneText) {
      ctx.shadowColor = "none";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else if (fontStyle.textShadow) {
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
    } else if (fontStyle.liftText) {
      ctx.shadowColor = "black";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }

    if (animationStyle.riseAnimation) {
      let yPos = 80;
      const animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText("Hello, How Are You !!", 10, yPos);
        yPos -= 2;
        if (yPos < 0) {
          clearInterval(animationInterval);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillText("Hello, How Are You !!", 10, 80);
          setAnimationStyle({
            ...animationStyle,
            fadeAnimation: false,
            panAnimation: false,
            clarifyAnimation: false,
            riseAnimation: false,
          });
        }
      }, 50 / animationSpeed); // Adjust the interval based on animationSpeed
    } else if (animationStyle.panAnimation) {
      let xPos = 0;
      const animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText("Hello, How Are You !!", xPos, 80);
        xPos += 2;
        if (xPos > canvas.width) {
          clearInterval(animationInterval);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillText("Hello, How Are You !!", 10, 80);
          setAnimationStyle({
            ...animationStyle,
            fadeAnimation: false,
            panAnimation: false,
            clarifyAnimation: false,
            riseAnimation: false,
          });
        }
      }, 50 / animationSpeed); // Adjust the interval based on animationSpeed
    } else if (animationStyle.fadeAnimation) {
      let alpha = 1.0;
      const animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = alpha;
        ctx.fillText("Hello, How Are You !!", 10, 80);
        alpha -= 0.02;
        if (alpha <= 0) {
          clearInterval(animationInterval);
          ctx.globalAlpha = 1.0;
          ctx.fillText("Hello, How Are You !!", 10, 80);
        }
        setAnimationStyle({
          ...animationStyle,
          fadeAnimation: false,
          panAnimation: false,
          clarifyAnimation: false,
          riseAnimation: false,
        });
      }, 50 / animationSpeed);
    } else if (animationStyle.clarifyAnimation) {
      //   let clarity = 0;
      //   const animationInterval = setInterval(() => {
      //     ctx.clearRect(0, 0, canvas.width, canvas.height);

      //     // Calculate the x-position for the text based on clarity
      //     const xPos =
      //       canvas.width / 4 -
      //       ctx.measureText("Hello, How Are You !!").width / 2 +
      //       clarity * (canvas.width / 2);

      //     // Calculate the transparency based on the x-position
      //     const alpha = 1 - clarity; 

      //     // Set the global alpha
      //     ctx.globalAlpha = alpha;

      //    
      //     ctx.fillText("Hello, How Are You !!", xPos, 80);

      //     // Increase clarity to move the animation forward
      //     clarity += 0.02;

      //    
      //     if (clarity >= 1) {
      //       clearInterval(animationInterval); // Stop the animation
      //       ctx.globalAlpha = 1; // Reset global alpha
      //       ctx.fillText(
      //         "Hello, How Are You !!",
      //         canvas.width / 2 -
      //           ctx.measureText("Hello, How Are You !!").width / 2,
      //         80
      //       ); 
      //     }
      //   }, 50);
      let clarity = 0;
      const text = "Hello, How Are You !!";
      let charIndex = 0;

      const animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const xPos =
          canvas.width / 4 -
          ctx.measureText(text).width / 2 +
          clarity * (canvas.width / 2);
        const alpha = 1 - clarity; 
        ctx.globalAlpha = alpha;
        const partialText = text.substring(0, charIndex + 1);
        ctx.fillText(partialText, xPos, 80);
        charIndex++;
        clarity += 0.02;
        if (charIndex >= text.length) {
          clearInterval(animationInterval); 
          ctx.globalAlpha = 1; 
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillText(
            text,
            canvas.width / 2 - ctx.measureText(text).width / 2,
            80
          );
        }
      }, 50);
    }

    ctx.fillText("Hello, How Are You !!", 10, 80);
  }, [fontStyle, animationSpeed, animationStyle]);

  const handleFontStyleClick = (type) => {
    if (type === "shadow") {
      setFontStyle({
        ...fontStyle,
        textShadow: true,
        noneText: false,
        liftText: false,
      });
    } else if (type === "none") {
      setFontStyle({
        ...fontStyle,
        textShadow: false,
        noneText: true,
        liftText: false,
      });
    } else if (type === "lift") {
      setFontStyle({
        ...fontStyle,
        textShadow: false,
        noneText: false,
        liftText: true,
      });
    }
  };

  const handleAnimationStyleClick = (type) => {
    setFontStyle({
      ...fontStyle,
      textShadow: false,
      noneText: false,
      liftText: false,
    });
    if (type === "rise") {
      setAnimationStyle({
        ...animationStyle,
        riseAnimation: true,
        clarifyAnimation: false,
        panAnimation: false,
        fadeAnimation: false,
      });
    } else if (type === "pan") {
      setAnimationStyle({
        ...animationStyle,
        riseAnimation: false,
        panAnimation: true,
        clarifyAnimation: false,
        fadeAnimation: false,
      });
    } else if (type === "fade") {
      setAnimationStyle({
        ...animationStyle,
        riseAnimation: false,
        panAnimation: false,
        clarifyAnimation: false,
        fadeAnimation: true,
      });
    } else if (type === "clarify") {
      setAnimationStyle({
        ...animationStyle,
        riseAnimation: false,
        panAnimation: false,
        clarifyAnimation: true,
        fadeAnimation: false,
      });
    }
  };

  return (
    <div className="homePage">
      <div className="animationFilter">
        <div className="textBox">
          <div className="fontStyle">
            <h6>Font Styles</h6>
            <div className="styleFont">
              <div className="fontBox">
                <button
                  className={`${
                    fontStyle.noneText ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleFontStyleClick("none")}
                >
                  <img src={Font1} draggable={false} />
                </button>
                <span>None</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${
                    fontStyle.textShadow ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleFontStyleClick("shadow")}
                >
                  <img src={Font2} draggable={false} />
                </button>
                <span>Shadow</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${
                    fontStyle.liftText ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleFontStyleClick("lift")}
                >
                  <img src={Font3} draggable={false} />
                </button>
                <span>Lift</span>
              </div>
            </div>
          </div>
          <div className="animationText fontStyle">
            <h6>Animation Text</h6>
            <div className="styleFont">
              <div className="fontBox">
                <button
                  className={`${
                    animationStyle.riseAnimation ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleAnimationStyleClick("rise")}
                >
                  <img src={AnimationText1} draggable={false} />
                </button>
                <span>Rise</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${
                    animationStyle.panAnimation ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleAnimationStyleClick("pan")}
                >
                  <img src={AnimationText2} draggable={false} />
                </button>
                <span>Pan</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${
                    animationStyle.fadeAnimation ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleAnimationStyleClick("fade")}
                >
                  <img src={AnimationText3} draggable={false} />
                </button>
                <span>Fade</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${
                    animationStyle.fadeAnimation ? "fontBoxButtonActive" : ""
                  }`}
                  onClick={() => handleAnimationStyleClick("clarify")}
                >
                  <img src={AnimationText4} draggable={false} />
                </button>
                <span>Clarify</span>
              </div>
            </div>
            <div className="speedProgress">
              <Stack spacing={2}>
                <h6>Speed</h6>
                <Slider
                  aria-label="Volume"
                  sx={{ color: "#8b3dff", width: "200px" }}
                  value={animationSpeed}
                  onChange={handleSliderChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <div className="showCanvas">
        <div className="showPage">
          <canvas ref={animationText}></canvas>
        </div>
      </div>
    </div>
  );
}
